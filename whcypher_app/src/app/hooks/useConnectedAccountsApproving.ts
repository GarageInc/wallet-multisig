import { EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'
import { IMessage } from 'src/shared/interfaces/interfaces'

import getError from '../helpers/errorHelper'
import { useDAppsController, useNotifications } from './uiControllers'
import { useCurrentDappProviderChain } from './useCurrentDappProviderChain'

export const useConnectedAccountsApproving = (
  message: IMessage,
  onConfirm: (ids: string[]) => void,
  ignoreSecondStep = false,
) => {
  const url = message?.origin?.tab?.url || 'http://localhost'
  const domain = new URL(url).hostname
  const logo = message?.origin?.tab?.favIconUrl || ''
  const title = message?.origin?.tab?.title || ''

  const dappsConnections = useSelector((state: AppState) => state.dapps.dappsConnections)

  const connectedIds = useMemo(() => {
    return dappsConnections[domain]?.walletIds || []
  }, [domain, dappsConnections])

  const [hasUserSelectedAccounts, setHasUserSelectedAccounts] = useState(ignoreSecondStep)
  const [selectedWallets, setSelectedWallets] = useState<Array<string>>(() => connectedIds)

  const dAppsController = useDAppsController()
  const ethereumFamilyChain = useCurrentDappProviderChain()
  const [chainId] = useState(message?.chainId ?? ethereumFamilyChain)

  const { addNotification } = useNotifications()

  const handleConfirm = useCallback(async () => {
    if (hasUserSelectedAccounts) {
      try {
        dAppsController.addRequestedDApp(domain, chainId as EthereumFamilyChains, selectedWallets, logo, title)
        await onConfirm(selectedWallets)
      } catch (e: any) {
        addNotification({
          title: 'Failed to connect to DApp',
          message: getError(e, chainId),
        })
      }
    } else if (selectedWallets.length > 0) {
      setHasUserSelectedAccounts(true)
    }
  }, [
    dAppsController,
    domain,
    logo,
    onConfirm,
    hasUserSelectedAccounts,
    selectedWallets,
    chainId,
    title,
    addNotification,
  ])

  return {
    handleConfirm,
    hasUserSelectedAccounts,
    chainId,
    selectedWallets,
    setSelectedWallets,
    setHasUserSelectedAccounts,
  }
}
