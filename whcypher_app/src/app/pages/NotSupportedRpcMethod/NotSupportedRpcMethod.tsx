import Medium from 'src/app/componentElements/Typography/Body/Medium'
import DappRequestedTemplate from 'src/app/components/DappRequestedTemplate/DappRequestedTemplate'
import { DappNotFoundRpcHeader } from 'src/app/components/Header/headers/DappNotFoundRpcHeader'
import { useDappMsgChecker, useNoMessagesChecker } from 'src/app/hooks/useDappMsgChecker'

import { Container } from './styled'

const NotSupportedRpcMethod = () => {
  useDappMsgChecker()

  const { dappMessage } = useNoMessagesChecker()

  return (
    <DappRequestedTemplate
      dappMessage={dappMessage}
      header={({ message }) => <DappNotFoundRpcHeader message={message} />}
    >
      <Container>
        <>Method </>
        <Medium>{dappMessage.raw.method}</Medium>
        <> is not supported yet</>
      </Container>
    </DappRequestedTemplate>
  )
}

export default NotSupportedRpcMethod
