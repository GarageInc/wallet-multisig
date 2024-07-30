import { FlexBox } from 'src/app/componentElements'
import Large from 'src/app/componentElements/Typography/Body/Large'
import { IMessage } from 'src/shared/interfaces/interfaces'

import useHeader from '../hooks/useHeader'
import { Content, Domain, DomainLink } from '../styles'

export const DappDecryptHeader = ({ message }: { message: IMessage }) => {
  const { url, domain } = useHeader(message)
  return (
    <FlexBox>
      <FlexBox marginTop="15px">
        <Large fontWeight="700">Decrypt message on</Large>
      </FlexBox>
      <Content marginTop="14px">
        <Domain alignItems="center">
          <DomainLink to={url}>{domain}</DomainLink>
        </Domain>
      </Content>
    </FlexBox>
  )
}
