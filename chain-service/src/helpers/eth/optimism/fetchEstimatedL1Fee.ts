import buildUnserializedTransaction from './buildUnserializedTransaction';

// Snippet of the ABI that we need
// Should we need more of it at some point, the full ABI can be found here:
// https://github.com/ethereum-optimism/optimism/blob/develop/gas-oracle/abis/OVM_GasPriceOracle.json
const OPTIMISM_GAS_PRICE_ORACLE_ABI = [
  {
    inputs: [{ internalType: 'bytes', name: '_data', type: 'bytes' }],
    name: 'getL1Fee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// BlockExplorer link: https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000f#code
const OPTIMISM_GAS_PRICE_ORACLE_ADDRESS = '0x420000000000000000000000000000000000000F';

// Garageinc | 31.05.2023: https://community.optimism.io/docs/developers/build/transaction-fees/#the-l1-data-fee
export default async function fetchEstimatedL1Fee(txMeta: any, web3: any) {
  const contract = new web3.eth.Contract(
    OPTIMISM_GAS_PRICE_ORACLE_ABI,
    OPTIMISM_GAS_PRICE_ORACLE_ADDRESS
  );
  const serializedTransaction = buildUnserializedTransaction(txMeta).serialize();
  const result = await contract.methods.getL1Fee(serializedTransaction).call();
  return result;
}
