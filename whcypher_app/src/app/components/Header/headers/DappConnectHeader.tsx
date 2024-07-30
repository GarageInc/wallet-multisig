import { FlexBox } from 'src/app/componentElements'
import Large from 'src/app/componentElements/Typography/Body/Large'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import { IMessage } from 'src/shared/interfaces/interfaces'

import useHeader from '../hooks/useHeader'
import { Content, Domain, DomainLink } from '../styles'
import { SContainer, SStep } from './styled'

export const DappConnectHeader = ({ message }: { message: IMessage }) => {
  const { url, domain } = useHeader(message)

  return (
    <SContainer>
      <FlexBox>
        <SStep>Step 1 of 2</SStep>
      </FlexBox>
      <FlexBox marginTop="8px" justifyContent="center" alignItems="center">
        <Large fontWeight={800}>TotalSig Connect</Large>
      </FlexBox>
      <FlexBox marginTop="8px">
        <Medium>Choose the wallet(s) to use on</Medium>
      </FlexBox>
      <Content marginTop="8px">
        <Domain alignItems="center">
          <DomainLink to={url}>{domain}</DomainLink>
        </Domain>
      </Content>
    </SContainer>
  )
}
