export type ChainInfoMap = { readonly [key in BlockchainNames]: string };

export enum BlockchainNames {
  Ethereum = 'Ethereum',
  Bitcoin = 'Bitcoin',
  BinanceSmartChain = 'BinanceSmartChain',
  BitcoinTestnet = 'BitcoinTestnet',
  EthereumRopsten = 'EthereumRopsten',
  EthereumGoerli = 'EthereumGoerli',
  Litecoin = 'Litecoin',
  Dogecoin = 'Dogecoin',
  BitcoinCash = 'BitcoinCash',
  Avalanche = 'Avalanche',
  Optimism = 'Optimism',
  ArbitrumOne = 'ArbitrumOne',
  Polygon = 'Polygon',
  Tron = 'Tron',
  TronShasta = 'TronShasta',
}

export const blockchainList: BlockchainNames[] = [
  BlockchainNames.Bitcoin,
  BlockchainNames.Ethereum,
  BlockchainNames.BinanceSmartChain,
  BlockchainNames.Polygon,
  BlockchainNames.Avalanche,
  BlockchainNames.Optimism,
  BlockchainNames.ArbitrumOne,
  BlockchainNames.Litecoin,
  BlockchainNames.Dogecoin,
  BlockchainNames.BitcoinCash,
  BlockchainNames.Tron,
  BlockchainNames.BitcoinTestnet,
  BlockchainNames.EthereumRopsten,
  BlockchainNames.EthereumGoerli,
  BlockchainNames.TronShasta,
];

export const blockchainCoinNames: ChainInfoMap = {
  [BlockchainNames.Bitcoin]: 'BTC',
  [BlockchainNames.Ethereum]: 'ETH',
  [BlockchainNames.BinanceSmartChain]: 'BNB',
  [BlockchainNames.Polygon]: 'MATIC',
  [BlockchainNames.Avalanche]: 'AVAX',
  [BlockchainNames.ArbitrumOne]: 'ETH',
  [BlockchainNames.Optimism]: 'ETH',
  [BlockchainNames.Litecoin]: 'LTC',
  [BlockchainNames.Dogecoin]: 'DOGE',
  [BlockchainNames.BitcoinCash]: 'BCH',
  [BlockchainNames.Tron]: 'TRX',
  [BlockchainNames.BitcoinTestnet]: 'BTC Testnet',
  [BlockchainNames.EthereumRopsten]: 'ETH Ropsten',
  [BlockchainNames.EthereumGoerli]: 'ETH Goerli',
  [BlockchainNames.TronShasta]: 'TRX Shasta',
};

export const blockchainNames: ChainInfoMap = {
  [BlockchainNames.Bitcoin]: 'Bitcoin',
  [BlockchainNames.Ethereum]: 'Ethereum',
  [BlockchainNames.BinanceSmartChain]: 'Binance Smart Chain',
  [BlockchainNames.Polygon]: 'Polygon',
  [BlockchainNames.Avalanche]: 'Avalanche',
  [BlockchainNames.ArbitrumOne]: 'Arbitrum One',
  [BlockchainNames.Optimism]: 'Optimism',
  [BlockchainNames.Litecoin]: 'Litecoin',
  [BlockchainNames.Dogecoin]: 'Dogecoin',
  [BlockchainNames.BitcoinCash]: 'Bitcoin Cash',
  [BlockchainNames.Tron]: 'Tron',
  [BlockchainNames.BitcoinTestnet]: 'Bitcoin Testnet',
  [BlockchainNames.EthereumRopsten]: 'Ropsten',
  [BlockchainNames.EthereumGoerli]: 'Goerli',
  [BlockchainNames.TronShasta]: 'Tron Shasta',
};

export const blockchainCoinTickers: ChainInfoMap = {
  [BlockchainNames.Bitcoin]: 'BTC',
  [BlockchainNames.Ethereum]: 'ETH',
  [BlockchainNames.BinanceSmartChain]: 'BNB',
  [BlockchainNames.Polygon]: 'MATIC',
  [BlockchainNames.Avalanche]: 'AVAX',
  [BlockchainNames.ArbitrumOne]: 'ETH',
  [BlockchainNames.Optimism]: 'ETH',
  [BlockchainNames.Litecoin]: 'LTC',
  [BlockchainNames.Dogecoin]: 'DOGE',
  [BlockchainNames.BitcoinCash]: 'BCH',
  [BlockchainNames.Tron]: 'TRX',
  [BlockchainNames.BitcoinTestnet]: 'BTC:TESTNET',
  [BlockchainNames.EthereumRopsten]: 'ETH:ROPSTEN',
  [BlockchainNames.EthereumGoerli]: 'ETH:GOERLI',
  [BlockchainNames.TronShasta]: 'TRX:SHASTA',
};

export const ofBitcoinFamily = function ofBitcoinFamily(blockchain: string) {
  return (
    blockchain === BlockchainNames.Bitcoin ||
    blockchain === BlockchainNames.BitcoinTestnet ||
    blockchain === BlockchainNames.Litecoin ||
    blockchain === BlockchainNames.Dogecoin ||
    blockchain === BlockchainNames.BitcoinCash
  );
};

export const ofEthereumFamily = function ofEthereumFamily(blockchain: string) {
  return (
    blockchain === BlockchainNames.Ethereum ||
    blockchain === BlockchainNames.BinanceSmartChain ||
    blockchain === BlockchainNames.Polygon ||
    blockchain === BlockchainNames.Avalanche ||
    blockchain === BlockchainNames.Optimism ||
    blockchain === BlockchainNames.ArbitrumOne ||
    blockchain === BlockchainNames.EthereumRopsten ||
    blockchain === BlockchainNames.EthereumGoerli
  );
};

export const isUnsupportedNetwork = (blockchain?: string) => {
  return (
    blockchain === BlockchainNames.EthereumRopsten ||
    // blockchain === BlockchainNames.EthereumGoerli ||
    blockchain === 'Solana'
  );
};
