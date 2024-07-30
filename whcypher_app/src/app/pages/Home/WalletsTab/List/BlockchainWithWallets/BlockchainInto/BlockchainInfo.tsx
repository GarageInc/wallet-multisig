import { Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames, blockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import pluralize from 'pluralize'
import { Fragment, useCallback } from 'react'
import { COLORS } from 'src/app/componentElements/Colors'
import { DownIcon, UpIcon } from 'src/app/componentElements/icons'
import {
  setActiveAccountHiddenBlockchain,
  setActiveAccountUnhideBlockchainWallets,
} from 'src/app/helpers/backgroundMethods'
import { ConnectedBadge } from 'src/app/pages/Home/Home/ConnectedBadge/ConnectedBadge'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import { filterWalletsOfBlockchain } from '../../../utilts'
import { SIconButton, SImg, SRight, STitle, STitleContainer, STitleLabel } from './styleds'

export const BlockchainInfo = ({
  hiddenBlockchains,
  blockchain,
  walletsDataWithRequests,
  unhideBlockchainWallets,
}: {
  hiddenBlockchains: string[]
  blockchain: BlockchainNames
  walletsDataWithRequests: IWalletData[]
  unhideBlockchainWallets: string[]
}) => {
  const onBlockchainHide = useCallback((blockchain: string) => {
    setActiveAccountHiddenBlockchain(blockchain, true, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  const onBlockchainShow = useCallback((blockchain: string) => {
    setActiveAccountHiddenBlockchain(blockchain, false, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  const onBlockchainHiddenWalletsShow = useCallback((blockchain: string) => {
    setActiveAccountUnhideBlockchainWallets(blockchain, true, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  const onBlockchainHiddenWalletsHide = useCallback((blockchain: string) => {
    setActiveAccountUnhideBlockchainWallets(blockchain, false, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  const blockchainHiddenWalletsCount = useCallback(
    (blockchain: string) => {
      const walletsData = filterWalletsOfBlockchain(walletsDataWithRequests, blockchain)
      const hiddenWalletsCount = walletsData.reduce(
        (count: number, walletData: any) => (walletData.isHidden ? count + 1 : count),
        0,
      )

      return hiddenWalletsCount
    },
    [walletsDataWithRequests],
  )

  let hiddenWalletsCount

  return (
    <Fragment>
      <STitleContainer
        onClick={() =>
          !hiddenBlockchains.includes(blockchain) ? onBlockchainHide(blockchain) : onBlockchainShow(blockchain)
        }
      >
        <STitle>
          <SImg src={CHAIN_CONFIGS[blockchain].logo} />
          <STitleLabel>
            {blockchainNames[blockchain]}
            <ConnectedBadge blockchain={blockchain} />
          </STitleLabel>
        </STitle>
        <SRight>
          {!hiddenBlockchains.includes(blockchain) ? (
            <>
              {!unhideBlockchainWallets.includes(blockchain) ? (
                <>
                  {(hiddenWalletsCount = blockchainHiddenWalletsCount(blockchain) || 1) && null}
                  <Tooltip
                    arrow
                    placement="top"
                    title={
                      hiddenWalletsCount > 0
                        ? `Show ${hiddenWalletsCount} hidden ${pluralize('wallet', hiddenWalletsCount)}`
                        : 'Show hidden wallets'
                    }
                  >
                    <SIconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onBlockchainHiddenWalletsShow(blockchain)
                      }}
                    >
                      <VisibilityOffIcon style={{ fontSize: 16, color: COLORS.palette.blue }} />
                    </SIconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip arrow placement="top" title="Don't show hidden wallets">
                  <SIconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onBlockchainHiddenWalletsHide(blockchain)
                    }}
                  >
                    <VisibilityIcon style={{ fontSize: 16, color: COLORS.palette.blue }} />
                  </SIconButton>
                </Tooltip>
              )}

              <SIconButton>
                <DownIcon />
              </SIconButton>
            </>
          ) : (
            <SIconButton>
              <UpIcon />
            </SIconButton>
          )}
        </SRight>
      </STitleContainer>
    </Fragment>
  )
}
