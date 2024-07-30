import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames, blockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FlexRow } from 'src/app/componentElements'
import Small from 'src/app/componentElements/Typography/Body/Small'
import { ASSET_BALANCE_PRECISION } from 'src/app/constants/assets'
import { getAddressExplorerLink } from 'src/app/helpers/chainUtils'
import { formatName } from 'src/app/helpers/formatters'
import { nFormatter } from 'src/app/helpers/numberHelper'
import { makeShortString } from 'src/app/helpers/stringHelper'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import * as Styled from './styles'

interface ITxLayout {
  url: string
  isTokenTransfer: boolean
  chainId: BlockchainNames
  fee: number
  hideBack?: boolean
  action: string
  from?: string
  to?: string
  title?: string
  hasHeader?: boolean
  displayAmount: string
  hasExplorer?: boolean
}

const useTargetWallet = (address: string | undefined, chainId: BlockchainNames) => {
  const walletsData: IWalletData[] = useSelector((state: AppState) => state.wallets.walletsData)

  const wallet = useMemo(() => {
    if (!address) {
      return undefined
    }

    return walletsData.find(
      (item: IWalletData) =>
        item.calculatedAddress.toLowerCase() === address.toLowerCase() && item.blockchain === chainId,
    )
  }, [walletsData, chainId, address])

  return wallet
}

const TxLayout = ({ action, displayAmount, from, to, chainId, fee, url }: ITxLayout) => {
  const assetSymbol = CHAIN_CONFIGS[chainId].symbol
  const defaultIcon = CHAIN_CONFIGS[chainId].logo

  const wallet = useTargetWallet(from, chainId)

  const fromAddress = from || wallet?.calculatedAddress || ''

  const handleClickExplorerAddress = useCallback(
    (address: string) => {
      const url = getAddressExplorerLink(chainId, address)
      if (url) {
        window.open(url, '_blank')
      }
    },
    [chainId],
  )

  const toAddress = to || from

  return (
    <Styled.Container>
      <Styled.StyledCard noShadow>
        <Styled.Row>
          <Styled.Left>
            <Styled.SBold onClick={() => fromAddress && handleClickExplorerAddress(fromAddress)}>
              {makeShortString(fromAddress || '', 4, 4)}
            </Styled.SBold>

            {wallet && <Small>{formatName(wallet.name, 24)}</Small>}
          </Styled.Left>

          <Styled.Right>
            <Styled.Address fontWeight={400} onClick={() => toAddress && handleClickExplorerAddress(toAddress)}>
              {makeShortString(toAddress || '', 4, 4)}
            </Styled.Address>

            <Small fontWeight={400}>Smart Contract</Small>
          </Styled.Right>
        </Styled.Row>

        <Styled.Column>
          <FlexRow flex="1" justifyContent="space-between" width="100%">
            <Small fontWeight={400}>Resource</Small>
            <Styled.Link fontWeight={400} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {formatName(new URL(url).hostname, 24)}
            </Styled.Link>
          </FlexRow>

          {wallet && (
            <FlexRow flex="1" justifyContent="space-between" width="100%" mt="7px">
              <Small fontWeight={400}>Wants to connect on</Small>
              <Styled.SNetwork fontWeight={400}>
                {blockchainNames[wallet.blockchain]} <Styled.AssetIcon src={defaultIcon} />
              </Styled.SNetwork>
            </FlexRow>
          )}

          <FlexRow flex="1" justifyContent="space-between" width="100%" mt="7px">
            <Small fontWeight={400}>Method</Small>
            <Styled.SAction fontWeight={400}>{action}</Styled.SAction>
          </FlexRow>
        </Styled.Column>

        <Styled.Column>
          {displayAmount ? (
            <FlexRow flex="1" justifyContent="space-between" width="100%">
              <Small fontWeight={400}>Amount to send</Small>
              <Small>{`${nFormatter(Number(displayAmount), ASSET_BALANCE_PRECISION)} ${assetSymbol}`}</Small>
            </FlexRow>
          ) : null}

          {fee ? (
            <FlexRow flex="1" justifyContent="space-between" width="100%" mt="5px">
              <Styled.SBold>Total with gas fee</Styled.SBold>
              <Styled.SBold>{`${nFormatter(fee, ASSET_BALANCE_PRECISION)} ${assetSymbol}`}</Styled.SBold>
            </FlexRow>
          ) : null}
        </Styled.Column>
      </Styled.StyledCard>
    </Styled.Container>
  )
}

export default memo(TxLayout)
