import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

// [TODO] add comments; Default - returns active wallet data (the first in accounts list), or return a desired wallet
// [TODO] rename this to useDappWallet
export const useDappActiveWallet = (targetWalletId?: string): IWalletData | undefined => {
  const {
    wallets: { walletsData },
    dapps: { dappsConnections, currentTab },
  } = useSelector((state: AppState) => state)

  // Get active dapp wallet or prevent selection for targeted
  const firstWalletId = useMemo(
    () => targetWalletId || dappsConnections[currentTab?.id]?.walletIds?.[0],
    [targetWalletId, dappsConnections, currentTab],
  )

  return useMemo(
    () => walletsData.find((item: IWalletData) => item.walletId === firstWalletId),
    [firstWalletId, walletsData],
  )
}
