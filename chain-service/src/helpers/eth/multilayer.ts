import { BlockchainNames } from './../../helpers/supportedBlockchains';

export function isMultiLayerFeeNetwork(network: string) {
  return network === BlockchainNames.Optimism;
}
