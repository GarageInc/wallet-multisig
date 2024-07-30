// Add dependency
//
// "@cityofzion/neon-js": "^4.9.0",
//

const BaseCoin = require('./base');

const {
  default: Neon,
  api,
  wallet,
  CONST,
  u,
  rpc,
  tx,
  nep5,
} = require('@cityofzion/neon-js');

const EC = require('elliptic').ec;

const {
  getIntegralValue,
  getDecimalValue,
  CountDecimalDigits,
} = require('../func');

class Coin extends BaseCoin {
  constructor(setup) {
    super(setup);
    this._setup = setup; // Define the network will be used and the possible rpc

    this.network = new api.neoscan.instance(this._setup.network);
  }

  async init(config) {
    this.config = config;
    this.net = await api.neoscan.getRPCEndpoint(this.network.url);
    const balance = new wallet.Balance({
      address: config.from,
    });
    const coins = [];
    let value = 0;

    for (var i = 0; i < config.txnIns.length; i++) {
      if (!this.checkValue(config.txnIns[i].value)) throw 'Invalid from amount';
      coins.push({
        txid: config.txnIns[i].txnId,
        index: config.txnIns[i].index,
        value: config.txnIns[i].value,
      });
      value += getIntegralValue(config.txnIns[i].value, this._setup.decimal);
    } // balance.addAsset(this._setup.contractAddress, {balance: getIntegralValue(value, this._setup.decimal), unspent: coins});

    value = getDecimalValue(value, this._setup.decimal); // console.log('addAsset', {balance: value, unspent: coins});

    balance.addAsset(this._setup.contractAddress, {
      balance: value,
      unspent: coins,
    }); // Create the raw transaction here

    this.transaction = Neon.create.contractTx();
    this.sendValue = 0;

    for (var i = 0; i < config.txnOuts.length; i++) {
      // console.log({txnOuts: config.txnOuts[i]});
      if (!this.checkValue(config.txnOuts[i].value)) throw `Invalid to amount (${config.txnOuts[i].value})`;
      this.transaction.addIntent(this._setup.contractAddress, // this.config.txnOuts[i].value * Math.pow(10, this._setup.decimal),
        this.config.txnOuts[i].value, // getIntegralValue(this.config.txnOuts[i].value, this._setup.decimal),
        this.config.txnOuts[i].to);
      this.sendValue += getIntegralValue(this.config.txnOuts[i].value, this._setup.decimal);
    }

    this.sendValue = getDecimalValue(this.sendValue, this._setup.decimal); // console.log({balance: balance.assets});
    // console.log({ouputs: this.transaction.outputs[0].value.toNumber()});
    // .addRemark("")

    this.transaction.calculate(balance);
    return this.config;
  }

  assetTicker() {
    return 'NEO';
  }

  getHash(withSign = false) {
    // return this.transaction.hash;
    return u.sha256(this.transaction.serialize(withSign));
  }

  getTxnId() {
    return this.transaction.hash;
  }

  serializeTransaction(withSign = false) {
    // console.log(this.transaction);
    return this.transaction.serialize(withSign);
  }

  getNetworkFee() {
    return 0;
  }

  getAddress(pubKey) {
    const ec = new EC('p256');
    const pubkey = ec.keyFromPublic(pubKey, 'hex');
    const scriptHash = wallet.getScriptHashFromPublicKey(pubKey); // appErrorHandler.log('neo', 'getAddress', scriptHash, 3);

    const address = wallet.getAddressFromScriptHash(scriptHash); // appErrorHandler.log('neo', 'getAddress', address, 3);

    return address;
  }

  setSignature(signature, pubKey) {
    /**
     * _scriptHash is not essential
     * InvocationScript	    byte[]	Invocation script
     * VerificationScript	byte[]	Verification script
     */
    const _sign = signature.r + signature.s;

    this.transaction.addWitness(tx.Witness.fromSignature(_sign, pubKey));
    return true;
  }

  sendTransaction(hex, callback) {
    // let hex = this.serializeTransaction();
    // Send the transaction
    // const hash = this.getHash(true);
    // const hash = this.transaction.hash;
    const { hash } = Neon.deserialize.tx(hex);
    api.neoscan.getRPCEndpoint(this.network.url).then(function (net) {
      rpc.Query.sendRawTransaction(hex).execute(net).then(function (data, err) {
        // console.log({data, hash: this.hash})
        if (data.result) {
          if (callback) {
            callback({
              err: null,
              status: 'NEO succeed',
              transactionHash: this.hash,
            });
          }
        }
      }.bind({
        hash: this.hash,
      })).catch((err) => {
        callback({
          err,
          status: 'NEO failed',
          transactionHash: null,
        });
      });
    }.bind({
      hash,
    }));
  }

  async getBalance(address, fastFetch = false) {
    const accBalance = await api.neoscan.getBalance(this.network.url, address);
    if (!(accBalance && accBalance.assets[this._setup.contractAddress])) return 0; // console.log({asset: accBalance.assets[this._setup.contractAddress]});

    let bal = 0;
    this.net = await api.neoscan.getRPCEndpoint(this.network.url);

    for (let i = 0; i < accBalance.assets[this._setup.contractAddress].unspent.length; i++) {
      const result = await rpc.Query.getRawTransaction(accBalance.assets[this._setup.contractAddress].unspent[i].txid).execute(this.net); // if(result.result.confirmations > this._setup.confirmations){

      bal += accBalance.assets[this._setup.contractAddress].unspent[i].value.c[0]; // }
    } // console.log({bal});

    return getDecimalValue(bal, this._setup.decimal);
  }

  getTotalGasRequired() {
    return 0;
  }

  checkGasPaid() {
    return true;
  }


  getSendValue(feeAmt = 0) {
    return this.sendValue - feeAmt;
  }

  async listUnSpent(address, value = 0) {
    // console.log('listUnspent', {address});
    const _unspent = [];
    const balances = await api.neoscan.getBalance(this.network.url, address);
    this.net = await api.neoscan.getRPCEndpoint(this.network.url); // console.log(this.net);
    // console.log({balances});

    for (let i = 0; i < balances.assetSymbols.length; i++) {
      const assetBalance = balances.assets[balances.assetSymbols[i]];

      if (assetBalance && assetBalance.unspent) {
        // console.log({net: this.net});
        // console.log({unspent: assetBalance.unspent});
        for (let j = 0; j < assetBalance.unspent.length; j++) {
          // console.log({assetBalance: assetBalance.unspent[j]});
          const result = await rpc.Query.getRawTransaction(assetBalance.unspent[j].txid).execute(this.net); // console.log({result});

          _unspent.push({
            txnId: assetBalance.unspent[j].txid,
            index: assetBalance.unspent[j].index,
            value: getDecimalValue(Number(assetBalance.unspent[j].value.c[0].toString(10)), this._setup.decimal),
            symbol: balances.assetSymbols[i],
            confirmations: result.result.confirmations,
          });
        }
      }
    }

    return _unspent;
  }

  async checkConfirmation(targetAddress, contractAddress = null) {}

  static deserialize(hex) {
    const transaction = Neon.deserialize.tx(hex);
    return transaction;
  }

  static async getEncodedPrivateKey(privkey) {
    const pubkey = wallet.getPublicKeyUnencoded(wallet.getPublicKeyFromPrivateKey(privkey.toString(16)));
    const wif = await wallet.getWIFFromPrivateKey(privkey.toString(16));
    const pk2 = await wallet.getPrivateKeyFromWIF(wif);
    const scriptHash = wallet.getScriptHashFromPublicKey(pubkey);
    const address = wallet.getAddressFromScriptHash(scriptHash);
    const flag = wallet.isWIF(wif);
    return wif;
  }

  static async getEncodedPublicKey(privkey) {
    const pubkey = wallet.getPublicKeyUnencoded(wallet.getPublicKeyFromPrivateKey(privkey.toString(16)));
    const wif = await wallet.getWIFFromPrivateKey(privkey.toString(16));
    const pk2 = await wallet.getPrivateKeyFromWIF(wif);
    return pubkey;
  }

  static async getAddress(privkey) {
    const pubkey = wallet.getPublicKeyUnencoded(wallet.getPublicKeyFromPrivateKey(privkey.toString(16)));
    const wif = await wallet.getWIFFromPrivateKey(privkey.toString(16));
    const pk2 = await wallet.getPrivateKeyFromWIF(wif);
    const scriptHash = wallet.getScriptHashFromPublicKey(pubkey);
    const address = wallet.getAddressFromScriptHash(scriptHash);
    return address;
  }
}

module.exports = Coin;
