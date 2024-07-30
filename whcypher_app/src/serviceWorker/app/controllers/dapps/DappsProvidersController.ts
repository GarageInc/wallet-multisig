// Move business logic to approprately called models and methods
import { EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { Store } from 'redux'
import { emitNewChainConfig } from 'src/app/helpers/channels'
import { getDappEthereumChain } from 'src/content/helpers/getDappEthereumChain'
import { setState } from 'src/serviceWorker/app/store/reducers/dappsProviders/dappsProviders'
import {
  IDappsProvidersState,
  IDappsProvidersStateSettings,
} from 'src/serviceWorker/app/store/reducers/dappsProviders/types'
import { AppState } from 'src/serviceWorker/app/store/store'
import { dispatchWrapper } from 'src/serviceWorker/app/store/utils/dispatchWrapper'

import { updateApplicationChain } from '../../store/reducers/applicationReducer'

/**
 * DappsProvidersControllers allows you to manage the different settings of the dApps Providers
 * that are injected into the browsers via Content-Script
 */
// [TODO] Rename this to Web3ProvidersController
class DappsProvidersController {
  #store: Store<AppState>

  constructor(store: Store<AppState>) {
    this.#store = store
  }

  /**
   * Set a new state for the dApps Providers settings
   * And emit config changes to the background processor
   * @param s new state to set
   */
  setDappsProvidersSettings = (s: IDappsProvidersState, chain?: BlockchainNames) => {
    dispatchWrapper(this.#store, setState(s))
    chain && dispatchWrapper(this.#store, updateApplicationChain(chain))

    emitNewChainConfig({
      ethereumProvider: {
        ethereumFamilyChain: getDappEthereumChain(this.#store),
      },
      prioritiseMultisig: s.settings.prioritiseMultisig,
    })
  }

  // By default we are trying to inject our own web3 provider before anybody else
  setWeb3ProviderInjection = (prioritiseMultisig: boolean) => {
    const settings: IDappsProvidersStateSettings = this.#store.getState()?.dappsProviders.settings
    return this.setDappsProvidersSettings({
      settings: {
        ...settings,
        prioritiseMultisig,
      },
    })
  }

  /**
   * @param ethereumChain the new chain that'd be injected into `window.ethereum`
   */
  updateEthereumWeb3Provider = (ethereumChain: EthereumFamilyChains) => {
    const settings = this.#store.getState()?.dappsProviders.settings

    const configs = {
      ...settings,
    }

    this.setDappsProvidersSettings(
      {
        settings: configs,
      },
      ethereumChain,
    )
  }
}

export default DappsProvidersController
