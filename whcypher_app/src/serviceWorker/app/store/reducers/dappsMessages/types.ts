import { IMessage } from 'src/shared/interfaces/interfaces'
import { Runtime } from 'webextension-polyfill'

export interface IDappMsg {
  origin?: Runtime.MessageSender
  timestamp: number
}

export interface IDappsMessagesController {
  messages: Array<IMessage>
  lastConnectMessage: IDappMsg
  lastRejectMessage: IDappMsg
}
