// Move business logic to approprately called models and methods
import { Store } from '@reduxjs/toolkit'
import { EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames, ofEthereumFamily } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { POPUP_URLS } from 'src/app/constants/paths'
import { updateWalletBalances } from 'src/app/helpers/backgroundMethods'
import { confirmConnection, responseToDapp, updateAddressesForDApp } from 'src/app/helpers/channels'
import { getDappEthereumChain } from 'src/content/helpers/getDappEthereumChain'
import Popup from 'src/serviceWorker/app/models/Popup'
import Wallet from 'src/serviceWorker/app/models/Wallet'
import {
  addDApp,
  addWalletToDApp,
  changeCurrentTab,
  removeWalletFromDApp,
  resetCurrentTab,
} from 'src/serviceWorker/app/store/reducers/dapps/dapps'
import {
  addRequestedDAppConnect,
  removeRequestDappConnect,
} from 'src/serviceWorker/app/store/reducers/dappsConnect/dappsConnect'
import {
  pushMessage,
  removeMessageById,
  resetMessages,
  setConnectMsg,
  setConnectMsgTime,
  setRejectedMsg,
  setRejectedMsgTime,
} from 'src/serviceWorker/app/store/reducers/dappsMessages/dappsMessages'
import { appendWallet, IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'
import { dispatchWrapper } from 'src/serviceWorker/app/store/utils/dispatchWrapper'
import { IMessage } from 'src/shared/interfaces/interfaces'
import { Tabs } from 'webextension-polyfill'

import { updateApplicationChain } from '../../store/reducers/applicationReducer'

export const uniqueAddressesFilter = () => {
  let cache: any

  return (elem: string, index: number, array: string[]) => {
    if (!cache) cache = new Set(array)
    return cache.delete(elem)
  }
}

const DAPP_REQUEST_INTERVAL = 1000 * 2 // 2 seconds
const DEV_DOMAIN = 'http://localhost'

enum RequestType {
  Connect = 0,
  Reject = 1,
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

/**
 * Control and manage methods and messages regarding DApp
 */

class DAppsController {
  #appPopup: Popup
  #store: Store<AppState>

  constructor(store: Store<AppState>) {
    this.#store = store
    // [TODO] We don't yet have a popup at this stage?
    this.#appPopup = new Popup({
      page: 'app.html',
    })
  }

  /**
   * get addresses of specified wallets (a process to connect DApp)
   *
   * @param chainId {string} - chain id of dapp being connected
   * @param walletIds {Array<string>} - array of wallet ids to connect
   *
   * @return {Array<string>}
   */
  getConnectedWalletsForBlockchain = (
    chainId: BlockchainNames = BlockchainNames.Ethereum,
    walletIds: Array<string>,
  ): string[] => {
    if (!walletIds) {
      return []
    }

    const state: AppState = this.#store.getState()

    const { walletsData: wallets } = state.wallets

    const addresses = walletIds.reduce((prev: string[], id: string) => {
      const wallet = wallets.find((item) => item.walletId === id)
      if (wallet && ofEthereumFamily(wallet.blockchain)) {
        const address = wallet.calculatedAddress.toLowerCase()
        return [...prev, address]
      }

      return prev
    }, [])

    return addresses.filter(uniqueAddressesFilter())
  }

  getAvailableWalletsByIds(walletIds: Array<string>) {
    const state: AppState = this.#store.getState()
    const { walletsData: wallets } = state.wallets as any

    return walletIds.filter((id: string) => {
      const wallet = wallets.find((w: IWalletData) => w.walletId === id)
      return !!wallet
    })
  }

  /**
   * get favIconUrl for Dapp
   *
   * @param dapp {string} - Dapp name
   *
   * @return {string}
   */
  getDappFavIconUrl = (dapp: string): string | undefined => {
    const state: AppState = this.#store.getState()
    const { dappsConnections } = state.dapps
    return dappsConnections[dapp]?.faviconUrl
  }

  /**
   * handle event when tab of the browser is changed
   *
   * NOTE: Active tabs e.g. exchanges may trigger updates a few times per second
   * by updating their title with current asset price, because of that we throttle
   * call of this function.
   *
   * @param tab {Tabs.tab} - changed tab info
   */
  updateCurrentTabReferenceInStore = (tab: Tabs.Tab) => {
    if (!tab.active) {
      return
    }

    const url = tab?.url || ''
    if (tab.id === this.#appPopup.popupId || tab.status !== 'complete') {
      return
    }

    if (!url || !(url.startsWith('http') || url.startsWith('https'))) {
      dispatchWrapper(this.#store, resetCurrentTab())
      return
    }

    const domain = new URL(url).hostname

    if (domain === this.#store.getState()?.dapps?.currentTab?.domain) {
      return
    }

    const tabInfo = {
      id: domain,
      url,
      domain,
      title: tab?.title || '',
      favicon: tab?.favIconUrl || '',
    }

    dispatchWrapper(this.#store, changeCurrentTab(tabInfo))

    return
  }

  /**
   * get status of current dapp whether it's connect to wallet or not, and allowed to access info based on
   * requested and approved permissions
   *
   * @return {boolean}
   */
  // [TODO] Do we need DEV_DOMAIN here?
  isDAppConnected = (url: string = DEV_DOMAIN) => {
    const state: AppState = this.#store.getState()
    const { dappsConnections } = state.dapps
    if (!dappsConnections || !Object.keys(dappsConnections).length) {
      return false
    }
    const hostname = new URL(url).hostname
    return dappsConnections[hostname]
  }

  /**
   * Check if the requested message has been processed(shown or rejected) already
   * This is handler for multiple connect request even the connect modal has been shown
   * or user already rejected connect request
   *
   * @param msg {IMessage} - requested message to connect dapp
   *
   * @return {boolean} - true: already processed, false: not processed or processed long ago
   */
  checkRequestTypeWasProcessed = (msg: IMessage, requestType: RequestType) => {
    const { lastConnectMessage = { timestamp: 0 }, lastRejectMessage = { timestamp: 0 } } =
      this.#store.getState().dappsMessages
    if (
      (requestType === RequestType.Connect && (!lastConnectMessage.timestamp || !lastConnectMessage.origin)) ||
      (requestType === RequestType.Reject && (!lastRejectMessage.timestamp || !lastRejectMessage.origin))
    ) {
      return false
    }

    const now = new Date().getTime()
    const { timestamp, origin } = requestType === RequestType.Connect ? lastConnectMessage : lastRejectMessage

    if (
      origin &&
      origin.id === msg.origin?.id &&
      origin.url === msg.origin?.url &&
      now - timestamp < DAPP_REQUEST_INTERVAL
    ) {
      if (requestType === RequestType.Connect) {
        dispatchWrapper(this.#store, setConnectMsgTime({ time: now }))
      }
      if (requestType === RequestType.Reject) {
        dispatchWrapper(this.#store, setRejectedMsgTime({ time: now }))
      }
      return true
    }

    return false
  }

  /**
   * handle events of requested dapps being connected
   */
  handleDappConnectionRequest = (msg: IMessage, connectionEstablishedTimeStamp?: Date, isDAppConnected?: boolean) => {
    if (!isDAppConnected && connectionEstablishedTimeStamp) {
      const currentTimestamp = new Date()
      const canConfirm = currentTimestamp.getTime() - connectionEstablishedTimeStamp.getTime() < 2000
      if (canConfirm) {
        this.popRequestMessage(msg.messageId)
        return true
      }
    }
    if (
      isDAppConnected ||
      this.checkRequestTypeWasProcessed(msg, RequestType.Reject) ||
      this.checkRequestTypeWasProcessed(msg, RequestType.Connect)
    ) {
      return false
    }

    dispatchWrapper(this.#store, addRequestedDAppConnect(msg))

    this.#appPopup.showPopup(`#${POPUP_URLS.DAPP_CONNECT_PATH}`)

    dispatchWrapper(this.#store, setConnectMsg({ time: new Date().getTime(), origin: msg.origin }))
    return false
  }

  /**
   * send message on confirm and pop connect dapp
   */
  confirmConnection(messageId: number, addresses: string[]) {
    confirmConnection(messageId, addresses)

    this.popRequestMessage(messageId)
  }

  /**
   * send response message to dapp
   */
  responseToDapp(message: IMessage, popMessage = true) {
    responseToDapp(message)

    popMessage && this.popRequestMessage(message.messageId)
  }

  /**
   * send message on reject and pop connect dapp
   */
  rejectConnection(messageId: number) {
    const state: AppState = this.#store.getState()
    const { message } = state.dappsConnect
    if (message) {
      dispatchWrapper(
        this.#store,
        setRejectedMsg({
          origin: message.origin,
          time: new Date().getTime(),
        }),
      )
    }

    this.popRequestMessage(messageId)
  }

  /**
   * pop last requested message to connect dapp
   */
  popRequestMessage(messageId: number) {
    dispatchWrapper(this.#store, removeRequestDappConnect(messageId))
  }

  /**
   * push a requested message regarding sign msg/txs to redux
   */
  pushSignMessage(msg: IMessage) {
    dispatchWrapper(this.#store, pushMessage(msg))
  }

  /**
   * remove requested message by  id
   *
   * @param id {number} - specified  id to remove
   */

  removeMessageById(id: number) {
    dispatchWrapper(this.#store, removeMessageById({ id }))
  }

  resetSignMessages() {
    dispatchWrapper(this.#store, resetMessages())
  }

  openTxSendPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.TRANSACTIONAL}?messageId=${parsedMessage.messageId}`)
  }

  openSignPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.SIGN_MSG_PATH}?messageId=${parsedMessage.messageId}`)
  }

  openAddAssetPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.DAPP_WATCH_ASSET}?messageId=${parsedMessage.messageId}`)
  }

  openRequestPermissionsPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.DAPP_REQUEST_PERMISSION}?messageId=${parsedMessage.messageId}`)
  }

  openGetDecryptPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.DECRYPT}?messageId=${parsedMessage.messageId}`)
  }

  openNotFoundRpcMethodPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.NOT_FOUND_RPC}?messageId=${parsedMessage.messageId}`)
  }

  openGetEncryptionPublicKeyPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.ENCRYPT}?messageId=${parsedMessage.messageId}`)
  }

  openSwitchChainPopup(parsedMessage: IMessage) {
    this.#appPopup.showPopup(`#${POPUP_URLS.SWITCH_CHAIN}?messageId=${parsedMessage.messageId}`)
  }

  /**
   * store requested dapp info to Redux state
   *
   * @param dappId {string} - id of dapp being
   * @param chainId {string} - chain id of dapp
   * @param walletIds {Array<string>} - array of wallet ids being connectedadded
   * @param faviconUrl {string} - url for icon
   * @param title {string} - title of dapp
   */
  // [TODO] Rename dappId to DappHost
  addRequestedDApp = (
    dappId: string,
    chainId: EthereumFamilyChains,
    walletIds: Array<string>,
    faviconUrl: string,
    title: string,
  ) => {
    if (dappId.includes(':')) {
      throw Error('dappId must be a hostname')
    }

    const supportedWalletIds = this.getAvailableWalletsByIds(walletIds)

    if (supportedWalletIds.length > 0) {
      dispatchWrapper(
        this.#store,
        addDApp({
          dappId,
          walletIds: supportedWalletIds,
          faviconUrl,
          title,
        }),
      )
      this.addWalletCloneToDappOnBlockchain(supportedWalletIds[0], dappId, chainId)
    } else {
      throw new Error("Selected accounts doesn't have wallet for this DApp")
    }
  }

  /**
   * add connected wallet of current dapp from Redux state
   *
   * @param walletId {string} - specified wallet id being removed
   * @param dappId {string}
   */
  async _addWalletToDappConnectedWallets(
    toChain: EthereumFamilyChains,
    walletId: string,
    dappId?: string,
    asCurrentActive?: boolean,
  ) {
    const state: AppState = this.#store.getState()
    const { currentTab } = state.dapps

    const currentDappId = dappId || currentTab.id

    dispatchWrapper(this.#store, addWalletToDApp({ dappId: currentDappId, walletId, asCurrentActive }))

    const wallet = state.wallets.walletsData.find((w) => w.walletId === walletId)

    if (wallet) {
      this.setWindowEthereumChain(wallet.blockchain)
    }

    updateAddressesForDApp(toChain)
  }

  setWindowEthereumChain = (ethereumChain: BlockchainNames) => {
    dispatchWrapper(this.#store, updateApplicationChain(ethereumChain))
  }

  /**
   * remove connected wallet of current dapp from Redux state
   *
   * @param walletId {string} - specified wallet id being removed
   * @param dappId {string}
   */
  removeWalletFromDappConnectedWallets(walletId: string, dappId?: string) {
    const state: AppState = this.#store.getState()
    const { currentTab } = state.dapps
    const targetDappId = dappId || currentTab.id

    dispatchWrapper(this.#store, removeWalletFromDApp({ dappId: targetDappId, walletId }))

    const nextWalletId = state.dapps.dappsConnections[targetDappId]?.walletIds.find((id: string) => id !== walletId)
    const nextWallet = state.wallets.walletsData.find((w) => w.walletId === nextWalletId)

    const currentChain = state.application.currentChain

    if (currentChain && currentChain !== nextWallet?.blockchain && nextWallet) {
      this.setWindowEthereumChain(nextWallet.blockchain as EthereumFamilyChains)
    }

    updateAddressesForDApp(getDappEthereumChain(this.#store))
  }

  updateAppChain = (chain: BlockchainNames) => {
    dispatchWrapper(this.#store, updateApplicationChain(chain))
  }

  addWalletCloneToDappOnBlockchain = async (walletId: string, tabId: string, toChain: EthereumFamilyChains) => {
    const walletsData = this.#store.getState().wallets.walletsData
    const walletData = walletsData.find((w) => w.walletId === walletId)

    if (walletData) {
      const existingWalleForChain = walletsData.find(
        (w) => w.calculatedAddress === walletData.calculatedAddress && w.blockchain === toChain,
      )

      if (existingWalleForChain) {
        await this._addWalletToDappConnectedWallets(toChain, existingWalleForChain.walletId, tabId, true)

        return existingWalleForChain.walletId
      } else {
        const newCreatedWalletId = await this._appendWalletDataCloneToBlockchain(walletData, toChain)

        newCreatedWalletId && this._addWalletToDappConnectedWallets(toChain, newCreatedWalletId, tabId, true)

        return newCreatedWalletId
      }
    }

    throw new Error('Wallet not found')
  }

  _appendWalletDataCloneToBlockchain = async (
    targetWalletData: IWalletData,
    currentChain: BlockchainNames,
  ): Promise<string | undefined> => {
    const newWallet = await Wallet.cloneWalletDataToChain(targetWalletData, currentChain)

    // [TODO] We are missing backup here?
    dispatchWrapper(this.#store, appendWallet({ walletData: newWallet }))

    updateWalletBalances(newWallet?.walletId, noop)

    return newWallet?.walletId
  }
}

export default DAppsController
