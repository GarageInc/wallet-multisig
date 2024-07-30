const BaseCoin = require('./base');

const { default: Neon, api, wallet, CONST, sc, u, rpc, tx, nep5 } = require('@cityofzion/neon-js');

const EC = require('elliptic').ec;

const fetch = require('node-fetch');
const { getIntegralValue, getDecimalValue } = require('../func');

const getNodes = () => {
  const _n = [
    {
      url: 'https://seed1.switcheo.network:10331',
      height: 4996121,
    },
    {
      url: 'https://seed3.switcheo.network:10331',
      height: 4996121,
    },
    {
      url: 'https://seed1.cityofzion.io:443',
      height: 4996121,
    },
    {
      url: 'https://seed2.cityofzion.io:443',
      height: 4996120,
    },
    {
      url: 'https://seed3.cityofzion.io:443',
      height: 4996121,
    },
    {
      url: 'https://seed4.cityofzion.io:443',
      height: 4996114,
    },
    {
      url: 'https://seed5.cityofzion.io:443',
      height: 4996121,
    },
    {
      url: 'https://seed0.cityofzion.io:443',
      height: 4996121,
    },
    {
      url: 'https://seed8.cityofzion.io:443',
      height: 4996120,
    },
    {
      url: 'https://seed9.cityofzion.io:443',
      height: 4996120,
    },
    {
      url: 'https://seed1.redpulse.com:443',
      height: 4996121,
    },
    {
      url: 'https://seed2.redpulse.com:443',
      height: 4996121,
    },
    {
      url: 'http://seed1.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed2.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed3.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed4.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed5.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed7.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed8.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed9.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'http://seed10.ngd.network:10332',
      height: 4996121,
    },
    {
      url: 'https://m1.neo.nash.io',
      height: 4996120,
    },
    {
      url: 'https://m2.neo.nash.io',
      height: 4996120,
    },
    {
      url: 'https://m3.neo.nash.io',
      height: 4996120,
    },
    {
      url: 'https://m4.neo.nash.io',
      height: 4996120,
    },
    {
      url: 'https://m5.neo.nash.io',
      height: 4996120,
    },
  ]; // console.log('updated', {_n});

  return _n; // return new Promise((success, reject) => {
  //     fetch('https://api.neoscan.io/api/main_net/v1/get_all_nodes').then ((res) => {
  //         if (res.status == 502) {
  //             getNodes().then ((nodes) => {
  //                 success(nodes);
  //             })
  //         }
  //         res.json().then((nodes) => {
  //             console.log(nodes)
  //             success(nodes);
  //         })
  //     }).catch (ex => {
  //         console.error('getNodes', ex);
  //         success(null);
  //     })
  // });
};

class Coin extends BaseCoin {
  constructor(setup) {
    super(setup);

    this._setup = setup; // Define the network will be used and the possible rpc
    // console.log({'setup_net': this._setup.network});

    this.network = new api.neoscan.instance(this._setup.network); // console.log({network: this.network});
  }

  async init(config) {
    this.config = config;
    this.net = await api.neoscan.getRPCEndpoint(this.network.url); // Generate the transaction script
    // const generator = nep5.abi.transfer(
    //     this._setup.contractAddress,
    //     this.config.from,
    //     this.config.txnOuts[0].to,
    //     this.config.txnOuts[0].value * Math.pow(10, this._setup.decimal)
    // )
    // const builder = generator(Neon.create.scriptBuilder());
    // const script = builder.str;
    // Create the raw transaction here
    // this.transaction = new tx.InvocationTransaction({
    //     script: script,
    //     gas: 0
    // });

    const param_sending_address = sc.ContractParam.byteArray(this.config.from, 'address');
    const param_receiving_address = sc.ContractParam.byteArray(
      this.config.txnOuts[0].to,
      'address'
    ); // const param_amount = Neon.create.contractParam("Integer", this.config.txnOuts[0].value * Math.pow(10, this._setup.decimal));

    const param_amount = Neon.create.contractParam(
      'Integer',
      getIntegralValue(this.config.txnOuts[0].value, this._setup.decimal)
    );
    this.sendValue = this.config.txnOuts[0].value; // Build contract script

    const props = {
      scriptHash: this._setup.contractAddress,
      operation: 'transfer',
      args: [param_sending_address, param_receiving_address, param_amount],
    };
    const script = Neon.create.script(props); // Create transaction object

    this.transaction = new tx.InvocationTransaction({
      script,
      gas: 0,
    }); // Build input objects and output objects.

    if (this.transaction.inputs.length === 0 && this.transaction.outputs.length === 0) {
      this.transaction.addAttribute(
        tx.TxAttrUsage.Script,
        u.reverseHex(wallet.getScriptHashFromAddress(this.config.from))
      );
      this.transaction.addRemark(this.config.txnOuts[0].remark);
    }

    return this.config;
  }

  getHash(withSign = false) {
    // return this.transaction.hash;
    return u.sha256(this.transaction.serialize(withSign));
  }

  getTxnId() {
    return this.transaction.hash;
  }

  serializeTransaction(withSign = false) {
    return this.transaction.serialize(withSign);
  }

  getNetworkFee() {
    return 0;
  }

  getAddress(pubKey) {
    const acc = new wallet.Account(pubKey);
    return acc.address;
  }

  setSignature(signature, pubKey) {
    /**
     * _scriptHash is not essential
     * InvocationScript	    byte[]	Invocation script
     * VerificationScript	byte[]	Verification script
     */
    // this.transaction.scripts = [tx.Witness.prototype];
    // this.transaction.scripts[0].invocationScript = '40' + signature;
    // this.transaction.scripts[0].verificationScript = wallet.getVerificationScriptFromPublicKey(pubKey);
    // e4dbfa59a0c085893fcef6814eda13e089e3b909da16424e5558b0c3249a663f9aa83f3b9fd59507e34eaed9022d623eef06818646d886832a5cfb7b072496d4
    const _sign = signature.r + signature.s;

    this.transaction.addWitness(tx.Witness.fromSignature(_sign, pubKey));
    return true;
  }

  verifySignature(signature, pubKey) {
    const hash = this.getHash(false);
    const ec = new EC('p256'); // console.log('neo', {hash, pubKey, signature});

    const pubkey = ec.keyFromPublic(pubKey, 'hex');
    return pubkey.verify(hash, signature);
  }

  sendTransaction(hex, callback) {
    // let hex = this.serializeTransaction();
    // Send the transaction
    // rpc.Query.sendRawTransaction(hex).execute(this.net)
    //     .then(function (data, err) {
    //         if (data.result) {
    //             callback({ err: null, 'status': 'NEO succeed', 'transactionHash': null });
    //         }
    //     })
    //     .catch(function (err) {
    //         callback({ 'err': err, 'status': 'NEO failed', 'transactionHash': null });
    //     })
    const { hash } = Neon.deserialize.tx(hex);
    api.neoscan.getRPCEndpoint(this.network.url).then(
      function (net) {
        rpc.Query.sendRawTransaction(hex)
          .execute(net)
          .then(
            function (data, err) {
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
            })
          )
          .catch((err) => {
            callback({
              err,
              status: 'NEO failed',
              transactionHash: null,
            });
          });
      }.bind({
        hash,
      })
    );
  }

  async getBalance(address, fastFetch = false) {
    try {
      this.nodes = this.nodes ? this.nodes : await getNodes(); // const accBalance = await api.neoscan.getBalance(this.network.url, address);
      // // console.log(accBalance);
      // console.log(accBalance.export());
      // if (accBalance) {
      //     var tokenBalance = accBalance.balance.filter((balance) => {
      //         return balance.asset_hash == this._setup.contractAddress;
      //     })
      //     return Number(tokenBalance.value);
      // }
      // return 0;
      // console.log({nodes: this.nodes});

      for (let i = 0; i < this.nodes.length && this.nodes; i++) {
        try {
          // console.log({node: this.nodes[i].url});
          const accBalance = await nep5.getTokenBalance(
            this.nodes[i].url,
            this._setup.contractAddress,
            address
          ); // console.log({node: this.nodes[i], num: accBalance.toNumber()});

          return accBalance.toNumber();
        } catch (ex) {
          console.warn(ex);
        }
      }

      return 0;
    } catch (ex) {
      console.error(ex);
      return 0;
    }
  }

  getTotalGasRequired() {
    return 0;
  }

  getSendValue(feeAmt = 0) {
    return this.sendValue - feeAmt;
  }

  async listUnSpent(address, value = 0) {
    return [];
  }

  async getConfirmation(targetAddress) {
    const currentBlock = await api.neoscan.getHeight(this.network.url);
    const txns = await api.neoscan.getTransactionHistory(this.network.url, targetAddress);

    if (txns && txns.length > 0) {
      return currentBlock - txns[0].blockHeight;
    }
    null;
  }
}

module.exports = Coin;
