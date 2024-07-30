import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface ITabItem {
  id: BlockchainNames
  isVisible: boolean
  address: string
}

export interface ICurrentTab {
  id: string
  url: string
  domain: string
  title: string
  favicon: string
}

export interface IEVMSend {
  fromAddress: string
  toAddress: string
  address: string
  amount: string
  isToken: boolean
  nonce: number
  maxPriorityFeePerGas?: number
  maxFeePerGas?: number
  gasPrice?: number
  gasLimit: number
  data?: string
  decimals: number
}

export interface ITx extends IEVMSend {
  memo: string
  baseFee?: number
}
