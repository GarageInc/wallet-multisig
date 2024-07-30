import assert from 'assert';

import Bitcoin from './src/chain/btc.js';

import Ethereum from './src/chain/eth';

import Litecoin from './src/chain/ltc.js';

import Dogecoin from './src/chain/doge';

import BitcoinCash from './src/chain/bch';

import Tron from './src/chain/trx.js';

import AssetAdapterResolver from './src/helpers/AssetAdapterResolver';

import * as blockchains from './src/helpers/supportedBlockchains';

import { FEE_TYPES } from './src/helpers/eth/eth';
import { BlockchainNames } from './src/helpers/supportedBlockchains';

export class Chain {
  Coin: any;
  _coin: any;
  /**
   * Constructor
   *
   * @param {import('./src/chain/base').Setup} setup - The setup object of the chain
   * @example
   *     constructor (setup)
   */
  constructor(chainName: string) {
    assert(chainName);

    switch (chainName) {
      case BlockchainNames.Bitcoin:
        this.Coin = Bitcoin;
        this._coin = new Bitcoin(BlockchainNames.Bitcoin);
        break;
      case BlockchainNames.BitcoinTestnet:
        this.Coin = Bitcoin;
        this._coin = new Bitcoin(BlockchainNames.BitcoinTestnet);
        break;
      case BlockchainNames.Litecoin:
        this.Coin = Litecoin;
        this._coin = new Litecoin(BlockchainNames.Litecoin);
        break;
      case BlockchainNames.Dogecoin:
        this.Coin = Dogecoin;
        this._coin = new Dogecoin(BlockchainNames.Dogecoin);
        break;
      case BlockchainNames.BitcoinCash:
        this.Coin = BitcoinCash;
        this._coin = new BitcoinCash(BlockchainNames.BitcoinCash);
        break;
      case BlockchainNames.Ethereum:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.Ethereum);
        break;
      case BlockchainNames.EthereumRopsten:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.EthereumRopsten);
        break;
      case BlockchainNames.EthereumGoerli:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.EthereumGoerli);
        break;
      case BlockchainNames.BinanceSmartChain:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.BinanceSmartChain);
        break;
      case BlockchainNames.Polygon:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.Polygon);
        break;
      case BlockchainNames.Avalanche:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.Avalanche);
        break;
      case BlockchainNames.Optimism:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.Optimism);
        break;
      case BlockchainNames.ArbitrumOne:
        this.Coin = Ethereum;
        this._coin = new Ethereum(BlockchainNames.ArbitrumOne);
        break;
      case BlockchainNames.Tron:
        this.Coin = Tron;
        this._coin = new Tron(BlockchainNames.Tron);
        break;
      case BlockchainNames.TronShasta:
        this.Coin = Tron;
        this._coin = new Tron(BlockchainNames.TronShasta);
        break;
      default:
        break;
    }

    assert(this._coin);
  }

  async init(config) {
    return await this._coin.init(config);
  }

  async initFromHex(rawHex) {
    return await this._coin.initFromHex(rawHex);
  }

  assetName() {
    return this._coin.assetName();
  }

  assetTicker() {
    return this._coin.assetTicker();
  }

  feeName() {
    return this._coin.feeName();
  }

  feeTicker() {
    return this._coin.feeTicker();
  }

  getHash(sign = false) {
    return this._coin.getHash(sign);
  }

  getTxnId() {
    return this._coin.getTxnId();
  }

  getDestination() {
    return this._coin.getDestination();
  }

  async isFundsReady() {
    return await this._coin.isFundsReady();
  }

  async checkGasPaid(targetAddress, reqGas) {
    // return true;
    return this._coin.checkGasPaid(targetAddress, reqGas);
  }

  getSendValue(feeAmt = 0) {
    return this._coin.getSendValue(feeAmt);
  }

  getTotalGasRequired() {
    return this._coin.getTotalGasRequired();
  }

  async estimateNetworkFee(from, to, value) {
    return await this._coin.estimateNetworkFee(from, to, value);
  }

  async fetchAssetData() {
    return this._coin.fetchAssetData();
  }

  async checkConfirmation(targetAddress, contractAddress = null) {}

  async listUnSpent(address, requiredAmt = 0) {
    // console.log("to be implemented - getUnSpent", asset, address, requiredAmt);
    // let _amt = 0;
    const _txnIns = await this._coin.listUnSpent(address, requiredAmt);

    const txnIns: any[] = [];

    for (let i = 0; i < _txnIns.length; i++) {
      txnIns.push({
        index: _txnIns[i].index,
        txnId: _txnIns[i].txnId,
        amt: _txnIns[i].amt,
      });
      {
        supportedBlockchains;
      }
    }

    return _txnIns;
  }

  async serializeTransaction(sign = false) {
    return this._coin.serializeTransaction(sign);
  }

  async sendTransaction(hex, callback) {
    this._coin.sendTransaction(hex, (result) => {
      callback(result);
      // callback({ 'err': result.err, 'status': result.status, 'transactionHash': result.transactionHash, completed: 'conf': result.confirmations });
    });
  }

  async verifySignature(signature, pubKey) {
    return await this._coin.verifySignature(signature, pubKey);
  }

  async setSignature(signatures, pubKey) {
    return await this._coin.setSignature(signatures, pubKey);
  }

  async getBalance(address, tokenId) {
    return await this._coin.getBalance(address, tokenId);
  }

  async checkBalance(address, reqAmt, tokenId) {
    return await this._coin.checkBalance(address, reqAmt, tokenId);
  }

  getAddress(pubkey: any) {
    return this._coin.getAddress(pubkey);
  }

  supportedAssets() {
    return this._coin.supportedAssets();
  }

  assetAdapter(assetData: any) {
    try {
      const adapterName = this.Coin.name;
      const networkAssetAdapterResolver = new AssetAdapterResolver(adapterName);
      return networkAssetAdapterResolver.getAssetAdapter(assetData, this._coin.network);
    } catch (e) {
      return null;
    }
  }

  async getAvailableAssetsMetaData(targetAddress) {
    return await this._coin.getAvailableAssetsMetaData(targetAddress);
  }

  async getAssetData(tokenAddress) {
    return await this._coin.getAssetData(tokenAddress);
  }

  async feeParams(from, to, value) {
    return await this._coin.feeParams(from, to, value);
  }

  addressPattern() {
    return this._coin.addressPattern();
  }

  substract(amount, substractAmt) {
    return this._coin.substract(amount, substractAmt);
  }
}

export const ESTIMATED_FEE_TYPES = FEE_TYPES;
export const supportedBlockchains = blockchains;
export type ChainInfoMap = blockchains.ChainInfoMap;

// export default {
//   Chain,
//   supportedBlockchains,
//   ESTIMATED_FEE_TYPES: FEE_TYPES,
// };
