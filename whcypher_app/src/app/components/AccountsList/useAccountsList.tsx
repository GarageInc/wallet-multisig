import {
  BlockchainNames,
  isUnsupportedNetwork,
  ofEthereumFamily,
} from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebouncedEffect } from 'src/app/hooks/useDebouncedEffect'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

export const SEARCH_DEBOUNCE_MILLISECONDS = 300

const getSupportedWallets = (w: IWalletData[]) =>
  w.filter((item) => ofEthereumFamily(item.blockchain)).filter((item) => !isUnsupportedNetwork(item.blockchain))

const useAccountsList = (
  chainId: BlockchainNames,
  onChange: (val: Array<string>, walletId: string) => void,
  selectedWalletIds: Array<string>,
) => {
  const { walletsData: wallets } = useSelector((state: AppState) => state.wallets)

  const [keyword, setKeyword] = useState('')
  const [walletItems, setWalletItems] = useState<IWalletData[]>(() => getSupportedWallets(wallets))

  useDebouncedEffect(
    () => {
      updateWalletItems()
    },
    SEARCH_DEBOUNCE_MILLISECONDS,
    [keyword, chainId],
  )

  const updateWalletItems = useCallback(() => {
    const result: IWalletData[] = getSupportedWallets(wallets).filter(
      (o) => !keyword || o.name.toLowerCase().includes(keyword.toLowerCase()),
    )
    setWalletItems(result)
  }, [keyword, wallets])

  const isSelectedAll = useMemo(() => {
    return selectedWalletIds.length > 0 && walletItems.length === selectedWalletIds.length
  }, [selectedWalletIds.length, walletItems.length])

  const handleSelectAll = useCallback(() => {
    onChange(isSelectedAll ? [] : walletItems.map((wallet: IWalletData) => wallet.walletId), '')
  }, [isSelectedAll, onChange, walletItems])

  return {
    handleSelectAll,
    isSelectedAll,
    keyword,
    walletItems,
    setKeyword,
  }
}

export default useAccountsList
