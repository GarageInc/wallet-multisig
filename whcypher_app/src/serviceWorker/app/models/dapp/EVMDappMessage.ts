import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ethers } from 'ethers'
import { hexlify } from 'ethers/lib/utils'
import { isNil } from 'lodash'
import logger from 'src/app/helpers/appLogger'
import { BaseDappMessage } from 'src/serviceWorker/app/models/dapp/interfaces/BaseDappMessage'
import { EthereumChain } from 'src/serviceWorker/app/models/EthereumChain'
import { IMessage } from 'src/shared/interfaces/interfaces'

// This model transforms dapps requested params to application usable parameters
// - hex strings to BigNumber
// - prepare some fields for specific RPC-calls (personal_sign/sign)
// - dapp messages validation
export default class EVMDappMessage extends BaseDappMessage {
  readonly transferRequest: any
  readonly method: string //need to type better

  constructor(msg: any, messageId: number, chainId: BlockchainNames, time: number, senderUrl?: string) {
    super(messageId, chainId, time, senderUrl)
    if (isNil(msg) || isNil(msg.params)) throw 'Message must contain params'
    if (msg.params.value && ethers.BigNumber.isBigNumber(msg.params.value)) {
      msg.params.value = ethers.BigNumber.from(msg.params.value).toHexString()
    }
    if (msg.params.gasLimit && ethers.BigNumber.isBigNumber(msg.params.gasLimit)) {
      msg.params.gasLimit = ethers.BigNumber.from(msg.params.gasLimit).toHexString()
    }
    if (msg.params.gasPrice && ethers.BigNumber.isBigNumber(msg.params.gasPrice)) {
      msg.params.gasPrice = ethers.BigNumber.from(msg.params.gasPrice).toHexString()
    }
    if (msg.params.data && !msg.params.data.length) {
      msg = {
        ...msg,
        params: {
          ...msg.params,
          data: hexlify(Object.values(msg.params.data)),
        },
      }
    }
    if (msg.method === 'personal_sign') {
      // swap params from and data
      if (!ethers.utils.isAddress(msg.params.from) && ethers.utils.isAddress(msg.params.data)) {
        msg = {
          ...msg,
          params: {
            ...msg.params,
            from: msg.params.data,
            data: msg.params.from,
          },
        }
      }
    }
    super.rawMessage = msg
    this.method = msg.method
    this.transferRequest = msg.params
  }

  static from = (
    msg: any,
    messageId: number,
    chainId: BlockchainNames,
    time: number,
    senderUrl?: string,
  ): EVMDappMessage => new EVMDappMessage(msg, messageId, chainId, time, senderUrl)

  validate = (getWalletIdWithMessage: (msg: IMessage) => void): void => {
    if (this.method === 'eth_requestAccounts') return
    if (this.method === 'eth_sendTransaction') {
      const message = this.getParsedMessage()
      const transferRequest = this.transferRequest
      logger.info('validating request', {
        msg: message,
        transferRequest,
      })

      if (!EthereumChain.validateAddress(transferRequest.from)) {
        throw 'Not a valid from address'
      }

      if (transferRequest.to && !EthereumChain.validateAddress(transferRequest.to)) {
        throw 'Not a valid to address'
      }

      getWalletIdWithMessage(message)
    }
  }
}
