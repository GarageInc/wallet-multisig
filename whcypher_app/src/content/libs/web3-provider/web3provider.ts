/* eslint-disable @typescript-eslint/no-var-requires */
import HttpConnection from '@walletconnect/http-connection'
import { IJsonRpcRequest, IJsonRpcResponseSuccess } from '@walletconnect/types'
import { parsePersonalSign, payloadId, signingMethods } from '@walletconnect/utils'
import { ethErrors, serializeError } from 'eth-rpc-errors'
import util from 'util'

import { EIP712Subprovider } from './eip712subprovider'

const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters')
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const SubscriptionsSubprovider = require('web3-provider-engine/subproviders/subscriptions')
const SanitizingSubprovider = require('web3-provider-engine/subproviders/sanitizer')

const ERROR_504 = `Gateway timeout. The request took too long to process. This can happen when querying logs over too wide a block range.`

export type IMsgParams = {
  readonly from: string
  readonly data: string
}
export interface IRPCMap {
  [chainId: number]: string
}

export type ITotalSigWeb3ProviderOptions = {
  chainId: number
  infuraId?: string
  isMetaMask: boolean
  isDebug?: boolean
  pollingInterval?: number
  rpc?: IRPCMap
  readonly hookedFunctions: {
    readonly getAccounts: (cb: any) => void
    // readonly processMessage: (msgParams: IMsgParams, cb: any) => void;
    readonly processPersonalMessage: (msgParams: IMsgParams, cb: any) => void
    readonly processSignTransaction: (txParams: any, cb: any) => void
    readonly processTransaction: (txParams: any, cb: any) => void
    readonly processTypedMessage: (msgParams: IMsgParams, cb: any) => void
    readonly processPersonalEcRecover: (payload: any, cb: any) => void
    readonly updateEthereumChain: (payload: any, cb: any) => void
    readonly addEthereumChain: (payload: any, cb: any) => void
    readonly watchAsset: (payload: any, cb: any) => void
    readonly walletRequestPermissions: (payload: any, cb: any) => void
    readonly decrypt: (payload: any, cb: any) => void
    readonly getEncryptionPublicKey: (payload: any, cb: any) => void
  }
}

export class TotalSigWeb3Provider extends ProviderEngine {
  constructor(opts: ITotalSigWeb3ProviderOptions) {
    super({ pollingInterval: opts.pollingInterval || 60000 })
    this.config = opts
    this.rpc = opts.rpc || null
    if (!this.rpc && (!opts.infuraId || typeof opts.infuraId !== 'string' || !opts.infuraId.trim())) {
      throw new Error('Missing one of the required parameters: rpc or infuraId')
    }
    this.infuraId = opts.infuraId || ''
    this.chainId = typeof opts.chainId !== 'undefined' ? opts.chainId : 1
    this.networkId = this.chainId

    this.updateRpcUrl(this.chainId)

    this.addProvider(
      new FixtureSubprovider({
        eth_hashrate: '0x00',
        eth_mining: false,
        eth_syncing: true,
        net_listening: true,
        web3_clientVersion: `TotalSig/v1.x.x/javascript`,
      }),
    )

    this.addProvider(new CacheSubprovider())
    this.addProvider(new SubscriptionsSubprovider())
    this.addProvider(new FilterSubprovider())
    this.addProvider(new NonceSubprovider())
    this.addProvider({
      handleRequest: async (payload: IJsonRpcRequest, _next: any, end: any) => {
        try {
          switch (payload.method) {
            case 'wallet_getPermissions':
            case 'wallet_requestPermissions': {
              return this.config.hookedFunctions.walletRequestPermissions(payload, end)
            }
            case 'wallet_addEthereumChain':
              return this.config.hookedFunctions.addEthereumChain(payload, end)
            case 'wallet_updateEthereumChain':
            case 'wallet_switchEthereumChain':
              return this.config.hookedFunctions.updateEthereumChain(payload, end)
            case 'wallet_watchAsset':
              return this.config.hookedFunctions.watchAsset(payload, end)
            case 'eth_decrypt':
              return this.config.hookedFunctions.decrypt(payload, end)
            case 'eth_getEncryptionPublicKey':
              return this.config.hookedFunctions.getEncryptionPublicKey(payload, end)
            default:
              return _next()
          }
        } catch (error) {
          end(error)
        }
      },
      setEngine: (_: any) => _,
    })
    this.addProvider(new SanitizingSubprovider())

    this.addProvider(new EIP712Subprovider())

    this.addProvider({
      handleRequest: async (payload: IJsonRpcRequest, _next: any, end: any) => {
        try {
          switch (payload.method) {
            case 'personal_sign':
              const message = payload.params[0]
              const address = payload.params[1]
              const extraParams = payload.params[2] || {}
              const msgParams = {
                from: address,
                data: message,
                extraParams,
              }
              return this.config.hookedFunctions.processPersonalMessage(msgParams, end)
            default:
              return _next()
          }
        } catch (error) {
          end(error)
        }
      },
      setEngine: (_: any) => _,
    })

    this.addProvider(
      new HookedWalletSubprovider({
        getAccounts: this.config.hookedFunctions.getAccounts,
        processMessage: this.config.hookedFunctions.processPersonalMessage,
        processPersonalMessage: this.config.hookedFunctions.processPersonalMessage,
        signTransaction: this.config.hookedFunctions.processSignTransaction,
        processTransaction: this.config.hookedFunctions.processTransaction,
        processTypedMessage: this.config.hookedFunctions.processTypedMessage,
        recoverPersonalSignature: this.config.hookedFunctions.processPersonalEcRecover,
      }),
    )

    this.addProvider({
      handleRequest: async (payload: IJsonRpcRequest, _next: any, end: any) => {
        try {
          const { result } = await this.handleRequest(payload)
          end(null, result)
        } catch (error) {
          end(error)
        }
      },
      setEngine: (_: any) => _,
    })

    this.getaccounts = util.promisify(this.config.hookedFunctions.getAccounts)
    this.isDebug = opts.isDebug || false
    this.isMetaMask = typeof opts.isMetaMask === 'undefined' ? false : opts.isMetaMask
    this.isTotalSig = !this.isMetaMask
  }

  isConnected() {
    return true
  }

  get _metamask() {
    return this.isMetaMask
  }

  get networkVersion() {
    return this.networkId
  }

  // Connect with a wallet and return the addresses of all available
  // accounts.
  async enable(): Promise<string[]> {
    if (this.isDebug) {
      console.log('enable()')
    }

    return this.handleAccounts()
  }

  eth_accounts(): string[] {
    if (this.isDebug) {
      console.log('eth_accounts()')
    }
    return this.accounts
  }

  eth_getBalance(_address: string): number {
    if (this.isDebug) {
      console.log('eth_getBalance()')
    }
    return 0
  }

  request = async (payload: any): Promise<any> => {
    if (this.isDebug) {
      console.log('request(p, c?)', payload)
    }

    if (!payload.params) {
      payload.params = []
    }

    return this.sendRequest(payload)
  }

  async sendRequest(payload: any, callback?: any): Promise<any> {
    if (this.isDebug) {
      console.log('sendRequest(p, c)', payload, callback)
    }
    // Web3 1.0 beta.38 (and above) calls `send` with method and parameters
    if (typeof payload === 'string') {
      const method = payload
      let params = callback
      // maintaining the previous behavior where personal_sign could be non-hex string
      if (method === 'personal_sign') {
        params = parsePersonalSign(params)
      }

      return this.sendAsyncPromise(method, params)
    }

    // ensure payload includes id and jsonrpc
    payload = { id: payloadId(), jsonrpc: '2.0', ...payload }

    // maintaining the previous behavior where personal_sign could be non-hex string
    if (payload.method === 'personal_sign') {
      payload.params = parsePersonalSign(payload.params)
    }

    // Web3 1.0 beta.37 (and below) uses `send` with a callback for async queries
    if (callback) {
      this.sendAsync(payload, callback)
      return
    }

    return this.sendAsyncPromise(payload.method, payload.params)
  }

  // this is due some dApps making sync requests and web3engineProvider on suuports async
  // web3-provider-engine/index.js L114
  async send(payload: any, callback?: any): Promise<any> {
    return this.sendRequest(payload, callback)
  }

  onConnect(callback: any) {
    if (this.isDebug) {
      console.log('onConnect(c)', callback)
    }
    this.connectCallbacks.push(callback)
  }

  triggerConnect(result: any) {
    if (this.isDebug) {
      console.log('triggerConnect(r)', result)
    }
    if (this.connectCallbacks && this.connectCallbacks.length) {
      this.connectCallbacks.forEach((callback: any) => callback(result))
    }
  }

  async disconnect() {
    this.close()
  }

  private handleAccounts = async () => {
    if (this.accounts.length) {
      return this.accounts
    }
    this.accounts = await this.getaccounts()
    return this.accounts
  }

  async handleRequest(payload: any) {
    if (this.isDebug) {
      console.log('handleRequest(p)', payload)
    }
    try {
      let response
      let result: any = null
      switch (payload.method) {
        case 'eth_accounts':
        case 'request_accounts':
        case 'eth_requestAccounts': {
          result = await this.handleAccounts()
          break
        }
        case 'eth_coinbase':
          result = (await this.getaccounts())[0] || this.accounts[0]
          break
        case 'eth_chainId':
          result = `0x${this.chainId.toString(16)}`
          break
        case 'net_version':
          result = this.networkId || this.chainId
          break
        case 'eth_uninstallFilter':
          this.sendAsync(payload, (_: any) => _)
          result = true
          break
        default:
          response = await this.handleOtherRequests(payload)
      }
      if (response) {
        return response
      }
      return this.formatResponse(payload, result)
    } catch (error) {
      const errWithCodes = Object.assign(new Error(), error)

      this.emit('error', errWithCodes)
      throw errWithCodes
    }
  }

  async handleOtherRequests(payload: any): Promise<IJsonRpcResponseSuccess> {
    if (this.isDebug) {
      console.log('handleOtherRequests(p)', payload)
    }
    if (!signingMethods.includes(payload.method) && payload.method.startsWith('eth_')) {
      return this.handleReadRequests(payload)
    }

    throw Error(`TotalSig doesn't handle request ${payload.method}`)
    // const wc = await this.getWalletConnector();
    // const result = await wc.sendCustomRequest(payload);
    // return this.formatResponse(payload, result);
  }

  async handleReadRequests(payload: any): Promise<IJsonRpcResponseSuccess> {
    if (this.isDebug) {
      console.log('handleReadRequests(p)', payload)
    }
    if (!this.http) {
      const error = new Error('HTTP Connection not available')
      this.emit('error', error)
      throw error
    }
    return this.http.send(payload)
  }

  formatResponse(payload: any, result: any) {
    return {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result,
    }
  }

  async onDisconnect() {
    // tslint:disable-next-line:await-promise
    // await this.stop();
    this.emit('close', 1000, 'Connection closed')
    this.emit('disconnect', 1000, 'Connection disconnected')
  }

  async updateState(sessionParams: any) {
    if (this.isDebug) {
      console.log('updateState(s)', sessionParams)
    }
    const { accounts, chainId, networkId, rpcUrl } = sessionParams
    // Check if accounts changed and trigger event
    if (accounts && this.accounts !== accounts) {
      this.accounts = accounts
      this.emit('accountsChanged', this.accounts)
    }
    // Check if chainId changed and trigger event
    if (chainId && this.chainId !== chainId) {
      this.chainId = chainId
      this.emit('chainChanged', `0x${chainId.toString(16)}`)

      this.networkId = chainId
      this.emit('networkChanged', this.networkId)
    }
    // Check if networkId changed and trigger event
    if (networkId && this.networkId !== networkId) {
      this.networkId = networkId
      this.emit('networkChanged', this.networkId)
    }
    // Handle rpcUrl update
    this.updateRpcUrl(this.chainId, rpcUrl || '')
  }

  updateRpcUrl(chainId: number, rpcUrl = '') {
    const infuraNetworks: any = {
      1: 'mainnet',
      3: 'ropsten',
      4: 'rinkeby',
      5: 'goerli',
      42: 'kovan',
    }
    const network = infuraNetworks[chainId]
    if (!rpcUrl) {
      if (this.rpc && this.rpc[chainId]) {
        rpcUrl = this.rpc[chainId]
      } else if (network) {
        rpcUrl = `https://${network}.infura.io/v3/${this.infuraId}`
      }
    }
    if (rpcUrl) {
      // Update rpcUrl
      this.rpcUrl = rpcUrl
      // Handle http update
      this.updateHttpConnection()
    } else {
      this.emit('error', new Error(`No RPC Url available for chainId: ${chainId}`))
    }
  }

  updateHttpConnection() {
    if (this.rpcUrl) {
      this.http = new HttpConnection(this.rpcUrl)
      this.http.on('payload', (payload: any) => this.emit('payload', payload))
      this.http.on('error', (error: Error) => this.emit('error', error))
    }
  }

  sendAsyncPromise(method: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sendAsync(
        {
          id: payloadId(),
          jsonrpc: '2.0',
          method,
          params: params || [],
        },
        (err: any, res: any) => {
          if (err) {
            const errorCode = err.code || err.statusCode
            switch (errorCode) {
              case 405:
                return reject(ethErrors.rpc.methodNotFound())
              case 504: // Gateway timeout
                return (function () {
                  const err = new Error(ERROR_504)
                  return reject(serializeError(err))
                })()
              case 429: // Too many requests (rate limiting)
                return (function () {
                  const err = new Error(`Too Many Requests`)
                  return reject(serializeError(err))
                })()
              default:
                return reject(err)
            }
          }

          const errorInResult = res && res.error

          if (errorInResult)
            return reject(
              serializeError(errorInResult, {
                fallbackError: errorInResult,
              }),
            )

          return resolve(res.result)
        },
      )
    })
  }
}

export default TotalSigWeb3Provider
