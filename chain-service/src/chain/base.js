const assert = require('assert');

const { blockchainCoinNames, blockchainCoinTickers } = require('../helpers/supportedBlockchains');
const {
  getIntegralValue,
  getDecimalValue,
  CountDecimalDigits,
} = require('../helpers/unitConversions');

/**
 * The BaseCoin interface
 * @module BaseCoin
 */
class BaseCoin {
  constructor() {
    this.confirmations = 2;
    this.type = null;
    this.decimal = null;
    this.getSendValue = this.getSendValue.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async init(config) {}

  async initFromHex(trxHex) {}

  assetName() {
    return blockchainCoinNames[this.network];
  }

  assetTicker() {
    return blockchainCoinTickers[this.network];
  }

  feeName() {
    return blockchainCoinNames[this.network];
  }

  feeTicker() {
    return blockchainCoinTickers[this.network];
  }

  getHash(withSign = false) {
    return '';
  }

  getTxnId() {
    return '';
  }

  serializeTransaction(withSign = false) {
    return '';
  }

  addressPattern() {
    return '^.*$';
  }

  getAddress(pubKey) {
    return '';
  }

  getDestination() {
    return this.config.txnOuts[0].to;
  }

  async getGasPrice() {
    return 0;
  }

  async getNetworkFee() {
    return 0;
  }

  getSendValue() {
    assert(this.config);
    return this.config.sendValue;
  }

  async isFundsReady() {
    assert(this.config);
    const sourceAddress = this.config.from;
    const balance = await this.getBalance(sourceAddress);
    const sendValue = this.getSendValue();
    const gas = this.getTotalGasRequired();
    return balance >= sendValue + gas;
  }

  async estimateNetworkFee(from, to, value) {
    return {
      fees: [
        {
          value: 0,
          type: 0,
        },
      ],
    };
  }

  async fetchAssetData() {
    throw new Error('Not a token');
  }

  /**
   * Check if the gas has been paid
   * @param {*} targetAddress
   * @param {*} count
   */
  async checkGasPaid(targetAddress, gasPrice) {
    return false;
  }

  getTotalGasRequired() {
    return 0;
  }

  /**
   * Check if the amount is valid for the crypto asset
   * @param {number} amount - the amout to be checked
   */
  checkValue(amount) {
    const dp = CountDecimalDigits(amount);
    return CountDecimalDigits(amount) <= this.decimal && Number(amount) > 0;
  }

  /**
   * Check the address is valid or not
   * @param {string} address - string of account or address
   */
  checkAddress(address) {
    return false;
  }

  supportedAssets() {
    return [];
  }

  // async fetchAssetData() {
  //   throw new Error("Not a token");
  // }

  async getAssetData(tokenAddress) {
    return null;
  }

  assetAdapter(assetData) {
    return null;
  }

  async getAvailableAssetsMetaData(targetAddress) {
    return [];
  }

  async feeParams(from, to, value, data) {
    return {
      params: {},
    };
  }

  async setSignature(signature, pubKey) {
    return '';
  }

  async verifySignature(signature, pubKey) {
    return '';
  }

  /**
   * send transaction to the network
   * @param {function} callback - callback function
   *
   * @example
   *     sendTransaction(callback)
   */
  sendTransaction(hex, callback) {
    callback('');
  }

  async getBalance(address, fastFetch = false) {
    return 0;
  }

  listTokens(address) {
    return [];
  }

  async checkValid(tokenId) {
    return true;
  }

  static listUnSpent(address, value = 0) {
    return [];
  }

  async checkConfirmation(targetAddress, contractAddress = null) {
    return false;
  }

  substract(amount, substractAmt) {
    return getDecimalValue(
      getIntegralValue(amount, this.decimal) - getIntegralValue(substractAmt, this.decimal),
      this.decimal
    );
  }

  _estimatedGasWithCoeff(estimatedGas) {
    // Whenever we estimate gas amount, we receive a very precise answer from gas oracle. However it is not guaranteed
    // that this answer will exactly match gas amount while mining will take place, there is just to many factors that
    // may influence it in the EVM's run time. So, just to be on the safe side we multiple oracle's gas estimation by a
    // constant, giving the transaction final cost some space for fluctuations.
    const gasCoefficient = 1.2;
    return parseInt(parseInt(estimatedGas) * gasCoefficient);
  }
}

module.exports = BaseCoin;
