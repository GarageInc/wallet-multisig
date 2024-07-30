/* eslint-disable @typescript-eslint/no-var-requires */
import { IJsonRpcRequest } from '@walletconnect/types'

const Subprovider = require('web3-provider-engine/subproviders/subprovider')

// Params for EIP721 sign methods https://eips.ethereum.org/EIPS/eip-712
export class EIP712Subprovider extends Subprovider {
  handleRequest(payload: IJsonRpcRequest, next: any, _end: any) {
    switch (payload.method) {
      case 'eth_signTypedData':
        {
          payload.params[2] = {
            version: 'V1',
          }
        }
        break
      case 'eth_signTypedData_v2':
        {
          payload.params[2] = {
            version: 'V2',
          }
        }
        break
      case 'eth_signTypedData_v3':
        {
          payload.params[2] = {
            version: 'V3',
          }
        }
        break
      case 'eth_signTypedData_v4':
        {
          payload.params[2] = {
            version: 'V4',
          }
        }
        break
    }

    next()
  }
}
