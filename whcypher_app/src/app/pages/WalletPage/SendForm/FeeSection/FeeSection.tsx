import { Tooltip } from '@material-ui/core'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import Small from 'src/app/componentElements/Typography/Body/Small'
import H3 from 'src/app/componentElements/Typography/Headings/H3'
import { sigFigs } from 'src/app/helpers/formatters'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import _ from 'underscore'

import NumberInput from '../../../../components/Form/NumberInput/NumberInput'
import { estimateTransactionFee } from '../../../../helpers/backgroundMethods'
import { DisplayFee } from './../DisplayFee/DisplayFee'
import { SContainer, SFees, SHelpIcon, SLabel, SManualFee, SRow, SSlider, SSmall, SToggle } from './styleds'

const debouncedEstimateTransactionFee = _.debounce(estimateTransactionFee, 500)

export interface IFeeEstimates {
  fees: {
    value: number
    type: number
    label: string
  }[]
}

export const moreThanZeroValidation = (v: string) => {
  if (parseInt(v, 10) >= 0 || (typeof v === 'string' && !v)) {
    return true
  }
  return false
}

interface IProps {
  walletData: IWalletData
  balances: any[]
  spendData?: any
  feeFormData: any
  setFeeFormData: (v: any) => void
  feeParams: any
  setFeeParams: (v: any) => void
  manualFeeKeys: string[]
  setManualFeeKeys: (v: any) => void
  feeOptions: any
  setFeeOptions: (v: any) => void
  loadingFee: boolean
  setLoadingFee: (v: any) => void
  selectCoinsOptions?: any[]
  feeEstimates?: IFeeEstimates
  setFeeEstimates: (v: IFeeEstimates) => void
  className?: string
}

const FeeSection = ({
  walletData,
  balances,
  selectCoinsOptions,
  spendData,
  feeFormData,
  setFeeFormData,
  feeParams,
  setFeeParams,
  manualFeeKeys,
  setManualFeeKeys,
  feeOptions,
  setFeeOptions,
  loadingFee,
  setLoadingFee,
  setFeeEstimates,
  feeEstimates,
  className,
}: IProps) => {
  const [canSetFeeWithSlider, setCanSetFeeWithSlider] = useState(true)
  const [canSetFeeManual, setCanSetFeeManual] = useState(true)

  useEffect(() => {
    if (walletData.blockchain && balances.length > 0 && (selectCoinsOptions?.length || !selectCoinsOptions)) {
      setLoadingFee(true)

      let assetData
      if (spendData?.assetType === 'coin' && selectCoinsOptions) {
        assetData = [selectCoinsOptions[0].id, selectCoinsOptions[0].type, {}]
      } else {
        assetData = walletData.assetsData.find((assetData) => assetData[0] === spendData?.assetId)
      }

      debouncedEstimateTransactionFee(
        walletData.blockchain,
        assetData,
        walletData.calculatedAddress,
        spendData,
        feeFormData,
        (response: any) => {
          if (response.fees) {
            setFeeEstimates((old: any) => {
              if (!isEqual(old, response.fees)) {
                return response.fees
              }
              return old
            })
            setFeeParams((old: any) => {
              if (!isEqual(old, response.feeParams.params)) {
                return response.feeParams.params
              }
              return old
            })

            const feeKeys = Object.keys(response.feeParams.params)
            setManualFeeKeys((old: any) => {
              if (!isEqual(old, feeKeys)) {
                return feeKeys
              }
              return old
            })

            if (response.feeParams.options) {
              setFeeOptions((old: any) => {
                if (!isEqual(old, response.feeParams.options)) {
                  return response.feeParams.options
                }
                return old
              })
            }
          }
          setLoadingFee(false)
        },
      )
    }
  }, [
    feeFormData,
    spendData,
    walletData,
    balances,
    setFeeEstimates,
    setFeeOptions,
    setFeeParams,
    setLoadingFee,
    setManualFeeKeys,
    selectCoinsOptions,
  ])

  useEffect(() => {
    if (!feeParams) {
      return
    }

    const feeParamsPresent = Object.keys(feeParams).length > 0

    if (feeParamsPresent) {
      setCanSetFeeManual(true)

      let { feeSlider } = feeOptions
      if (typeof feeSlider === 'undefined') feeSlider = true

      setCanSetFeeWithSlider(feeSlider)
    } else {
      setCanSetFeeManual(false)
      setCanSetFeeWithSlider(false)
    }
  }, [feeParams, feeOptions])

  const onFeeInputChanged = useCallback(
    (k: string, v: any, ...validators: any[]) => {
      const testResult = validators.every((validator) => validator(v))
      if (testResult) {
        setFeeFormData({ ...feeFormData, [k]: parseFloat(v) })
      }
    },
    [feeFormData, setFeeFormData],
  )

  return (
    <SContainer className={className}>
      {canSetFeeManual && (
        <>
          {!feeFormData.manualFee ? (
            <SToggle
              onClick={() =>
                setFeeFormData({
                  ...feeFormData,
                  manualFee: !feeFormData.manualFee,
                })
              }
            >
              Advanced
            </SToggle>
          ) : (
            <SToggle
              onClick={() =>
                setFeeFormData({
                  ...feeFormData,
                  manualFee: !feeFormData.manualFee,
                })
              }
            >
              Simple fee
            </SToggle>
          )}
        </>
      )}
      {!feeFormData.manualFee || !canSetFeeManual ? (
        <>
          {canSetFeeWithSlider && (
            <SRow>
              <Small>Cheap</Small>
              <SSlider
                marks={[{ value: 0 }, { value: 100 }]}
                value={feeFormData.feeRate}
                onChange={(_, v) => setFeeFormData({ ...feeFormData, feeRate: v })}
                aria-labelledby="continuous-slider"
              />
              <Small>Fast</Small>
            </SRow>
          )}

          <SFees>
            {feeEstimates ? (
              feeEstimates.fees.map((feeEstimate: any) => {
                const { type, value, label } = feeEstimate

                return (
                  <DisplayFee
                    key={type}
                    label={label || 'Network Fee'}
                    feeEstimate={value}
                    ticker={balances[0]?.ticker}
                    loading={loadingFee}
                  />
                )
              })
            ) : (
              <DisplayFee key={0} label="Network Fee" ticker={balances[0]?.ticker} loading={loadingFee} />
            )}
          </SFees>
        </>
      ) : (
        <>
          {manualFeeKeys.map((manualFeeKey: string) => {
            return (
              <React.Fragment key={manualFeeKey}>
                {feeParams[manualFeeKey].locked && (
                  <SRow marginBottom="8px">
                    <SLabel>
                      {feeParams[manualFeeKey].key}
                      <Tooltip arrow placement="top" title={feeParams[manualFeeKey].hint}>
                        <SHelpIcon />
                      </Tooltip>
                      {feeParams[manualFeeKey].subkey && (
                        <SSmall ml="5px !important">({feeParams[manualFeeKey].subkey})</SSmall>
                      )}
                    </SLabel>

                    <H3 fontWeight={400}>{sigFigs(feeParams[manualFeeKey].value, 4)}</H3>
                  </SRow>
                )}
                {!feeParams[manualFeeKey].locked && (
                  <>
                    <SManualFee>
                      <SLabel>
                        {feeParams[manualFeeKey].key}
                        <Tooltip arrow placement="top" title={feeParams[manualFeeKey].hint}>
                          <SHelpIcon />
                        </Tooltip>
                        {feeParams[manualFeeKey].subkey && <SSmall>(${feeParams[manualFeeKey].subkey})</SSmall>}
                      </SLabel>
                      <NumberInput
                        key={manualFeeKey}
                        value={feeFormData[manualFeeKey] || feeParams[manualFeeKey].value}
                        onInputChanged={(e) => onFeeInputChanged(manualFeeKey, e, moreThanZeroValidation)}
                        extraStyles={{ marginBottom: 5, width: '100%' }}
                      />
                    </SManualFee>
                  </>
                )}
              </React.Fragment>
            )
          })}
        </>
      )}
    </SContainer>
  )
}

export default FeeSection
