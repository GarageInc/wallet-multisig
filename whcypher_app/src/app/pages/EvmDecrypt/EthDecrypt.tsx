import { useCallback, useState } from 'react'
import DappRequestedTemplate from 'src/app/components/DappRequestedTemplate/DappRequestedTemplate'
import { DappDecryptHeader } from 'src/app/components/Header/headers/DappDecryptHeader'
import { decryptDappMessage } from 'src/app/helpers/backgroundMethods'
import { useDAppsController, useNotifications } from 'src/app/hooks/uiControllers'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'

import { Container } from './styled'

const EvmDecrypt = () => {
  useDappMsgChecker()

  const { dappMessage } = useNoMessagesChecker()

  const [isRequestInProcess, setRequestInProcess] = useState(false)

  const { addNotification } = useNotifications()

  const dapps = useDAppsController()

  const onSubmit = useCallback(async () => {
    decryptDappMessage(dappMessage, async (response: any) => {
      setRequestInProcess(false)
      if (response.decrypted) {
        dapps.responseToDapp({
          ...dappMessage,
          raw: {
            id: dappMessage.messageId,
            result: response.decrypted,
          },
        })
      } else if (response.error.value) {
        // TODO mark value field with error
        addNotification({
          title: 'Error',
          message: response.error.value,
        })
      }
    })
  }, [dappMessage, dapps, addNotification])

  return (
    <DappRequestedTemplate
      onSubmit={onSubmit}
      checkFromAddress={false}
      loading={isRequestInProcess}
      dappMessage={dappMessage}
      header={({ message }) => <DappDecryptHeader message={message} />}
    >
      <Container>{dappMessage?.origin?.url}asks for decrypts the given encrypted message</Container>
    </DappRequestedTemplate>
  )
}

export default EvmDecrypt
