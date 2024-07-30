// var bar = module.exports;

// console.log("bar._loadingCounter", bar._loadingCounter);

// if (bar._loadingCounter) {
//   bar._loadingCounter += 1;
// } else {
//   bar._loadingCounter = 1;
// }

// console.log("bar._loadingCounter", bar._loadingCounter);

// var stackTrace = Error().stack;
// console.log(stackTrace); // if console.log is available

const BaseCoin = require('./base');
const fetch = require('node-fetch');
// const bchaddr = require('bchaddrjs');
const bitcore = require('bitcore-lib-cash');
// const bitcoin = require('bitcoinjs-lib');
const assert = require('assert');
const elliptic = require('elliptic');

const { getDecimalValue, getIntegralValue, hexToInt } = require('../helpers/unitConversions');
const { BlockchainNames } = require('../helpers/supportedBlockchains');

const apiDatas = {
  [BlockchainNames.BitcoinCash]: {
    prefix: 'https://bchbook.nownodes.io/api/v2',
    apiKey: '97d82170-4ee3-4bed-acc3-17817719b6e6',
  },
};

const GAS_PRICE_ORACLE_URL = 'https://guarda.com/api/v1/internal/fee/get-fee-per-b?currency=bch';

const SIGHASH =
  bitcore.Transaction.Signature.super_.SIGHASH_ALL |
  bitcore.Transaction.Signature.super_.SIGHASH_FORKID;

class BitcoinCash extends BaseCoin {
  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(network) {
    try {
      super();
      this.type = 'UTXO';
      this.decimal = 8;
      this.network = network;
      this.apiPrefix = network ? apiDatas[network].prefix : undefined;
      this.apiKey = network ? apiDatas[network].apiKey : undefined;
      switch (this.network) {
        case BlockchainNames.BitcoinCash:
          this._networkType = {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            bip32: { public: 76067358, private: 76066276 },
            pubKeyHash: 0,
            scriptHash: 5,
            wif: 128,
          };
          break;
        default:
          throw Error('Undefined network type');
          break;
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  async init(config) {
    this.config = config;

    const unspent = this.config.txnIns;
    let totalValue = 0,
      returnValue = 0;
    let utxos = [];

    const _txb = new bitcore.Transaction();

    for (let i = 0; i < unspent.length; i++) {
      totalValue += getIntegralValue(unspent[i].value, this.decimal);
      const script = Buffer.from(unspent[i].prevOutScript, 'hex');

      utxos.push({
        address: this.config.from,
        txId: unspent[i].txnId,
        outputIndex: unspent[i].index,
        script,
        amount: unspent[i].value,
      });
    }

    _txb.from(utxos);

    if (this.config.networkFeeDecimal) {
      this.config.networkFee = getIntegralValue(this.config.networkFeeDecimal, this.decimal);
      this.config.gasPrice = this.config.networkFee / this.getTransactionBytes(1);
    } else {
      if (!this.config.gasPrice) this.config.gasPrice = await this.getGasPrice();

      if (typeof this.config.feeRate !== 'undefined') {
        const feePercent = ((this.config.feeRate - 50) * 1) / 100;
        this.config.gasPrice = this.config.gasPrice * (1 + feePercent);
      }

      this.config.networkFee = await this.getNetworkFee(1);
    }

    // minimum 1 satoshi per byte
    if (this.config.networkFee < this.getTransactionBytes(1)) {
      this.config.gasPrice = 1;
      this.config.networkFee = await this.getNetworkFee(1);
    }

    let sendValue = 0;
    if (this.config.sendAll) {
      sendValue = totalValue - this.config.networkFee;
      sendValue = sendValue >= 0 ? sendValue : 0;

      _txb.to(this.config.txnOuts[0].to, parseInt(sendValue));
    } else {
      returnValue = totalValue;
      sendValue = getIntegralValue(this.config.txnOuts[0].value, this.decimal);
      returnValue -= sendValue;

      _txb.to(this.config.txnOuts[0].to, parseInt(sendValue));

      returnValue -= this.config.networkFee;

      if (returnValue > this.config.networkFee) {
        _txb.change(this.config.from, parseInt(returnValue));
      }
    }
    this.config.sendValue = sendValue;

    _txb.fee(this.config.networkFee);

    this.transaction = _txb;

    return this.transaction.serialize(true);
  }

  async initFromHex(trxHex) {
    this.transaction = new bitcore.Transaction(trxHex);

    this.config = {
      txnIns: [],
      txnOuts: [],
    };

    await this.fillConfigInsFromTransactionIns(this.transaction.inputs);
    let returnValue = 0;
    this.config.sendValue = this.transaction.outputs.reduce((sum, output) => {
      const script = bitcore.Script(output.script);
      const address = bitcore.Address.fromScript(script).toCashAddress();
      if (address && address != this.config.txnIns[0].address) return sum + output._satoshis;
      returnValue += output._satoshis;
      return sum;
    }, 0);
    const trxFee =
      this.config.txnIns.reduce((sum, input) => sum + input.value, 0) -
      returnValue -
      this.config.sendValue;

    this.config.gasPrice =
      trxFee / (this.config.txnIns.length * 146 + this.config.txnOuts.length * 33 + 10);
    this.config.networkFee = getDecimalValue(trxFee, this.decimal);

    this.transaction.outputs.forEach((out) => {
      let address;
      let script;
      try {
        script = bitcore.Script(out.script);
        address = bitcore.Address.fromScript(script).toCashAddress();
      } catch (e) {
        console.error(e);
      }

      if (address)
        this.config.txnOuts.push({
          to: address,
          value: getDecimalValue(out._satoshis, this.decimal),
        });
    });

    return this.config;
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
    if (this.transaction.inputs.length == 0) throw 'Invalid Transaction'; // return hash;

    const _hash = [];

    for (let i = 0; i < this.transaction.inputs.length; i++) {
      const inputSatsBN = this.transaction.inputs[i].output.satoshisBN;
      const outputScript = this.transaction.inputs[i].output.script;
      const hash = bitcore.Transaction.Sighash.sighash(
        this.transaction,
        SIGHASH,
        i,
        outputScript,
        inputSatsBN
      );
      _hash.push(hash.reverse().toString('hex'));
    }
    return _hash; // hash.toString('hex');
  }

  getTxnId() {
    const trxBuf = Buffer.from(this.transaction.serialize(true), 'hex');
    const hash = bitcore.crypto.Hash.sha256sha256(trxBuf);
    return hash.reverse().toString('hex');
  }

  getTransactionBytes(additonalOutputs = 0) {
    if (this.config.txnIns.length == 0 || this.config.txnOuts.length == 0)
      throw 'Invalid Transaction';
    return (
      this.config.txnIns.length * 146 + (this.config.txnOuts.length + additonalOutputs) * 33 + 10
    );
  }

  getNetworkFee(additonalOutputs = 0) {
    let feeInCents = this.config.gasPrice * this.getTransactionBytes(additonalOutputs);
    if (this.config.feeRate) {
      const feePercent = ((this.config.feeRate - 50) * 0.2) / 100;
      feeInCents = feeInCents * (1 + feePercent);
    }
    return parseInt(feeInCents);
  }

  async estimateNetworkFee() {
    const gasPrice = await this.getGasPrice();
    const bytesCount = 1 * 146 + 2 * 33 + 15;
    const feeInCents = gasPrice * bytesCount;

    return {
      fees: [
        {
          value: getDecimalValue(feeInCents, this.decimal),
          type: 0,
        },
      ],
    };
  }

  getTotalGasRequired() {
    return getDecimalValue(this.getNetworkFee(), this.decimal);
  }

  getSendValue(feeAmt = 0) {
    assert(this.config);
    return getDecimalValue(
      this.config.sendValue - getIntegralValue(feeAmt, this.decimal),
      this.decimal
    );
  }

  async feeParams() {
    return {
      params: {
        gasPrice: {
          key: 'Sat per byte',
          value: parseInt(await this.getGasPrice()),
          hint: 'The more Sat per byte you will provide, the faster will your transaction will be confirmed by the network.',
        },
      },
    };
  }

  async getGasPrice() {
    try {
      const contentJson = await this.getApi(GAS_PRICE_ORACLE_URL);

      return contentJson.fee;
    } catch (error) {
      console.log(error);
    }
  }

  addressPattern() {
    return '^D{1}[56789ABCDEFGHJKLMNPQRSTU]{1}[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{32}$';
  }

  getAddress(pubKey) {
    const publicKey = bitcore.PublicKey(pubKey);
    const addresss = publicKey.toAddress().toString();

    return addresss;
  }

  /**
   * Check the address is valid or not
   * @param {string} address - string of account or address
   */
  checkAddress(address) {
    try {
      bitcore.address.toOutputScript(address, this._networkType);
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
    } else _signatures;

    for (let i = 0; i < this.transaction.inputs.length; i++) {
      var pubKeyWrapper = bitcore.PublicKey.fromString(pubKey);

      const rBN = new bitcore.crypto.BN(hexToInt(signatures[i].r).toString());
      const sBN = new bitcore.crypto.BN(hexToInt(signatures[i].s).toString());
      const signature = bitcore.crypto.Signature({
        r: rBN,
        s: sBN,
        compressed: true,
        nhashtype: SIGHASH,
      });

      const sigWrapper = new bitcore.Transaction.Signature({
        publicKey: pubKeyWrapper,
        prevTxId: this.transaction.inputs[i].prevTxId,
        outputIndex: this.transaction.inputs[0].outputIndex,
        inputIndex: i,
        signature: signature,
        sigtype: SIGHASH,
      });

      this.transaction.applySignature(sigWrapper);
    }

    // this.transaction.isFullySigned();

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
    return this.transaction.serialize(true);
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
      // added to support multiple inputs
      assert(this.transaction.inputs.length == Object.keys(signatures).length);

      for (let i = 0; i < this.transaction.inputs.length; i++) {
        // we sign hash in little endinn format and here we validate it is big endian
        const inputSatsBN = this.transaction.inputs[i].output.satoshisBN;
        const outputScript = this.transaction.inputs[i].output.script;
        const hash = bitcore.Transaction.Sighash.sighash(
          this.transaction,
          SIGHASH,
          i,
          outputScript,
          inputSatsBN
        );
        const flag = key.verify(hash.reverse().toString('hex'), signatures[i]);

        if (!flag) return false;
      }

      return true;
    }
  }

  /**
   * send transasction to the network
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
      console.log("Can't getBalance:", error);
    }
    // return unspent / Math.pow(10, this.decimal);
    return getDecimalValue(unspent, this.decimal);
  }

  async fillConfigInsFromTransactionIns(ins) {
    try {
      const pubKeyHashInputs = [];
      const outputScripts = [];
      const satoshis = [];

      for (var i = 0; i < ins.length; i++) {
        // We create a new object here as reverse is mutating
        const hash = Array.prototype.map
          .call(ins[i].prevTxId, function (byte) {
            return ('0' + (byte & 0xff).toString(16)).slice(-2);
          })
          .join('');
        const url = `${this.apiPrefix}/tx/${hash}`;
        const txJson = await this.getApi(url);

        pubKeyHashInputs.push(
          new bitcore.Transaction.Input.PublicKeyHash(this.transaction.inputs[0])
        );
        outputScripts.push(new bitcore.Script(txJson.vout[ins[i].outputIndex].hex));
        satoshis.push(parseInt(txJson.vout[ins[i].outputIndex].value));

        this.config.txnIns.push({
          txnId: txJson.txid,
          index: ins[i].outputIndex,
          prevOutScript: ins[i]._scriptBuffer,
          value: parseInt(txJson.vout[ins[i].outputIndex].value),
          height: txJson.confirmations,
          address: txJson.vout[ins[i].outputIndex].addresses[0],
        });
      }

      this.transaction.inputs = [];
      this.transaction._inputAmount = undefined;

      for (var i = 0; i < pubKeyHashInputs.length; i++) {
        this.transaction.addInput(pubKeyHashInputs[i], outputScripts[i], satoshis[i]);
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
}
module.exports = BitcoinCash;
