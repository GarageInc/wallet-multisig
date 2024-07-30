import Browser from 'webextension-polyfill'

import { IMPORT_WALLETS_PATH, REQUEST_PERMISSION } from '../../../app/constants/paths'
import { APP_INIT_REQUEST_TYPES, USER_REQUEST_TYPES, WEB_PAGE_REQUEST_TYPES } from '../../../app/constants/requestTypes'
import * as appInitReducer from '../store/reducers/appInitReducer'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'

class Request {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // Refactored
  static async openRequestInNewWindow(runtimeRequest: any, sender: any) {
    const store = await getStore()

    const loginRequestsExists = await this.findWebPageRequest()
    if (!loginRequestsExists) {
      await store.dispatch(badgeReducer.updateBadge(1))
      await waitForSync()
    } else {
      await this.cleanupCurrentWebPageRequest()
    }

    // Open pop up window
    const windowId = await this.openNewWindow(this._getRequestUrl(runtimeRequest, sender))

    // Create new web page request
    await store.dispatch(
      requestsReducer.addRequest({
        host: runtimeRequest.host,
        tabId: sender.tab.id.toString(),
        popupId: windowId,
        requestName: runtimeRequest.requestName,
        context: runtimeRequest.context,
      }),
    )
    await waitForSync()
  }

  // Refactored
  // Chrome engin bug. Replicates in Brave
  // https://stackoverflow.com/questions/38305395
  static async openImportWalletsInNewWindow() {
    const store = await getStore()
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()
    const url = `${Browser.runtime.getURL('app.html')}#${IMPORT_WALLETS_PATH}`

    const windowId = await this.openNewWindow(url)

    const requestData = {
      requestName: USER_REQUEST_TYPES.WALLETS_IMPORT,
      requestPath: IMPORT_WALLETS_PATH,
      windowId,
      accountPubKey,
    }

    await store.dispatch(requestsReducer.addRequest(requestData))
    await waitForSync()
  }

  // Refactored
  static async openNewWindow(url: string) {
    // Open pop up window
    const window = await Browser.windows.create({
      url,
      type: 'popup',
      height: 600,
      width: 350,
      focused: true,
    })

    return window.id
  }

  // Refactored
  static async cleanupCurrentWebPageRequest() {
    const store = await getStore()
    const { requests } = await store.getState()

    // remove appInitRequests
    await store.dispatch(appInitReducer.nullifyState())
    await waitForSync()

    const initRequestsToClean = requests.requestsList.filter((request: any) =>
      Object.values(APP_INIT_REQUEST_TYPES).includes(request.requestName),
    )
    await initRequestsToClean.forEach(async (request: any) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await waitForSync()
    })

    const webPageRequest = await this.findWebPageRequest()

    try {
      await store.dispatch(requestsReducer.removeRequest({ id: webPageRequest.id }))
      await store.dispatch(badgeReducer.updateBadge(-1))
      await waitForSync()

      await Browser.windows.remove(webPageRequest.popupId)

      return true
    } catch (e) {
      // Window seems to be closed already or request does not exists
      return false
    }
  }

  // Refactored
  static async getCurrentRequestId() {
    try {
      const request = await this.findWebPageRequest()
      return request.id
    } catch (e) {
      return null
    }
  }

  // Refactored
  static async checkIfRequestWindowOpened() {
    const request = await this.findWebPageRequest()

    try {
      await Browser.windows.get(request.popupId)
      return true
    } catch (e) {
      return false
    }
  }

  // Refactored
  static async findWebPageRequest() {
    const store = await getStore()
    const {
      requests: { requestsList },
    } = store.getState()
    return requestsList.find((e: any) => Object.keys(WEB_PAGE_REQUEST_TYPES).includes(e.requestName))
  }

  // Refactored
  static _getRequestUrl(runtimeRequest: any, sender: any) {
    return `${Browser.runtime.getURL('app.html')}#${REQUEST_PERMISSION}?host=${
      runtimeRequest.host
    }&permission=${JSON.stringify(runtimeRequest.permission)}&context=${JSON.stringify(
      runtimeRequest.context,
    )}&tabId=${sender.tab.id.toString()}`
  }
}

export default Request
