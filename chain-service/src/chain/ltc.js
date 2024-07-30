const bitcoin = require('bitcoinjs-lib');
const fetch = require('node-fetch');
const assert = require('assert');
const elliptic = require('elliptic');
const BaseCoin = require('./base');

const { getIntegralValue, getDecimalValue } = require('../helpers/unitConversions');
const { BlockchainNames } = require('../helpers/supportedBlockchains');

const apiDatas = {
  [BlockchainNames.Litecoin]: {
    prefix: 'https://ltcbook.nownodes.io/api/v2',
    apiKey: '97d82170-4ee3-4bed-acc3-17817719b6e6',
  },
};

const GAS_PRICE_ORACLE_URL = 'https://ltc.nownodes.io';

class Litecoin extends BaseCoin {
  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(network) {
    super();

    if (network) {
      this.type = 'UTXO';
      this.decimal = 8;
      this.network = network;
      this.apiPrefix = network ? apiDatas[network].prefix : undefined;
      this.apiKey = network ? apiDatas[network].apiKey : undefined;
      switch (network) {
        case BlockchainNames.Litecoin:
          this._networkType = {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bip32: {
              public: 0x019da462,
              private: 0x019d9cfe,
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0,
          };
          break;
        default:
          break;
      }
    }

    this.getConfirmation = this.getConfirmation.bind(this);
    this.init = this.init.bind(this);
    this.verifySignature = this.verifySignature.bind(this);
    this.getHash = this.getHash.bind(this);
  }

  /**
   * setup up the transaction
   * @param  {TxnDetail} config transaction detail
   *
   * @example
   *     init(config)
   */
  async init(config) {
    this.config = config;

    const unspent = this.config.txnIns;
    let totalValue = 0,
      returnValue = 0;

    const _txb = new bitcoin.TransactionBuilder(this._networkType);

    for (let i = 0; i < unspent.length; i++) {
      totalValue += getIntegralValue(unspent[i].value, this.decimal);
      const script = Buffer.from(unspent[i].prevOutScript, 'hex');

      _txb.addInput(unspent[i].txnId, unspent[i].index, null, script);
    }

    if (this.config.networkFeeDecimal) {
      this.config.networkFee = getIntegralValue(this.config.networkFeeDecimal, this.decimal);
      this.config.gasPrice = this.config.networkFee / this.getTransactionBytes(1);
    } else {
      if (!this.config.gasPrice) {
        this.config.networkFee = getIntegralValue(await this.getNetworkFee(1), this.decimal);

        if (typeof this.config.feeRate !== 'undefined') {
          const feePercent = ((this.config.feeRate - 50) * 1) / 100;
          this.config.networkFee = parseInt(this.config.networkFee * (1 + feePercent));
        }

        this.config.gasPrice = this.config.networkFee / this.getTransactionBytes(1);
      } else {
        this.config.networkFee = this.config.gasPrice * this.getTransactionBytes(1);
      }
    }

    let sendValue = 0,
      targetScript;
    if (this.config.sendAll) {
      targetScript = bitcoin.address.toOutputScript(this.config.txnOuts[0].to, this._networkType);
      sendValue = totalValue - this.config.networkFee;
      sendValue = sendValue >= 0 ? sendValue : 0;

      _txb.addOutput(targetScript, parseInt(sendValue));
    } else {
      returnValue = totalValue;
      sendValue = getIntegralValue(this.config.txnOuts[0].value, this.decimal);
      returnValue -= sendValue;

      targetScript = bitcoin.address.toOutputScript(this.config.txnOuts[0].to, this._networkType);
      _txb.addOutput(targetScript, parseInt(sendValue));

      returnValue -= this.config.networkFee;

      if (returnValue > this.config.networkFee) {
        targetScript = Buffer.from(this.config.txnIns[0].prevOutScript, 'hex');
        _txb.addOutput(targetScript, parseInt(returnValue));
      }
    }
    this.config.sendValue = sendValue;

    const tx = _txb.buildIncomplete();

    for (var i = 0; i < tx.ins.length; i++) {
      tx.ins[i].script = Buffer.from(unspent[i].prevOutScript, 'hex');
    }

    this.transaction = tx;
    return this.transaction.toHex();
  }

  async initFromHex(trxHex) {
    this.transaction = bitcoin.Transaction.fromHex(trxHex);

    this.config = {
      txnIns: [],
      txnOuts: [],
    };

    await this.fillConfigInsFromTransactionIns(this.transaction.ins);

    let returnValue = 0;
    this.config.sendValue = this.transaction.outs.reduce((sum, output) => {
      const address = bitcoin.address.fromOutputScript(output.script, this._networkType);
      const firstAddress = bitcoin.address.fromOutputScript(
        this.config.txnIns[0].prevOutScript,
        this._networkType
      );
      if (address && address != firstAddress) return sum + output.value;
      returnValue += output.value;
      return sum;
    }, 0);

    this.config.networkFee =
      this.config.txnIns.reduce((sum, input) => sum + input.value, 0) -
      returnValue -
      this.config.sendValue;
    this.config.gasPrice =
      this.config.networkFee /
      (this.config.txnIns.length * 146 + this.config.txnOuts.length * 33 + 15);

    this.transaction.outs.forEach((out) => {
      const address = bitcoin.address.fromOutputScript(out.script, this._networkType);
      if (address)
        this.config.txnOuts.push({ to: address, value: out.value / Math.pow(10, this.decimal) });
    });

    return this.config;
  }

  assetTicker() {
    return 'LTC';
  }

  /**
   * get the transaction hash with or without signature
   * @param  {boolean} [sign=false] with signature
   * @return {string} return transaction hash
   *
   * @example
   *     getHash(sign)
   */
  getHash(sign = false) {
    // let hash= this.transaction.getHash(!sign).toString('hex');
    // console.log({hash});
    if (this.transaction.ins.length == 0) throw 'Invalid Transaction'; // return hash;

    const _hash = [];

    for (let i = 0; i < this.transaction.ins.length; i++) {
      const hash = this.transaction.hashForSignature(
        parseInt(i),
        this.transaction.ins[i].script,
        bitcoin.Transaction.SIGHASH_ALL
      );

      _hash.push(hash.toString('hex'));
    }

    return _hash; // hash.toString('hex');
  }

  getTxnId() {
    return this.transaction.getId().toString('hex');
  }

  getTransactionBytes(additonalOutputs = 0) {
    if (this.config.txnIns.length == 0 || this.config.txnOuts.length == 0)
      throw 'Invalid Transaction';
    return (
      this.config.txnIns.length * 146 + (this.config.txnOuts.length + additonalOutputs) * 33 + 10
    );
  }

  getTotalGasRequired() {
    return getDecimalValue(this.config.networkFee, this.decimal);
  }

  getSendValue(feeAmt = 0) {
    assert(this.config);
    return getDecimalValue(this.config.sendValue, this.decimal);
  }

  async feeParams() {
    return {
      params: {
        gasPrice: {
          key: 'Sat per byte',
          value: await this.getGasPrice(),
          hint: 'The more Sat per byte you will provide, the faster will your transaction will be confirmed by the network.',
        },
      },
    };
  }

  /**
   * convert public key to encoded address
   * @param  {string} compressed point in hex format
   * @return {string} return the encoded string of address of the chain
   *
   * @example
   *     getAddress(pubKey)
   */
  getAddress(pubKey) {
    const pubkey = Buffer.from(pubKey, 'hex');
    const { address } = bitcoin.payments.p2pkh({
      pubkey,
      network: this._networkType,
    });

    return address;
  }

  /**
   * Check the address is valid or not
   * @param {string} address - string of account or address
   */
  checkAddress(address) {
    try {
      bitcoin.address.toOutputScript(address, this._networkType);
      return true;
    } catch (e) {
      return false;
    }
  }

  addressPattern() {
    return '^L[a-km-zA-HJ-NP-Z1-9]{26,33}$';
  }

  /**
   * convert hex priv key to encoded private key
   * @param  {string} - big num of the private key in hex format
   * @return {string} - return the encoded private key
   *
   * @example
   *     getPrivateKey(privKey)
   */
  getPrivateKey(privKey) {
    return '';
  }

  /**
   * set the signature of the transaction
   * @param  {String} signature - the canonical signature
   * @param  {String} pubKey - the pubKey to sign the transaction
   * @return {boolean} - return true/false
   *
   * @example
   *     setSignature (signature)
   */
  async setSignature(signatures, pubKey) {
    let _signatures = {};
    if (signatures.r) {
      _signatures = {
        0: signatures,
      };
    } else _signatures = signatures;

    const key = bitcoin.ECPair.fromPublicKey(Buffer.from(pubKey, 'hex'), {
      network: this._networkType,
    });

    for (let i = 0; i < this.transaction.ins.length; i++) {
      const scriptSign = bitcoin.script.signature.encode(
        Buffer.from(_signatures[i].r + _signatures[i].s, 'hex'),
        bitcoin.Transaction.SIGHASH_ALL
      );
      const chunks = [];
      chunks.push(scriptSign);
      chunks.push(key.publicKey);
      const scriptSig = bitcoin.script.compile(chunks);
      this.transaction.ins[i].script = scriptSig;
    }

    return true;
  }

  /**
   * set the signature of the transaction
   * @param  {boolean} [sign=false] with signature
   * @return {string} - return the hex of the transaction
   *
   * @example
   *     serializeTransaction ()
   */
  serializeTransaction(sign = false) {
    return this.transaction.toHex();
  }

  /**
   * set the signature of the transaction
   * @param  {String} signature - the canonical signature
   * @param  {pubKey} pubKey - the pubKey to verify the signature
   * @return {boolean} - return true/false
   *
   * @example
   *     verifySignature (signature, pubKey)
   */
  async verifySignature(signatures, pubKey) {
    const curve = elliptic.curves.secp256k1.curve;
    const ec = elliptic.ec({ curve: { curve: curve, g: curve.g, n: curve.n } });
    const key = ec.keyFromPublic(pubKey, 'hex');

    if (Object.keys(signatures).length == 0 || signatures.r) {
      return await this.verifySignature([signatures], pubKey);
    } else {
      assert(this.transaction.ins.length == Object.keys(signatures).length);

      for (let i = 0; i < this.transaction.ins.length; i++) {
        const hash = this.transaction.hashForSignature(
          parseInt(i),
          this.transaction.ins[i].script,
          bitcoin.Transaction.SIGHASH_ALL
        );
        const flag = key.verify(hash.toString('hex'), signatures[i]);
        if (!flag) return false;
      }

      return true;
    }
  }

  /**
   * send transaction to the network
   * @param {function} callback - callback function
   *
   * @example
   *     sendTransaction(callback)
   */
  async sendTransaction(hex, callback) {
    const option = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
      },
    };

    try {
      const result = await this.getApi(`${this.apiPrefix}/sendtx/${hex}`, option);

      callback({
        transactionHash: this.transaction ? this.transaction.getId().toString('hex') : result,
      });
    } catch (ex) {
      callback({
        type: 'error',
        ex,
      });
    }
  }

  /**
   * convert the public key
   * @param  {string} address - The target address
   * @return {number} - return the balance of the target address
   *
   * @example
   *     getBalance(address)
   */
  async getBalance(address, fastFetch = false) {
    let unspent = 0;

    try {
      const url = `${this.apiPrefix}/utxo/${address}?confirmed=true`;

      const contentJson = await this.getApi(url);

      for (let i = 0; i < contentJson.length; i++) {
        unspent += parseInt(contentJson[i].value);
      }
    } catch (error) {
      console.log(error);
    }

    return getDecimalValue(unspent, this.decimal);
  }

  async fillConfigInsFromTransactionIns(ins) {
    try {
      for (var i = 0; i < ins.length; i++) {
        // We create a new object here as reverse is mutating
        const hash = Buffer.from(ins[i].hash.toString('hex'), 'hex');
        const url = `${this.apiPrefix}/tx/${hash.reverse().toString('hex')}`;
        const txJson = await this.getApi(url);

        this.config.txnIns.push({
          txnId: txJson.txid,
          index: ins[i].index,
          prevOutScript: ins[i].script,
          value: parseInt(txJson.vout[ins[i].index].value),
          height: txJson.confirmations,
          address: txJson.vout[ins[i].index].addresses[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * get unspent coins from the blockchain network
   * @param  {string} address - The target address
   * @param  {number} [value=0] - The required amount of coins, get all unspent coins if value=0
   * @return {TxnIn[]} return a list of txnIns
   *
   * @example
   *     listUnSpent(address, value)
   */
  async listUnSpent(address, value = 0) {
    // var unspent = null;
    const coins = [];

    try {
      let url = `${this.apiPrefix}/utxo/${address}?confirmed=true`;
      const contentJson = await this.getApi(url);

      for (var i = 0; i < contentJson.length; i++) {
        url = `${this.apiPrefix}/tx/${contentJson[i].txid}`;

        const txJson = await this.getApi(url);

        const script = txJson.vout[contentJson[i].vout].hex;

        coins.push({
          txnId: contentJson[i].txid,
          index: contentJson[i].vout,
          prevOutScript: script,
          value: contentJson[i].value,
          confirmations: contentJson[i].confirmations,
        });
      }

      const _unspent = [];
      let cur_value = 0;

      for (var i = 0; i < coins.length; i++) {
        _unspent.push({
          txnId: coins[i].txnId,
          index: coins[i].index,
          prevOutScript: coins[i].prevOutScript,
          value: getDecimalValue(coins[i].value, this.decimal),
          confirmations: coins[i].confirmations,
        });

        cur_value += _unspent[i].value;

        if (cur_value > value && value !== 0) {
          break;
        }
      }

      return _unspent;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async getConfirmation(targetAddress) {
    const txns = this.listUnSpent(targetAddress);
    const _conf = null;

    for (let i = 0; i < txns.length; i++) {
      _conf = _conf == null ? txns[i].confirmation : Math.min(txns[i].confirmation, _conf);
    }

    return _conf || 0;
  }

  async getApi(
    url,
    option = {
      method: 'GET',
      headers: {
        'api-key': this.apiKey,
      },
    }
  ) {
    try {
      const response = await fetch(url, option);

      if (option.method == 'GET') {
        const contentJson = await response.json();

        return contentJson;
      }

      const contentJson = await response.text();
      return contentJson;
    } catch (e) {
      console.error('Faild to fetch', e);
    }
  }

  async getNetworkFee() {
    try {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          API_key: this.apiKey,
          jsonrpc: '2.0',
          id: 'test',
          method: 'estimatesmartfee',
          params: [1],
        }),
      };
      const contentJson = await this.getApi(GAS_PRICE_ORACLE_URL, option);

      const estimates = JSON.parse(contentJson).result.feerate;
      return estimates;
    } catch (error) {
      console.log(error);
    }
  }

  async getGasPrice() {
    const bytesCount = 1 * 146 + 2 * 33 + 15;
    const networkFee = getIntegralValue(await this.getNetworkFee(1), this.decimal);
    return parseInt(networkFee / bytesCount);
  }

  async estimateNetworkFee() {
    return {
      fees: [
        {
          value: parseFloat(await this.getNetworkFee()),
          type: 0,
        },
      ],
    };
  }
}

module.exports = Litecoin;
