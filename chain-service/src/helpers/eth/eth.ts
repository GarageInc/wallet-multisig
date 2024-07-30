import { isHexPrefixed } from 'ethereumjs-util';
import { EthereumFamilyChains } from './../../helpers/chain-types';
import { BlockchainNames } from './../../helpers/supportedBlockchains';

export function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return isHexPrefixed(str) ? str.slice(2) : str;
}

export enum FEE_TYPES {
  ESTIMATE_FEE = 0,
  L1_TRADE_FEE = 1,
}

export const explorerURL: {
  [key in EthereumFamilyChains]: any;
} = {
  [BlockchainNames.Ethereum]: {
    CHAIN_ID: 1,
    ENDPOINT: `https://rpc.ankr.com/eth`,
  },
  [BlockchainNames.EthereumRopsten]: {
    CHAIN_ID: 3,
    ENDPOINT: `https://rpc.ankr.com/eth_ropsten`,
  },
  [BlockchainNames.EthereumGoerli]: {
    CHAIN_ID: 5,
    ENDPOINT: `https://rpc.ankr.com/eth_goerli`,
  },
  [BlockchainNames.BinanceSmartChain]: {
    CHAIN_ID: 56,
    ENDPOINT: `https://bsc-dataseed.binance.org`,
  },
  [BlockchainNames.Polygon]: {
    CHAIN_ID: 137,
    ENDPOINT: `https://polygon-rpc.com`,
  },
  [BlockchainNames.Avalanche]: {
    CHAIN_ID: 43114,
    ENDPOINT: `https://api.avax.network/ext/bc/C/rpc`,
  },
  [BlockchainNames.ArbitrumOne]: {
    CHAIN_ID: 42161,
    ENDPOINT: `https://rpc.ankr.com/arbitrum`,
  },
  [BlockchainNames.Optimism]: {
    CHAIN_ID: 10,
    ENDPOINT: `https://rpc.ankr.com/optimism`,
  },
};

export const ERC20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    type: 'function',
  },
];

export const ERC721Abi = [
  {
    constant: true,
    inputs: [{ name: '_interfaceID', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    // Metadata from CryptoKitties Core
    constant: true,
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_preferredTransport', type: 'string' },
    ],
    name: 'tokenMetadata',
    outputs: [{ name: 'infoUrl', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    // Metadata from ERC721Metadata standard
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'count', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    // Token listing from CryptoKitties Core
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: 'ownerTokens', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    // Token listing from ERC721Enumerable standard
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    // Token transfer from CryptoKitties Core
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    // Token transfer from ERC721 standard
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const all = {
  explorerURL: explorerURL,
  ERC20Abi: ERC20Abi,
  ERC721Abi: ERC721Abi,
};

export default all;
