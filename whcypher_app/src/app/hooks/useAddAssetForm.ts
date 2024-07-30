import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import { addAssetToWallet, closeSnackBar, getBlockchainMetaInfo, setSnackBarError } from '../helpers/backgroundMethods'

export interface IWatchAssetForm {
  assetAddress: string
  type?: string | null
  name: string | null
  ticker: string | null
  decimals: string | null
  chainId?: BlockchainNames
}

// This hook is used to load asset data via chain service
export const useAddAssetForm = (walletId?: string | null, goBack?: () => void, defaultValues?: IWatchAssetForm) => {
  const [formData, setForm] = useState<IWatchAssetForm>(() => {
    return (
      defaultValues || {
        assetAddress: '',
        type: null,
        name: null,
        ticker: null,
        decimals: null,
      }
    )
  })

  useEffect(() => {
    if (defaultValues) {
      setForm((prev) => {
        if (!prev?.assetAddress) {
          return defaultValues
        }
        return prev
      })
    }
  }, [defaultValues])

  const [assetAddressPattern, setAssetAddressPattern] = useState<string>('.*')

  const [walletData, setWalletData] = useState<any>({})

  const [loading, setLoading] = useState<boolean>(false)

  const walletsData: any[] = useSelector((state: AppState) => state.wallets.walletsData)

  useEffect(() => {
    if (walletData.blockchain) {
      getBlockchainMetaInfo(walletData.blockchain, (result: any) => {
        setLoading(false)
        setAssetAddressPattern(result.destinationPattern)
      })
    }
  }, [walletData.blockchain, setLoading])

  useEffect(() => {
    if (walletId) {
      const walletData = walletsData.find((data) => data.walletId === walletId)
      setWalletData(walletData)
    }
  }, [walletId, walletsData])

  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  const setErrorWithTimeout = useCallback(
    (message = '', duration = 3000) => {
      if (snackbarTimeout) {
        closeSnackBar()
        clearTimeout(snackbarTimeout)
        setTimeout(() => {
          setSnackBarError(message)
          const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
          setSnackbarTimeout(newSnackbarTimeout)
        }, 200)
      } else {
        setSnackBarError(message)
        const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
        setSnackbarTimeout(newSnackbarTimeout)
      }
    },
    [snackbarTimeout],
  )

  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)
    }
  }, [snackbarOpen, snackbarTimeout])

  const handleAdd = useCallback(() => {
    const { assetAddress, ticker } = formData
    if (assetAddress.length > 0 && assetAddress.match(assetAddressPattern) && ticker) {
      setLoading(true)
      const assetData = [formData.assetAddress]
      addAssetToWallet(walletId, assetData, (response: any) => {
        setLoading(false)
        if (!response.error) {
          goBack && goBack()
        }
      })
    } else {
      setErrorWithTimeout('Asset data is inconsistent or invalid')
    }
  }, [assetAddressPattern, goBack, formData, walletId, setErrorWithTimeout, setLoading])

  return {
    formData,
    setForm,
    assetAddressPattern,
    setAssetAddressPattern,
    loading,
    setLoading,
    handleAdd,
    walletData,
  }
}
