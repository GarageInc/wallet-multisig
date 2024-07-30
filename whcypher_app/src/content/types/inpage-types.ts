import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface ITotalsigWeb3 {
  installed: boolean
  common?: {
    requestAccounts: RequestAccounts
  }
  ethereum?: any
  info?: IInfo
}

interface IInfo {
  lastConfigChanges: any
  version: string
}

export type RequestAccounts = (chainId: BlockchainNames, callbackFunction: any) => void
