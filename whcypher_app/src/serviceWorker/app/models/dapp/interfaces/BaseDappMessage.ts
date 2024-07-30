import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { IMessage } from 'src/shared/interfaces/interfaces'
import { Runtime } from 'webextension-polyfill'

export abstract class BaseDappMessage {
  rawMessage: any
  origin: Runtime.MessageSender | undefined
  readonly messageId: number
  readonly time: number
  readonly chainId: BlockchainNames
  readonly senderUrl?: string

  constructor(messageId: number, chainId: BlockchainNames, time: number, senderUrl?: string) {
    this.messageId = messageId
    this.chainId = chainId
    this.time = time
    this.senderUrl = senderUrl
  }

  abstract validate(getWalletIdWithMessage: (msg: IMessage) => void): void

  setOrigin = (origin: Runtime.MessageSender | undefined) => {
    this.origin = origin
  }

  getParsedMessage = (): IMessage => ({
    chainId: this.chainId,
    origin: this.origin,
    messageId: this.messageId,
    raw: this.rawMessage,
    time: this.time,
    senderUrl: this.senderUrl,
  })
}
