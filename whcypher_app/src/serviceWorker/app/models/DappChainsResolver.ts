import { Store } from '@reduxjs/toolkit'
import { CHAIN_CONFIGS, EthereumFamilyChains, EVM_CHAINS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import logger from 'src/app/helpers/appLogger'
import { EthereumChain } from 'src/serviceWorker/app/models/EthereumChain'
import { ICustomRPCUrls, NodeUrl, updateCustomRpcUrls } from 'src/serviceWorker/app/store/reducers/settingsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { dispatchWrapper } from '../store/utils/dispatchWrapper'

// [TODO] Remove/Refactor this
interface ChainsStore {
  [BlockchainNames.Ethereum]: EthereumChain
  [BlockchainNames.Avalanche]: EthereumChain
  [BlockchainNames.Polygon]: EthereumChain
  [BlockchainNames.EthereumRopsten]: EthereumChain
  [BlockchainNames.EthereumGoerli]: EthereumChain
  [BlockchainNames.ArbitrumOne]: EthereumChain
  [BlockchainNames.Optimism]: EthereumChain
  [BlockchainNames.BinanceSmartChain]: EthereumChain
}

export class DappChainsResolver {
  chainsStore: ChainsStore
  #store: Store<AppState>

  constructor(store: Store<AppState>) {
    this.#store = store
    this.chainsStore = {} as ChainsStore

    this.initChainsStore()
  }
  /**
   * reload chainsStore
   */
  initChainsStore() {
    const chains = Object.values(EVM_CHAINS) as EthereumFamilyChains[]

    chains.forEach((chain: EthereumFamilyChains) => {
      this.chainsStore[chain] = Object.seal(
        // [TODO] We should create a new EVM chain for each request, rather that storing a bunch of object in memory for each connection
        // [TODO] We should provide here a blockchain descriptor and URL should be deducted withing the model itself
        new EthereumChain(
          {
            jsonRpcProviderUrls: CHAIN_CONFIGS[chain].config.rpcUrl,
            blockchainDescriptor: chain,
          },
          this.#store,
        ),
      )
    })
  }

  /**
   *
   * @param chainType BlockchainNames (chain) eg. bitcoin litecoin...
   * @returns chain controller
   */
  getChainControllerByChain(chainType: EthereumFamilyChains): EthereumChain {
    return this.chainsStore[chainType]
  }

  /**
   * setCustomRpcUrls check new values for customRpcUrls
   * it will check the validity of all URLs, if it fails, throw exception
   * if it succeeds, it will save it in redux and reload the `ChainsController.chainsStore`
   * @param customRpcUrls new value for customRpcUrls
   */
  async setCustomRpcUrls(customRpcUrls: ICustomRPCUrls) {
    await this.checkCustomRpcUrlsValidity(customRpcUrls)

    dispatchWrapper(this.#store, updateCustomRpcUrls(customRpcUrls))

    const chains = Object.keys(this.chainsStore) as EthereumFamilyChains[]

    chains.forEach((chain: EthereumFamilyChains) => {
      this.chainsStore[chain].reloadJsonRpcProvidersUrls()
    })
  }

  /**
   * Check if the customRPCUrls are correct
   * @param customRpcUrls new custom RPC list
   * @returns true if success, throw error if failed
   */
  async checkCustomRpcUrlsValidity(customRpcUrls: ICustomRPCUrls) {
    logger.info({ customRpcUrls })

    for (const chainKey in customRpcUrls) {
      for (const urlType in customRpcUrls[chainKey]) {
        const url = customRpcUrls?.[chainKey]?.[urlType as keyof NodeUrl]
        if (url) {
          logger.info(`Checking customRpcUrlValidity for ${chainKey} ${url}`)

          const ctrl = this.chainsStore[chainKey as EthereumFamilyChains]

          if (!ctrl) throw Error(`Error grabbing controller ${chainKey}`)

          await ctrl.checkCustomRpcUrl(chainKey as BlockchainNames, url)
        }
      }
    }
  }
}
