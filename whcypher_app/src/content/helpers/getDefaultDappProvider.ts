import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import { ConfigChanges } from './getConfigChanges'

export const getDefaultDappProvider = (configObj: ConfigChanges) => {
  return {
    settings: {
      ethereumProvider: {
        ethereumFamilyChain: configObj.ethereumProvider?.ethereumFamilyChain ?? BlockchainNames.Ethereum,
      },
      prioritiseMultisig: configObj.prioritiseMultisig ?? true,
    },
  }
}
