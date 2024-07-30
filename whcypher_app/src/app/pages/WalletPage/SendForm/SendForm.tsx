import { Box, Button, CircularProgress } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { AppState } from 'src/serviceWorker/app/store/store'
import { isNft } from 'src/serviceWorker/app/utils/assetTypes'

import NumberInput from '../../../components/Form/NumberInput/NumberInput'
import SelectInput from '../../../components/Form/SelectInput/SelectInput'
import TextInput from '../../../components/Form/TextInput/TextInput'
import { WALLET_REQUESTS_PATH } from '../../../constants/paths'
import { getAvailableERC721, initTransaction, resolveTransactionSession } from '../../../helpers/backgroundMethods'
import { sigFigs } from '../../../helpers/formatters'
import { ISpendData, useFeesCalculation } from './../hooks'
import DestinationsBook from './../SelectForm/DestinationsBook'
import FeeSection, { IFeeEstimates, moreThanZeroValidation } from './../SendForm/FeeSection/FeeSection'
import { SContactIcon, SContentWrapper, SCrossIcon, SLink, SNextBlock, SRow } from './styleds'

const BottomInfo = ({
  loading,
  spendData,
  getBalance,
  transactionEstimateAvailable,
  transactionEstimateValue,
  transactionEstimateValueBase,
}: {
  loading: boolean
  spendData: ISpendData
  getBalance: (id: any) => any
  transactionEstimateAvailable: boolean
  transactionEstimateValue: number
  transactionEstimateValueBase: string
}) => {
  return (
    <SRow>
      {loading || spendData.value <= getBalance(spendData.assetId) ? (
        <span>{`Available: ${getBalance(spendData.assetId)}`}</span>
      ) : (
        <span style={{ color: 'red' }}>{`Available: ${getBalance(spendData.assetId)}`}</span>
      )}
      {transactionEstimateAvailable && <span>{`~ ${transactionEstimateValue} ${transactionEstimateValueBase}`}</span>}
    </SRow>
  )
}

const SendForm = () => {
  const history = useHistory()

  const rates: any = useSelector((state: AppState) => state.currencyRates.rates)

  // REFACTOR same way as it is done in WalletPage
  const {
    walletId = '',
    assetIdProvided,
    valueProvided,
  } = useMemo(() => {
    const params = new URLSearchParams(history.location.search)
    const walletId = params.get('walletId') || ''
    const assetIdProvided = params.get('assetId') || ''
    const valueProvided = params.get('value') || ''
    return { walletId, assetIdProvided, valueProvided }
  }, [history])

  const [feeEstimates, setFeeEstimates] = useState<IFeeEstimates | undefined>()
  const [spendData, setSpendData] = useState<ISpendData>({
    assetId: null,
    assetType: null,
    destination: '',
    value: 0,
    sendAll: false,
  })

  const {
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
  } = useFeesCalculation(walletId, setSpendData, assetIdProvided, valueProvided)

  const [selectKnownDestination, setSelectKnownDestination] = useState(false)
  const [knownDestination, setKnownDestination] = useState<any>(null)

  const [spendDataErrors, setSpendDataErrors] = useState({
    destination: '',
    value: '',
  })

  const [selectNTFOptions, setSelectNFTOptions] = useState([])
  const [requestInProcess, setRequestInProcess] = useState(false)

  const [transactionEstimateAvailable, setTransactionEstimateAvailable] = useState(false)
  const [transactionEstimateValue, setTransactionEstimateValue] = useState(0)
  const [transactionEstimateValueBase, setTransactionEstimateValueBase] = useState('')

  const getBalance = useCallback(
    (assetId = '') => {
      if (loading) return '...'
      const coinData = balances.find((b) => b.assetId === assetId)
      if (coinData) {
        return sigFigs(coinData.balance, 5)
      }
      return '-'
    },
    [balances, loading],
  )

  useEffect(() => {
    if (!spendData.assetId) {
      return
    }

    const assetBalance = getBalance(spendData.assetId)
    if (spendData.assetId && rates[spendData.assetId] && assetBalance) {
      const value = spendData.sendAll ? assetBalance : spendData.value
      const transactionValue = rates[spendData.assetId] * +value

      setTransactionEstimateAvailable(!Number.isNaN(transactionValue))
      setTransactionEstimateValue(Number.isNaN(transactionValue) ? 0 : sigFigs(transactionValue, 4))
      setTransactionEstimateValueBase('USD' || '')
    }
  }, [spendData.value, spendData.assetId, spendData.sendAll, rates, getBalance])

  useEffect(() => {
    if (isNft(spendData.assetType)) {
      getAvailableERC721(walletId, spendData.assetId, (response: any) => {
        if (response.assets) {
          setSelectNFTOptions(response.assets)
          setSpendData((prev) => ({ ...prev, value: response.assets[0].id }))
        }
      })
    }
  }, [spendData.assetId, spendData.assetType, walletId])

  const updateInputErrors = useCallback(
    (formField: string, value: string | boolean | number) => {
      let fieldInvalid = false
      let fieldMessage = ''

      if (formField === 'destination') {
        fieldInvalid = typeof value === 'string' && value.length > 0 && !destinationPattern.test(value)
        if (fieldInvalid) fieldMessage = 'Destination in not correct'
      } else if (formField === 'value') {
        fieldInvalid = moreThanZeroValidation(spendData.destination)
        if (fieldInvalid) fieldMessage = 'Destination in not correct'
      }

      setSpendDataErrors((prev) => {
        return {
          ...prev,
          [formField]: fieldMessage,
        }
      })

      return !fieldInvalid
    },
    [spendData, destinationPattern],
  )

  const onInputChanged = useCallback(
    (formField: string, value: string | boolean | number) => {
      setSpendData((prev) => {
        return { ...prev, [formField]: value }
      })
      updateInputErrors(formField, value)
    },
    [setSpendData, updateInputErrors],
  )

  const onNTFChanged = useCallback(
    (value: number) => {
      setSpendData((prev) => ({
        ...prev,
        value,
      }))
    },
    [setSpendData],
  )

  const onRequestButton = useCallback(() => {
    setRequestInProcess(true)
    const assetData = walletData.assetsData.find((assetsData: any) => assetsData[0] === spendData.assetId)

    initTransaction(walletId, assetData, spendData, feeFormData, (response: any) => {
      setRequestInProcess(false)
      if (response.transactionData) {
        resolveTransactionSession(response.transactionData.sessionId)
        history.push({
          pathname: WALLET_REQUESTS_PATH,
          search: `?walletId=${walletId}&sessionId=${response.transactionData.sessionId}`,
        })
      } else if (response.error.value) {
        // TODO mark value field with error
      }
    })
  }, [walletData.assetsData, walletId, history, feeFormData, spendData])

  const onDestinationBookClicked = useCallback(() => {
    if (!knownDestination) {
      setSelectKnownDestination(true)
    } else {
      onInputChanged('destination', '')
      setSelectKnownDestination(false)
      setKnownDestination(false)
    }
  }, [knownDestination, onInputChanged])

  const onDestinationBookSelectedEntry = useCallback(
    (selectedKnownDestination: any) => {
      onInputChanged('destination', selectedKnownDestination.address)
      setKnownDestination(selectedKnownDestination)
    },
    [onInputChanged, setKnownDestination],
  )

  const onDestinationBookGoBack = useCallback(() => {
    setSelectKnownDestination(false)
  }, [setSelectKnownDestination])

  return (
    <>
      {!selectKnownDestination ? (
        <SContentWrapper title="Send" goBack={() => history.goBack()}>
          <FlexBox>
            <SelectInput
              label="Currency"
              value={spendData.assetId || ''}
              list={selectCoinsOptions}
              onInputChanged={(v) => onCoinChanged(v)}
              toolTip="Specify which currency you want to send. If you can not see the desired currency, try to refresh wallet balance on previous page."
            />

            <SNextBlock>
              <TextInput
                label="Destination address"
                value={spendData.destination}
                onInputChanged={(v) => onInputChanged('destination', v)}
                disabled={knownDestination}
                info={knownDestination && knownDestination.name}
                error={spendDataErrors['destination']}
                toolTip={`${walletData.blockchain} address where you want to send funds.`}
                icon={
                  knownDestination ? (
                    <SCrossIcon color={COLORS.palette.red} onClick={() => onDestinationBookClicked()} />
                  ) : (
                    <SContactIcon onClick={() => onDestinationBookClicked()} />
                  )
                }
              />
            </SNextBlock>

            <SNextBlock marginBottom="34px">
              {!isNft(spendData.assetType) && (
                <>
                  <SLink onClick={() => onInputChanged('sendAll', !spendData.sendAll)}>
                    {!spendData.sendAll ? 'Send all' : 'Send custom'}
                  </SLink>

                  {spendData.sendAll ? (
                    <TextInput
                      label="Amount"
                      value="Send all"
                      disabled={true}
                      extraStyles={{ marginBottom: 15 }}
                      info={
                        <BottomInfo
                          loading={loading}
                          spendData={spendData}
                          getBalance={getBalance}
                          transactionEstimateAvailable={transactionEstimateAvailable}
                          transactionEstimateValue={transactionEstimateValue}
                          transactionEstimateValueBase={transactionEstimateValueBase}
                        />
                      }
                      toolTip="Specify how much you want to send to destination address."
                    />
                  ) : (
                    <NumberInput
                      label="Amount"
                      disabled={requestInProcess}
                      value={spendData.value}
                      onInputChanged={(e) => onInputChanged('value', e)}
                      extraStyles={{ marginBottom: 15 }}
                      placeholder="0"
                      info={
                        <BottomInfo
                          loading={loading}
                          spendData={spendData}
                          getBalance={getBalance}
                          transactionEstimateAvailable={transactionEstimateAvailable}
                          transactionEstimateValue={transactionEstimateValue}
                          transactionEstimateValueBase={transactionEstimateValueBase}
                        />
                      }
                      toolTip="Specify how much you want to send to destination address."
                    />
                  )}
                </>
              )}
              {isNft(spendData.assetType) && (
                <>
                  <SelectInput
                    label="Token ID"
                    disabled={requestInProcess}
                    value={spendData.value || ''}
                    list={selectNTFOptions}
                    onInputChanged={(v) => onNTFChanged(+v)}
                    toolTip="Specify which token you want to send by selecting its ID"
                  />
                </>
              )}
            </SNextBlock>

            <FeeSection
              walletData={walletData}
              selectCoinsOptions={selectCoinsOptions}
              balances={balances}
              spendData={spendData}
              feeFormData={feeFormData}
              setFeeFormData={setFeeFormData}
              feeParams={feeParams}
              setFeeParams={setFeeParams}
              manualFeeKeys={manualFeeKeys}
              setManualFeeKeys={setManualFeeKeys}
              setFeeOptions={setFeeOptions}
              feeOptions={feeOptions}
              loadingFee={loadingFee}
              setLoadingFee={setLoadingFee}
              feeEstimates={feeEstimates}
              setFeeEstimates={setFeeEstimates}
            />

            <Box mt="25px">
              <Button
                color="primary"
                variant="contained"
                disabled={requestInProcess || loadingFee}
                onClick={() => onRequestButton()}
                fullWidth
              >
                {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Send'}
              </Button>
            </Box>
          </FlexBox>
        </SContentWrapper>
      ) : (
        <DestinationsBook
          blockchain={walletData.blockchain}
          onSelectDestination={(entry: any) => onDestinationBookSelectedEntry(entry)}
          goBack={() => onDestinationBookGoBack()}
        />
      )}
    </>
  )
}

export default SendForm
