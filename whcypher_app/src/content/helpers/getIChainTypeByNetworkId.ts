import { CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

/**
 * Return the BlockchainNames
 * @param networkId networkId Number (1, 3, ...)
 * @returns the BlockchainNames
 * @throw error if not supported by
 */
export const getIChainTypeByNetworkId = (networkId: number): BlockchainNames => {
  const chainsVal: any[] = Object.values(CHAIN_CONFIGS)
  for (let i = 0; i < chainsVal.length; i++) {
    const chainInfo = chainsVal[i]
    if (chainInfo.config.chainId === networkId) {
      return chainInfo.id
    }
  }

  throw new Error(`getIChainTypeByNetworkId error for ${networkId}`)
}
