import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import Browser from 'webextension-polyfill'

import { INIT_MULTISIG_SESSION_PATH } from '../../../app/constants/paths'
import { USER_REQUEST_TYPES } from '../../../app/constants/requestTypes'
import { SUPPORTED_PROTOCOLS } from '../lib/constants/protocols'
import TsWalletShard from '../lib/TsWalletShard'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as multisigSessionsReducer from '../store/reducers/multisigSessionsReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import { IPartiesState, IWalletRequest } from '../store/reducers/walletRequestsReducer'
import { IWalletData } from '../store/reducers/walletsReducer'
import { getStore } from '../store/store'
import { getVaultSessionApi } from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'
import AccountActivities from './AccountActivities'
import KeyManager from './KeyManager'
import Wallet from './Wallet'

class MultisigSession {
  sessionId: string
  constructor(sessionId: string) {
    this.sessionId = sessionId
  }

  // Refactored
  static async initSession(blockchain: BlockchainNames, minimumSigAmount: number, partiesAmount: number, path: string) {
    if (minimumSigAmount < 2 || minimumSigAmount > 16) {
      throw new Error(`Minimum approvals should be between 2 and 16`)
    }

    if (partiesAmount < minimumSigAmount) {
      throw new Error(`Lowest participants count should equal to minimum approvals`)
    }

    if (partiesAmount > 16) {
      throw new Error(`Participants count can't be greater than 16`)
    }

    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account')

    const accountPubKey = await account.getAccountPubKey()
    const keyManager = await account.getKeyManager()
    const protocolVersion = SUPPORTED_PROTOCOLS.SECP256K1_V2

    const walletShard = new TsWalletShard(
      keyManager,
      blockchain,
      minimumSigAmount,
      partiesAmount,
      path,
      protocolVersion,
    )
    const response = await walletShard.initSession()

    if (response.sessionId) {
      // Set here alarm
      const alarmName = `resolveMultisigSession:${response.sessionId}`

      // this will be executed after 1 minute, each minute, until alarm is cleared after 10 minutes
      Browser.alarms.create(alarmName, { periodInMinutes: 1 })

      const { sessionId } = response
      const multisigSessionData = {
        status: 'pending',
        joined: 1,
        joinedSequence: 1,
        joinedParties: [accountPubKey],
        minimumSigAmount,
        partiesAmount,
        blockchain,
        protocolVersion,
        path,
        step: 0,
        expiresAt: Date.parse(response.initiatedAt) + response.expiresIn,
      }

      const requestData = {
        requestName: USER_REQUEST_TYPES.CREATE_NEW_WALLET,
        requestPath: INIT_MULTISIG_SESSION_PATH,
        step: 'session',
        sessionId: response.sessionId,
        accountPubKey,
      }

      const store = await getStore()
      await store.dispatch(multisigSessionsReducer.newSession({ sessionId, session: multisigSessionData }))
      await waitForSync()

      await store.dispatch(requestsReducer.addRequest(requestData))
      await waitForSync()

      await store.dispatch(badgeReducer.updateBadge(1))
      await waitForSync()
    } else {
      throw new Error(response.error || 'Unknown error')
    }

    return response
  }

  // Refactored
  async getSessionData() {
    return await getVaultSessionApi(this.sessionId)
  }

  // Refactored
  async joinSession(path: string) {
    const account = await Account.getActiveAccount()
    if (!account) throw new Error('No active account')

    const accountPubKey = await account.getAccountPubKey()

    const keyManager = new KeyManager(account.data.index)

    const { blockchain, minimumSigAmount, partiesAmount, protocolVersion } = await this.getSessionData()
    const walletShard = new TsWalletShard(
      keyManager,
      blockchain,
      minimumSigAmount,
      partiesAmount,
      path,
      protocolVersion,
      this.sessionId,
    )

    let response = await walletShard.joinSession(this.sessionId)

    if (response.partyState) {
      const { partyState } = response
      const remoteSessionData: IWalletRequest = await this.getSessionData()

      if (remoteSessionData.status == 'pending') {
        // Set here resolve alarm
        console.log('Scheduled resolve')
        const resolveAlertName = `resolveMultisigSession:${this.sessionId}`
        // this will be executed after 1 minute, each minute, until alarm is cleared after 10 minutes
        Browser.alarms.create(resolveAlertName, { periodInMinutes: 1 })

        const joinedParties = remoteSessionData.partiesState.map((partyState) => partyState.accountPubKey)

        const multisigSessionData = {
          status: 'pending',
          joined: remoteSessionData.partiesState.length,
          joinedSequence: partyState.sequence,
          joinedParties,
          minimumSigAmount,
          partiesAmount,
          blockchain,
          protocolVersion,
          path,
          creationStep: 0,
          expiresAt: Date.parse(remoteSessionData.initiatedAt) + remoteSessionData.expiresIn,
        }

        const requestData = {
          requestName: USER_REQUEST_TYPES.CREATE_NEW_WALLET,
          requestPath: INIT_MULTISIG_SESSION_PATH,
          step: 'session',
          sessionId: this.sessionId,
          accountPubKey,
        }

        const store = await getStore()
        await store.dispatch(
          multisigSessionsReducer.newSession({
            sessionId: this.sessionId,
            session: multisigSessionData,
          }),
        )
        await waitForSync()

        await store.dispatch(requestsReducer.addRequest(requestData))
        await waitForSync()

        await store.dispatch(badgeReducer.updateBadge(1))
        await waitForSync()

        response = remoteSessionData
      } else {
        throw new Error("Can't join inactive session")
      }
    } else {
      throw new Error(response.error || 'Unknown error')
    }

    return response
  }

  // Refactored
  async awaitParticipants() {
    const store = await getStore()
    const timeoutAt = Date.now() + 55000 // wait 55 seconds and then new alarm is fired
    let currentJoinedParties: string[] = []

    while (Date.now() < timeoutAt) {
      const { multisigSessions } = store.getState()

      const localSessionData = this.sessionId ? multisigSessions.sessions[this.sessionId] : {}

      if (localSessionData) {
        if (localSessionData.status !== 'pending') return false

        const isSessionExpired = !localSessionData?.expiresAt || Date.now() > localSessionData.expiresAt

        if (!isSessionExpired) {
          const remoteSessionData: IWalletRequest = await this.getSessionData()
          const pendingParties = remoteSessionData.partiesState.filter((partyState) => partyState.status === 'pending')
          const updatedJoinedParties = pendingParties.map((partyState) => partyState.accountPubKey)

          const partiesArrayMatch =
            JSON.stringify([...currentJoinedParties].sort()) === JSON.stringify([...updatedJoinedParties].sort())

          if (!partiesArrayMatch) {
            await store.dispatch(
              multisigSessionsReducer.updateJoinedParties({
                sessionId: this.sessionId,
                joinedParties: updatedJoinedParties,
              }),
            )
            currentJoinedParties = updatedJoinedParties
          }

          if (remoteSessionData.partiesAmount == currentJoinedParties.length) return true
        } else {
          throw new Error('Session has expired')
        }
      }

      await new Promise((r) => setTimeout(r, 3000)) // wait a bit before next check
    }

    return false
  }

  // Refactored
  async resolveSession() {
    const store = await getStore()
    const { multisigSessions } = store.getState()
    const localSessionData = this.sessionId ? multisigSessions.sessions[this.sessionId] : {}

    if (localSessionData) {
      const account = await Account.getActiveAccount()
      if (!account) throw new Error('No active account')
      const keyManager = new KeyManager(account.data.index)

      const walletShard = new TsWalletShard(
        keyManager,
        localSessionData.blockchain,
        localSessionData.minimumSigAmount,
        localSessionData.partiesAmount,
        localSessionData.path,
        localSessionData.protocolVersion,
        this.sessionId,
        localSessionData.joinedSequence,
      )

      const resolveResult: {
        calculatedAddress?: string
        sessionData: IWalletRequest
      } = await walletShard.resolveMultisigSession()

      if (resolveResult.calculatedAddress) {
        const { calculatedAddress, sessionData } = resolveResult
        const wallet = await Wallet.appendWalletShard(walletShard, account)
        const joinedParties = sessionData.partiesState.map(({ accountPubKey } = {} as IPartiesState) => accountPubKey)

        const sessionDetails: IWalletData = {
          blockchain: localSessionData.blockchain,
          calculatedAddress: resolveResult.calculatedAddress,
          minimumSigAmount: localSessionData.minimumSigAmount,
          partiesAmount: localSessionData.partiesAmount,
          joinedParties,
        }

        const accountActivity = new AccountActivities(account.data.index, account)
        await accountActivity.addNewWallet(sessionDetails)

        if (wallet) {
          await store.dispatch(
            multisigSessionsReducer.setAddress({
              sessionId: this.sessionId,
              address: calculatedAddress,
            }),
          )
          await waitForSync()

          await store.dispatch(multisigSessionsReducer.updateStatus({ sessionId: this.sessionId, status: 'ready' }))
          await waitForSync()
        } else {
          // TODO handle failure here
        }
      } else {
        await store.dispatch(multisigSessionsReducer.updateStatus({ sessionId: this.sessionId, status: 'failed' }))
        await waitForSync()
      }

      Browser.alarms.clear(`resolveMultisigSession:${this.sessionId}`)
      return resolveResult
    }

    return null
  }

  // Refactored
  async rejectSession() {
    const store = await getStore()
    const { multisigSessions } = store.getState()
    const account = await Account.getActiveAccount()
    if (!account) throw new Error('No active account')

    const localSessionData = this.sessionId ? multisigSessions.sessions[this.sessionId] : {}

    if (localSessionData) {
      const keyManager = new KeyManager(account.data.index)

      const walletShard = new TsWalletShard(
        keyManager,
        localSessionData.blockchain,
        localSessionData.minimumSigAmount,
        localSessionData.partiesAmount,
        localSessionData.path,
        localSessionData.protocolVersion,
        this.sessionId,
      )

      await store.dispatch(multisigSessionsReducer.updateStatus({ sessionId: this.sessionId, status: 'failed' }))
      await waitForSync()

      await walletShard._rejectVaultSession(this.sessionId)
    } else {
      Browser.alarms.clear(`resolveMultisigSession:${this.sessionId}`)
    }
  }
}

export default MultisigSession
