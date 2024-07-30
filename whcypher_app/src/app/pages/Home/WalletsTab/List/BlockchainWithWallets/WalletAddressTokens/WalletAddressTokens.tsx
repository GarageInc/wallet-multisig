import { Tooltip } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import pluralize from 'pluralize'
import { COLORS } from 'src/app/componentElements/Colors'
import Copy from 'src/app/components/Copy/Copy'
import { formatAddress } from 'src/app/helpers/formatters'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import { SAddress, SContainer, SLeft, SNew, SRight } from './styleds'

const showNewBadge = (walletData: IWalletData) => walletData.createdAt + 6 * 1000 * 60 * 60 >= Date.now()

export const WalletAddressTokens = ({ walletData }: { walletData: IWalletData }) => {
  return (
    <SContainer>
      <SLeft>
        <Tooltip arrow placement="top" title="Address">
          <SAddress>{formatAddress(walletData.calculatedAddress, 4)}</SAddress>
        </Tooltip>
        <Copy
          iconStyle={{ color: COLORS.palette.grey }}
          text={walletData.calculatedAddress}
          toolTip="Copy wallet address"
        />

        {showNewBadge(walletData) && <SNew>New!</SNew>}
      </SLeft>

      <SRight>
        {walletData.balances && (
          <>
            {walletData.balances.length > 1 && (
              <div>
                {walletData.balances.length - 1} {pluralize('token', walletData.balances.length - 1)}
              </div>
            )}
          </>
        )}
        {!walletData.balances && <Skeleton animation="wave" variant="text" width="50px" height="20px" />}
      </SRight>
    </SContainer>
  )
}
