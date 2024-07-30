import { CircularProgress } from '@material-ui/core'
import { ITxData } from '@walletconnect/types'
import { EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { serializeError as serializeRPCError } from 'eth-rpc-errors'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { FlexBox } from 'src/app/componentElements'
import H3 from 'src/app/componentElements/Typography/Headings/H3'
import { WALLET_REQUESTS_PATH } from 'src/app/constants/paths'
import Logger from 'src/app/helpers/appLogger'
import { initDappTransaction, resolveTransactionSession } from 'src/app/helpers/backgroundMethods'
import getError from 'src/app/helpers/errorHelper'
import {
  useChainsController,
  useDappMessageParser,
  useDAppsController,
  useNotifications,
} from 'src/app/hooks/uiControllers'
import { useParsedEvmTxSignature } from 'src/app/hooks/useParsedEvmTxSignature'

import DappRequestedTemplate from '../../../components/DappRequestedTemplate/DappRequestedTemplate'
import TxLayout from '../../../components/Layout/TxLayout/TxLayout'
import { IFeeEstimates } from '../../WalletPage/SendForm/FeeSection/FeeSection'
import EVMSigning from './EVMSigning/EVMSigning'
import { TransactionMsg } from './interface'
import { Container } from './styles'

type BaseAmountInput = {
  amount: BigNumber | string | number
  decimals: number
}

const GWEI = 10 ** 9

function getFee(txData: ITxData, feeEstimates?: IFeeEstimates) {
  if (txData.gasPrice && txData.gasLimit)
    return BigNumber.from(txData.gasPrice).mul(BigNumber.from(txData.gasLimit)).div(GWEI).toNumber()

  if (feeEstimates) {
    return feeEstimates.fees.reduce((acc, item) => acc + item.value, 0)
  }

  return 0
}

const isBaseAmountInput = (amount: string | BaseAmountInput) =>
  amount && amount.hasOwnProperty('amount') && amount.hasOwnProperty('decimals')

const DAppTransactionEVM = ({ transactionMsg }: TransactionMsg) => {
  const { addNotification } = useNotifications()
  const dAppsController = useDAppsController()

  const chainId: BlockchainNames = useMemo(() => transactionMsg?.chainId, [transactionMsg])

  const [isRequestInProcess, setRequestInProcess] = useState(false)

  const controller = useDappMessageParser()

  const walletId = useMemo(() => controller.getWalletIdWithMessage(transactionMsg), [controller, transactionMsg])

  const chains = useChainsController()

  const history = useHistory()

  const txData = useMemo(
    () => chains.getChainControllerByChain(transactionMsg.chainId as EthereumFamilyChains).getTxData(transactionMsg),
    [chains, transactionMsg],
  )

  const [feeFormData, setFeeFormData] = useState<any>()

  const handleApprove = useCallback(async () => {
    setRequestInProcess(true)
    try {
      // TODO: We don't need txData, need to save transactionMsg via bson and extract txData in chain service
      initDappTransaction(walletId, transactionMsg, feeFormData, (response: any) => {
        setRequestInProcess(false)
        if (response.transactionData) {
          resolveTransactionSession(response.transactionData.sessionId)
          history.push({
            pathname: WALLET_REQUESTS_PATH,
            search: `?walletId=${walletId}&sessionId=${response.transactionData.sessionId}`,
          })
        } else if (response.error.value) {
          // TODO mark value field with error
          addNotification({
            title: 'Error',
            message: response.error.value,
          })
        }
      })

      dAppsController.removeMessageById(transactionMsg.messageId)
    } catch (e: any) {
      const error: any = serializeRPCError(e)
      Logger.error(`Transfer error`, { error })
      addNotification({
        title: 'Transfer error',
        message: getError(error, chainId),
      })
      Logger.error({ transactionMsg: `Error in message approval`, e })
    } finally {
      setRequestInProcess(false)
    }
  }, [dAppsController, feeFormData, history, walletId, transactionMsg, chainId, addNotification])

  const url = useMemo(() => transactionMsg.origin?.url || '', [transactionMsg.origin?.url])
  const params: any = useMemo(
    () => (transactionMsg.raw.params.length ? transactionMsg.raw.params[0] : transactionMsg.raw.params),
    [transactionMsg],
  )

  const amountForRender = useMemo(() => {
    const amount = params.amount || params.value || '0'
    if (amount) {
      const isBaseAmount = isBaseAmountInput(amount)
      if (isBaseAmount) return ethers.utils.formatUnits(params.amount?.amount, params.amount?.decimals).toString()
      else {
        return ethers.utils.formatUnits(ethers.BigNumber.from(amount).toString()).toString()
      }
    }
    return '0'
  }, [params.amount, params.value])

  const [feeEstimates, setFeeEstimates] = useState<IFeeEstimates | undefined>()

  const fee = useMemo(() => getFee(txData, feeEstimates), [txData, feeEstimates])

  const { sigInfo } = useParsedEvmTxSignature(params, txData)

  if (!transactionMsg) {
    return (
      <FlexBox alignItems="center" justifyContent="center" margin="auto" width="100%">
        <H3>No pending dApps transaction requests.</H3>
      </FlexBox>
    )
  }

  return (
    <DappRequestedTemplate
      onSubmit={handleApprove}
      confirmLabel="Confirm"
      loading={isRequestInProcess}
      checkFromAddress={true}
      closeOnEnd={true}
      dappMessage={transactionMsg}
      showTrust={false}
    >
      <>
        {isRequestInProcess ? (
          <CircularProgress style={{ color: 'white' }} size={16} />
        ) : (
          <Container>
            <TxLayout
              url={url}
              displayAmount={amountForRender}
              action={sigInfo?.type || 'approve'}
              from={params.from}
              to={params.to || params.recipient}
              isTokenTransfer={false}
              chainId={chainId}
              fee={Number(fee)}
            />
            <EVMSigning
              sigInfo={sigInfo}
              setExternalFeeFormData={setFeeFormData}
              params={params}
              walletId={walletId}
              txData={txData}
              feeEstimates={feeEstimates}
              setFeeEstimates={setFeeEstimates}
            />
          </Container>
        )}
      </>
    </DappRequestedTemplate>
  )
}

export default DAppTransactionEVM
