import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FlexBox } from 'src/app/componentElements'
import logger from 'src/app/helpers/appLogger'
import { rejectConnection } from 'src/app/helpers/channels'
import { flushAndClose } from 'src/app/helpers/flushAndClose'
import { useDAppsController } from 'src/app/hooks/uiControllers'
import { AppState } from 'src/serviceWorker/app/store/store'
import { IMessage } from 'src/shared/interfaces/interfaces'

import DAppConnected from '../../components/DAppConnected/DAppConnected'

const DAppConnect = () => {
  const connectMessage = useSelector((state: AppState) => state.dappsConnect.message)

  useEffect(() => {
    if (!connectMessage) {
      flushAndClose()
    }
  }, [connectMessage])

  const dapps = useDAppsController()

  const handleConfirm = useCallback(
    async (walletIds: Array<string>) => {
      if (connectMessage && walletIds.length) {
        const { chainId, messageId }: IMessage = connectMessage

        const addresses = dapps.getConnectedWalletsForBlockchain(chainId, walletIds)

        dapps.confirmConnection(messageId, addresses)

        await flushAndClose()
      }
    },
    [dapps, connectMessage],
  )

  const handleClose = useCallback(async () => {
    if (connectMessage) {
      try {
        rejectConnection(connectMessage)
        dapps.rejectConnection(connectMessage.messageId)
      } catch (error) {
        // In case of error (such as when long-lived connection is closed or lost,
        // manually pop the connection message and close the window
        logger.error('Something went wrong while cancelling the request', error)
        dapps.popRequestMessage(connectMessage.messageId)
      } finally {
        await flushAndClose()
      }
    }
  }, [connectMessage, dapps])

  if (connectMessage) {
    return (
      <DAppConnected
        onConfirm={async (ids) => await handleConfirm(ids)}
        message={connectMessage}
        onClose={handleClose}
      />
    )
  }

  return (
    <FlexBox alignItems="center" justifyContent="center" height="100%">
      No pending dApps connection requests.
    </FlexBox>
  )
}

export default DAppConnect
