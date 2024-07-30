import { Store } from '@reduxjs/toolkit'
import * as WAValidator from '@swyftx/api-crypto-address-validator'
import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { getEvmTxData } from '@whalesheaven/chain-service/src/helpers/eth/sign'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ethers } from 'ethers'
import logger from 'src/app/helpers/appLogger'
import { isBlank } from 'src/app/helpers/stringHelper'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { NodeUrl } from '../store/reducers/settingsReducer'
import { AppState } from '../store/store'

const ENS_CONTRACT_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

export interface ABISignature {
  textSignature: ''
}

type IEthereumChainOptions = {
  jsonRpcProviderUrls: NodeUrl
  blockchainDescriptor: BlockchainNames
}

// [TODO] Rename chainId to something that is widely used to name blockchain descriptors, like 'blockchainDescriptor'
export class EthereumChain {
  provider: ethers.providers.StaticJsonRpcProvider
  #store: Store<AppState>
  defaultRpcProvidersUrls: NodeUrl
  jsonRpcProviderUrls: NodeUrl

  blockchainDescriptor: BlockchainNames

  constructor(options: IEthereumChainOptions, store: Store<AppState>) {
    this.#store = store

    this.blockchainDescriptor = options.blockchainDescriptor
    // [TODO] Shall we move RPC url to chain service?
    this.defaultRpcProvidersUrls = options.jsonRpcProviderUrls
    this.jsonRpcProviderUrls = options.jsonRpcProviderUrls

    this.jsonRpcProviderUrls = this.overridesDefaults(options.blockchainDescriptor, this.jsonRpcProviderUrls)

    try {
      const chainIdAsNumber = Number(CHAIN_CONFIGS[options.blockchainDescriptor].config.chainId)
      this.provider = new ethers.providers.StaticJsonRpcProvider(this.jsonRpcProviderUrls.rpc, {
        name: options.blockchainDescriptor,
        chainId: chainIdAsNumber,
        ensAddress: ENS_CONTRACT_ADDRESS,
      })
    } catch (e) {
      this.provider = new ethers.providers.StaticJsonRpcProvider(this.jsonRpcProviderUrls.rpc)
    }
  }
  /**
   * Returns true if the address is valid; else false.
   * @param address address to validate
   * @returns Boolean
   * NOTE: we actually don't need network and to use WAValidator here
   */
  // [TODO] Perhaps we should rely here on adapter's static method.
  static validateAddress(address: string): boolean {
    return WAValidator.validate(address, 'eth', 'prod')
  }

  validateAddress(address: string): boolean {
    return EthereumChain.validateAddress(address)
  }

  public getProvider() {
    return this.provider
  }
  /**
   * overridesDefaults overrides RPC URLS based on the config
   */
  overridesDefaults(chainId: BlockchainNames, defaultUrls: NodeUrl) {
    const {
      settings: { customRPCUrls },
    }: AppState = this.#store.getState()

    if (!isBlank(customRPCUrls?.[chainId]?.rpc)) {
      const jsonRpcProviderUrls = {
        ...defaultUrls,
        ...customRPCUrls[chainId],
      }

      return jsonRpcProviderUrls
    }

    return defaultUrls
  }

  static methodToSignScreen = [
    'personal_sign',
    'eth_sign',
    'eth_signTypedData',
    'eth_signTypedData_v2',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
  ]

  static isSignMessage = (msg: IMessage | string | undefined) => {
    let target = msg
    if (msg && typeof msg === 'string') {
      target = JSON.parse(msg) as IMessage
    }

    target = target as IMessage

    if (!target || !target.raw) return false
    const { method } = target.raw
    return EthereumChain.methodToSignScreen.includes(method)
  }

  getTxData(_dappMessage: IMessage) {
    return getEvmTxData(_dappMessage)
  }

  // Return example
  // {
  // "count": 1,
  // "next": null,
  // "previous": null,
  // "results": [
  //         {
  //             "id": 849620,
  //             "created_at": "2023-01-23T11:58:35.579357Z",
  //             "text_signature": "execute(bytes,bytes[],uint256)",
  //             "hex_signature": "0x3593564c",
  //             "bytes_signature": "5VL"
  //         }
  // ]
  // }
  static getSignatures = (data: string) => {
    return fetch(`https://www.4byte.directory/api/v1/signatures/?hex_signature=${data}`).then((response) =>
      response.json(),
    )
  }

  static decryptParams = (signature: ABISignature, params: any) => {
    const textSignature: string = signature?.textSignature || ''
    const funcType = textSignature?.split('(')[0] || ''
    const originalParams = (textSignature?.split('(')[1]?.split(')')[0] || '').split(',')

    let decodedParams: ethers.utils.Result = []
    try {
      decodedParams = ethers.utils.defaultAbiCoder.decode(originalParams, ethers.utils.hexDataSlice(params.data, 4))
    } catch (e) {
      logger.error({ e })
    }

    return {
      type: funcType,
      params: decodedParams.map((param, idx) => {
        return {
          uid: idx,
          type: originalParams[idx],
          data: EthereumChain.paramToString(param, originalParams[idx]),
        }
      }),
    }
  }

  static paramToString = (param: any, type: string) => {
    switch (type) {
      case 'address':
        return param
      case 'uint256':
        return param.toString()
      case 'address[]':
        return param.join(`\n`)
      default:
        return String(param)
    }
  }

  /**
   * Throw errors if the expected rpc url doesn't return actual chainId
   * @param chain
   * @param network
   * @param url
   */
  // [TODO] shall we remove this?
  async checkCustomRpcUrl(chain: BlockchainNames, url: string) {
    const expectedChainId = CHAIN_CONFIGS[chain].config.chainId
    if (!expectedChainId) {
      throw new Error(`checkCustomRpcUrl not supported for ${chain} `)
    }
    let actualChainId
    try {
      const { chainId } = await new ethers.providers.JsonRpcProvider(url).getNetwork()
      actualChainId = chainId
    } catch (e) {
      throw new Error(`Failed to retrieve chainId for ${url} in ${chain}`)
    }
    if (actualChainId !== Number(expectedChainId)) {
      throw new Error(
        `checkCustomRpcUrl: url ${url} has chainID mismatch with expected ${expectedChainId} and actual ${actualChainId}`,
      )
    }
  }

  reloadJsonRpcProvidersUrls() {
    this.jsonRpcProviderUrls = this.overridesDefaults(this.blockchainDescriptor, this.defaultRpcProvidersUrls)
    this.setProviders()
  }

  setProviders() {
    try {
      const chainIdAsNumber = Number(CHAIN_CONFIGS[this.blockchainDescriptor].config.chainId)
      this.provider = new ethers.providers.StaticJsonRpcProvider(this.jsonRpcProviderUrls.rpc, {
        name: this.blockchainDescriptor,
        chainId: chainIdAsNumber,
      })
    } catch (e) {
      this.provider = new ethers.providers.StaticJsonRpcProvider(this.jsonRpcProviderUrls.rpc)
    }
  }
}
