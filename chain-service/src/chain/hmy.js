// Add dependency
//
// "@harmony-js/core": "^0.1.57",
// "@harmony-js/network": "^0.1.56",
// "@harmony-js/transaction": "^0.1.56",
// "@harmony-js/utils": "^0.1.56",
//

const BaseCoin = require('./base');

const {
  Transaction,
} = require('@harmony-js/transaction');

const {
  Messenger,
  RPCMethod,
  HttpProvider,
} = require('@harmony-js/network');

const {
  Harmony,
} = require('@harmony-js/core');

const {
  ChainID,
  ChainType,
} = require('@harmony-js/utils');

const {
  keccak256,
  hexZeroPad,
  arrayify,
  getAddress,
} = require('@harmony-js/crypto');

const _bn = require('bn.js');

const assert = require('assert');

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const fetch = require('node-fetch');
const {
  getIntegralValue,
  getDecimalValue,
} = require('../func');

const explorerURL = {
  TestNet: {
    ENDPOINT: 'https://api.s0.b.hmny.io',
    EXPLORER: 'https://explorer.testnet.harmony.one:8888/',
    BLOCK: 'http://l0.b.hmny.io:9500',
  },
  MainNet: {
    ENDPOINT: 'https://api.s0.t.hmny.io/',
    EXPLORER: 'https://explorer.harmony.one:8888/',
    BLOCK: 'http://l0.t.hmny.io:9500',
  },
};

const listTx = (address, network) => new Promise((success, reject) => {
  const url = `${explorerURL[network].EXPLORER}address?id=${address}`;
  fetch(url).then((ret) => {
    ret.json().then((ret) => {
      const result = ret.address.shardData[0].txs;

      for (let i = 1; i < ret.address.shardData.length; i++) {
        result.concat(ret.address.shardData[i].txs);
      }

      success(result);
    });
  }).catch((err) => {
    reject(err);
  });
});

const getCurrentBlock = (network) => {
  const opts = {
    jsonrpc: '2.0',
    method: 'hmy_blockNumber',
    params: [],
    id: 1,
  };
  return new Promise((success, reject) => {
    fetch(explorerURL[network].BLOCK, {
      method: 'post',
      body: JSON.stringify(opts),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).then((json) => {
      success(json);
    }).catch((ex) => {
      console.error(ex);
      success(null);
    });
  });
}; 

// module.exports.Coin = class HMY extends BaseCoin {

class Coin extends BaseCoin {

  constructor(setup) {
    super(setup);
    this._setup = setup;
    this.harmony = new Harmony(explorerURL[setup.network].ENDPOINT, {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyLocal,
    });
    const httpProvider = new HttpProvider(explorerURL[setup.network].ENDPOINT);
    this.messenger = new Messenger(httpProvider);
  }

  async init(config) {
    this.config = config; // const res = await this.harmony.blockchain.getShardingStructure();
    // this.harmony.shardingStructures(res.result);

    const nonce = await this.messenger.send(RPCMethod.GetTransactionCount, [this.config.from, 'latest'], ChainType.Harmony, 0); // console.log({nonce, num: parseInt(nonce.result, 'hex')});

    this.config.nonce = this.config.nonce ? this.config.nonce : parseInt(nonce.result, 'hex');
    this.config.gasLimit = 21000; // let str = this.config.txnOuts[0].value.toFixed(4).split('.')
    // let total = new _bn(str[0] + str[1].padEnd(this._setup.decimal, '0'), 10);
    // total = total - new _bn(this.config.gasPrice * this.config.gasLimit, 10);
    // this.config.sendValue = total;
    // console.log({txnOuts: this.config.txnOuts});

    let gas = getDecimalValue(this.config.gasPrice * this.config.gasLimit, this._setup.decimal);
    gas = gas - gas.toFixed(4) > 0 ? Number(gas.toFixed(4)) + 0.0001 : Number(gas.toFixed(4)); // console.log({gas});

    gas = getIntegralValue(gas, this._setup.decimal);
    this.config.sendValue = getIntegralValue(this.config.txnOuts[0].value, this._setup.decimal) - gas; // console.log({finalAmt1: this.config.sendValue,  gasDecimal: this._setup.decimal});
    // this.config.sendValue = getDecimalValue(this.config.sendValue, this._setup.decimal) ;
    // console.log({finalAmt2: this.config.sendValue})

    this.rawTx = {
      from: this.config.from,
      to: this.config.txnOuts[0].to,
      value: this.config.sendValue,
      gasLimit: new _bn(this.config.gasLimit, 10),
      gasPrice: new _bn(this.config.gasPrice, 10),
      /// new this.harmony.utils.Unit(getDecimalValue(this.config.gasPrice, this._setup.gasDecimal)).asGwei().toWei(),
      shardID: 0,
      toShardID: 0,
      nonce: parseInt(nonce.result, 'hex'),
      messenger: this.messenger,
    };
    this.transaction = new Transaction(this.rawTx);
    return this.config;
  }

  assetTicker() {
    return 'ONE';
  }

  getHash(withSign = false) {
    //     const raw = this.serializeTransaction(withSign);
    //     return keccak256(raw).substring(2);
    const [unsignedRawTransaction, raw] = this.transaction.getRLPUnsigned();
    if (withSign) return keccak256(this.transaction.getRLPSigned(raw, this.transaction.signature)).substring(2); return keccak256(unsignedRawTransaction).substring(2);
  }

  getTxnId() {
    return this.getHash(true);
  }

  serializeTransaction(withSign = false) {
    const [unsignedRawTransaction, raw] = this.transaction.getRLPUnsigned();
    if (withSign) return this.transaction.getRLPSigned(raw, this.transaction.signature); return unsignedRawTransaction;
  }

  getNetworkFee() {
    // return this._setup.networkFee;
    return 0;
  }

  getAddress(pubKey) {
    const pk = ec.keyFromPublic(pubKey, 'hex').getPublic('hex');
    const hexKey = `0x${keccak256(`0x${pk.slice(2)}`).slice(-40)}`;
    return getAddress(hexKey).bech32;
  }

  async setSignature(signature, pubKey) {
    const sig = {
      recoveryParam: signature.recoveryParam,
      r: hexZeroPad(`0x${signature.r.toString(16)}`, 32),
      s: hexZeroPad(`0x${signature.s.toString(16)}`, 32),
      v: 27 + signature.recoveryParam,
    };
    this.transaction.signature = sig;
    return true;
  }

  async verifySignature(signature, pubKey) {
    const pk = ec.keyFromPublic(pubKey, 'hex');
    return ec.verify(arrayify(`0x${this.getHash()}`), signature, pk, 'hex');
  }

  getTotalGasRequired() {
    assert(this.config); // return this.config.gasPrice * this.config.gasLimit  / Math.pow(10, this._setup.decimal) ;

    return getDecimalValue(this.config.gasPrice * this.config.gasLimit, this._setup.decimal);
  }

  getSendValue(feeAmt = 0) {
    assert(this.config); // return this.config.sendValue / Math.pow(10, this._setup.decimal);

    return getDecimalValue(this.config.sendValue - getIntegralValue(feeAmt, this._setup.decimal), this._setup.decimal);
  }

  async sendTransaction(hex, callback) {
    const receipt = await this.messenger.send(RPCMethod.SendRawTransaction, hex, ChainType.Harmony, 0);

    if (receipt.error) {
      callback({
        type: 'error',
        error: receipt.error,
      });
    } else {
      callback({
        transactionHash: receipt.result,
        completed: true,
      });
    }
  }

  async getBalance(address, fastFetch = false) {
    const result = await this.messenger.send(RPCMethod.GetBalance, [getAddress(address).checksum, 'latest'], ChainType.Harmony);
    const intNum = parseInt(result.result, 'hex');
    return Number(getDecimalValue(intNum, this._setup.decimal).toFixed(4));
  }

  listUnSpent(address, value = 0) {
    return [];
  }

  async getConfirmation(targetAddress) {
    try {
      const txns = await listTx(targetAddress, this._setup.network);

      if (txns.length > 0) {
        let latestBlock = 0;

        for (let i = 0; i < txns.length; i++) {
          const tmpNumber = parseInt(txns[i].blockNumber, 'hex');

          if (latestBlock < tmpNumber) {
            latestBlock = tmpNumber;
          }
        }

        const currentBlock = await getCurrentBlock(this._setup.network);

        if (currentBlock) {
          const blockNumber = parseInt(currentBlock.result, 'hex');
          return blockNumber - latestBlock + 1;
        }
        return 0;
      }
      return 0;
    } catch (ex) {
      console.error(ex);
      return 0;
    }
  }
}

module.exports = Coin;
