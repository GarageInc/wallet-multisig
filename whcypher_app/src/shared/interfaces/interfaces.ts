import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { Runtime } from 'webextension-polyfill'

export type IMessage = {
  origin?: Runtime.MessageSender
  raw: any
  time: number
  messageId: number
  chainId: BlockchainNames
  senderUrl?: string
}
