import { IChainConfig } from 'types/chains';
import { BlockchainNames, blockchainNames } from './supportedBlockchains';
import { Decimals } from './decimals';
import { explorerURL } from './eth/eth';

// [TODO] Move this to supportedBlockchains
export type EthereumFamilyChains =
  | BlockchainNames.Ethereum
  | BlockchainNames.EthereumGoerli
  | BlockchainNames.EthereumRopsten
  | BlockchainNames.BinanceSmartChain
  | BlockchainNames.Avalanche
  | BlockchainNames.ArbitrumOne
  | BlockchainNames.Polygon
  | BlockchainNames.Optimism;

export const chainIdToIChainType: Record<number | string, BlockchainNames> = {
  137: BlockchainNames.Polygon,
  1: BlockchainNames.Ethereum,
  3: BlockchainNames.EthereumRopsten,
  5: BlockchainNames.EthereumGoerli,
  56: BlockchainNames.BinanceSmartChain,
  43114: BlockchainNames.Avalanche,
  42161: BlockchainNames.ArbitrumOne,
  10: BlockchainNames.Optimism,
};

export const CHAIN_TYPES = Object.freeze(Object.values(BlockchainNames));

export const EVM_CHAINS: EthereumFamilyChains[] = [
  BlockchainNames.Ethereum,
  BlockchainNames.BinanceSmartChain,
  BlockchainNames.Polygon,
  BlockchainNames.Avalanche,
  BlockchainNames.EthereumRopsten,
  BlockchainNames.EthereumGoerli,
  BlockchainNames.ArbitrumOne,
  BlockchainNames.Optimism,
];

export const CHAIN_CONFIGS: IChainConfig = {
  [BlockchainNames.Optimism]: {
    id: BlockchainNames.Optimism,
    chain: blockchainNames[BlockchainNames.Optimism],
    name: 'Optimism',
    symbol: 'ETH',
    chainSymbol: 'ETH',
    type: 'optimism',
    logo: '/static/image/chains/optimism.svg',
    image: '/static/image/chains/optimism.svg',
    config: {
      transaction: `https://optimistic.etherscan.com/tx/`,
      address: `https://optimistic.etherscan.com/address/`,
      tokenApproveChecker: `https://optimistic.etherscan.com/tokenapprovalchecker`,
      rpcUrl: explorerURL[BlockchainNames.Optimism].ENDPOINT,
      chainId: 10,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.Ethereum]: {
    id: BlockchainNames.Ethereum,
    chain: blockchainNames[BlockchainNames.Ethereum],
    name: 'Ethereum',
    symbol: 'ETH',
    chainSymbol: 'ETH',
    type: 'ethereum',

    logo: '/static/image/chains/ethereum.svg',
    image: '/static/image/chains/ethereum.svg',
    config: {
      chainId: 1,
      rpcUrl: explorerURL[BlockchainNames.Ethereum].ENDPOINT,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.EthereumGoerli]: {
    id: BlockchainNames.EthereumGoerli,
    chain: blockchainNames[BlockchainNames.EthereumGoerli],
    name: 'Goerli',
    symbol: 'ETH',
    chainSymbol: 'ETH',
    type: 'goerli',

    logo: '/static/image/chains/ethereum.svg',
    image: '/static/image/chains/ethereum.svg',
    config: {
      chainId: 5,
      rpcUrl: explorerURL[BlockchainNames.EthereumGoerli].ENDPOINT,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.EthereumRopsten]: {
    id: BlockchainNames.EthereumRopsten,
    chain: blockchainNames[BlockchainNames.EthereumRopsten],
    name: 'Ropsten',
    symbol: 'ETH',
    chainSymbol: 'ETH',
    type: 'ropsten',

    logo: '/static/image/chains/ethereum.svg',
    image: '/static/image/chains/ethereum.svg',
    config: {
      chainId: 3,
      rpcUrl: explorerURL[BlockchainNames.EthereumRopsten].ENDPOINT,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.Avalanche]: {
    id: BlockchainNames.Avalanche,
    chain: blockchainNames[BlockchainNames.Avalanche],
    name: 'Avalanche',
    symbol: 'AVAX',
    type: 'avalanche',

    logo: '/static/image/chains/avalanche.svg',
    image: '/static/image/chains/avalanche.svg',
    config: {
      chainId: 43114,
      rpcUrl: explorerURL[BlockchainNames.Avalanche].ENDPOINT,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.ArbitrumOne]: {
    id: BlockchainNames.ArbitrumOne,
    chain: blockchainNames[BlockchainNames.ArbitrumOne],
    name: 'Arbitrum',
    symbol: 'ETH',
    type: 'arbitrum',

    logo: '/static/image/chains/arbitrum.svg',
    image: '/static/image/chains/arbitrum.svg',
    config: {
      tokenApproveChecker: `https://arbiscan.io/tokenapprovalchecker`,
      rpcUrl: explorerURL[BlockchainNames.ArbitrumOne].ENDPOINT,
      chainId: 42161,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.Tron]: {
    id: BlockchainNames.Tron,
    chain: blockchainNames[BlockchainNames.Tron],
    name: 'TRON',
    symbol: 'TRX',
    chainSymbol: 'TRX',
    type: 'tron',
    logo: '/static/image/chains/tron.svg',
    image: '/static/image/chains/tron.svg',
    config: {},
    decimals: Decimals.A18,
  },
  [BlockchainNames.TronShasta]: {
    id: BlockchainNames.TronShasta,
    chain: blockchainNames[BlockchainNames.TronShasta],
    name: 'TRON',
    symbol: 'TRX',
    chainSymbol: 'TRX',
    type: 'tron',
    logo: '/static/image/chains/tron.svg',
    image: '/static/image/chains/tron.svg',
    config: {},
    decimals: Decimals.A18,
  },
  [BlockchainNames.Polygon]: {
    id: BlockchainNames.Polygon,
    chain: blockchainNames[BlockchainNames.Polygon],
    name: 'Polygon',
    symbol: 'MATIC',
    chainSymbol: 'POLY',
    type: 'polygon',

    logo: '/static/image/chains/polygon.svg',
    image: '/static/image/chains/polygon.svg',
    config: {
      chainId: 137,
      rpcUrl: explorerURL[BlockchainNames.Polygon].ENDPOINT,
    },
    decimals: Decimals.A18,
  },
  [BlockchainNames.Bitcoin]: {
    id: BlockchainNames.Bitcoin,
    chain: blockchainNames[BlockchainNames.Bitcoin],
    name: 'Bitcoin',
    symbol: 'BTC',
    chainSymbol: 'BTC',
    type: 'bitcoin',
    logo: '/static/image/chains/bitcoin.svg',
    image: '/static/image/chains/bitcoin.svg',
    config: {
      chainId: 20090103,
      transaction: `https://blockchair.com/bitcoin/transaction/`,
      address: `https://blockchair.com/bitcoin/address/`,
    },
    decimals: Decimals.A8,
  },
  [BlockchainNames.BitcoinTestnet]: {
    id: BlockchainNames.BitcoinTestnet,
    chain: blockchainNames[BlockchainNames.BitcoinTestnet],
    name: 'Bitcoin',
    symbol: 'BTC',
    chainSymbol: 'BTC',
    type: 'bitcoin',
    logo: '/static/image/chains/bitcoin.svg',
    image: '/static/image/chains/bitcoin.svg',
    config: {
      chainId: 20090103,
      transaction: `https://blockchair.com/bitcoin/transaction/`,
      address: `https://blockchair.com/bitcoin/address/`,
    },
    decimals: Decimals.A8,
  },
  [BlockchainNames.Dogecoin]: {
    id: BlockchainNames.Dogecoin,
    chain: blockchainNames[BlockchainNames.Dogecoin],
    name: 'Dogecoin',
    symbol: 'DOGE',
    chainSymbol: 'DOGE',
    type: 'dogecoin',

    logo: '/static/image/chains/dogecoin.svg',
    image: '/static/image/chains/dogecoin.svg',
    config: {
      transaction: `https://blockchair.com/dogecoin/transaction/`,
      address: `https://blockchair.com/dogecoin/address/`,
    },
    decimals: Decimals.A8,
  },
  [BlockchainNames.BinanceSmartChain]: {
    id: BlockchainNames.BinanceSmartChain,
    chain: blockchainNames[BlockchainNames.BinanceSmartChain],
    name: 'BSC',
    fullName: 'BNB Smart Chain',
    symbol: 'BNB',
    chainSymbol: 'BNB',
    type: 'binancesmartchain',
    logo: '/static/image/chains/bsc.svg',
    image: '/static/image/chains/bsc.svg',
    config: {
      chainId: 56,
      rpcUrl: explorerURL[BlockchainNames.BinanceSmartChain].ENDPOINT,
    },
    decimals: Decimals.A18,
  },

  [BlockchainNames.Litecoin]: {
    id: BlockchainNames.Litecoin,
    chain: blockchainNames[BlockchainNames.Litecoin],
    name: 'Litecoin',
    symbol: 'LTC',
    chainSymbol: 'LTC',
    type: 'litecoin',

    logo: '/static/image/chains/litecoin.svg',
    image: '/static/image/chains/litecoin.svg',
    config: {
      transaction: `https://blockchair.com/litecoin/transaction/`,
      address: `https://blockchair.com/litecoin/address/`,
    },
    decimals: Decimals.A8,
  },
  [BlockchainNames.BitcoinCash]: {
    id: BlockchainNames.BitcoinCash,
    chain: blockchainNames[BlockchainNames.BitcoinCash],
    name: 'BCH',
    fullName: 'Bitcoin Cash',
    symbol: 'BCH',
    chainSymbol: 'BCH',
    type: 'bitcoincash',

    logo: '/static/image/chains/bitcoincash.svg',
    image: '/static/image/chains/bitcoincash.svg',
    config: {},
    decimals: Decimals.A8,
  },
};
