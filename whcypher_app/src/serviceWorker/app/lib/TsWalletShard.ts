/* eslint-disable no-unused-vars */
import { Chain, supportedBlockchains } from '@whalesheaven/chain-service'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { encodeBson } from '@whalesheaven/chain-service/src/helpers/bson/utils'
import { getEvmTxData } from '@whalesheaven/chain-service/src/helpers/eth/sign'
import * as paillierBigint from 'paillier-bigint'
import { ISpendData } from 'src/app/pages/WalletPage/hooks'

import KeyManager from '../models/KeyManager'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import { IWalletData } from '../store/reducers/walletsReducer'
import {
  confirmSignatureSessionApi,
  confirmVaultSessionApi,
  getSignatureSessionDataApi,
  getVaultSessionApi,
  initTransactionSignatureApi,
  initVaultSessionApi,
  joinSignatureSessionApi,
  joinVaultSessionApi,
  rejectSignatureSessionApi,
  rejectVaultSessionApi,
  updateSignatureSessionApi,
  updateVaultSessionApi,
} from '../utils/api'
import { SUPPORTED_PROTOCOLS } from './constants/protocols'
import SignatureSessionHandlerV1 from './threshold-ecdsa/handlers/SignatureSessionHandler'
import VaultSessionHandlerV1 from './threshold-ecdsa/handlers/VaultSessionHandler'
import SignatureSessionHandlerV2 from './threshold-ecdsa-v2/handlers/SignatureSessionHandler'
import VaultSessionHandlerV2 from './threshold-ecdsa-v2/handlers/VaultSessionHandler'

const TEN_MINUTES = 600000

const pairedSessionTimeout = 600000 // ms
const singleSessionTimeout = 300000 // ms
const recheckInterval = 500 // ms
const stepTimeout = 60000 // ms

/**
 * @typedef {Object} Profile
 * The following properties are needed when creating message
 * @property {number} index - the account index
 * @property {string} cypherId - the cypherId of the account
 * @property {string} masterKey -  the master key of the account
 */

/**
 * A class to handle all MPC secp256k1 sessions
 * @param {KeyStore} keyStore - the secret key for threshold wallet generation
 * @class
 */
class TsWalletShard {
  keyManager: KeyManager
  blockchain: string
  minimumSigAmount: any
  partiesAmount: any
  path: any
  sessionId: string
  partyId: number | null
  protocolVersion: string | null
  vault: any
  chainAdapter: null
  tsKeyShare: null
  vaultSessionHandler: null
  signatureSessionHandler: null
  calculatedPubKey: null
  calculatedAddress: null
  paillierPubKeys: {}
  supportedAssets: never[]
  participants: never[]
  assetsData: never[]
  balances: never[]

  constructor(
    keyManager: KeyManager,
    blockchain: any,
    minimumSigAmount: any,
    partiesAmount: any,
    path: any,
    protocolVersion: string,
    sessionId: string | null = null,
    partyId = null,
  ) {
    this.keyManager = keyManager
    this.blockchain = blockchain
    this.minimumSigAmount = minimumSigAmount
    this.partiesAmount = partiesAmount
    this.path = path
    this.sessionId = sessionId
    this.partyId = partyId
    this.protocolVersion = protocolVersion

    this.vault = keyManager.vault
    this.chainAdapter = null

    this.tsKeyShare = null
    this.vaultSessionHandler = null
    this.signatureSessionHandler = null
    this.calculatedPubKey = null
    this.calculatedAddress = null
    this.paillierPubKeys = {}
    this.supportedAssets = []
    this.participants = []
    this.assetsData = []

    this.balances = []
  }

  static isDappRequest(requestData: walletRequestsReducer.IWalletRequest) {
    return (
      requestData.assetType === CHAIN_ADAPTERS.RAW_SIGNATURE ||
      requestData.assetType === CHAIN_ADAPTERS.EVM_SMART_CONTRACT
    )
  }

  isDappRequest(requestData: walletRequestsReducer.IWalletRequest) {
    return TsWalletShard.isDappRequest(requestData)
  }

  // TODO forbid this method from running if vault has already been initiated
  // Refactored
  async initSession() {
    const requestBody = JSON.stringify({
      blockchain: this.blockchain,
      minimumSigAmount: this.minimumSigAmount,
      partiesAmount: this.partiesAmount,
      protocolVersion: this.protocolVersion,
      expiresIn: 300000, // 5 minutes
    })
    const authHeaders = await this._authHeaders(requestBody)

    let response
    try {
      response = await initVaultSessionApi(requestBody, authHeaders)
    } catch (e) {
      console.log('Error while init session: ', e)
      throw new Error(`Failed to init wallet session: ${e.message}`)
    }

    if (response.sessionId) {
      this.partyId = 1
      this.sessionId = response.sessionId
    } else {
      if (response.error) {
        throw new Error(response.error)
      } else {
        throw new Error('Unknown error')
      }
    }

    return response
  }

  // Refactored
  async getSessionData() {
    return await getVaultSessionApi(this.sessionId)
  }

  // Refactored
  async joinSession(sessionId: string) {
    const requestBody = JSON.stringify({ id: sessionId, status: 'join' })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await joinVaultSessionApi(sessionId, requestBody, authHeaders)

    if (response.partyState) {
      this.partyId = parseInt(response.partyState.sequence)
      this.sessionId = sessionId
    } else {
      if (response.error) {
        throw new Error(response.error)
      } else {
        throw new Error('Unknown error')
      }
    }

    return response
  }

  // Refactored
  async resolveMultisigSession() {
    // Everybody are in. Start vault generation
    let vaultSessionResponse

    try {
      vaultSessionResponse = await this.getSessionData()

      if (!this.tsKeyShare) await this.generateThresholdKeyShare(this.protocolVersion)
      this.calculatedPubKey = await this.vaultSessionHandler.resolveMultisigSession()

      if (!this.chainAdapter) this.chainAdapter = new Chain(this.blockchain)
      this.calculatedAddress = this.chainAdapter.getAddress(this.calculatedPubKey)
      this.supportedAssets = await this.getBlockchainSupportedAssets()
      vaultSessionResponse = await this.getSessionData()
      this.participants = vaultSessionResponse.partiesState.map(({ accountPubKey } = {}) => accountPubKey)
      // await this.vault.appendTsVault(this);
      await this._confirmVaultSession(this.sessionId)

      return { calculatedAddress: this.calculatedAddress, sessionData: vaultSessionResponse }
    } catch (err) {
      await this._rejectVaultSession(this.sessionId)
      return { error: 'Wallet generation failed', sessionData: vaultSessionResponse }
    }
  }

  // Refactored
  async getBlockchainSupportedAssets() {
    return this.chainAdapter.supportedAssets()
  }

  // Refactored
  async initTransactionSignature(assetData: any[], spendData: ISpendData, feeData: { manualFee: any; feeRate: any }) {
    try {
      const { assetId, assetType, destination, value, sendAll } = spendData

      let adapter
      if (assetType == CHAIN_ADAPTERS.COIN) {
        adapter = this.chainAdapter
      } else {
        if (assetData[0]) {
          adapter = this.chainAdapter.assetAdapter(assetData)
        } else {
          return {
            response: { error: { general: 'Missing data for provided asset' } },
          }
        }
      }

      const addressPattern = await this.chainAdapter.addressPattern()
      const addressPatternRegExp = new RegExp(addressPattern)
      if (!addressPatternRegExp.test(destination)) {
        return {
          response: { error: { general: 'Destination is invalid' } },
        }
      }

      let transactionConfig

      if (sendAll) {
        transactionConfig = {
          from: this.calculatedAddress,
          txnOuts: [{ to: destination }],
          sendAll,
        }
      } else {
        transactionConfig = {
          from: this.calculatedAddress,
          txnOuts: [{ to: destination, value: parseFloat(value) }],
          sendAll,
        }
      }

      if (feeData.manualFee) {
        const feeParams = (({ feeRate, manualFee, ...p }) => p)(feeData)
        transactionConfig = { ...transactionConfig, ...feeParams }
      } else {
        transactionConfig = { ...transactionConfig, feeRate: feeData.feeRate }
      }

      if (supportedBlockchains.ofBitcoinFamily(this.blockchain)) {
        if (!sendAll) {
          transactionConfig.txnIns = await this.chainAdapter.listUnSpent(this.calculatedAddress, parseFloat(value))
        } else {
          transactionConfig.txnIns = await this.chainAdapter.listUnSpent(this.calculatedAddress, 0) // Get all UTXOs
        }
      }

      const transactionHex = await adapter.init(transactionConfig)
      const fundsAreReady = await adapter.isFundsReady()

      if (fundsAreReady) {
        const requestBody = JSON.stringify({
          blockchain: this.blockchain,
          assetId,
          assetType,
          addressFrom: this.calculatedAddress,
          destination,
          minimumSigAmount: this.minimumSigAmount,
          partiesAmount: this.partiesAmount,
          partyId: this.partyId,
          transactionHex,
          protocolVersion: this.protocolVersion,
          expiresIn: 600000, // 10 minutes
        })

        const authHeaders = await this._authHeaders(requestBody)
        const response = await initTransactionSignatureApi(requestBody, authHeaders)
        return { response, adapter }
      }
      return {
        response: {
          error: { value: 'Not enough funds for this request' },
        },
        adapter,
      }
    } catch (err) {
      let error
      if (err === 'Insufficient funds') {
        error = { value: 'Not enough funds for this request' }
      } else {
        error = { general: 'Something went wrong. Please try again.' }
      }
      return {
        response: {
          error,
        },
      }
    }
  }

  // Refactored
  // [TODO] Perhaps, we can unite rawData and txData. Should check this
  async initDappTransactionSignature(rawData: any, feeData: { manualFee: any; feeRate: any }) {
    try {
      const adapter = this.chainAdapter.assetAdapter(CHAIN_ADAPTERS.EVM_SMART_CONTRACT)

      const txData = getEvmTxData(rawData)

      let transactionConfig = { ...txData }

      if (feeData.manualFee) {
        const feeParams = (({ feeRate, manualFee, ...p }) => p)(feeData)
        transactionConfig = { ...transactionConfig, ...feeParams }
      } else {
        transactionConfig = { ...transactionConfig, feeRate: feeData.feeRate }
      }

      const transactionHex = await adapter.init(transactionConfig, txData)
      const fundsAreReady = await adapter.isFundsReady()

      if (fundsAreReady) {
        const requestBody = JSON.stringify({
          blockchain: this.blockchain,
          rawData: rawData ? JSON.stringify(rawData) : '',
          assetType: CHAIN_ADAPTERS.EVM_SMART_CONTRACT,
          assetId: '-',
          destination: txData.toAddress,
          addressFrom: this.calculatedAddress,
          minimumSigAmount: this.minimumSigAmount,
          partiesAmount: this.partiesAmount,
          partyId: this.partyId,
          transactionHex,
          protocolVersion: this.protocolVersion,
          expiresIn: 600000, // 10 minutes
        })

        const authHeaders = await this._authHeaders(requestBody)
        const response = await initTransactionSignatureApi(requestBody, authHeaders)
        return { response, adapter }
      }
      return {
        response: {
          error: { value: 'Not enough funds for this request' },
        },
        adapter,
      }
    } catch (err) {
      let error
      if (err === 'Insufficient funds') {
        error = { value: 'Not enough funds for this request' }
      } else {
        error = { general: 'Something went wrong. Please try again.' }
      }
      return {
        response: {
          error,
        },
      }
    }
  }

  async initRawMsgSignature(rawData: any) {
    try {
      const requestBody = JSON.stringify({
        blockchain: this.blockchain,
        rawData: rawData ? JSON.stringify(rawData) : '',
        assetType: CHAIN_ADAPTERS.RAW_SIGNATURE,
        assetId: '-',
        destination: '-',
        transactionHex: encodeBson(rawData),
        addressFrom: this.calculatedAddress,
        minimumSigAmount: this.minimumSigAmount,
        partiesAmount: this.partiesAmount,
        partyId: this.partyId,
        protocolVersion: this.protocolVersion,
        expiresIn: TEN_MINUTES, // 10 minutes
      })

      const authHeaders = await this._authHeaders(requestBody)
      const response = await initTransactionSignatureApi(requestBody, authHeaders)

      return { response }
    } catch (err) {
      let error
      // [TODO] This is impossible situation
      if (err === 'Insufficient funds') {
        error = { value: 'Not enough funds for this request' }
      } else {
        error = { general: 'Something went wrong. Please try again.' }
      }
      return {
        response: {
          error,
        },
      }
    }
  }

  // Refactored
  async joinSignatureSession(sessionId: null) {
    const requestBody = JSON.stringify({ partyId: this.partyId })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await joinSignatureSessionApi(sessionId, requestBody, authHeaders)

    if (response.partyState) {
      this.partyId = parseInt(response.partyState.sequence)
      this.sessionId = sessionId
    }

    return response
  }

  // Refactored
  async getSignatureSessionData(sessionId: any) {
    return await getSignatureSessionDataApi(sessionId)
  }

  // [TODO] Perhaps we should rename this getAdapterForAssetType
  getCorrectAdapterForRequest(signatureSessionResponse: { assetType: string; assetId: string }) {
    let adapter = new Chain(this.blockchain)

    // [TODO] IF we rename this methods, we should rename them here as well
    if (
      signatureSessionResponse.assetType !== CHAIN_ADAPTERS.RAW_SIGNATURE &&
      signatureSessionResponse.assetType !== CHAIN_ADAPTERS.EVM_SMART_CONTRACT &&
      signatureSessionResponse.assetType !== CHAIN_ADAPTERS.COIN
    ) {
      const assetData = this.assetsData.find(
        (asset) => asset[0].toLowerCase() == signatureSessionResponse.assetId.toLowerCase(),
      )
      adapter = adapter.assetAdapter(assetData)
    } else if (signatureSessionResponse.assetType === CHAIN_ADAPTERS.RAW_SIGNATURE) {
      adapter = adapter.assetAdapter(CHAIN_ADAPTERS.RAW_SIGNATURE)
    } else if (signatureSessionResponse.assetType === CHAIN_ADAPTERS.EVM_SMART_CONTRACT) {
      adapter = adapter.assetAdapter(CHAIN_ADAPTERS.EVM_SMART_CONTRACT)
    }

    return adapter
  }

  // Refactored
  async resolveSignatureSession(sessionId: any, broadcast: any, asyncFinish = false) {
    // Everybody are in. Start signature generation
    let adapter, signatureSessionResponse: any

    try {
      signatureSessionResponse = await this.getSignatureSessionData(sessionId)

      // [TODO] Perhaps, this is a good place to be refactored, according to a proposed serialize/deserialize adapter logic
      adapter = this.getCorrectAdapterForRequest(signatureSessionResponse)

      await adapter.initFromHex(signatureSessionResponse.transactionHex)
      await this.signatureSessionHandler.initSignatureData(sessionId, signatureSessionResponse, adapter)
      await this.signatureSessionHandler.resolveSignatureSession()

      if (!asyncFinish) {
        const { signatureAll } = await this.signatureSessionHandler.performLastRoundSyncronous(signatureSessionResponse)

        const validSignatures = await adapter.verifySignature(signatureAll, this.calculatedPubKey)

        if (validSignatures) {
          await adapter.setSignature(signatureAll, this.calculatedPubKey)

          if (this.isDappRequest(signatureSessionResponse)) {
            await this._confirmSignatureSession(sessionId, adapter.getTxnId())
          } else {
            const transactionHex = await adapter.serializeTransaction(true)
            if (broadcast) {
              await adapter.sendTransaction(transactionHex, (receipt: { complete: any }) => {
                if (!receipt.complete) this._confirmSignatureSession(sessionId, adapter.getTxnId())
              })
            } else {
              await this._confirmSignatureSession(sessionId, adapter.getTxnId())
            }
          }
          return {
            transactionId: adapter.getTxnId(),
            adapter,
            sessionData: signatureSessionResponse,
          }
        }
        await this._rejectSignatureSession(sessionId)
      } else {
        await this.signatureSessionHandler.performLastRoundAsyncronous(signatureSessionResponse)
        return { async: true, adapter, sessionData: signatureSessionResponse }
      }
    } catch (err) {
      console.log('resolveSignatureSession error: ', err)
      await this._rejectSignatureSession(sessionId)
      return {
        error: 'Transaction signature failed',
        adapter,
        sessionData: signatureSessionResponse,
      }
    }
  }

  // Refactored
  async recoverSignatureSession(sessionId: any, broadcast: any) {
    // Everybody are in. Start signature generation
    let adapter = new Chain(this.blockchain)
    let signatureSessionResponse

    let timeoutAt = Date.now()

    try {
      signatureSessionResponse = await this.getSignatureSessionData(sessionId)

      if (signatureSessionResponse.dealHash) {
        timeoutAt += pairedSessionTimeout
      } else {
        timeoutAt += singleSessionTimeout
      }

      // [TODO] Perhaps, this is a good place to be refactored, according to a proposed serialize/deserialize adapter logic
      adapter = this.getCorrectAdapterForRequest(signatureSessionResponse)

      await adapter.initFromHex(signatureSessionResponse.transactionHex)
      await this.signatureSessionHandler.initSignatureData(sessionId, signatureSessionResponse, adapter)
      const { signatureAll } = await this.signatureSessionHandler.recoverSignatureSession()

      const validSignatures = await adapter.verifySignature(signatureAll, this.calculatedPubKey)

      if (validSignatures && this.isDappRequest(signatureSessionResponse)) {
        const txnId = adapter.getTxnId()
        await adapter.setSignature(signatureAll, this.calculatedPubKey)
        await this._confirmSignatureSession(sessionId, txnId)

        return {
          transactionId: txnId,
          adapter,
          sessionData: signatureSessionResponse,
        }
      }

      if (validSignatures) {
        await adapter.setSignature(signatureAll, this.calculatedPubKey)
        const transactionHex = await adapter.serializeTransaction(true)
        if (broadcast) {
          await adapter.sendTransaction(transactionHex, (receipt: { complete: any }) => {
            if (!receipt.complete) this._confirmSignatureSession(sessionId, adapter.getTxnId())
          })
        } else {
          await this._confirmSignatureSession(sessionId, adapter.getTxnId())
        }
        return {
          transactionId: adapter.getTxnId(),
          adapter,
          sessionData: signatureSessionResponse,
        }
      }
    } catch (err) {
      await this._rejectSignatureSession(sessionId)
      return {
        error: 'Transaction signature failed',
        adapter,
        sessionData: signatureSessionResponse,
      }
    }

    await this._rejectSignatureSession(sessionId)
    return {
      error: 'Transaction signature failed',
      adapter,
      sessionData: signatureSessionResponse,
    }
  }

  // Refactored
  async recoverSignature(sessionId: any, broadcast: any) {
    let adapter: any
    let signatureSessionResponse: walletRequestsReducer.IWalletRequest

    try {
      signatureSessionResponse = await this.getSignatureSessionData(sessionId)

      // [TODO] Perhaps, this is a good place to be refactored, according to a proposed serialize/deserialize adapter logic
      adapter = this.getCorrectAdapterForRequest(signatureSessionResponse)

      await adapter.initFromHex(signatureSessionResponse.transactionHex)
      await this.signatureSessionHandler.initSignatureData(sessionId, signatureSessionResponse, adapter)
      const { signatureAll } = await this.signatureSessionHandler.recoverSignature()

      const validSignatures = await adapter.verifySignature(signatureAll, this.calculatedPubKey)

      if (validSignatures && this.isDappRequest(signatureSessionResponse)) {
        const txnId = adapter.getTxnId()
        await adapter.setSignature(signatureAll, this.calculatedPubKey)

        await this._confirmSignatureSession(sessionId, txnId)

        return {
          transactionId: txnId,
          adapter,
          sessionData: signatureSessionResponse,
        }
      }

      if (validSignatures) {
        await adapter.setSignature(signatureAll, this.calculatedPubKey)
        if (broadcast) {
          const transactionHex = await adapter.serializeTransaction(true)
          await adapter.sendTransaction(transactionHex, (receipt: { complete: any }) => {
            if (!receipt.complete) this._confirmSignatureSession(sessionId, adapter.getTxnId())
          })
        } else {
          await this._confirmSignatureSession(sessionId, adapter.getTxnId())
        }

        return {
          transactionId: adapter.getTxnId(),
          adapter,
          sessionData: signatureSessionResponse,
        }
      }
    } catch (err) {
      await this._rejectSignatureSession(sessionId)
      return {
        error: 'Transaction signature failed',
        adapter,
        sessionData: signatureSessionResponse,
      }
    }

    return {
      error: 'Transaction signature failed',
      adapter,
      sessionData: signatureSessionResponse,
    }
  }

  // Refactored
  async generateThresholdKeyShare(protocolVersion: string) {
    if (protocolVersion == SUPPORTED_PROTOCOLS.SECP256K1_V1) {
      this.vaultSessionHandler = new VaultSessionHandlerV1(this)
      this.tsKeyShare = await this.vaultSessionHandler.generateThresholdKeyShare()
    } else if (protocolVersion == SUPPORTED_PROTOCOLS.SECP256K1_V2) {
      this.vaultSessionHandler = new VaultSessionHandlerV2(this)
      this.tsKeyShare = await this.vaultSessionHandler.generateThresholdKeyShare()
    }

    return this.tsKeyShare
  }

  async initThresholdKeyShareFromData(tsVaultData: { secretsEncrypted: any }) {
    if (this.protocolVersion == SUPPORTED_PROTOCOLS.SECP256K1_V2) {
      this.signatureSessionHandler = new SignatureSessionHandlerV2(this)
      this.tsKeyShare = await this.signatureSessionHandler.initThresholdKeyShareFromData(tsVaultData)
    } else {
      this.signatureSessionHandler = new SignatureSessionHandlerV1(this)
      this.tsKeyShare = await this.signatureSessionHandler.initThresholdKeyShareFromData(tsVaultData)
    }

    return this.tsKeyShare
  }

  // Refactored
  async _updateVaultSession(sessionId: null, roundName: string, message: any, toParty = null) {
    const newState = {
      state: [
        {
          round: roundName,
          message: JSON.stringify(
            message,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
          ),
        },
      ],
    }

    if (typeof toParty === 'number') newState.state[0].toParty = toParty

    const requestBody = JSON.stringify(newState)
    const authHeaders = await this._authHeaders(requestBody)
    const response = await updateVaultSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _confirmVaultSession(sessionId: null) {
    const requestBody = JSON.stringify({ id: sessionId, status: 'confirm' })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await confirmVaultSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _rejectVaultSession(sessionId: null | string) {
    const requestBody = JSON.stringify({ id: sessionId, status: 'reject' })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await rejectVaultSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _updateSignatureSession(sessionId: any, roundName: string, messages: string | any[], toParty = null) {
    const newSessionState: { state: any[] } = {
      state: [],
    }

    for (let i = 0; i < messages.length; i++) {
      const newSubsessionState: any = {
        round: roundName,
        subsessionId: i,
        message: JSON.stringify(messages[i], (key, value) => (typeof value === 'bigint' ? value.toString() : value)),
      }

      if (typeof toParty === 'number') newSubsessionState.toParty = toParty

      newSessionState.state.push(newSubsessionState)
    }

    const requestBody = JSON.stringify(newSessionState)
    const authHeaders = await this._authHeaders(requestBody)
    const response = await updateSignatureSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _confirmSignatureSession(sessionId: any, transactionId: any) {
    const requestBody = JSON.stringify({ id: sessionId, status: 'confirm', transactionId })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await confirmSignatureSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _rejectSignatureSession(sessionId: any) {
    const requestBody = JSON.stringify({ id: sessionId, status: 'reject' })
    const authHeaders = await this._authHeaders(requestBody)
    const response = await rejectSignatureSessionApi(sessionId, requestBody, authHeaders)
    return response
  }

  // Refactored
  async _authHeaders(requestBody: string) {
    return await this.keyManager.authHeaders(requestBody, this.path)
  }
}

// Refactored
export const joinVaultSession = async function (account: any, sessionId: any, path: any) {
  const vaultData = await getVaultSessionApi(sessionId)

  const validVersions = Object.values(SUPPORTED_PROTOCOLS)
  if (!validVersions.includes(vaultData.protocolVersion.toString())) {
    return [null, { error: 'Unknown protocol version. Please make sure your wallet version is up to date.' }]
  }

  // [TODO] Show deprecation warning if user joins older version
  const vault = new TsWalletShard(
    account,
    vaultData.blockchain,
    vaultData.minimumSigAmount,
    vaultData.partiesAmount,
    path,
    vaultData.protocolVersion,
  )
  const response = await vault.joinSession(sessionId)
  return [vault, response]
}

// Refactored
export const initWalletShardFromData = async (keyManager: KeyManager, walletData: IWalletData) => {
  const walletShard = new TsWalletShard(
    keyManager,
    walletData.blockchain,
    walletData.minimumSigAmount,
    walletData.partiesAmount,
    walletData.path,
    walletData.protocolVersion || SUPPORTED_PROTOCOLS.SECP256K1_V1, // we rely here on default protocol version of existing wallet keys
    walletData.sessionId,
    walletData.partyId,
  )

  const paillierPubKeys = {}

  for (const index in walletData.paillierPubKeys) {
    const ek_n = BigInt(walletData.paillierPubKeys[index].n)
    paillierPubKeys[index] = new paillierBigint.PublicKey(ek_n, ek_n + 1n)
  }

  walletShard.calculatedPubKey = walletData.calculatedPubKey
  walletShard.chainAdapter = new Chain(walletShard.blockchain)
  walletShard.calculatedAddress = walletShard.chainAdapter.getAddress(walletShard.calculatedPubKey)
  walletShard.paillierPubKeys = paillierPubKeys
  walletShard.supportedAssets = await walletShard.getBlockchainSupportedAssets()
  walletShard.participants = walletData.participants
  if (walletShard.supportedAssets.length > 0) walletShard.assetsData = walletData.assetsData
  await walletShard.initThresholdKeyShareFromData(walletData)
  return walletShard
}

export default TsWalletShard
