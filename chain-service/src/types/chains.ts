import { BlockchainNames } from 'helpers/supportedBlockchains';

export type IChainConfig = Record<BlockchainNames, IChainItem>;

export interface IChainItem {
  id: BlockchainNames;
  chain: string;
  name: string;
  fullName?: string;
  symbol: string;
  chainSymbol?: string;
  logo: string;
  image: string; // URL or raw image data
  type: string; // e.g. ethereum, bitcoin, binancedex
  config: {
    transaction?: string;
    address?: string;
    chainId?: number | string;
    tokenApproveChecker?: string;
    rpcUrl?: string;
  };
  decimals: number; // number of decimal places accepted (precision)
  tokens?: {
    symbol: string;
    address: string;
  }[];
}
