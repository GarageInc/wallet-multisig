import { EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames, ofEthereumFamily } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { useDAppsController } from './uiControllers'

export const useConnectedWalletsAndChain = () => {
  const currentTab = useSelector((s: AppState) => s.dapps.currentTab)
  const currentChain = useSelector((s: AppState) => s.application.currentChain)
  const dappsConnections = useSelector((s: AppState) => s.dapps.dappsConnections)
  const { id } = currentTab

  const dapp = dappsConnections[id]

  const connectedIds = useMemo(() => {
    return dapp?.walletIds || []
  }, [dapp])

  return {
    connectedIds,
    currentChain,
  }
}

export const useConnectedWeb3AccountsHandlers = () => {
  const currentTab = useSelector((s: AppState) => s.dapps.currentTab)

  const { id: dappId } = currentTab

  const { connectedIds, currentChain } = useConnectedWalletsAndChain()

  const [selectedWallets, setSelectedWallets] = useState<Array<string>>(() => connectedIds)

  const wallets = useSelector((s: AppState) => s.wallets.walletsData.filter((w) => ofEthereumFamily(w.blockchain)))

  const handleWalletsChange = useCallback(
    (walletIds: Array<string>) => {
      setSelectedWallets(walletIds)
    },
    [setSelectedWallets],
  )

  const dAppsController = useDAppsController()

  const selectCurrentDappWallet = useCallback(
    (walletId: string, chain?: BlockchainNames) => {
      const targetWallet = wallets.find((w: IWalletData) => w.walletId === walletId)
      dAppsController.addWalletCloneToDappOnBlockchain(
        walletId,
        dappId,
        (chain || targetWallet?.blockchain) as EthereumFamilyChains,
      )
    },
    [dAppsController, dappId, wallets],
  )

  const dappActiveWalletId = connectedIds[0] || ''

  const removeWalletFromDApp = useCallback(
    (walletId: string) => {
      const nextActiveWalletId = connectedIds[1]
      dAppsController.removeWalletFromDappConnectedWallets(walletId, dappId)

      if (walletId === dappActiveWalletId && nextActiveWalletId) {
        selectCurrentDappWallet(nextActiveWalletId)
      }
    },
    [dAppsController, connectedIds, dappActiveWalletId, dappId, selectCurrentDappWallet],
  )

  return {
    selectedWallets,
    handleWalletsChange,
    currentTab,
    currentChain,
    removeWalletFromDApp,
    wallets,
    selectCurrentDappWallet,
    dappActiveWalletId,
    connectedIds,
    dAppsController,
  }
}
