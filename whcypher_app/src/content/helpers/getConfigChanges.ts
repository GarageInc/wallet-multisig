import { CHAIN_CONFIGS, EthereumFamilyChains } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { IDappsProvidersState } from 'src/serviceWorker/app/store/reducers/dappsProviders/types'
import { ICustomRPCUrls } from 'src/serviceWorker/app/store/reducers/settingsReducer'

import { extractRPCUrls } from './extractRPCUrls'

export type ConfigChanges = {
  ethereumProvider?: {
    accounts?: string[]
    chainId?: number
    rpcUrl?: string
    ethereumFamilyChain?: EthereumFamilyChains
  }
  prioritiseMultisig?: boolean
  initialization?: boolean
  chainType?: BlockchainNames
}

export const getConfigChanges = (
  chainType: EthereumFamilyChains,
  customRpcUrls: ICustomRPCUrls,
  obj?: IDappsProvidersState,
  addresses?: string[],
): ConfigChanges => {
  const chainInfo = CHAIN_CONFIGS[chainType]
  if (!chainInfo.config) {
    throw new Error(`getConfigChanges error: Chain ${chainType} does not have config`)
  }
  const customRPCUrlsFormatted = extractRPCUrls(customRpcUrls)
  const rpcUrl = customRPCUrlsFormatted?.[chainType]?.rpc

  const chainId = chainInfo.config.chainId

  return {
    ethereumProvider: {
      chainId: Number(chainId),
      rpcUrl,
      ethereumFamilyChain: chainType,
      accounts: addresses,
    },
    prioritiseMultisig: obj?.settings.prioritiseMultisig,
  }
}
