import { useCallback, useState } from 'react'
import DappRequestedTemplate from 'src/app/components/DappRequestedTemplate/DappRequestedTemplate'
import { DappEncryptHeader } from 'src/app/components/Header/headers/DappEncryptHeader'
import { getEncryptionPublicKey } from 'src/app/helpers/backgroundMethods'
import { useDAppsController, useNotifications } from 'src/app/hooks/uiControllers'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'

import { Container } from './styled'

const PublicKeyEncryption = () => {
  useDappMsgChecker()

  const { dappMessage } = useNoMessagesChecker()

  const [isRequestInProcess, setRequestInProcess] = useState(false)

  const { addNotification } = useNotifications()

  const dapps = useDAppsController()

  const onSubmit = useCallback(async () => {
    getEncryptionPublicKey(dappMessage, async (response: any) => {
      setRequestInProcess(false)
      if (response.encrypted) {
        dapps.responseToDapp({
          ...dappMessage,
          raw: {
            id: dappMessage.messageId,
            result: response.encrypted,
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
      header={({ message }) => <DappEncryptHeader message={message} />}
    >
      <Container>
        {dappMessage?.origin?.url} asks for your public encryption key. After receiving your consent to this, this site
        will be able to create encrypted messages to be sent to you.
      </Container>
    </DappRequestedTemplate>
  )
}

export default PublicKeyEncryption
