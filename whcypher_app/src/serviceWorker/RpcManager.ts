import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { chainIdToIChainType, EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames, ofEthereumFamily } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ethers } from 'ethers'
import { cloneDeep, isArray, mergeWith } from 'lodash'
import { Store } from 'redux'
import { CHANNELS } from 'src/app/constants/browserChannels'
import { BROWSER_MESSAGES } from 'src/app/constants/browserMessages'
import logger from 'src/app/helpers/appLogger'
import { extensionBroadcast } from 'src/app/helpers/broadcastChannel'
import { REQUEST_ACCOUNTS_RPC } from 'src/content/constants/requestAccountsRpc'
import { ConfigChanges, getConfigChanges } from 'src/content/helpers/getConfigChanges'
import { getDappEthereumChain } from 'src/content/helpers/getDappEthereumChain'
import { getDefaultDappProvider } from 'src/content/helpers/getDefaultDappProvider'
import { getIChainTypeByNetworkId } from 'src/content/helpers/getIChainTypeByNetworkId'
import DAppsController from 'src/serviceWorker/app/controllers/dapps/DAppsController'
import EVMDappMessage from 'src/serviceWorker/app/models/dapp/EVMDappMessage'
import { DappChainsResolver } from 'src/serviceWorker/app/models/DappChainsResolver'
import DappMessageParser from 'src/serviceWorker/app/models/DappMessageParser'
import { IMessage } from 'src/shared/interfaces/interfaces'
import throat from 'throat'
import browser, { Alarms } from 'webextension-polyfill'
import { Runtime } from 'webextension-polyfill'

import { EthereumChain } from './app/models/EthereumChain'
import { purgeExpiredMessages, pushMessage } from './app/store/reducers/dappsMessages/dappsMessages'
import { AppState, getStore } from './app/store/store'
import { isWalletConnected } from './app/store/utils/utils'

// [TODO] It is unclear if we need this or not
const DEV_DOMAIN = 'http://localhost'

enum ALARMS {
  clearExpiredDappMessages = 'clearExpiredDappMessages',
}

class RpcManager {
  #config: ConfigChanges
  dAppsController?: Readonly<DAppsController>
  callbacksToInpage: Map<number, any>

  /**
   * @member #portsForDapp: Record<string, Runtime.Port> - store Port to send back message, because function postMessage can't be stored in redux
   */
  #dappsConnectionPorts: Record<string, Runtime.Port>

  readonly #dappsConnectedPorts: Map<Runtime.Port, Date>

  constructor() {
    this.#dappsConnectionPorts = {}

    this.callbacksToInpage = new Map<number, any>()

    this.#config = {}
    this.#dappsConnectedPorts = new Map<Runtime.Port, Date>()

    // If focus changes from 1 window, we find the active tab on the newly focused window
    browser.windows.onFocusChanged.addListener(() => {
      this.updateCurrentTab()
    })

    browser.tabs.onActivated.addListener(() => {
      this.updateCurrentTab()
    })

    browser.tabs.onUpdated.addListener(() => {
      this.updateCurrentTab()
    })

    // async function are currently broken in runtime.onMessage. They work once, but not more than that.
    // Read more: https://bugs.chromium.org/p/chromium/issues/detail?id=1185241
    browser.runtime.onConnect.addListener(this.handleDappPortConnect)

    browser.runtime.onMessage.addListener(this.handleRpcMessageResults)

    this.subscribeToExtensionChannel()
    /**
     * Initialize the config to be sent to injected provided connecting to
     */
    this.instantiate().then(this.getDefaultConfiguration)

    this.setAlarmsOnStart()
  }

  subscribeToExtensionChannel = () => {
    extensionBroadcast.addEventListener('message', (ev) => {
      const { message, type } = ev.data
      switch (type) {
        case BROWSER_MESSAGES.EMIT_NEW_BG_CONFIGS: {
          const { config } = message
          this.emitChangeConfig({
            configChanges: config,
          })

          break
        }

        case BROWSER_MESSAGES.CONFIRM_CONNECTION: {
          const { messageId, addresses } = message

          this.handleConnectionApproveAndProvideAddressesToDapp(messageId, addresses)

          break
        }

        case BROWSER_MESSAGES.RESPONSE_TO_DAPP: {
          const { dappMessage } = message

          this.handleRpcMessageResults(dappMessage)

          break
        }

        case BROWSER_MESSAGES.REJECT_CONNECTION: {
          this.replyToDappOnConnectionReject(message.requestMessage, message.error)

          break
        }

        case BROWSER_MESSAGES.DISPATCH: {
          getStore().then((store: Store<AppState>) => {
            store.dispatch(message)
          })

          break
        }
        case BROWSER_MESSAGES.UPDATE_ADDRESSES: {
          this.updateAddressesForDApp(message.chainId)

          break
        }
        case BROWSER_MESSAGES.CHECK_DAPP_ACCOUNTS: {
          const { dappMessage, chain } = message

          this.updateAddressesForDApp(chain)

          return this.handleRpcMessageResults(dappMessage)
        }
      }
    })
  }

  instantiate = (): Promise<Store<AppState>> =>
    getStore().then((store: Store<AppState>) => {
      this.dAppsController = new DAppsController(store)

      return store
    })

  handleRpcMessageResults = (message: IMessage) => {
    // [TODO] Double check this works
    if (message?.messageId) {
      const messageId = message.messageId
      const callback = this.callbacksToInpage.get(messageId)

      if (callback) {
        logger.info('/// Callback found for ID ', messageId)
        const unwrappedMessage = message.raw ? message.raw : message
        return callback(null, unwrappedMessage)
      }
    }

    logger.info('/// No callback for message ', message)
    return true
  }

  // [TODO] we can avoid passing store here however, there might be multiple dapps handled by
  // one single serviceWorker. Hence, to avoid a situation when we are simultaneously updating store for different
  // dapps we are passing a single store instance. This could be done in the other way, but will require a lot of
  // testings to make sure no state update collision happening
  handleDappRequestMessage = async (store: Store, message: IMessage, timestamp?: Date) => {
    if (!message.senderUrl) {
      return false
    }

    const { connected: isDAppConnected, addresses } = await this.provideConnectedAddressesToDapp(store, message)

    const shouldProvideAddresses = await this.dAppsController?.handleDappConnectionRequest(
      message,
      timestamp,
      isDAppConnected,
    )

    if (shouldProvideAddresses) {
      this.handleConnectionApproveAndProvideAddressesToDapp(message.messageId, addresses)
    }

    return true
  }

  getConnectedAddressesForDapp = (store: Store<AppState>, chainId: BlockchainNames) => {
    const state: AppState = store.getState()
    const { dappsConnections, currentTab } = state.dapps
    const walletIds = dappsConnections[currentTab.id]?.walletIds || []

    if (!state.application.unlocked) {
      return []
    }

    // [TODO] Rinat wants here to make some refactoring. We will reconsider this method name after that
    return this.dAppsController?.getConnectedWalletsForBlockchain(chainId, walletIds) || []
  }

  provideConnectedAddressesToDapp = async (store: Store<AppState>, message: IMessage) => {
    const dapp = this.dAppsController?.isDAppConnected(message.origin?.url)

    if (!dapp)
      return {
        connected: false,
        addresses: [],
      }

    const addresses: string[] = this.getConnectedAddressesForDapp(store, message.chainId)

    this.dAppsController?.setWindowEthereumChain(message.chainId)

    if (!addresses || (Array.isArray(addresses) && !addresses.length)) {
      return {
        connected: false,
        addresses: [],
      }
    }

    await this.setNewConfigsAndEmit()

    this.handleConnectionApproveAndProvideAddressesToDapp(message.messageId, addresses)

    return { connected: true, addresses }
  }

  _getDappEthereumChain = (store: Store<AppState>) => {
    return getDappEthereumChain(store)
  }

  updateCurrentTab = throat(1, async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
    const window = await browser.windows.get(tab?.windowId || 0)
    if (tab?.id && window.type !== 'popup' && this.dAppsController) {
      this.dAppsController.updateCurrentTabReferenceInStore(tab)

      await this.setNewConfigsAndEmit()
    }
  })

  // [TODO] duplicated method?
  getWalletIdWithMessage =
    (store: Store) =>
    async (_dappMessage: IMessage): Promise<string> => {
      return this.getWalletIdWithMessageWrapper(_dappMessage, store)
    }

  getWalletIdWithMessageWrapper = async (_dappMessage: IMessage, store: Store): Promise<string> => {
    const masterController = new DappMessageParser(store)

    return masterController.getWalletIdWithMessage(_dappMessage)
  }

  get config(): ConfigChanges {
    return this.#config
  }

  set config(configChanges: ConfigChanges) {
    this.#config = configChanges
  }

  getDefaultConfiguration = async (store: Store) => {
    try {
      const state: AppState = store.getState()
      logger.info('in getDefaultConfiguration', state)
      const activeChainType = this._getDappEthereumChain(store)

      this.config = getConfigChanges(activeChainType, state.settings?.customRPCUrls, state?.dappsProviders)
    } catch (e) {
      logger.error('!!! EXTENSION Background: failed to initialize config from state')
      logger.error(e)
    }
  }

  dispatchDefaultConfiguration = (store: Store, port: Runtime.Port) => {
    logger.info('in dispatchDefaultConfiguration')
    this.getDefaultConfiguration(store)

    const config = cloneDeep(this.config)

    const state: AppState = store.getState()
    const wallets = state.wallets.walletsData

    config.initialization = true

    wallets.filter(({ walletId }) => isWalletConnected(walletId, store))

    const addresses: string[] = this.getConnectedAddressesForDapp(
      store,
      config.ethereumProvider?.ethereumFamilyChain || BlockchainNames.Ethereum,
    )

    config.ethereumProvider = {
      ...config.ethereumProvider,
      accounts: addresses,
    }

    logger.info('in dispatchDefaultConfiguration config', config)

    this.config = config

    port.postMessage({
      name: CHANNELS.PROVIDER,
      data: {
        id: 123,
        configChanges: config,
        totalsigMethod: 'EXTENSION_CONFIG_CHANGES',
      },
    })
  }

  // [TODO] can we get this via store and remove this method?
  getActiveTabUrl = async () => {
    const tabs = await browser.tabs.query({
      active: true,
    })
    return tabs[0]?.url
  }

  /**
   * emitChangeConfig' emits the changedConfig (like addition/remove/selection of accounts)
   * to the connected Dapps
   *
   * @param configChanges {ConfigChanges} - Changed Config Object to be emitted
   *
   */
  emitChangeConfig = ({ configChanges, tabId }: { configChanges: ConfigChanges; tabId?: string }) => {
    this.getActiveTabUrl().then((activeTabUrl) => {
      if (activeTabUrl) {
        const activeTabIdHost = new URL(activeTabUrl).hostname
        if (tabId && tabId !== activeTabIdHost) return

        this.config = mergeWith(this.config, configChanges, function (_: any, src: any) {
          return isArray(src) ? src : undefined
        })

        const ports = Array.from(this.#dappsConnectedPorts.entries())
          .map((mVal) => mVal[0])
          .filter((port) => port.name === CHANNELS.CONTENT_SCRIPT)
        ports.forEach((port) => {
          port.postMessage({
            name: CHANNELS.PROVIDER,
            data: {
              id: 123,
              configChanges,
              totalsigMethod: 'EXTENSION_CONFIG_CHANGES',
            },
          })
        })
        const activePort = Array.from(this.#dappsConnectedPorts.entries())
          .map((mVal) => mVal[0])
          .find((port) => {
            if (port?.sender?.tab) {
              const urlHost = new URL(port.sender?.tab?.url ?? DEV_DOMAIN).hostname
              return port.name === CHANNELS.CONTENT_SCRIPT && urlHost === activeTabIdHost
            }
            return false
          })

        if (activePort) {
          activePort.postMessage({
            name: CHANNELS.PROVIDER,
            data: {
              id: 123,
              configChanges,
              totalsigMethod: 'EXTENSION_CONFIG_CHANGES',
            },
          })
        }
      }
    })
  }

  handlePortDisconnect = (port: Runtime.Port) => {
    this.#dappsConnectedPorts.delete(port)
  }

  handleDappPortConnect = (dappPort: Runtime.Port) => {
    if (dappPort?.sender?.frameId && dappPort?.sender?.frameId !== 0) {
      return
    }

    const connectedTimestamp = new Date()
    this.#dappsConnectedPorts.set(dappPort, new Date())

    this.instantiate().then((store) => {
      try {
        this.dispatchDefaultConfiguration(store, dappPort)
      } catch (e) {
        logger.error('!!! Failed to dispatch default configuration to the DApp', e)
      }
    })

    dappPort.onDisconnect.addListener(this.handlePortDisconnect)
    dappPort.onMessage.addListener(this.createDappMessageHandler(dappPort, connectedTimestamp))
  }

  createDappMessageHandler =
    (dappPort: Runtime.Port, connectedTimestamp: Date) => (receivedmessage: any, port: Runtime.Port) => {
      // [TODO] more this to external method. ie handleDappMessage
      const message = receivedmessage.data as IMessage
      message.origin = port?.sender || undefined

      logger.info('/// EXTENSION/Background: Received message', receivedmessage, ' , Port: ', port)

      const setDefaultCallback = () => {
        this.callbacksToInpage.set(message.messageId, (err: Error, resp: any) => {
          logger.info(`EXTENSION callback ${message.raw.method}`, err, resp, dappPort)
          dappPort.postMessage({
            name: CHANNELS.PROVIDER,
            data: resp,
          })
        })
      }

      this.instantiate().then((store: Store<AppState>) => {
        try {
          logger.debug({ message })
          let raw

          let parsedMessage

          logger.info({ config: this.#config })

          if (ofEthereumFamily(message.chainId)) {
            /**
             * Overrides based on current `config` chainId
             */
            if (this.#config.ethereumProvider?.chainId) {
              message.chainId = chainIdToIChainType[this.#config.ethereumProvider?.chainId]
            }

            raw = message.raw as any

            const eVMmessage = EVMDappMessage.from(
              raw,
              message.messageId,
              message.chainId,
              message.time,
              port?.sender?.url,
            )
            eVMmessage.setOrigin(port?.sender)
            parsedMessage = eVMmessage.getParsedMessage()
            eVMmessage.validate(this.getWalletIdWithMessage(store))

            logger.info('ethereum method', message.raw.method)

            switch (message.raw.method) {
              case REQUEST_ACCOUNTS_RPC.request_accounts:
              case REQUEST_ACCOUNTS_RPC.eth_accounts:
              case REQUEST_ACCOUNTS_RPC.eth_requestAccounts: {
                this.#dappsConnectionPorts[message.messageId] = dappPort

                return this.handleDappRequestMessage(store, parsedMessage, connectedTimestamp)
              }

              case 'personal_ecRecover': {
                const { data, sig } = parsedMessage.raw.params
                try {
                  const address = recoverPersonalSignature({
                    data,
                    signature: sig.startsWith('0x') ? sig : `0x${sig}`,
                  })

                  return dappPort.postMessage({
                    name: CHANNELS.PROVIDER,
                    data: {
                      id: message.messageId,
                      result: ethers.utils.getAddress(address).toLowerCase(),
                    },
                  })
                } catch (err) {
                  logger.debug({ err })
                  return null
                }
              }

              case 'eth_signTransaction':
              case 'eth_sendTransaction': {
                setDefaultCallback()
                store.dispatch(pushMessage(parsedMessage))
                this.dAppsController?.openTxSendPopup(parsedMessage)
                return null
              }

              case 'eth_signTypedData':
              case 'eth_sign':
              case 'personal_sign': {
                setDefaultCallback()
                store.dispatch(pushMessage(parsedMessage))
                this.dAppsController?.openSignPopup(parsedMessage)
                return null
              }

              case 'eth_blockNumber':
              case 'eth_getBlockByNumber':
              case 'eth_estimateGas':
              case 'eth_getTransactionByHash': {
                try {
                  const chains = new DappChainsResolver(store)
                  const chainController = chains.getChainControllerByChain(
                    message.chainId as EthereumFamilyChains,
                  ) as EthereumChain

                  if (!chainController) {
                    throw new Error(`Chain ${message.chainId} is not supported`)
                  }

                  return chainController
                    .getProvider()
                    .send(message.raw.method, message.raw.params.params)
                    .then((result) => {
                      dappPort.postMessage({
                        name: CHANNELS.PROVIDER,
                        data: {
                          id: message.messageId,
                          result,
                        },
                      })
                    })
                } catch (e) {
                  return dappPort.postMessage({
                    name: CHANNELS.PROVIDER,
                    data: {
                      messageId: message.messageId,
                      error: e,
                      result: null,
                    },
                  })
                }
              }

              case 'wallet_addEthereumChain':
              case 'wallet_updateEthereumChain':
              case 'wallet_switchEthereumChain': {
                const {
                  application: { currentChain: appCurrentChain },
                  dapps: { currentTab },
                } = store.getState()

                const currentChain = getIChainTypeByNetworkId(
                  Number.parseInt(parsedMessage.raw.params.params[0].chainId),
                ) as EthereumFamilyChains

                if (parsedMessage?.origin?.url) {
                  const host = new URL(parsedMessage?.origin?.url).host

                  if (host !== currentTab.id) {
                    return dappPort.postMessage({
                      name: CHANNELS.PROVIDER,
                      data: {
                        id: message.messageId,
                        result: true,
                      },
                    })
                  }
                }

                if (appCurrentChain === currentChain) {
                  return dappPort.postMessage({
                    name: CHANNELS.PROVIDER,
                    data: {
                      id: message.messageId,
                      result: true,
                    },
                  })
                }

                setDefaultCallback()
                this.dAppsController?.openSwitchChainPopup(parsedMessage)
                store.dispatch(pushMessage(parsedMessage))

                return null
              }
              case 'eth_decrypt': {
                setDefaultCallback()
                // GarageInc | 7.08.2023: implement protocol for checking/receiving common private key
                this.dAppsController?.openNotFoundRpcMethodPopup(parsedMessage)
                store.dispatch(pushMessage(parsedMessage))

                return null
              }

              case 'eth_getEncryptionPublicKey':
                setDefaultCallback()
                // GarageInc | 7.08.2023: implement protocol for checking/receiving common private key
                this.dAppsController?.openGetEncryptionPublicKeyPopup(parsedMessage)
                store.dispatch(pushMessage(parsedMessage))

                return null
              case 'wallet_watchAsset': {
                store.dispatch(pushMessage(parsedMessage))
                this.dAppsController?.openAddAssetPopup(parsedMessage)

                return dappPort.postMessage({
                  name: CHANNELS.PROVIDER,
                  data: {
                    id: message.messageId,
                    result: true,
                  },
                })
              }

              case 'wallet_getPermissions': {
                return dappPort.postMessage({
                  name: CHANNELS.PROVIDER,
                  data: {
                    id: message.messageId,
                    result: [],
                  },
                })
              }

              case 'wallet_requestPermissions': {
                setDefaultCallback()
                this.dAppsController?.openRequestPermissionsPopup(parsedMessage)
                store.dispatch(pushMessage(parsedMessage))

                return null
              }

              default:
                logger.info('EXTENSION Background: default message handler')

                return dappPort.postMessage({
                  name: CHANNELS.PROVIDER,
                  data: {
                    messageId: message.messageId,
                    error: `EXTENSION method ${message.raw.method} is not supported`,
                    result: null,
                  },
                })
            }
          } else {
            // pass
          }
        } catch (e) {
          logger.warn('Caught error receiving a message', e)
          return dappPort.postMessage({
            name: CHANNELS.PROVIDER,
            data: {
              messageId: message.messageId,
              error: `EXTENSION error: ${e}`,
              result: null,
            },
          })
        }
      })
    }

  /**
   * send message on confirm and pop connect dapp
   */
  handleConnectionApproveAndProvideAddressesToDapp = (messageId: number, addresses: string[]) => {
    const portToSend = this.#dappsConnectionPorts[messageId]
    if (this.#dappsConnectionPorts[messageId]) {
      this.#dappsConnectionPorts[messageId].onDisconnect.addListener((port: Runtime.Port) => {
        port.disconnect()
      })
      portToSend.postMessage({
        name: CHANNELS.PROVIDER,
        data: {
          id: messageId,
          name: 'result',
          jsonrpc: '2.0',
          result: addresses,
        },
      })
    }
  }

  /**
   * send message on reject and pop connect dapp
   */
  replyToDappOnConnectionReject = (messageId: number, error: any) => {
    const portToSend = this.#dappsConnectionPorts[messageId]
    if (portToSend) {
      try {
        portToSend.postMessage({
          name: CHANNELS.PROVIDER,
          data: {
            id: messageId,
            error,
          },
        })
      } catch (err) {
        logger.error('Failed to clear', { err })
      }
    }
  }

  /**
   * Set Alarms when extension is first installed
   * These alarms once set, will never be cleared
   */
  setAlarmsOnStart = async () => {
    try {
      browser.alarms.create(ALARMS.clearExpiredDappMessages, {
        periodInMinutes: 10,
      })

      browser.alarms.onAlarm.addListener(this.handleAlarms)
    } catch (err) {
      logger.error('Failed to clear & create alarms', { err })
    }
  }

  handleAlarms = (alarm: Alarms.Alarm) => {
    const name = alarm.name
    logger.debug(`handleAlarms::${alarm.name}`)

    switch (name) {
      case ALARMS.clearExpiredDappMessages: {
        this.clearExpiredMessages()
        return
      }

      default:
        logger.warn(`handleAlarms: not handled ${name}`)
    }
  }

  clearExpiredMessages = async () => {
    const store = await this.instantiate()

    const ms10Min = 30 * 60 * 1000
    const now = new Date()

    store.dispatch(
      purgeExpiredMessages({
        beforeDate: now.getTime() - ms10Min,
      }),
    )
  }

  setNewConfigsAndEmit = async () => {
    const store = await this.instantiate()

    const state = store.getState()
    const currentTab = state.dapps.currentTab
    const chainType = this._getDappEthereumChain(store)

    this.dAppsController?.setWindowEthereumChain(chainType)

    const configChanges = getConfigChanges(chainType, state.settings.customRPCUrls, getDefaultDappProvider(this.config))

    this.emitChangeConfig({ configChanges, tabId: currentTab.id })
  }

  /**
   * send a signal message with updated chain and network info
   *
   * @param chainId {string} - updated chain id
   */
  updateAddressesForDApp = (chainId: EthereumFamilyChains) => {
    this.instantiate().then((store: Store<AppState>) => {
      const state: AppState = store.getState()
      const { dappsConnections, currentTab } = state.dapps

      const connectedWalletIds = dappsConnections[currentTab.id]?.walletIds || []

      const addresses: string[] | undefined = this.dAppsController?.getConnectedWalletsForBlockchain(
        chainId,
        connectedWalletIds,
      )

      if (!ofEthereumFamily(chainId) && !Array.isArray(addresses)) return

      this.dAppsController?.setWindowEthereumChain(chainId)

      const configChanges = getConfigChanges(
        chainId,
        state.settings.customRPCUrls,
        getDefaultDappProvider(this.config as ConfigChanges),
        addresses,
      )

      this.emitChangeConfig({ configChanges, tabId: currentTab.id })
    })
  }
}

export default RpcManager
