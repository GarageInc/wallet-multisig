/* global Browser */

import { Chain } from '@whalesheaven/chain-service'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import elliptic from 'elliptic'
import _jsSha from 'js-sha256'
import { GROUP_TRANSACTION_STATES, GROUP_TRANSACTION_STATUSES } from 'src/app/constants/groupTransactionRequests'
import { WALLET_REQUEST_TYPES } from 'src/app/constants/requestTypes'
import { EthereumChain } from 'src/serviceWorker/app/models/EthereumChain'
import { IMessage } from 'src/shared/interfaces/interfaces'
import Browser from 'webextension-polyfill'

import { WALLET_REQUESTS_PATH } from '../../../app/constants/paths'
import HandlersDB from '../../db/HandlersDB'
import NotifierController from '../controllers/NotifierController'
import WalletController from '../controllers/WalletController'
import { SUPPORTED_PROTOCOLS } from '../lib/constants/protocols'
import TsWalletShard, { initWalletShardFromData } from '../lib/TsWalletShard'
import { getRpcManager } from '../serviceWorker'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import { getStore } from '../store/store'
import {
  getSignatureSessionDataApi,
  getSignatureSessionsApi,
  joinSignatureSessionApi,
  rejectSignatureSessionApi,
} from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'
import AccountActivities from './AccountActivities'
import KeyManager from './KeyManager'
import Wallet from './Wallet'

const formatWalletAddress = (address: string) => `${address.substring(0, 4)}...${address.substring(address.length - 4)}`

const getEC = () => {
  const curve = elliptic.curves.secp256k1.curve
  return elliptic.ec({ curve: { curve, g: curve.g, n: curve.n } })
}

const AUTOAPROVAL_AMOUNT_TOLERANCE_PERCENT = 1

const broadcastDappMessage = (msg: IMessage, result: any) => {
  const message = {
    ...msg,
    raw: {
      id: msg.messageId,
      result,
    },
  }

  getRpcManager().handleRpcMessageResults(message)
}

const checkForDappWaitingResults = async ({ sessionData, adapter }, broadcast: boolean) => {
  if (broadcast && sessionData.rawData) {
    const msg = typeof sessionData.rawData === 'string' ? JSON.parse(sessionData.rawData) : sessionData.rawData

    if (msg) {
      if (EthereumChain.isSignMessage(sessionData.rawData)) {
        broadcastDappMessage(msg, adapter.serializeTransaction())
      } else if (msg.raw.method === 'eth_signTransaction') {
        broadcastDappMessage(msg, adapter.serializeTransaction())
      } else if (msg.raw.method === 'eth_sendTransaction') {
        const transactionHex = adapter.serializeTransaction(true)
        adapter.sendTransaction(transactionHex, (receipt: { complete: any }) => {
          broadcastDappMessage(msg, adapter.getTxnId())
        })
      }
    }
  }
}

class TransactionSession {
  sessionId: any
  requestData: any
  transactionId: any
  wallet: Wallet

  constructor(wallet: Wallet, sessionId: string, requestData?: walletRequestsReducer.IWalletRequest) {
    this.wallet = wallet
    this.sessionId = sessionId
    this.requestData = requestData

    this.transactionId = null
  }

  static _getWalletOrCreateNew = async (request: walletRequestsReducer.IWalletRequest, accountRootPubKey: string) => {
    let wallet = await Wallet.findByBlockchainAndAddress(request.blockchain, request.addressFrom, accountRootPubKey)

    if (!wallet) {
      const anotherChainWallet = await Wallet.findByBlockchainAndAddress(
        undefined,
        request.addressFrom,
        accountRootPubKey,
      )

      if (anotherChainWallet && anotherChainWallet.walletData) {
        const newWallet = await Wallet.cloneWalletDataToChain(anotherChainWallet.walletData, request.blockchain)

        if (newWallet) {
          const walletController = new WalletController()
          await walletController.updateWalletBalances(newWallet.walletId)

          wallet = await Wallet.findByBlockchainAndAddress(request.blockchain, request.addressFrom, accountRootPubKey)
        }
      }
    }

    return wallet
  }

  // (in progress) Refactored
  static async fetchTransactionsSessionsFromServer(account, executeImmediately = false) {
    const store = await getStore()
    const { walletRequests } = store.getState()
    const { monitoringRequestsIds } = walletRequests

    const accountRootPubKey = await account.getRootPubKey()
    const wallets = await account.findAllWallets()

    if (wallets.length > 0) {
      const handlersDB = new HandlersDB()
      const walletsRequestData = wallets.map((wallet) => [
        wallet.walletData.blockchain,
        wallet.walletData.calculatedAddress,
      ])
      // TODO rename vaults -> wallets
      const requestBody = JSON.stringify({ vaults: walletsRequestData })
      const authHeaders = await account.authHeaders(requestBody)
      let response
      try {
        response = await getSignatureSessionsApi(requestBody, authHeaders)
      } catch (e) {
        console.log('Error while fetching signature requests: ', e)
        throw new Error('Failed to fetch signature requests')
      }

      if (response.requests) {
        for (const request of response.requests) {
          if (await Account.shouldInterceptAccountRoutine(account)) throw new Error(`Intercepting request handling`)

          const wallet = await this._getWalletOrCreateNew(request, accountRootPubKey)

          if (!wallet) {
            throw Error('Not defined wallet')
          }

          const walletPubKey = await account.getPubKeyByPath(wallet.walletData.path)

          const joinedPartyState = request.partiesState.find((state) => state.partyPubKey === walletPubKey)
          const allSessionMessages = request.state
          const partySessionMessages = allSessionMessages.filter((state) => state.partyPubKey == walletPubKey)

          // check if wallet request exist. If not -> likely that the session is resolved oin some other device.
          // Here we just monitoring it then
          const store = await getStore()
          const { walletRequests } = await store.getState()
          const walletRequest = walletRequests.requestsList.find(
            (walletRequest) => walletRequest.sessionId == request._id,
          )

          const transactionSession = new TransactionSession(wallet, request._id, request)
          const partyIsBroadcaster = request.initiatorPubKey == walletPubKey

          const alarmName = `resolveTransactionSession:${request._id}:${partyIsBroadcaster}`
          const handlerName = `resolveTransactionSession:${request._id}`

          // Currently we support only 1 version of protocol, but in future we will implement other versions.
          // Other versions might include asynchronous signature generation

          if (request.status == 'pending' && !partySessionMessages.length) {
            // New request that has not went into session yet
            if (!joinedPartyState && !monitoringRequestsIds[request._id]) {
              // New pending request. We ask user to join it unless he is creator
              if (request.initiatorPubKey !== walletPubKey) {
                await store.dispatch(
                  walletRequestsReducer.addMonitoredSessionIds({
                    sessionId: request._id,
                    initiatedAt: request.initiatedAt,
                  }),
                )
                await waitForSync()

                if (!walletRequest) {
                  if (Object.values(SUPPORTED_PROTOCOLS).includes(request.protocolVersion)) {
                    NotifierController.create('New transaction request', 'You have a new spend request')
                    await this._initNewRequestInStore(account, request)
                  } else {
                    // WE just let user know that he needs to update the client and that's it
                    NotifierController.create(
                      "Can't proceed with spend request",
                      'You have a new spend request, but your client is outdated. Please update to the latest version.',
                    )
                    await this._initNewRequestInStore(
                      account,
                      request,
                      GROUP_TRANSACTION_STATUSES.PENDING,
                      GROUP_TRANSACTION_STATUSES.UNSUPPORTED,
                    )
                  }
                }
              } else {
                // There is a unmonitored request made by us, however we haven't joined it yet.
                // Likely, some other client has initiated a signature session, but haven't joined it for some reason yet.
                // We simply ignore it for now and keep monitoring
              }
            } else if (joinedPartyState && !monitoringRequestsIds[request._id]) {
              // User has joined this session, but we are not tracking it. Likely wallet has been restarted while session was in process.
              // We should try to recover it or to abort it

              if (!walletRequest) {
                // If not, then we just monitor it. There might be other client resolving it
                NotifierController.create(
                  'Spend request in process',
                  'There is a spend request going on. Perhaps it is happening on some other devise.',
                )
                await store.dispatch(
                  walletRequestsReducer.addMonitoredSessionIds({
                    sessionId: request._id,
                    initiatedAt: request.initiatedAt,
                  }),
                )
                await waitForSync()
              } else {
                // We should check why there is a walletRequest, user has joined and we are not monitoring this transaction.
                // Likely, wallet was restarted and we are now should resolve this session. we can simply add it to monitoring
                // Then this request will be resolved within 1 minute
                const handlers = await handlersDB.getHandlers()
                const requestHandled = handlers[handlerName]
                const alarmExists = await Browser.alarms.get(alarmName)

                if (
                  walletRequest.status == GROUP_TRANSACTION_STATUSES.PENDING &&
                  !requestHandled &&
                  (!alarmExists || executeImmediately)
                ) {
                  NotifierController.create('Spend request in process', 'There is a spend request going on.')
                  await store.dispatch(
                    walletRequestsReducer.addMonitoredSessionIds({
                      sessionId: request._id,
                      initiatedAt: request.initiatedAt,
                    }),
                  )
                  await waitForSync()

                  const pendingParties = request.partiesState.filter((partyState) => partyState.status === 'pending')
                  // const joinedParties = pendingParties.map(partyState => partyState.accountPubKey);
                  const joinedParties = pendingParties.reduce((parties, partyState) => {
                    parties[partyState.accountPubKey] = partyState.status
                    return parties
                  }, {})
                  const approvedPartiesCount = Object.values(joinedParties).filter(
                    (status) => status == 'pending',
                  ).length
                  try {
                    const requestPartiesReady = await transactionSession.checkParticipantsJoinedSession(request)

                    if (requestPartiesReady && approvedPartiesCount >= walletRequest.minimumSigAmount) {
                      // We are going to execute this request now, everybody are in
                      if (alarmExists) await Browser.alarms.clear(alarmName)
                      const resolveResult = await transactionSession.resolveSession(partyIsBroadcaster)

                      if (resolveResult?.transactionId) {
                        // Session resolved positively
                        NotifierController.create(
                          'Send funds',
                          `Spend request from wallet  ${formatWalletAddress(request.addressFrom)} is successful`,
                        )
                        await store.dispatch(
                          walletRequestsReducer.updateRequestBySessionId({
                            sessionId: request._id,
                            status: GROUP_TRANSACTION_STATUSES.READY,
                          }),
                        )
                        await waitForSync()
                      } else {
                        // Session resolved negatively
                        NotifierController.create(
                          'Send funds',
                          `Spend from wallet ${formatWalletAddress(request.addressFrom)} has failed.`,
                        )
                        await store.dispatch(
                          walletRequestsReducer.updateRequestBySessionId({
                            sessionId: request._id,
                            status: GROUP_TRANSACTION_STATUSES.FAILED,
                          }),
                        )
                        await waitForSync()
                      }
                    } else {
                      // Not everybody are in. We will be waiting for everybody to come
                      await store.dispatch(
                        walletRequestsReducer.updateRequestBySessionId({
                          sessionId: request._id,
                          joinedParties,
                        }),
                      )
                      await waitForSync()
                    }
                  } catch (e) {
                    await transactionSession.rejectSession(GROUP_TRANSACTION_STATUSES.FAILED)
                  }
                }
              }
            } else if (
              joinedPartyState &&
              monitoringRequestsIds[request._id] &&
              !partySessionMessages.length &&
              allSessionMessages.length
            ) {
              // User already joined this request, but session is still not started
              if (walletRequest?.status == GROUP_TRANSACTION_STATUSES.PENDING) {
                const alarmExists = await Browser.alarms.get(alarmName)
                const handlers = await handlersDB.getHandlers()
                const requestHandled = handlers[handlerName]

                if (!alarmExists && !requestHandled) {
                  const pendingParties = request.partiesState.filter((partyState) => partyState.status === 'pending')
                  // const joinedParties = pendingParties.map(partyState => partyState.accountPubKey);
                  const joinedParties = pendingParties.reduce((parties, partyState) => {
                    parties[partyState.accountPubKey] = partyState.status
                    return parties
                  }, {})
                  const approvedPartiesCount = Object.values(joinedParties).filter(
                    (status) => status == 'pending',
                  ).length

                  if (walletRequest.minimumSigAmount >= approvedPartiesCount) {
                    console.log('User already joined this request, but session is still not started')
                    const resolveResult = await transactionSession.resolveSession(partyIsBroadcaster)

                    if (resolveResult?.transactionId) {
                      // Session resolved positively
                      NotifierController.create(
                        'Send funds',
                        `Spend request from wallet  ${formatWalletAddress(request.addressFrom)} is successful`,
                      )
                      await store.dispatch(
                        walletRequestsReducer.updateRequestBySessionId({
                          sessionId: request._id,
                          status: GROUP_TRANSACTION_STATUSES.READY,
                        }),
                      )
                      await waitForSync()
                    } else {
                      // Session resolved negatively
                      NotifierController.create(
                        'Send funds',
                        `Spend from wallet ${formatWalletAddress(request.addressFrom)} has failed.`,
                      )
                      await store.dispatch(
                        walletRequestsReducer.updateRequestBySessionId({
                          sessionId: request._id,
                          status: GROUP_TRANSACTION_STATUSES.FAILED,
                        }),
                      )
                      await waitForSync()
                    }
                  } else {
                    await store.dispatch(
                      walletRequestsReducer.updateRequestBySessionId({
                        sessionId: request._id,
                        joinedParties,
                      }),
                    )
                    await waitForSync()
                  }
                }
              }
            }
          } else if (
            request.status == GROUP_TRANSACTION_STATUSES.PENDING &&
            !joinedPartyState &&
            allSessionMessages.length
          ) {
            // Session has been started without user
            if (!monitoringRequestsIds[request._id]) {
              // We just learned there is a session, but it is too late
              NotifierController.create(
                'Spend request is in process',
                `You cosigners has started a spend request from wallet: ${formatWalletAddress(request.addressFrom)}`,
              )
              await store.dispatch(
                walletRequestsReducer.addMonitoredSessionIds({
                  sessionId: request._id,
                  initiatedAt: request.initiatedAt,
                }),
              )
              await waitForSync()
            }
          } else if (
            request.status == GROUP_TRANSACTION_STATUSES.PENDING &&
            joinedPartyState &&
            partySessionMessages.length &&
            !monitoringRequestsIds[request._id]
          ) {
            // We attempt to recover the ongoing session where user is a part of it
            // We should recover session only if session reached last step (9) from our side. other users may be still on lower step
            await store.dispatch(
              walletRequestsReducer.addMonitoredSessionIds({
                sessionId: request._id,
                initiatedAt: request.initiatedAt,
              }),
            )
            await waitForSync()

            const handlers = await handlersDB.getHandlers()
            const requestHandled = handlers[handlerName]
            const alarmExists = await Browser.alarms.get(alarmName)

            if (walletRequest && !walletRequest.startAutoApproving && !requestHandled && !alarmExists) {
              const lastStep = allSessionMessages.find(
                (state) =>
                  state.partyPubKey == joinedPartyState.partyPubKey &&
                  state.partyState == 'performRound9SignatureSession',
              )

              if (lastStep) {
                const recover = true
                const resolveResult = await transactionSession.resolveSession(partyIsBroadcaster, recover)
                if (resolveResult?.transactionId) {
                  // Session resolved positively
                  NotifierController.create(
                    'Send funds',
                    `Spend request from wallet ${formatWalletAddress(request.addressFrom)} is successful`,
                  )
                  await store.dispatch(
                    walletRequestsReducer.updateRequestBySessionId({
                      sessionId: request._id,
                      state: GROUP_TRANSACTION_STATES.SESSION,
                      status: GROUP_TRANSACTION_STATUSES.READY,
                    }),
                  )
                  await waitForSync()
                } else {
                  // Session resolved negatively
                  NotifierController.create(
                    'Send funds',
                    `Spend from wallet ${formatWalletAddress(request.addressFrom)} has failed.`,
                  )
                  await store.dispatch(
                    walletRequestsReducer.updateRequestBySessionId({
                      sessionId: request._id,
                      state: GROUP_TRANSACTION_STATES.SESSION,
                      status: GROUP_TRANSACTION_STATUSES.FAILED,
                    }),
                  )
                  await waitForSync()
                }
              } else {
                await transactionSession.rejectSession(GROUP_TRANSACTION_STATUSES.FAILED)
              }
            }
          } else if (
            request.status == GROUP_TRANSACTION_STATUSES.REJECTED ||
            request.status == GROUP_TRANSACTION_STATUSES.EXPIRED
          ) {
            // Session has been started but was eventually rejected

            if (walletRequest) {
              if (walletRequest.status == GROUP_TRANSACTION_STATUSES.PENDING && !monitoringRequestsIds[request._id]) {
                // Seems we are recovering session on wallet init
                await transactionSession.rejectSession(GROUP_TRANSACTION_STATUSES.FAILED)
              } else if (monitoringRequestsIds[request._id] && !joinedPartyState) {
                // We just learned there is a session, but it is too late. Perhaps we should just ignore it
                // NotifierController.create('Send funds', `Spend from wallet ${formatWalletAddress(request.addressFrom)} has failed.`);
                // await store.dispatch(walletRequestsReducer.removeMonitoredSessionIds({ sessionId: request._id }));
                // await store.dispatch(walletRequestsReducer.updateRequestBySessionId({
                //   sessionId: request._id,
                //   state: GROUP_TRANSACTION_STATES.SESSION,
                //   status: 'failed'
                // }));
                // await waitForSync();
              }
            } else {
              // This is not our session, we should just ignore it
            }
          } else if (request.status == GROUP_TRANSACTION_STATUSES.READY && monitoringRequestsIds[request._id]) {
            // Session has been started but was eventually successful

            if (!joinedPartyState) {
              // We just learned there is a session, but it is too late
              NotifierController.create(
                'Send funds',
                `Spend request from wallet  ${formatWalletAddress(request.addressFrom)} is successful`,
              )
              await store.dispatch(walletRequestsReducer.removeMonitoredSessionIds({ sessionId: request._id }))
              if (walletRequest) {
                await store.dispatch(
                  walletRequestsReducer.updateRequestBySessionId({
                    sessionId: request._id,
                    state: GROUP_TRANSACTION_STATES.SESSION,
                    transactionId: request.transactionId,
                    status: GROUP_TRANSACTION_STATUSES.READY,
                  }),
                )
              }
              await waitForSync()
            }
          }
        }
      } else {
        console.log('Error: ', `Requests monitoring has failed. Please check your connection or wait a little bit`)
      }
    }
  }

  // (in progress) Refactored
  static async _initNewRequestInStore(
    account: Account,
    remoteRequestData: walletRequestsReducer.IWalletRequest,
    state = GROUP_TRANSACTION_STATES.REQUEST,
    status?: string,
  ) {
    const accountRootPubKey = await account.getRootPubKey()
    const wallet = await this._getWalletOrCreateNew(remoteRequestData, accountRootPubKey)

    if (wallet) {
      let adapter = new Chain(wallet.walletData.blockchain)
      if (
        remoteRequestData.assetType !== CHAIN_ADAPTERS.COIN &&
        remoteRequestData.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE &&
        remoteRequestData.assetType !== CHAIN_ADAPTERS.EVM_SMART_CONTRACT
      ) {
        if (!wallet.walletData.supportedAssets) {
          await wallet.normalizeWalletData()
        }

        let assetData = wallet.walletData.assetsData.find(
          (asset: any) => asset[0].toLowerCase() == remoteRequestData.assetId.toLowerCase(),
        )
        if (!assetData) {
          assetData = await adapter.getAssetData(remoteRequestData.assetId)
          if (!assetData[1]) return // no asset type assigned
          await wallet.addAsset(assetData)
        }
        adapter = adapter.assetAdapter(assetData)
      } else if (remoteRequestData.assetType === CHAIN_ADAPTERS.RAW_SIGNATURE) {
        adapter = adapter.assetAdapter(CHAIN_ADAPTERS.RAW_SIGNATURE)
      } else if (remoteRequestData.assetType === CHAIN_ADAPTERS.EVM_SMART_CONTRACT) {
        adapter = adapter.assetAdapter(CHAIN_ADAPTERS.EVM_SMART_CONTRACT)
      }

      if (
        remoteRequestData.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE &&
        remoteRequestData.assetType !== CHAIN_ADAPTERS.EVM_SMART_CONTRACT
      ) {
        await wallet.updateBalances()
      }

      await adapter.initFromHex(remoteRequestData.transactionHex)

      // let joinedParties = remoteRequestData.partiesState.map(partyState => partyState.accountPubKey);
      const joinedParties = remoteRequestData.partiesState.reduce((parties, partyState) => {
        parties[partyState.accountPubKey] = partyState.status
        return parties
      }, {})

      const transactionSession = new TransactionSession(wallet, remoteRequestData._id, remoteRequestData)

      let localRequestData

      if (remoteRequestData.assetType === CHAIN_ADAPTERS.RAW_SIGNATURE) {
        localRequestData = await transactionSession.appendRawSignTransactionRequest(
          state,
          joinedParties,
          remoteRequestData,
          status,
        )
      } else {
        localRequestData = await transactionSession.appendNewGroupTransactionRequest(
          adapter,
          state,
          joinedParties,
          remoteRequestData,
          status,
        )
      }

      await transactionSession.handleRequestAutoApproval(remoteRequestData, localRequestData, adapter)
    } else {
      throw new Error(`${remoteRequestData.blockchain} wallet with address ${remoteRequestData.addressFrom} is missing`)
    }
  }

  // (in progress) Refactored
  static async executeAutoApprovals() {
    const store = await getStore()
    const {
      walletRequests: { requestsList },
    } = await store.getState()

    const account = await Account.getActiveAccount()
    if (!account) {
      throw Error('Not defined account')
    }
    const accountPubKey = await account.getAccountPubKey()

    const autoApprovalRequests = requestsList.filter(
      (walletRequest: any) => walletRequest.startAutoApproving && walletRequest.accountPubKey === accountPubKey,
    )

    const updateWalletRequestOnFailed = async (sessionId) => {
      await store.dispatch(
        walletRequestsReducer.updateRequestBySessionId({
          sessionId,
          autoApproveProcessStep: 'done',
          autoApproveAt: 0,
        }),
      )

      NotifierController.create('Transaction', 'Transaction has failed')
    }

    for (const walletRequest of autoApprovalRequests) {
      if (await Account.shouldInterceptAccountRoutine(account)) throw new Error(`Intercepting autoapprovals`)

      const wallet = new Wallet(walletRequest.walletId)
      const transactionSession = new TransactionSession(wallet, walletRequest.sessionId, walletRequest)

      if (walletRequest.autoApproveProcessStep == 'pending') {
        const remoteSessionData = await transactionSession.getSessionData()
        if (remoteSessionData.status !== GROUP_TRANSACTION_STATUSES.PENDING) {
          await transactionSession.rejectSession(GROUP_TRANSACTION_STATUSES.FAILED)
          await updateWalletRequestOnFailed(walletRequest.sessionId)
        }
      }

      if (walletRequest.autoApproveAt > 0 && Date.now() >= walletRequest.autoApproveAt) {
        if (walletRequest.autoApproveProcessStep == 'pending') {
          try {
            const partyState = await transactionSession.joinSession()
            if (partyState.status == 'pending') {
              await store.dispatch(
                walletRequestsReducer.updateRequestBySessionId({
                  sessionId: walletRequest.sessionId,
                  autoApproveProcessStep: 'joined',
                }),
              )
            }
          } catch (err) {
            await updateWalletRequestOnFailed(walletRequest.sessionId)
          }
        }

        if (walletRequest.autoApproveProcessStep == 'joined') {
          try {
            const participantsJoined = await transactionSession.checkParticipantsJoinedSession()
            if (participantsJoined) {
              const broadcast = false
              const recover = false
              const asyncFinish = true
              await transactionSession.resolveSession(broadcast, recover, asyncFinish)

              await store.dispatch(
                walletRequestsReducer.updateRequestBySessionId({
                  sessionId: walletRequest.sessionId,
                  autoApproveProcessStep: 'processing',
                }),
              )
            }
          } catch (err) {
            await transactionSession.rejectSession('failed')
            await updateWalletRequestOnFailed(walletRequest.sessionId)
          }
        }

        if (walletRequest.autoApproveProcessStep == 'processing') {
          const broadcast = false
          const result = await transactionSession.recoverSignature(broadcast)

          if (result?.transactionId) {
            await store.dispatch(
              walletRequestsReducer.updateRequestBySessionId({
                sessionId: walletRequest.sessionId,
                autoApproveProcessStep: 'done',
                autoApproveAt: 0,
              }),
            )

            NotifierController.create('Transaction', 'Transaction is successful')
          } else if (result?.error) {
            await updateWalletRequestOnFailed(walletRequest.sessionId)
          } else {
            // signature isn't ready yet
          }
        }
      }
    }
  }

  // (in progress) Refactored
  static async cleanupExpiredTransactionRequests() {
    const timeNow = +Date.now()
    const store = await getStore()

    const {
      walletRequests: { monitoringRequestsIds },
    } = await store.getState()

    for await (const key of Object.keys(monitoringRequestsIds)) {
      if (!monitoringRequestsIds[key] || timeNow > monitoringRequestsIds[key]) {
        await store.dispatch(walletRequestsReducer.removeRequest({ sessionId: key }))
        await store.dispatch(badgeReducer.updateBadge(-1))
        await waitForSync()

        await store.dispatch(walletRequestsReducer.removeMonitoredSessionIds({ sessionId: key }))
        await waitForSync()
      }
    }

    const {
      walletRequests: { requestsList },
    } = await store.getState()

    for await (const requestData of requestsList) {
      if (
        requestData.requestName == WALLET_REQUEST_TYPES.GROUP_TRANSACTION_SESSION &&
        timeNow > requestData.expiresAt
      ) {
        await store.dispatch(walletRequestsReducer.removeRequest({ id: requestData.id }))
        await store.dispatch(badgeReducer.updateBadge(-1))
        await waitForSync()
      }
    }
  }

  // Refactored
  async getSessionData() {
    return await getSignatureSessionDataApi(this.sessionId)
  }

  // Refactored
  async awaitParticipants() {
    let result
    const timeoutAt = Date.now() + 55000 // wait 55 seconds and then new alarm is fired

    while (Date.now() < timeoutAt) {
      try {
        result = await this.checkParticipantsJoinedSession()

        if (result === null) {
          await new Promise((r) => setTimeout(r, 3000)) // wait a bit before next check
        } else {
          return result
        }
      } catch (e) {
        await this.rejectSession('failed')
        return false
      }
    }

    return false
  }

  // Refactored
  async checkParticipantsJoinedSession(sessionData = null) {
    const store = await getStore()

    const {
      walletRequests: { requestsList },
    } = store.getState()
    const localSessionData = requestsList.find((request) => request.sessionId == this.sessionId)

    if (localSessionData) {
      let remoteSessionData
      if (sessionData) {
        remoteSessionData = sessionData
      } else {
        remoteSessionData = await this.getSessionData()
      }

      if (remoteSessionData.status === GROUP_TRANSACTION_STATUSES.PENDING) {
        // const pendingParties = remoteSessionData.partiesState.filter(partyState => partyState.status === 'pending');
        // const updatedJoinedParties = pendingParties.map(partyState => partyState.accountPubKey);
        const joinedParties = remoteSessionData.partiesState.reduce((parties, partyState) => {
          parties[partyState.accountPubKey] = partyState.status
          return parties
        }, {})

        const partiesArrayMatch = JSON.stringify(localSessionData.joinedParties) === JSON.stringify(joinedParties)

        if (!partiesArrayMatch) {
          await store.dispatch(
            walletRequestsReducer.updateRequestBySessionId({
              sessionId: this.sessionId,
              joinedParties,
            }),
          )
          await waitForSync()
        }

        const approvedPartiesCount = Object.values(joinedParties).filter((status) => status == 'pending').length
        if (approvedPartiesCount >= localSessionData.minimumSigAmount) {
          return true
        }
      } else {
        // We should do this somewhere else, not in this method
        // await this.rejectSession(remoteSessionData.status);
        // return false;
        throw new Error('Session is inactive')
      }
    }

    return null
  }

  // Refactored
  async joinSession() {
    const walletData = await this.getWalletData()
    const requestBody = JSON.stringify({ partyId: walletData.partyId })
    const account = await this.getAccount()

    if (!account) {
      throw Error('Not defined account')
    }

    const accountPubKey = await account.getAccountPubKey()
    const authHeaders = await account.authHeaders(requestBody, walletData.path)
    const remoteSessionData = await this.getSessionData()

    const partyState = remoteSessionData.partiesState.find((partyState) => partyState.accountPubKey === accountPubKey)
    if (partyState) return partyState

    if (remoteSessionData.status == GROUP_TRANSACTION_STATUSES.PENDING) {
      const response = await joinSignatureSessionApi(this.sessionId, requestBody, authHeaders)

      if (response.partyState) {
        // Set here alarm
        const alarmName = `resolveTransactionSession:${this.sessionId}:false`
        // this will be executed after 1 minute, each minute, until alarm is cleared after 10 minutes
        Browser.alarms.create(alarmName, { periodInMinutes: 1 })

        const accountPubKey = await account.getAccountPubKey()
        this.requestData = remoteSessionData
        const joinedParties = remoteSessionData.partiesState.reduce((joinedParties, partyState) => {
          joinedParties[partyState.accountPubKey] = partyState.status
          return joinedParties
        }, {})
        joinedParties[accountPubKey] = 'pending'

        const transactionSessionData = {
          state: GROUP_TRANSACTION_STATES.SESSION,
          joinedParties,
        }

        const store = await getStore()
        await store.dispatch(
          walletRequestsReducer.updateRequestBySessionId({
            sessionId: this.sessionId,
            ...transactionSessionData,
          }),
        )
        await waitForSync()
      } else {
        throw new Error(response.error || 'Unknown error')
      }

      return response
    } else {
      const store = await getStore()
      await store.dispatch(
        walletRequestsReducer.updateRequestBySessionId({
          sessionId: this.sessionId,
          state: GROUP_TRANSACTION_STATES.SESSION,
          status: remoteSessionData.status,
        }),
      )
      await waitForSync()

      throw new Error('Session is inactive')
    }
  }

  // Refactored
  async rejectSession(status = GROUP_TRANSACTION_STATUSES.REJECTED) {
    let remoteSessionData = await this.getSessionData()

    if (remoteSessionData.status == GROUP_TRANSACTION_STATUSES.PENDING) {
      const walletData = await this.getWalletData()
      const requestBody = JSON.stringify({ id: this.sessionId, status })
      const account = await this.getAccount()
      if (!account) {
        throw Error('Not defined account')
      }
      const authHeaders = await account.authHeaders(requestBody, walletData.path)
      remoteSessionData = await rejectSignatureSessionApi(this.sessionId, requestBody, authHeaders)
    }

    const store = await getStore()
    await store.dispatch(
      walletRequestsReducer.updateRequestBySessionId({
        sessionId: this.sessionId,
        state: GROUP_TRANSACTION_STATES.SESSION,
        status,
      }),
    )
    await waitForSync()

    Browser.alarms.clear(`resolveTransactionSession:${this.sessionId}:true`)
    Browser.alarms.clear(`resolveTransactionSession:${this.sessionId}:false`)

    return remoteSessionData
  }

  // Refactored
  async resolveSession(broadcast, recover = false, asyncFinish = false) {
    const store = await getStore()
    const {
      walletRequests: { requestsList },
    } = store.getState()

    const handlersDB = new HandlersDB()
    const handlerName = `resolveTransactionSession:${this.sessionId}`

    const handlers = await handlersDB.getHandlers()
    if (handlers[handlerName] && handlers[handlerName] > Date.now()) {
      return null
    }

    await handlersDB.addHandler({ handlerName, lockFor: 60000 })
    await waitForSync()

    const localSessionData = requestsList.find((request) => request.sessionId == this.sessionId)

    if (localSessionData) {
      const account = await this.getAccount()

      if (!account) {
        throw Error('Not defined account')
      }

      const keyManager = new KeyManager(account.data.index)
      const walletData = await this.getWalletData()
      const walletShard = await initWalletShardFromData(keyManager, walletData)

      Browser.alarms.clear(`resolveTransactionSession:${this.sessionId}:true`)
      Browser.alarms.clear(`resolveTransactionSession:${this.sessionId}:false`)

      let resolveResult
      if (recover) {
        resolveResult = await walletShard.recoverSignatureSession(this.sessionId, broadcast)
      } else {
        resolveResult = await walletShard.resolveSignatureSession(this.sessionId, broadcast, asyncFinish)
      }

      const { adapter, sessionData } = resolveResult
      this.requestData = sessionData

      await checkForDappWaitingResults(resolveResult, broadcast)

      if (!resolveResult.async && account) {
        if (resolveResult.transactionId) {
          const { transactionId } = resolveResult
          this.transactionId = transactionId

          if (!walletShard.isDappRequest(sessionData)) {
            const transactionDetails = {
              value: adapter.getSendValue(),
              ticker: adapter.assetTicker(),
              networkFee: adapter.getTotalGasRequired(),
              networkFeeName: adapter.feeName(),
              networkFeeTicker: adapter.feeTicker(),
            }

            const accountActivity = new AccountActivities(account.data.index, account)
            await accountActivity.addNewSpend(this, transactionDetails)
          }

          await store.dispatch(
            walletRequestsReducer.updateRequestBySessionId({
              sessionId: this.sessionId,
              transactionId,
              status: GROUP_TRANSACTION_STATUSES.READY,
            }),
          )
          await waitForSync()
        } else {
          await store.dispatch(
            walletRequestsReducer.updateRequestBySessionId({
              sessionId: this.sessionId,
              status: GROUP_TRANSACTION_STATUSES.FAILED,
            }),
          )
          await waitForSync()
        }
      }

      return resolveResult
    }

    await handlersDB.removeHandler({ handlerName })
    await waitForSync()

    return null
  }

  async recoverSignature(broadcast: boolean) {
    const store = await getStore()
    const {
      walletRequests: { requestsList },
    } = store.getState()

    const localSessionData = requestsList.find((request) => request.sessionId == this.sessionId)

    if (localSessionData) {
      const account = await this.getAccount()

      if (!account) {
        throw Error('Not defined account')
      }

      const keyManager = new KeyManager(account.data.index)
      const walletData = await this.getWalletData()
      const walletShard = await initWalletShardFromData(keyManager, walletData)

      const resolveResult = await walletShard.recoverSignature(this.sessionId, broadcast)

      if (!resolveResult) return null

      await checkForDappWaitingResults(resolveResult, broadcast)

      const { adapter, sessionData } = resolveResult
      this.requestData = sessionData

      if (resolveResult.transactionId) {
        const { transactionId } = resolveResult
        this.transactionId = transactionId

        if (!walletShard.isDappRequest(sessionData)) {
          const transactionDetails = {
            value: adapter.getSendValue(),
            ticker: adapter.assetTicker(),
            networkFee: adapter.getTotalGasRequired(),
            networkFeeTicker: adapter.feeTicker(),
          }

          const accountActivity = new AccountActivities(account.data.index, account)
          await accountActivity.addNewSpend(this, transactionDetails)
        }

        await store.dispatch(
          walletRequestsReducer.updateRequestBySessionId({
            sessionId: this.sessionId,
            transactionId,
            status: GROUP_TRANSACTION_STATUSES.READY,
          }),
        )
        await waitForSync()
      } else {
        await store.dispatch(
          walletRequestsReducer.updateRequestBySessionId({
            sessionId: this.sessionId,
            status: GROUP_TRANSACTION_STATUSES.FAILED,
          }),
        )
        await waitForSync()
      }

      return resolveResult
    }

    return null
  }

  // (in progress) Refactored
  async appendNewGroupTransactionRequest(
    adapter: any,
    state = GROUP_TRANSACTION_STATES.SESSION,
    joinedParties = {},
    remoteRequestData: walletRequestsReducer.IWalletRequest,
    status?: string,
  ) {
    if (!remoteRequestData) remoteRequestData = await this.getSessionData()
    if (!status && remoteRequestData) status = remoteRequestData.status

    const account = await this.getAccount()

    if (!account) {
      throw Error('Not defined account')
    }
    const walletData = await this.getWalletData()
    if (!walletData) {
      throw Error('Not defined walletData')
    }
    const walletPubKey = await account.getPubKeyByPath(walletData.path)
    const accountPubKey = await account.getAccountPubKey()
    const value = adapter.getSendValue()
    const destination = adapter.getDestination()
    const ticker = adapter.assetTicker()
    const networkFee = adapter.getTotalGasRequired()
    const networkFeeTicker = adapter.feeTicker()

    const initiatorPartiesState = remoteRequestData.partiesState.find((partyState) => {
      return partyState.partyPubKey == remoteRequestData.initiatorPubKey
    })

    const localRequestPayload = {
      requestName: WALLET_REQUEST_TYPES.GROUP_TRANSACTION_SESSION,
      requestPath: WALLET_REQUESTS_PATH,
      accountPubKey,

      walletId: this.wallet.walletId,
      sessionId: this.sessionId,
      state,
      status,
      initiatorPubKey: walletPubKey,
      initiatorAccountPubKey: initiatorPartiesState?.accountPubKey,
      blockchain: walletData.blockchain,
      assetType: remoteRequestData.assetType,
      assetId: remoteRequestData.assetId,
      from: walletData.calculatedAddress,
      destination,
      value,
      ticker,
      networkFee,
      networkFeeTicker,

      joinedParties,
      minimumSigAmount: walletData.minimumSigAmount,
      processStep: 0,
      processSteps: 9,
      transactionId: null,
      expiresAt: Date.parse(remoteRequestData.initiatedAt) + remoteRequestData.expiresIn,

      destinationSignedByPubKey: '',
      destinationSignature: '',
      destinationSignatureValid: false,
      startAutoApproving: false,
      autoApproveAt: 0,
      autoApproveProcessStep: 'pending',
    }

    if (remoteRequestData?.destination.toLowerCase() != localRequestPayload.destination.toLowerCase()) {
      // This is possible when destination returned by parsing raw transaction data does not match destination
      // provided in the request data. Something nasty is going on. Reject this spending
    }

    // We verify here that destination signature is valid or not.
    // We do this only if destination signature is provided.
    if (
      typeof remoteRequestData.destinationSignature === 'string' &&
      remoteRequestData.destinationSignature.length > 0 &&
      !remoteRequestData.dealHash
    ) {
      localRequestPayload.destinationSignatureValid = remoteRequestData.destinationSignedByPubKey == accountPubKey
      // const pk = curve.keyFromPublic(remoteRequestData.destinationSignedByPubKey, 'hex');

      const curve = getEC()
      const pubKey_obj = curve.keyFromPublic(remoteRequestData.destinationSignedByPubKey, 'hex')
      const msg_obj = Buffer.from(
        _jsSha.sha256(`${localRequestPayload.blockchain}(${remoteRequestData.destination})`),
        'utf-8',
      )
      localRequestPayload.destinationSignatureValid =
        localRequestPayload.destinationSignatureValid &&
        pubKey_obj.verify(msg_obj, remoteRequestData.destinationSignature)

      if (localRequestPayload.destinationSignatureValid) {
        localRequestPayload.destinationSignature = remoteRequestData.destinationSignature
        localRequestPayload.destinationSignedByPubKey = remoteRequestData.destinationSignedByPubKey
      } else {
        // something nasty is going on. Reject this spending
      }
    }

    const store = await getStore()

    await store.dispatch(walletRequestsReducer.addRequest(localRequestPayload))
    await waitForSync()

    await store.dispatch(badgeReducer.updateBadge(1))
    await waitForSync()

    return localRequestPayload
  }

  // (in progress) Refactored
  async appendRawSignTransactionRequest(
    state = GROUP_TRANSACTION_STATES.SESSION,
    joinedParties = {},
    remoteRequestData: walletRequestsReducer.IWalletRequest,
    status?: string,
  ) {
    if (!remoteRequestData) remoteRequestData = await this.getSessionData()
    if (!status) status = remoteRequestData.status

    const account = await this.getAccount()

    if (!account) {
      throw Error('Not defined account')
    }

    const walletData = await this.getWalletData()
    if (!walletData) {
      throw Error('Not defined walletData')
    }

    const walletPubKey = await account.getPubKeyByPath(walletData.path)
    const accountPubKey = await account.getAccountPubKey()

    const initiatorPartiesState = remoteRequestData.partiesState.find((partyState) => {
      return partyState.partyPubKey == remoteRequestData.initiatorPubKey
    })

    const localRequestPayload: walletRequestsReducer.IWalletRequest = {
      requestName: WALLET_REQUEST_TYPES.GROUP_TRANSACTION_SESSION,
      requestPath: WALLET_REQUESTS_PATH,
      accountPubKey,

      walletId: this.wallet.walletId,
      sessionId: this.sessionId,
      state,
      status,
      initiatorPubKey: walletPubKey,
      initiatorAccountPubKey: initiatorPartiesState.accountPubKey,
      blockchain: walletData.blockchain,
      assetType: remoteRequestData.assetType,
      assetId: remoteRequestData.assetId,
      from: walletData.calculatedAddress,
      rawData: remoteRequestData.rawData ? JSON.parse(remoteRequestData.rawData) : undefined,

      joinedParties,
      minimumSigAmount: walletData.minimumSigAmount,
      processStep: 0,
      processSteps: 9,
      transactionId: '',
      expiresAt: Date.parse(remoteRequestData.initiatedAt) + remoteRequestData.expiresIn,

      destinationSignedByPubKey: '',
      destinationSignature: '',
      destinationSignatureValid: false,
      startAutoApproving: false,
      autoApproveAt: 0,
      autoApproveProcessStep: 'pending',
    }

    if (
      remoteRequestData.destination &&
      localRequestPayload.destination &&
      remoteRequestData.destination.toLowerCase() != localRequestPayload.destination.toLowerCase()
    ) {
      // This is possible when destination returned by parsing raw transaction data does not match destination
      // provided in the request data. Something nasty is going on. Reject this spending
    }

    // We verify here that destination signature is valid or not.
    // We do this only if destination signature is provided.
    if (
      typeof remoteRequestData.destinationSignature === 'string' &&
      remoteRequestData.destinationSignature.length > 0 &&
      !remoteRequestData.dealHash
    ) {
      localRequestPayload.destinationSignatureValid = remoteRequestData.destinationSignedByPubKey == accountPubKey
      // const pk = curve.keyFromPublic(remoteRequestData.destinationSignedByPubKey, 'hex');

      const curve = getEC()
      const pubKey_obj = curve.keyFromPublic(remoteRequestData.destinationSignedByPubKey, 'hex')
      const msg_obj = Buffer.from(
        _jsSha.sha256(`${localRequestPayload.blockchain}(${remoteRequestData.destination})`),
        'utf-8',
      )
      localRequestPayload.destinationSignatureValid =
        localRequestPayload.destinationSignatureValid &&
        pubKey_obj.verify(msg_obj, remoteRequestData.destinationSignature)

      if (localRequestPayload.destinationSignatureValid) {
        localRequestPayload.destinationSignature = remoteRequestData.destinationSignature
        localRequestPayload.destinationSignedByPubKey = remoteRequestData.destinationSignedByPubKey
      } else {
        // something nasty is going on. Reject this spending
      }
    }

    const store = await getStore()

    await store.dispatch(walletRequestsReducer.addRequest(localRequestPayload))
    await waitForSync()

    await store.dispatch(badgeReducer.updateBadge(1))
    await waitForSync()

    return localRequestPayload
  }

  // (in progress) Refactored
  async handleRequestAutoApproval(remoteRequestData, localRequestData, adapter) {
    if (remoteRequestData.dealHash !== undefined) {
      const account = await this.getAccount()

      if (!account) {
        throw Error('Not defined account')
      }
      const accountPubKey = await account.getAccountPubKey()

      const store = await getStore()
      const {
        settings: { autoApproveLimitUSD, autoApproveEnabled, autoApproveTimeoutSeconds },
        currencyRates,
      } = await store.getState()
      const curve = getEC()

      // Validate deal hash
      const allSessions = await TransactionSession.validateDealHash(remoteRequestData, adapter)
      const requestUpdateScope = {
        destinationSignature: '',
        destinationSignedByPubKey: '',
        destinationSignatureValid: false,
        startAutoApproving: false,
        autoApproveAt: 0,
      }

      const opponentSession = allSessions.find((s) => s.hashOrder != remoteRequestData.hashOrder)
      // Validate that we are receiving from and that we are sending funds to our opponent
      if (
        opponentSession &&
        typeof remoteRequestData.destinationSignature === 'string' &&
        remoteRequestData.destinationSignature.length > 0
      ) {
        // They release to our destination
        requestUpdateScope.destinationSignatureValid = opponentSession.destinationSignedByPubKey == accountPubKey

        if (requestUpdateScope.destinationSignatureValid) {
          // Destination our opponent release funds to is signed by us
          let pubKey_obj = curve.keyFromPublic(opponentSession.destinationSignedByPubKey, 'hex')
          let msg_obj = Buffer.from(
            _jsSha.sha256(`${opponentSession.blockchain}(${opponentSession.destination})`),
            'utf-8',
          )
          requestUpdateScope.destinationSignatureValid = pubKey_obj.verify(
            msg_obj,
            opponentSession.destinationSignature,
          )

          if (requestUpdateScope.destinationSignatureValid) {
            // Destination we release to is signed by them
            pubKey_obj = curve.keyFromPublic(remoteRequestData.destinationSignedByPubKey, 'hex')
            msg_obj = Buffer.from(
              _jsSha.sha256(`${remoteRequestData.blockchain}(${remoteRequestData.destination})`),
              'utf-8',
            )
            requestUpdateScope.destinationSignatureValid = pubKey_obj.verify(
              msg_obj,
              remoteRequestData.destinationSignature,
            )

            if (requestUpdateScope.destinationSignatureValid) {
              // If we extract us and our deal opponent, same parties should participate in this swap
              const ourValidatingParties = remoteRequestData.partiesState
                .map((p) => p.accountPubKey)
                .filter((pk) => ![accountPubKey].includes(pk))
              const theirValidatingParties = opponentSession.partiesState
                .map((p) => p.accountPubKey)
                .filter((pk) => ![remoteRequestData.destinationSignedByPubKey].includes(pk))

              requestUpdateScope.destinationSignatureValid =
                ourValidatingParties.toString() == theirValidatingParties.toString()

              if (requestUpdateScope.destinationSignatureValid) {
                requestUpdateScope.destinationSignature = remoteRequestData.destinationSignature
                requestUpdateScope.destinationSignedByPubKey = remoteRequestData.destinationSignedByPubKey

                let requestAmountMinusTolerance
                const ticker = localRequestData.ticker.split(':')[0]
                if (currencyRates.rates[ticker] && !TsWalletShard.isDappRequest(remoteRequestData)) {
                  requestAmountMinusTolerance =
                    (currencyRates.rates[ticker] *
                      adapter.getSendValue() *
                      (100 - AUTOAPROVAL_AMOUNT_TOLERANCE_PERCENT)) /
                    100
                } else {
                  // It is either a test coin or some asset we don't have a currency rate for, but that might be valuable
                  requestAmountMinusTolerance = 0
                }

                const requestAmountCanAutoApprove =
                  requestAmountMinusTolerance &&
                  requestAmountMinusTolerance > 0 &&
                  parseFloat(autoApproveLimitUSD) >= requestAmountMinusTolerance
                requestUpdateScope.startAutoApproving = autoApproveEnabled && requestAmountCanAutoApprove
                requestUpdateScope.autoApproveAt = Date.now() + autoApproveTimeoutSeconds * 1000

                await store.dispatch(
                  walletRequestsReducer.updateRequestBySessionId({
                    sessionId: remoteRequestData._id,
                    ...requestUpdateScope,
                  }),
                )
                await waitForSync()
              }
            }
          }
        }
      }

      if (!requestUpdateScope.destinationSignatureValid) {
        // something nasty is going on. Reject this spending
        await this.rejectSession(GROUP_TRANSACTION_STATUSES.FAILED)
      }
    }
  }

  async getAccount() {
    return await Account.getActiveAccount()
  }

  async getWalletData() {
    return await this.wallet.getWalletData()
  }

  // (in progress) Refactored
  // Helper method
  static async validateDealHash(remoteRequestData: walletRequestsReducer.IWalletRequest, adapter: any) {
    const account = await Account.getActiveAccount()

    if (!account) {
      throw Error('Not defined account')
    }

    const accountRootPubKey = await account.getRootPubKey()
    const wallet = await this._getWalletOrCreateNew(remoteRequestData, accountRootPubKey)

    if (!wallet) {
      throw Error('Not defined wallet')
    }

    const requestBody = JSON.stringify({ dealHash: remoteRequestData.dealHash })
    const authHeaders = await account.authHeaders(requestBody)
    const response = await getSignatureSessionsApi(requestBody, authHeaders)

    if (response.requests) {
      const allSessions = response.requests.filter((s) => s.nonce == remoteRequestData.nonce)
      allSessions.sort((s1, s2) => (s1.hashOrder > s2.hashOrder ? 1 : -1))
      const transactionDataForHash = await allSessions.reduce(async (memo, session) => {
        const result = await memo
        let assetAdapter
        if (remoteRequestData._id == session._id) {
          assetAdapter = adapter
        } else {
          assetAdapter = new Chain(session.blockchain)
          if (session.assetType != CHAIN_ADAPTERS.COIN) {
            let assetData = wallet.walletData.assetsData.find(
              (asset) => asset[0].toLowerCase() == session.assetId.toLowerCase(),
            )
            if (!assetData) {
              assetData = await adapter.getAssetData(session.assetId)
              if (!assetData[1]) return [...result, ''] // asset id seems to be invalid
              await wallet.addAsset(assetData)
            }
            assetAdapter = adapter.assetAdapter(assetData)
          }
          await assetAdapter.initFromHex(session.transactionHex)
        }

        if (TsWalletShard.isDappRequest(session)) {
          return [...result, `Dapp message`]
        }

        return [
          ...result,
          `Send ${assetAdapter.getSendValue()} ${session.assetType}(${session.assetId}) to ${session.blockchain}(${
            session.destination
          })`,
        ]
      }, [])
      transactionDataForHash.push(`nonce ${remoteRequestData.nonce}`)
      const calculatedDealHash = _jsSha.sha256(transactionDataForHash.join(' and '))

      if (calculatedDealHash !== remoteRequestData.dealHash) {
        // something nasty is going on. Reject this spending
        return []
      }

      return allSessions
    } else {
      return []
    }
  }
}

export default TransactionSession
