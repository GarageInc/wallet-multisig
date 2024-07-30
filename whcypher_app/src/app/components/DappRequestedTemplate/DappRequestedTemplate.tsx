import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import PopupContainer from 'src/app/components/PopupContainer/PopupContainer'
import Logger from 'src/app/helpers/appLogger'
import { flushAndClose } from 'src/app/helpers/flushAndClose'
import { useDappMessageParser, useDAppsController, useNotifications } from 'src/app/hooks/uiControllers'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'
import { useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'
import { AppState } from 'src/serviceWorker/app/store/store'
import { IMessage } from 'src/shared/interfaces/interfaces'
import browser from 'webextension-polyfill'

import Footer from '../Footer/Footer'
import { Content, Wrapper } from './styles'

interface DappRequestedTemplateProps {
  children?: any
  loading?: boolean
  confirmLabel?: string
  onSubmit?: (v?: string) => void
  checkFromAddress?: boolean
  closeOnEnd?: boolean
  header?: ({ message }: { message: IMessage }) => ReactElement
  disabled?: boolean
  dappMessage: IMessage
  showTrust?: boolean
}

export const useCurrentDappsMessage = () => {
  const { search } = useLocation()
  const messages = useSelector((state: AppState) => state.dappsMessages.messages)

  const dappMessage = useMemo(() => {
    if (!search) {
      return messages[0]
    }

    const messageId = new URLSearchParams(search).get('messageId')

    return messages.find((tx: IMessage | any) => tx.messageId.toString() === messageId) || messages[0]
  }, [messages, search])

  return { dappMessage, messages }
}

const DappRequestedTemplate = ({
  children,
  loading: externalLoading = false,
  onSubmit,
  confirmLabel = 'Confirm',
  checkFromAddress = true,
  closeOnEnd = true,
  header: Header,
  disabled,
  dappMessage,
  showTrust,
}: DappRequestedTemplateProps) => {
  const [loading, setLoading] = useState(false)
  const masterController = useDappMessageParser()

  const { addNotification } = useNotifications()
  const dAppsController = useDAppsController()

  const { messages } = useNoMessagesChecker()

  const history = useHistory()

  const beforeClose = useCallback(async () => {
    if (closeOnEnd) {
      await flushAndClose()
      return
    }

    if (messages.length > 1) {
      history.goBack()
    } else {
      await flushAndClose()
    }
  }, [history, messages, closeOnEnd])

  const wallets = useSelector((state: AppState) => state.wallets.walletsData)

  const handleReject = useCallback(
    async (errMsg = 'TotalSig: user rejected the transaction') => {
      Logger.info('handleReject', dappMessage)
      browser.runtime
        .sendMessage(null, {
          messageId: dappMessage?.messageId,
          raw: {
            id: dappMessage?.messageId,
            error: errMsg,
          },
        })
        .finally(() => {
          dAppsController.removeMessageById(dappMessage?.messageId)
        })

      await beforeClose()
    },
    [beforeClose, dappMessage, dAppsController],
  )

  const target = useDappActiveWallet(
    checkFromAddress ? masterController.getWalletIdWithMessage(dappMessage) : undefined,
  )

  useEffect(() => {
    if (!target) {
      addNotification({
        title: 'Wallet required',
        message: 'No Active Wallet, do you have a wallet?',
      })
      handleReject('Wallet not found')
    }
  }, [handleReject, target, dappMessage, wallets, checkFromAddress, masterController, addNotification])

  const onSubmitWrapped = useCallback(async () => {
    if (!dappMessage) {
      return
    }

    setLoading(true)

    try {
      if (onSubmit) {
        await onSubmit()
      }

      dAppsController.removeMessageById(dappMessage.messageId)
    } catch (e) {
      const error = e as Error

      Logger.error({ e: error })
    } finally {
      setLoading(false)
    }
  }, [onSubmit, setLoading, dAppsController, dappMessage])

  if (messages.length === 0) {
    return (
      <Wrapper>
        <div>No dApp request</div>
      </Wrapper>
    )
  }

  return (
    <PopupContainer
      header={Header && <Header message={dappMessage} />}
      body={<Content>{children}</Content>}
      footer={
        <Footer
          onCancel={async () => await handleReject()}
          onSubmit={() => onSubmitWrapped()}
          disabledSubmit={externalLoading || loading || disabled}
          submitLabel={confirmLabel}
          showTrust={showTrust}
        />
      }
    />
  )
}

export default DappRequestedTemplate
