import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { WALLET_PAGE_PATH } from 'src/app/constants/paths'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import { BackupRequiredBadge, RequestsAmountBadge } from '../Badges/WalletBadges'
import { WalletAddressTokens } from '../WalletAddressTokens/WalletAddressTokens'
import { WalletTitleAndBalance } from '../WalletTitleAndBalance/WalletTitleAndBalance'
import { SWalletEntry } from './styleds'

export const BlockchainWallet = ({ walletData }: { walletData: IWalletData }) => {
  const history = useHistory()

  const openWalletPage = useCallback(
    (walletId: string) =>
      walletId &&
      history.push({
        pathname: WALLET_PAGE_PATH,
        search: `?walletId=${walletId}`,
      }),
    [history],
  )

  const isBackup = walletData.isBackup
  const requestsLength = walletData.requests.length

  return (
    <SWalletEntry
      key={walletData.walletId}
      isHidden={walletData.isHidden}
      isBackupRequired={!isBackup}
      onClick={() => openWalletPage(walletData.walletId)}
    >
      {isBackup && requestsLength > 0 && <RequestsAmountBadge>{requestsLength}</RequestsAmountBadge>}
      {!isBackup && <BackupRequiredBadge>{requestsLength === 0 ? '!' : requestsLength + 1}</BackupRequiredBadge>}

      <WalletTitleAndBalance walletData={walletData} />

      <WalletAddressTokens walletData={walletData} />
    </SWalletEntry>
  )
}
