import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ethErrors } from 'eth-rpc-errors'
import { ConfigChanges } from 'src/content/helpers/getConfigChanges'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { BROWSER_MESSAGES } from '../constants/browserMessages'
import { broadcaseMessage } from './broadcastChannel'

// Sends all configs(window.totalsig) from UI to Service worker via Browser API
export const emitNewChainConfig = (c: ConfigChanges) => {
  broadcaseMessage(BROWSER_MESSAGES.EMIT_NEW_BG_CONFIGS, {
    config: c,
  })
}

// Sends dapp connection(confirmation) from Popup to BGP(service worker)
export const confirmConnection = (messageId: number, addresses: string[]) => {
  broadcaseMessage(BROWSER_MESSAGES.CONFIRM_CONNECTION, {
    messageId,
    addresses,
  })
}

export const responseToDapp = (dappMessage: IMessage) => {
  broadcaseMessage(BROWSER_MESSAGES.RESPONSE_TO_DAPP, {
    dappMessage,
  })
}

// Sends dapp rejected connection from Popup to BGP(service worker)
export const rejectConnection = (requestMessage: IMessage, error = ethErrors.provider.userRejectedRequest()) => {
  broadcaseMessage(BROWSER_MESSAGES.REJECT_CONNECTION, { requestMessage, error })
}

// Send redux dispatch actions to service worker store
export const dispatchToServiceWorker = (dispatchData: any) => {
  broadcaseMessage(BROWSER_MESSAGES.DISPATCH, dispatchData)
}

// Request updating addresses for current active dapp
export const updateAddressesForDApp = (chainId: BlockchainNames) => {
  broadcaseMessage(BROWSER_MESSAGES.UPDATE_ADDRESSES, { chainId })
}

// Request updating addresses for dapp by current dappMessage
export const checkDappAccounts = (dappMessage: IMessage, chain: BlockchainNames) => {
  broadcaseMessage(BROWSER_MESSAGES.CHECK_DAPP_ACCOUNTS, { dappMessage, chain })
}
