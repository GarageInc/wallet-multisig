import { FlexBox } from 'src/app/componentElements'
import { makeShortString } from 'src/app/helpers/stringHelper'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'
import { IMessage } from 'src/shared/interfaces/interfaces'

import PageHeader from '../../PageHeader/PageHeader'
import useHeader from '../hooks/useHeader'
import { Content, Domain, DomainLink } from '../styles'
import { SContainer, SStep } from './styled'

export const DappApproveHeader = ({
  message,
  goBack,
  selectedWallets,
}: {
  selectedWallets: string[]
  message: IMessage
  goBack: () => void
}) => {
  const { url, domain } = useHeader(message)

  const wallet = useDappActiveWallet(selectedWallets[0])

  return (
    <SContainer
      style={{
        border: 'none',
      }}
    >
      <FlexBox>
        <SStep fontSize="12px">Step 2 of 2</SStep>
      </FlexBox>
      <PageHeader
        title={wallet ? `Connect ${wallet.name} (${makeShortString(wallet.calculatedAddress, 4, 6)})` : 'Connect'}
        goBack={goBack}
      />
      <Content marginTop="8px">
        <Domain alignItems="center">
          <DomainLink to={url}>{domain}</DomainLink>
        </Domain>
      </Content>
    </SContainer>
  )
}
