import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import axios, { AxiosError } from 'axios'

const FALLBACK_MESSAGE =
  'Oops, something went wrong! Your data remains unaffected and this issue has been reported, we will fix it soon!'

//Error codes taken from https://github.com/MetaMask/eth-rpc-errors/blob/main/src/error-constants.ts
export const ERROR_MAPPER: { [key: string]: string } = {
  DUST: 'Transaction has been rejected by the network due to dust UTXO. Try to send a larger amount with a lower fee tier, or add more funds to your wallet before sending them all out.',
  INSUFFICIENT_FUNDS: 'You probably do not have enough funds to complete this transaction.',

  '-32601': 'The smart contract you are interacting does not allow the action you want to perform.',

  '-32603': FALLBACK_MESSAGE,

  '-32003': 'Your transaction has been rejected by the server, please try again later.',

  '-32004': 'The smart contract you are interacting does not allow the action you want to perform.',

  '-32005':
    'Your request has been blocked due to trying multiple times in a short amount of time. Please try again later. ',

  '4001': 'User rejected the request.',

  '4100': 'The requested account and/or method has not been authorized by the user.',

  '4200':
    'The requested action is not supported by the Provider. Please choose a different RPC Provider from Settings for the concerned chain',

  '4900': 'The provider is disconnected from all chains.',

  '4901': 'The provider is disconnected from the specified chain.',
}

const ERROR_KEYS = Object.keys(ERROR_MAPPER)

const getDefaultErrorMessage = (error: any) => {
  if (axios.isAxiosError(error)) return (error as AxiosError<any>).response?.data.message ?? error.message

  if (error?.message) return error?.message

  return FALLBACK_MESSAGE
}

const checkIfErrorKeyExists = (errorKey: any) => ERROR_KEYS.includes(String(errorKey))

const getError = (error: any, chainId?: BlockchainNames): string => {
  if (error?.code === 'SERVER_ERROR') {
    return FALLBACK_MESSAGE
  }

  if (error?.message === 'Attempting to use a disconnected port object') {
    return 'Please make sure you are connecting using the expected chain and try again.'
  }

  const errorKey = checkIfErrorKeyExists(error?.data?.originalError?.name)
    ? String(error?.data?.originalError?.name)
    : checkIfErrorKeyExists(error?.data?.originalError?.code)
    ? String(error?.data?.originalError?.code)
    : String(error?.code)

  if (!chainId) {
    if (ERROR_KEYS.includes(errorKey)) return ERROR_MAPPER[errorKey]
    return getDefaultErrorMessage(error)
  }

  switch (chainId) {
    case BlockchainNames.Bitcoin:
    case BlockchainNames.BitcoinTestnet:
    case BlockchainNames.BitcoinCash:
    case BlockchainNames.Litecoin:
    case BlockchainNames.Dogecoin:
      if (error?.data?.originalError?.response?.data?.includes?.('dust')) return ERROR_MAPPER['DUST']
      if (ERROR_KEYS.includes(errorKey)) return ERROR_MAPPER[String(errorKey)]
      return getDefaultErrorMessage(error)
    case BlockchainNames.Ethereum:
    case BlockchainNames.Polygon:
    case BlockchainNames.Avalanche:
    case BlockchainNames.BinanceSmartChain:
    case BlockchainNames.ArbitrumOne:
    case BlockchainNames.EthereumGoerli:
    case BlockchainNames.EthereumRopsten:
    default:
      if (ERROR_KEYS.includes(errorKey)) return ERROR_MAPPER[String(errorKey)]
      return getDefaultErrorMessage(error)
  }
}

export default getError
