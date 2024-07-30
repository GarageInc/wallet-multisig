import EvmSignRawTx from '../chain/evmSignRawTx';
import Erc20 from '../chain/erc20';
import Erc721 from '../chain/erc721';
import Trc10 from '../chain/trc10';
import Trc20 from '../chain/trc20';
import Trc721 from '../chain/trc721';
import EvmSmartContract from '../chain/evmSmartContract';
import { CHAIN_ADAPTERS } from './adapters';

// [TODO] THisn about renaming this
class AssetAdapterResolver {
  protected networkAdapterName: any;

  constructor(networkAdapterName: any) {
    this.networkAdapterName = networkAdapterName;
  }

  // [TODO] Shall we split this to two methods? 1 getAssetAdapterByAssetData; 2 getAdapterByAssetType
  getAssetAdapter(assetData: any, network: string): any {
    if (this.networkAdapterName === 'Ethereum') {
      return this._getAssetAdapterEthereum(assetData, network);
    } else if (this.networkAdapterName === 'Tron') {
      return this._getAssetAdapterTron(assetData, network);
    }

    throw new Error(`Adapter does not support assets: ${this.networkAdapterName}`);
  }

  // [TODO] Shall we split this to two methods? 1 getAssetAdapterByAssetData; 2 getAdapterByAssetType
  _getAssetAdapterEthereum(assetData: any, network: string): any {
    if (assetData === CHAIN_ADAPTERS.RAW_SIGNATURE) {
      return new EvmSignRawTx(network);
    } else if (assetData === CHAIN_ADAPTERS.EVM_SMART_CONTRACT) {
      return new EvmSmartContract(network);
    } else if (assetData[1] === CHAIN_ADAPTERS.ERC20) {
      return new Erc20(assetData, network);
    } else if (assetData[1] === CHAIN_ADAPTERS.ERC721) {
      return new Erc721(assetData, network);
    }

    throw new Error(`Unsupported asset type: ${assetData}`);
  }

  _getAssetAdapterTron(assetData: any, network: string): any {
    if (assetData[1] === CHAIN_ADAPTERS.TRC10) {
      return new Trc10(assetData, network);
    } else if (assetData[1] === CHAIN_ADAPTERS.TRC20) {
      return new Trc20(assetData, network);
    } else if (assetData[1] === CHAIN_ADAPTERS.TRC721) {
      return new Trc721(assetData, network);
    }

    throw new Error(`Unsupported asset type: ${assetData[1]}`);
  }
}

export default AssetAdapterResolver;
