import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ChainInfoMap } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export const blockchainCurves: ChainInfoMap = {
  [BlockchainNames.Bitcoin]: 'secp256k1',
  [BlockchainNames.Ethereum]: 'secp256k1',
  [BlockchainNames.BinanceSmartChain]: 'secp256k1',
  [BlockchainNames.Polygon]: 'secp256k1',
  [BlockchainNames.Avalanche]: 'secp256k1',
  [BlockchainNames.ArbitrumOne]: 'secp256k1',
  [BlockchainNames.Optimism]: 'secp256k1',
  [BlockchainNames.Litecoin]: 'secp256k1',
  [BlockchainNames.Dogecoin]: 'secp256k1',
  [BlockchainNames.BitcoinCash]: 'secp256k1',
  [BlockchainNames.Tron]: 'secp256k1',
  [BlockchainNames.BitcoinTestnet]: 'secp256k1',
  [BlockchainNames.EthereumRopsten]: 'secp256k1',
  [BlockchainNames.EthereumGoerli]: 'secp256k1',
  [BlockchainNames.TronShasta]: 'secp256k1',
}
