import { FC, memo } from 'react'
import { MultiSelectCheckbox, SearchInput } from 'src/app/componentElements'
import FlexBox from 'src/app/componentElements/FlexBox/FlexBox'
import Small from 'src/app/componentElements/Typography/Body/Small'
import H3 from 'src/app/componentElements/Typography/Headings/H3'

import AccAccordion from '../AccAccordion/AccAccordion'
import { IAccountsList } from './AccountsList.interface'
import { Container, SelectAllWrapper, SelectBox, WalletItemContainer } from './styles'
import useAccountsList from './useAccountsList'

const AccountsList: FC<IAccountsList> = ({
  showHeader = true,
  dappActiveWalletId,
  onChange,
  chainId,
  selectedWalletIds,
  className,
}) => {
  const { handleSelectAll, isSelectedAll, keyword, walletItems, setKeyword } = useAccountsList(
    chainId,
    onChange,
    selectedWalletIds,
  )

  return (
    <Container className={className}>
      {showHeader && (
        <SelectAllWrapper>
          <SearchInput
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
            placeholder="Search"
            mr="12px"
            mt="1px"
          />
          <FlexBox ml="auto" flexDirection="row" alignItems="center">
            <SelectBox onClick={handleSelectAll}>
              <Small>Select All</Small>
            </SelectBox>
            <MultiSelectCheckbox checked={isSelectedAll} onChange={handleSelectAll} />
          </FlexBox>
        </SelectAllWrapper>
      )}

      <WalletItemContainer className="accounts-list">
        {walletItems.length ? (
          walletItems.map((wallet) => (
            <AccAccordion
              key={wallet.walletId}
              wallet={wallet}
              selectedWalletIds={selectedWalletIds}
              onChange={onChange}
              dappActiveWalletId={dappActiveWalletId}
            />
          ))
        ) : (
          <FlexBox alignItems="center" justifyContent="center" my={16}>
            <H3>No wallets found for selected network </H3>
          </FlexBox>
        )}
      </WalletItemContainer>
    </Container>
  )
}

export default memo(AccountsList)
