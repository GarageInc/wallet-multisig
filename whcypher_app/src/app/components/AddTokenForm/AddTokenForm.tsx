import { Typography } from '@material-ui/core'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { fetchAssetData } from 'src/app/helpers/backgroundMethods'
import { formatAssetType } from 'src/app/helpers/formatters'
import { IWatchAssetForm } from 'src/app/hooks/useAddAssetForm'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

import TextInput from '../Form/TextInput/TextInput'
import styles from './AddTokenForm.module.scss'

const NOT_AVAILABLE = 'N/A'

export const AddTokenForm = ({
  formData,
  setForm,
  walletData,
  assetAddressPattern,
}: {
  assetAddressPattern: string
  walletData: IWalletData
  formData: IWatchAssetForm
  setForm: Dispatch<SetStateAction<IWatchAssetForm>>
}) => {
  const [loadingData, setLoadingData] = useState<boolean>(false)

  const [formErrors, setFormErrors] = useState({ assetAddress: '' })

  useEffect(() => {
    if (walletData.blockchain && formData.assetAddress && formData.assetAddress.match(assetAddressPattern)) {
      setLoadingData(true)
      fetchAssetData(walletData.blockchain, formData.assetAddress, (response: any) => {
        if (response.assetData) {
          setForm((prev) => ({
            ...prev,
            type: response.assetData[1],
            name: response.assetData[2].name,
            ticker: response.assetData[2].ticker,
            decimals: response.assetData[2].decimals,
          }))
        } else {
          setForm((prev) => ({ ...prev, type: null, name: null, ticker: null, decimals: null }))
        }
        setLoadingData(false)
      })
    }
  }, [walletData.blockchain, formData.assetAddress, setForm, assetAddressPattern])

  const onInputChanged = useCallback(
    (formField: string, formValue: string) => {
      if (formField === 'assetAddress') {
        if (formValue.match(assetAddressPattern)) {
          setForm((prev: IWatchAssetForm) => ({ ...prev, [formField]: formValue }))
          setFormErrors((prev) => ({ ...prev, [formField]: '' }))
        } else {
          setFormErrors((prev) => ({
            ...prev,
            [formField]: 'Token address is invalid',
          }))
        }
      }
    },
    [assetAddressPattern, setForm],
  )

  return (
    <div className={styles.container}>
      <TextInput
        label="Asset contract address"
        value={formData.assetAddress}
        error={formErrors.assetAddress}
        onInputChanged={(v) => onInputChanged('assetAddress', v)}
        disabled={loadingData}
      />

      <div className={styles.feeWrapper}>
        <div className={styles.feeInfo}>
          <Typography className={styles.label}>Type:</Typography>
          {!loadingData ? (
            <span>{formData.type ? formatAssetType(walletData.blockchain, formData.type) : NOT_AVAILABLE}</span>
          ) : (
            <span>...</span>
          )}
        </div>

        <div className={styles.feeInfo}>
          <Typography className={styles.label}>Name:</Typography>
          {!loadingData ? <span>{formData.name ? formData.name : NOT_AVAILABLE}</span> : <span>...</span>}
        </div>

        <div className={styles.feeInfo}>
          <Typography className={styles.label}>Ticker:</Typography>
          {!loadingData ? <span>{formData.ticker ? formData.ticker : NOT_AVAILABLE}</span> : <span>...</span>}
        </div>

        {formData.decimals && (
          <div className={styles.feeInfo}>
            <Typography className={styles.label}>Decimals:</Typography>
            {!loadingData ? <span>{formData.decimals ? formData.decimals : NOT_AVAILABLE}</span> : <span>...</span>}
          </div>
        )}
      </div>
    </div>
  )
}
