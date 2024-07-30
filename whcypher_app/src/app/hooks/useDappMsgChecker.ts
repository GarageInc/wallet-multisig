import { ofEthereumFamily } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ethErrors } from 'eth-rpc-errors'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDAppsController } from 'src/app/hooks/uiControllers'
import { AppState } from 'src/serviceWorker/app/store/store'
import Browser from 'webextension-polyfill'

import { useCurrentDappsMessage } from '../components/DappRequestedTemplate/DappRequestedTemplate'
import { flushAndClose } from '../helpers/flushAndClose'

// Handle closing of DAPP popup.
// Need to remove dapp message if user closed dialog without any actions/clicks inside of popup
export const useDappMsgChecker = () => {
  const dappsController = useDAppsController()

  const { messages } = useSelector((state: AppState) => state.dappsMessages)

  const handleTabClosing = useCallback(() => {
    if (messages.length === 0) {
      return
    }
    dappsController.removeMessageById(messages[0].messageId)

    Browser.runtime.sendMessage(undefined, {
      messageId: messages[0].messageId,
      raw: {
        id: messages[0].messageId,
        error: ofEthereumFamily(messages[0].chainId)
          ? ethErrors.provider.userRejectedRequest()
          : 'Error in multi tx msg sign',
      },
    })
  }, [dappsController, messages])

  /**
   * Reject the message if the user closes the window
   */
  useEffect(() => {
    window.addEventListener('unload', handleTabClosing)
    return () => {
      window.removeEventListener('unload', handleTabClosing)
    }
  })
}

export const useNoMessagesChecker = () => {
  const { dappMessage, messages } = useCurrentDappsMessage()

  useEffect(() => {
    if (!dappMessage) {
      const tId = setTimeout(async () => {
        flushAndClose()
      }, 1000)

      return () => clearTimeout(tId)
    }
    return undefined
  }, [dappMessage])

  return { dappMessage, messages }
}
