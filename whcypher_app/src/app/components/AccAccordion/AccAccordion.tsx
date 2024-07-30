import { FC, memo } from 'react'
import { FlexBox, MultiSelectCheckbox } from 'src/app/componentElements'
import Medium from 'src/app/componentElements/Typography/Body/Medium'
import Small from 'src/app/componentElements/Typography/Body/Small'
import { formatName } from 'src/app/helpers/formatters'
import { makeShortString } from 'src/app/helpers/stringHelper'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import { Container } from './styles'

interface IAccAccordion {
  selectedWalletIds: string[]
  wallet: IWalletData
  onChange: (wallets: string[], walletId: string) => void
  dappActiveWalletId?: string
}

const AccAccordion: FC<IAccAccordion> = ({
  dappActiveWalletId,
  selectedWalletIds,
  wallet,
  onChange,
}: IAccAccordion) => {
  return (
    <Container
      p="12px 20px"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      className="account-item"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (selectedWalletIds.indexOf(wallet.walletId) === -1) {
          onChange([...selectedWalletIds, wallet.walletId], wallet.walletId)
        } else {
          onChange(
            selectedWalletIds.filter((id) => id !== wallet.walletId),
            wallet.walletId,
          )
        }
      }}
      activeWallet={dappActiveWalletId === wallet.walletId}
    >
      <FlexBox alignItems="flex-start">
        <Medium overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" fontWeight={400}>
          {formatName(wallet.name, 28)}
        </Medium>
        <Small overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" mt="1px" fontWeight={300}>
          {makeShortString(wallet.calculatedAddress, 4, 6)}
        </Small>
      </FlexBox>

      <MultiSelectCheckbox checked={selectedWalletIds.includes(wallet.walletId) ?? false} />
    </Container>
  )
}

export default memo(AccAccordion)
