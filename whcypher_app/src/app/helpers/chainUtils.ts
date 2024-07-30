// Remove, duplicated
import { BlockchainNames, CHAIN_CONFIGS } from '@whalesheaven/chain-service/src/helpers/chain-types'

export const getAddressExplorerLink = (_chain: BlockchainNames, _address: string) => {
  const urlPrefix = CHAIN_CONFIGS[_chain]?.config?.address || undefined
  if (urlPrefix) {
    const res = `${urlPrefix}${_address}`
    return res
  }
  return null
}
