// Async load for scripts, allows to load before all other scripts on web-pages
import 'setimmediate'

import pump from 'pump'
import logger from 'src/app/helpers/appLogger'
import browser from 'webextension-polyfill'
import Browser from 'webextension-polyfill'

import { CHANNELS } from '../app/constants/browserChannels'
import {
  FROM_BG,
  FROM_EXT,
  FROM_PAGE,
  REQUEST_PERMISSION,
  REQUEST_PERMISSION_RESPONSE,
  REQUEST_PERMISSION_RESPONSE_ECHO,
} from './constants/communications'
import { blacklistedDomainCheck } from './helpers/blacklisted-domains'
import { validDocType, validDocumentElement, validSuffix } from './helpers/doc-checks'
import ObjectMultiplex from './libs/object-multiplex/ObjectMultiplex'
import PortDuplexStream from './libs/port-message-stream/PortDuplexStream'
import PostMessageStream from './libs/post-message-stream/PostMessageStream'

// Communication with Background script (from background to inpage)
browser.runtime.onMessage.addListener((request, sender) => {
  if (!sender.tab) {
    if (request.type === FROM_BG) {
      switch (request.message.type) {
        case REQUEST_PERMISSION_RESPONSE:
          window.postMessage(
            {
              type: FROM_EXT,
              message: {
                type: REQUEST_PERMISSION_RESPONSE,
                permission: request.message.permission,
                context: request.message.context,
                error: request.message.error,
              },
            },
            '*',
          )
          break
        default:
          break
      }
    }
  }
})

// Communication with inpage script (from inpage to background)
window.addEventListener(
  'message',
  (event) => {
    // We only accept messages from ourselves
    if (event.source != window) return

    if (event.data.type && event.data.type == FROM_PAGE) {
      switch (event.data.message.type) {
        case REQUEST_PERMISSION:
          Browser.runtime.sendMessage(undefined, {
            func: 'requestPermission',
            host: window.location.host,
            permission: event.data.message.permission,
            context: event.data.message.context,
            requestName: event.data.message.requestName,
          })
          break
        case REQUEST_PERMISSION_RESPONSE_ECHO:
          Browser.runtime.sendMessage(undefined, {
            func: 'requestPermissionResponseEcho',
            status: event.data.message.status,
          })
          break
        default:
          break
      }
    }
  },
  false,
)

/**
 * Injects a script tag into the current document. Reason, why we need to inject additional script file
 *   https://stackoverflow.com/a/12396221/851749
 *
 * @param {string} content - Code to be executed in the current document
 */
function injectScript() {
  try {
    start()
  } catch (e) {
    logger.error('TotalSig script injection failed', e)
  }
}

/**
 * Error handler for page to extension stream disconnections
 *
 * @param {string} remoteLabel - Remote stream name
 * @param {Error} err - Stream connection error
 */
function logStreamDisconnectWarning(remoteLabel: string, err: Error | undefined) {
  let warningMsg = `Contentscript - lost connection to ${remoteLabel}`
  if (err) {
    warningMsg += `\n ${err.stack}`
  }
  logger.warn(warningMsg)
}

function forwardTrafficBetweenMuxers(channelName: string, muxA: any, muxB: any) {
  const channelA = muxA.createStream(channelName)
  const channelB = muxB.createStream(channelName)
  pump(
    channelA,
    channelB,
    channelA,
    (err) => err && logStreamDisconnectWarning(`muxed traffic for channel "${channelName}" failed.`, err),
  )
}

/**
 * Sets up two-way communication streams between the
 * browser extension and local per-page browser context.
 *
 *
 */
async function setupStreams() {
  // the transport-specific streams for communication between inpage and background
  // [TODO] Lets refactor this to make this a readable code. Ideally, Dev should real this and get a general picture
  // of what is going on, without diving into the context.
  const pageStream = new PostMessageStream({
    name: CHANNELS.CONTENT_SCRIPT,
    target: CHANNELS.PAGE,
  })

  const extensionPort = browser.runtime.connect(undefined, {
    name: CHANNELS.CONTENT_SCRIPT,
  })
  const extensionStream = new PortDuplexStream(extensionPort)

  const pageMux = new ObjectMultiplex()
  pageMux.setMaxListeners(25)
  const extensionMux = new ObjectMultiplex()
  extensionMux.setMaxListeners(25)

  pump(pageMux, pageStream, pageMux, (err) => err && logStreamDisconnectWarning('Inpage Multiplex', err))
  pump(
    extensionMux,
    extensionStream,
    extensionMux,
    (err) => err && logStreamDisconnectWarning('Background Multiplex', err),
  )

  forwardTrafficBetweenMuxers(CHANNELS.PROVIDER, pageMux, extensionMux)
  forwardTrafficBetweenMuxers(CHANNELS.CONFIG, pageMux, extensionMux)
}

/**
 * Returns a promise that resolves when the DOM is loaded (does not wait for images to load)
 */
async function domIsReady() {
  // already loaded
  if (['interactive', 'complete'].includes(document.readyState)) {
    return null
  }
  // wait for load
  return new Promise((resolve) => window.addEventListener('DOMContentLoaded', resolve, { once: true }))
}

/**
 * Sets up the stream communication and submits site metadata
 *
 */
async function start() {
  await setupStreams()
  await domIsReady()

  // [TODO] add a note that the actual inpage injection happens in the  end of serviceWorker.ts file
}

const injectProviderPredicate = validDocType() && validSuffix() && validDocumentElement() && !blacklistedDomainCheck()

if (injectProviderPredicate) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM ready! Images, frames, and other subresources are still downloading.
    injectScript()
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      // DOM ready! Images, frames, and other subresources are still downloading.
      injectScript()
    })
  }
}
