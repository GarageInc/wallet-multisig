// Async load for scripts, allows to load before all other scripts on web-pages
import 'setimmediate'
// [TODO_AFTER_RELEASE] We should include this as module
import './libs/web3-provider/init_evm_provider'

import EventEmitter from 'events'

import { WEB_PAGE_REQUEST_TYPES } from '../app/constants/requestTypes'
import {
  FROM_EXT,
  FROM_PAGE,
  REQUEST_PERMISSION,
  REQUEST_PERMISSION_RESPONSE,
  REQUEST_PERMISSION_RESPONSE_ECHO,
} from './constants/communications'
import { ITotalsigWeb3 } from './types/inpage-types'

declare global {
  interface Window {
    ethereum: any
    web3: any
    // [TODO] add comment here why it is needed
    totalsigWeb3: ITotalsigWeb3
    totalsig: TotalSig
  }
}

class TotalSig extends EventEmitter {
  state: any
  successCallback: any
  failCallback: any
  requestId: number | null
  failTimeout: any | null
  pubKey: string
  destination: any

  eventListener(event: any) {
    // We only accept messages from ourselves
    if (event.source !== window) return

    if (event.data.type && event.data.type === FROM_EXT) {
      switch (event.data.message.type) {
        case REQUEST_PERMISSION_RESPONSE:
          if (this.isInState() && this.state.type === REQUEST_PERMISSION) {
            const { context, error } = event.data.message

            if (context && Object.keys(context).length > 0) {
              if (this.state.requestName === WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST) {
                const callback = this.resultCallback.bind(this)
                this.successCallback(context, callback)
              } else if (this.state.requestName === WEB_PAGE_REQUEST_TYPES.SIGN_ADDRESS_REQUEST) {
                this.successCallback(context)
                this.resultCallback('success')
              } else if (this.state.requestName === WEB_PAGE_REQUEST_TYPES.JOIN_MULTISIG_SESSION_REQUEST) {
                this.successCallback(context)
                this.resultCallback('success')
              }
            } else {
              this.state = {}
              this.failCallback(error)
            }

            this.requestId = null
            this.successCallback = null
            this.failCallback = null
            this.failTimeout = null
          }
          break
        default:
          break
      }
    }
  }

  constructor() {
    super()

    this.requestId = null
    this.state = {}
    this.pubKey = ''
    this.successCallback = null
    this.failCallback = null
    this.failTimeout = null
    this.destination = {}

    window.addEventListener('message', this.eventListener.bind(this), false)
  }

  isInState() {
    return !!Object.entries(this.state).length
  }

  signIn(messageHash: string, signInAllowed: boolean, signInRejected: boolean) {
    if (!this.isInState()) {
      const requestId = Math.floor(Math.random() * 10000)
      this.requestId = requestId
      this.state = {
        type: REQUEST_PERMISSION,
        requestName: WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST,
        context: { messageHash },
      }
      this.successCallback = signInAllowed
      this.failCallback = signInRejected

      window.postMessage(
        {
          type: FROM_PAGE,
          message: {
            type: REQUEST_PERMISSION,
            requestName: WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST,
            context: { messageHash },
          },
        },
        '*',
      )

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.failTimeout = setTimeout(() => {
        if (self.requestId === requestId) {
          self.failCallback('Request expired')
          window.postMessage(
            { type: FROM_PAGE, message: { type: REQUEST_PERMISSION_RESPONSE_ECHO, status: false } },
            '*',
          )
          self.requestId = null
          self.state = {}
          self.successCallback = null
          self.failCallback = null
          self.failTimeout = null
        }
      }, 65000) // 1 minute
    } else {
      throw Error('Can not initiate another request while current request is unresolved')
    }
  }

  signDestinations(destinations: any, signSuccessful: boolean, signFailed: boolean) {
    if (!this.isInState()) {
      const requestId = Math.floor(Math.random() * 10000)
      this.requestId = requestId
      this.state = {
        type: REQUEST_PERMISSION,
        requestName: WEB_PAGE_REQUEST_TYPES.SIGN_ADDRESS_REQUEST,
        context: { destinations },
      }
      this.successCallback = signSuccessful
      this.failCallback = signFailed

      window.postMessage({
        type: FROM_PAGE,
        message: {
          type: REQUEST_PERMISSION,
          requestName: WEB_PAGE_REQUEST_TYPES.SIGN_ADDRESS_REQUEST,
          context: { destinations },
        },
      })

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this

      this.failTimeout = setTimeout(() => {
        if (self.requestId === requestId) {
          self.failCallback('Request expired')
          self.requestId = null
          self.state = {}
          self.successCallback = null
          self.failCallback = null
          self.failTimeout = null
        }
      }, 65000) // 1 minute
    } else {
      throw Error('Can not initiate another request while current request is unresolved')
    }
  }

  joinVaultSession({ sessionId, pubKey } = {} as any, joinedSuccessful: any, joinedFailed: any) {
    if (!this.isInState()) {
      const requestId = Math.floor(Math.random() * 10000)
      this.requestId = requestId
      this.state = {
        type: REQUEST_PERMISSION,
        requestName: WEB_PAGE_REQUEST_TYPES.JOIN_MULTISIG_SESSION_REQUEST,
        context: { sessionId, pubKey },
      }
      this.successCallback = joinedSuccessful
      this.failCallback = joinedFailed

      window.postMessage({
        type: FROM_PAGE,
        message: {
          type: REQUEST_PERMISSION,
          requestName: WEB_PAGE_REQUEST_TYPES.JOIN_MULTISIG_SESSION_REQUEST,
          context: { sessionId, pubKey },
        },
      })

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.failTimeout = setTimeout(() => {
        if (self.requestId === requestId) {
          self.failCallback('Request expired')
          window.postMessage(
            { type: FROM_PAGE, message: { type: REQUEST_PERMISSION_RESPONSE_ECHO, status: false } },
            '*',
          )
          self.requestId = null
          self.state = {}
          self.successCallback = null
          self.failCallback = null
          self.failTimeout = null
        }
      }, 65000) // 1 minutes
    } else {
      throw Error('Can not initiate another request while current request is unresolved')
    }
  }

  resultCallback(status: string) {
    if (this.isInState() && this.state.type === REQUEST_PERMISSION) {
      window.postMessage({ type: FROM_PAGE, message: { type: REQUEST_PERMISSION_RESPONSE_ECHO, status } }, '*')
      this.state = {}
      this.successCallback = null
      this.failCallback = null
    }
  }
}

window.totalsig = new TotalSig()

export {}
