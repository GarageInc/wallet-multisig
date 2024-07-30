import Browser from 'webextension-polyfill'

import { WEB_PAGE_REQUEST_TYPES } from '../../../app/constants/requestTypes'
import Request from '../models/Request'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'

class RequestsController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // Refactored
  async openRequestWindow(runtimeRequest: any, sender: any) {
    const runtimeRequestValid = await this._validateRuntimeRequest(runtimeRequest, sender)
    if (!runtimeRequestValid) return

    await Request.openRequestInNewWindow(runtimeRequest, sender)

    waitForSync(300) // wait a bit to let DB get updated

    const webPageRequest = await Request.findWebPageRequest()

    const timeoutAt = Date.now() + 60000 // wait 60 seconds and then new alarm is fired

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (Date.now() > timeoutAt) {
        // Window is opened and we reached timeout. User has not made his login decision.
        await this.sendErrorResponseToContentScript(webPageRequest, 'Request time expired')
        return
      }

      const requestWindowIsOpened = await Request.checkIfRequestWindowOpened()
      if (!requestWindowIsOpened) {
        // Window was closed. We should notify content script
        await this.sendErrorResponseToContentScript(webPageRequest, 'Request window was closed')
        return
      }

      const currentRequestId = await Request.getCurrentRequestId()
      if (webPageRequest.id != currentRequestId) {
        // Something has called a cleanup. Not this method. We just return and that is it.

        return
      }

      await new Promise((r) => setTimeout(r, 1000)) // wait a bit before next check
    }
  }

  // Refactored
  async openImportWalletsInNewWindow() {
    await Request.openImportWalletsInNewWindow()
  }

  // Refactored
  async sendResponseToContentScript(webPageRequest: any, context: any) {
    await Request.cleanupCurrentWebPageRequest()
    Browser.tabs.sendMessage(parseInt(webPageRequest.tabId, 10), {
      type: 'FROM_BG',
      message: {
        type: 'REQUEST_PERMISSION_RESPONSE',
        host: webPageRequest.host,
        permission: webPageRequest.permission,
        context,
      },
    })
  }

  // Refactored
  async sendErrorResponseToContentScript(webPageRequest: any, errorMessage: any) {
    await Request.cleanupCurrentWebPageRequest()
    Browser.tabs.sendMessage(parseInt(webPageRequest.tabId, 10), {
      type: 'FROM_BG',
      message: { type: 'REQUEST_PERMISSION_RESPONSE', error: errorMessage },
    })
  }

  // Refactored
  async cleanupCurrentWebPageRequest() {
    await Request.cleanupCurrentWebPageRequest()
  }

  // Refactored
  // We need to add and remove requests in background as otherwise redux state changes are whipped
  // after popup is closed
  async addRequest(request: any) {
    const store = await getStore()
    await store.dispatch(requestsReducer.addRequest(request))
    await store.dispatch(badgeReducer.updateBadge(1))
    await waitForSync()
  }

  // Refactored
  // We need to add and remove requests in background as otherwise redux state changes are whipped
  // after popup is closed
  async removeRequest(requestMatcher: any) {
    const store = await getStore()
    await store.dispatch(requestsReducer.removeRequest(requestMatcher))
    await store.dispatch(badgeReducer.updateBadge(-1))
    await waitForSync()
  }

  async cancelAutoApproval(sessionId: any) {
    const store = await getStore()
    await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId, startAutoApproving: false }))
    await waitForSync()

    const alarmName = `resolveTransactionSession:${sessionId}:false`
    Browser.alarms.create(alarmName, { periodInMinutes: 1 })
  }

  // Refactored
  async _validateRuntimeRequest(runtimeRequest: any, sender: any) {
    const store = await getStore()
    const { application } = store.getState()

    const { pubKey } = runtimeRequest.context

    if (pubKey && pubKey !== application.activeAccountPubkey) {
      await this.sendErrorResponseToContentScript(
        { tabId: sender.tab.id.toString() },
        `Pubkey do not match: Make sure that you have correct active account ${pubKey} != ${application.activeAccountPubkey}`,
      )
      return false
    }

    if (!Object.keys(WEB_PAGE_REQUEST_TYPES).includes(runtimeRequest.requestName)) {
      await this.sendErrorResponseToContentScript(
        { tabId: sender.tab.id.toString() },
        `Unknown request name: ${runtimeRequest.requestName}`,
      )
      return false
    }

    return true
  }
}

export default RequestsController
