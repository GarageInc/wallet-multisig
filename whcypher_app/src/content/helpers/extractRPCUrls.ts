import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ICustomRPCUrls } from 'src/serviceWorker/app/store/reducers/settingsReducer'

export const extractRPCUrls = (customUrls: ICustomRPCUrls): ICustomRPCUrls => {
  if (!customUrls || Object.keys(customUrls).length === 0) {
    const chains = Object.keys(CHAIN_CONFIGS) as BlockchainNames[]

    const mapChainWithRpcs = chains.reduce((acc: ICustomRPCUrls, key: BlockchainNames) => {
      acc[CHAIN_CONFIGS[key].id] = { rpc: CHAIN_CONFIGS[key].config.rpcUrl }
      return acc
    }, {} as ICustomRPCUrls)

    return mapChainWithRpcs
  }

  return customUrls
}
