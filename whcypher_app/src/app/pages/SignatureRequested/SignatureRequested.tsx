import { CircularProgress } from '@material-ui/core'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FlexBox } from 'src/app/componentElements'
import H3 from 'src/app/componentElements/Typography/Headings/H3'
import { DappSignHeader } from 'src/app/components/Header/headers/DappSignHeader'
import { SignMessageView } from 'src/app/components/SignMessageView/SignMessageView'
import { WALLET_REQUESTS_PATH } from 'src/app/constants/paths'
import logger from 'src/app/helpers/appLogger'
import { initSignRawMessage, resolveTransactionSession } from 'src/app/helpers/backgroundMethods'
import { flushAndClose } from 'src/app/helpers/flushAndClose'
import { useDappMessageParser, useNotifications } from 'src/app/hooks/uiControllers'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'
import { AppState } from 'src/serviceWorker/app/store/store'

import DappRequestedTemplate from '../../components/DappRequestedTemplate/DappRequestedTemplate'

const SignatureRequested = () => {
  const history = useHistory()

  useDappMsgChecker()

  const controller = useDappMessageParser()

  const { walletsData: wallets } = useSelector((state: AppState) => state.wallets)

  const { dappMessage: signInMsg } = useNoMessagesChecker()

  const [isRequestInProcess, setRequestInProcess] = useState(false)

  const { addNotification } = useNotifications()

  const handleApprove = useCallback(async () => {
    setRequestInProcess(true)

    const targetWalletId = controller.getWalletIdWithMessage(signInMsg)
    const wallet = wallets.find((w) => w.walletId === targetWalletId)

    if (!wallet) {
      return
    }

    const walletId = wallet?.walletId

    try {
      initSignRawMessage(walletId, signInMsg, (response: any) => {
        setRequestInProcess(false)

        if (response.transactionData) {
          resolveTransactionSession(response.transactionData.sessionId)
          history.push({
            pathname: WALLET_REQUESTS_PATH,
            search: `?walletId=${walletId}&sessionId=${response.transactionData.sessionId}`,
          })
        } else if (response.error.value) {
          // TODO mark value field with error
          addNotification({
            title: 'Error',
            message: response.error.value,
          })
        }
      })
    } catch (e) {
      logger.error(e)
      flushAndClose()
    }
  }, [wallets, addNotification, history, signInMsg, controller])

  if (!signInMsg) {
    return (
      <FlexBox alignItems="center" justifyContent="center" margin="auto" width="100%">
        <H3>No pending dApps signature requests.</H3>
      </FlexBox>
    )
  }

  return (
    <DappRequestedTemplate
      onSubmit={handleApprove}
      confirmLabel="Sign"
      loading={isRequestInProcess}
      checkFromAddress={true}
      closeOnEnd={true}
      dappMessage={signInMsg}
      header={({ message }) => <DappSignHeader message={message} />}
    >
      <>
        {isRequestInProcess && <CircularProgress style={{ color: 'white' }} size={16} />}
        <SignMessageView signInMsg={signInMsg} />
      </>
    </DappRequestedTemplate>
  )
}

export default SignatureRequested
