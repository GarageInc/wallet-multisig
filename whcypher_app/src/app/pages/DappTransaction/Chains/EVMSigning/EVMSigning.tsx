import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { memo, useEffect, useMemo, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { DashLine, FlexBox, Tab, Table, Tabs } from 'src/app/componentElements'
import Small from 'src/app/componentElements/Typography/Body/Small'
import Label from 'src/app/componentElements/Typography/Label/Label'
import { IResSigInfo } from 'src/app/hooks/useParsedEvmTxSignature'
import { useFeesCalculation } from 'src/app/pages/WalletPage/hooks'
import { IFeeEstimates } from 'src/app/pages/WalletPage/SendForm/FeeSection/FeeSection'

import { Card, HexContainer, ParamsContainer, Row, ScrollingContainer, SFeeSection, TabPanel } from './styles'

interface EVMSigning {
  params: any
  txData: any
  walletId: string
  sigInfo?: IResSigInfo
  setExternalFeeFormData: (data: any) => void
  feeEstimates?: IFeeEstimates
  setFeeEstimates: (v: IFeeEstimates) => void
}

const EVMSigning = ({
  feeEstimates,
  setFeeEstimates,
  sigInfo,
  txData,
  params,
  walletId,
  setExternalFeeFormData,
}: EVMSigning) => {
  const [tabValue, setTabValue] = useState(0)

  const [loadingFee, setLoadingFee] = useState(true)

  const spendData = useMemo(() => {
    return {
      assetType: CHAIN_ADAPTERS.EVM_SMART_CONTRACT,
      destination: txData.toAddress,
      ...txData,
    }
  }, [txData])

  const {
    walletData,
    balances,
    feeParams,
    feeOptions,
    setFeeOptions,
    setFeeParams,
    manualFeeKeys,
    setManualFeeKeys,
    feeFormData,
    setFeeFormData,
  } = useFeesCalculation(walletId)

  useEffect(() => {
    setExternalFeeFormData(feeFormData)
  }, [feeFormData, setExternalFeeFormData])

  return (
    <Card>
      <FlexBox>
        <Tabs>
          <Tab title="Fees" handleClick={() => setTabValue(0)} />
          <Tab title="Data" handleClick={() => setTabValue(1)} />
          <Tab title="HEX" handleClick={() => setTabValue(2)} />
        </Tabs>
      </FlexBox>
      <SwipeableViews axis="x" index={tabValue} onChangeIndex={(value: number) => setTabValue(value)}>
        <TabPanel value={0}>
          <SFeeSection
            walletData={walletData}
            balances={balances}
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
            spendData={spendData}
            feeEstimates={feeEstimates}
            setFeeEstimates={setFeeEstimates}
          ></SFeeSection>
        </TabPanel>
        <TabPanel value={1}>
          <ScrollingContainer>
            <Row>
              <Label>Function type</Label>
              <Small>{sigInfo?.type || 'Unknown'}</Small>
            </Row>
            <DashLine />
            {!!sigInfo?.params.length && (
              <>
                <ParamsContainer>
                  <Label>Parameters</Label>
                  <Table keys={['type', 'data']} data={sigInfo?.params as any[]} />
                </ParamsContainer>
                <DashLine />
              </>
            )}
          </ScrollingContainer>
        </TabPanel>
        <TabPanel value={2}>
          <ScrollingContainer>
            <Row>
              <Label>Data HEX</Label>
              <Small>{`Bytes ${(params?.data?.length - 2) / 2}`}</Small>
            </Row>
            <HexContainer>
              <Label>{params.data}</Label>
            </HexContainer>
          </ScrollingContainer>
        </TabPanel>
      </SwipeableViews>
    </Card>
  )
}

export default memo(EVMSigning)
