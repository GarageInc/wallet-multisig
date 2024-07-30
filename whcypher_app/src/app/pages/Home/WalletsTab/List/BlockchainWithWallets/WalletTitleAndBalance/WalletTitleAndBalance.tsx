import { Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { Skeleton } from '@material-ui/lab'
import { useCallback } from 'react'
import { COLORS } from 'src/app/componentElements/Colors'
import { setActiveAccountHiddenWallet } from 'src/app/helpers/backgroundMethods'
import { formatCurrency, formatName, sigFigsLimitedSpace } from 'src/app/helpers/formatters'
import { ConnectedBadge } from 'src/app/pages/Home/Home/ConnectedBadge/ConnectedBadge'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import { SContainer, SIconButton, SLeft, SRight, STitle } from './styleds'

export const WalletTitleAndBalance = ({ walletData }: { walletData: IWalletData }) => {
  const onWalletHide = useCallback((walletId: string) => {
    setActiveAccountHiddenWallet(walletId, true, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  const onWalletShow = useCallback((walletId: string) => {
    setActiveAccountHiddenWallet(walletId, false, (result: any) => {
      if (result && result.success) {
        // Show success message here?
      }
    })
  }, [])

  return (
    <SContainer>
      <SLeft>
        <STitle>
          {formatName(walletData.name, 21)}
          <ConnectedBadge walletId={walletData.walletId} />
        </STitle>

        {!walletData.isHidden && (
          <Tooltip arrow placement="top" title="Mark as hidden">
            <SIconButton
              onClick={(e) => {
                e.stopPropagation()
                onWalletHide(walletData.walletId)
              }}
            >
              <VisibilityIcon style={{ fontSize: 16, color: COLORS.palette.grey }} />
            </SIconButton>
          </Tooltip>
        )}
        {walletData.isHidden && (
          <Tooltip arrow placement="top" title="Mark as visible">
            <SIconButton
              onClick={(e) => {
                e.stopPropagation()
                onWalletShow(walletData.walletId)
              }}
            >
              <VisibilityOffIcon style={{ fontSize: 16, color: COLORS.palette.grey }} />
            </SIconButton>
          </Tooltip>
        )}
      </SLeft>

      <SRight>
        {walletData.balances && (
          <>
            {(walletData.balances[0]?.balance > 0 || walletData.balances.length > 1) && (
              <div>
                {sigFigsLimitedSpace(walletData.balances[0].balance)} {formatCurrency(walletData.balances[0].assetId)}
              </div>
            )}
          </>
        )}
        {!walletData.balances && <Skeleton animation="wave" variant="text" width="50px" height="20px" />}
      </SRight>
    </SContainer>
  )
}
