import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { isEqual } from 'lodash'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { getAdapterMetaInfo, getWalletData, updateWalletBalances } from 'src/app/helpers/backgroundMethods'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

export interface ISpendData {
  assetId?: string | null
  assetType?: string | null
  destination: string
  value: string | number
  sendAll: boolean
}

interface IAssetOption {
  name: string
  id: string
  type: string
}

export interface IPresets {
  assetId?: string
  assetType?: string
  value?: any
}

export const useFeesCalculation = (
  walletId: string,
  setSpendData?: Dispatch<SetStateAction<ISpendData>>,
  assetIdProvided?: string,
  valueProvided?: string,
) => {
  const [walletData, setWalletData] = useState<IWalletData>({} as IWalletData)
  const [balances, setBalances] = useState<any[]>([])

  const [manualFeeKeys, setManualFeeKeys] = useState<string[]>([])

  const [feeParams, setFeeParams] = useState<any>({})
  const [feeOptions, setFeeOptions] = useState({})

  const [loading, setLoading] = useState(false)

  const [destinationPattern, setDestinationPattern] = useState(new RegExp('.*'))

  useEffect(() => {
    setLoading(true)
    getWalletData(walletId, (response: any) => {
      if (response.walletData && !isEqual(response.walletData, walletData)) {
        setWalletData(response.walletData)
      }

      setLoading(false)
    })
  }, [walletId, walletData])

  const [selectCoinsOptions, setSelectCoinsOptions] = useState<any[]>([])

  const [coinOptions, setCoinOptions] = useState<IAssetOption | undefined>()
  const [assetIdSelected, setAssetIdSelected] = useState<string | undefined>()

  const onCoinChanged = useCallback(
    (assetId: string) => {
      const coinOption = selectCoinsOptions.find((option) => option.id === assetId)

      setSpendData &&
        setSpendData((prev) => {
          return {
            ...prev,
            assetId,
            assetType: coinOption ? coinOption.type : CHAIN_ADAPTERS.COIN,
          }
        })
    },
    [selectCoinsOptions, setSpendData],
  )

  const presetFormAttributes = useMemo(
    () => ({
      assetId: assetIdSelected,
      assetType: coinOptions?.type,
      value: '',
    }),
    [assetIdSelected, coinOptions],
  )

  const [loadingFee, setLoadingFee] = useState(true)

  useEffect(() => {
    if (!walletData || !walletData.balances) {
      return
    }
    if (walletData.blockchain) {
      setLoadingFee(true)

      const coinBalance = walletData.balances[0]
      const assetOptions = [
        {
          id: coinBalance.assetId,
          name: coinBalance.name,
          type: 'coin',
        },
      ]

      const assetData = [assetOptions[0].id, assetOptions[0].type, {}]

      getAdapterMetaInfo(walletData.blockchain, assetData, walletData.calculatedAddress, (response: any) => {
        // Assign selected coins routine
        const coinBalance = walletData.balances[0]
        const assetOptions = [
          {
            id: coinBalance.assetId,
            name: coinBalance.name,
            type: 'coin',
          },
        ]

        let assetIdSelected = assetOptions[0].id

        for (let i = 0; i < walletData.assetsData.length; i++) {
          const newAssetOption = {
            id: walletData.assetsData[i][0],
            type: walletData.assetsData[i][1],
            name: walletData.assetsData[i][2].ticker,
          }

          assetOptions.push(newAssetOption)

          if (newAssetOption.id === assetIdProvided) {
            assetIdSelected = newAssetOption.id
          }
        }

        setSelectCoinsOptions((prev) => {
          if (isEqual(prev, assetOptions)) {
            return prev
          }

          return assetOptions
        })

        onCoinChanged(assetIdSelected)

        // Handle adapter metadata
        setDestinationPattern(new RegExp(response.destinationPattern))
        setFeeParams(response.feeParams.params)

        const feeKeys = Object.keys(response.feeParams.params)
        setManualFeeKeys(feeKeys)

        if (response.feeParams.options) {
          setFeeOptions(response.feeParams.options)
        }

        updateWalletBalances(walletId, (response: any) => {
          if (response.balances) {
            setLoading(false)
            setBalances(response.balances)
          }
        })
      })
    }
    const coinBalance = walletData.balances[0]
    const assetOptions = [
      {
        id: coinBalance.assetId,
        name: coinBalance.name,
        type: CHAIN_ADAPTERS.COIN,
      },
    ]

    setCoinOptions(assetOptions[0])
    setAssetIdSelected(assetOptions[0].id)

    for (let i = 0; i < walletData.assetsData.length; i++) {
      const newAssetOption = {
        id: walletData.assetsData[i][0],
        type: walletData.assetsData[i][1],
        name: walletData.assetsData[i][2].ticker,
      }

      assetOptions.push(newAssetOption)

      if (newAssetOption.id === assetIdProvided) {
        setCoinOptions(newAssetOption)
        setAssetIdSelected(newAssetOption.id)
      }
    }

    setSelectCoinsOptions((prev) => {
      if (isEqual(prev, assetOptions)) {
        return prev
      }

      return assetOptions
    })
    assetIdSelected && onCoinChanged(assetIdSelected)
  }, [walletData, walletId, assetIdProvided, valueProvided, assetIdSelected, onCoinChanged])

  useEffect(() => {
    if (setSpendData) {
      const formed = { ...presetFormAttributes }
      if (valueProvided) {
        formed.value = valueProvided
      }

      setSpendData((form: ISpendData) => ({
        ...form,
        ...presetFormAttributes,
        ...manualFeeKeys.reduce((acc, feeName) => ({ ...acc, [feeName]: 0 }), {}),
      }))
    }
  }, [manualFeeKeys, setSpendData, presetFormAttributes, valueProvided])

  const [feeFormData, setFeeFormData] = useState<any>({
    feeRate: 50,
    manualFee: false,
  })

  return {
    destinationPattern,
    walletData,
    loading,
    balances,
    feeParams,
    feeOptions,
    setFeeOptions,
    setFeeParams,
    manualFeeKeys,
    setManualFeeKeys,
    feeFormData,
    setFeeFormData,
    selectCoinsOptions,
    onCoinChanged,
    loadingFee,
    setLoadingFee,
  }
}
