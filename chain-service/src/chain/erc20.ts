import Ethereum from './eth';
import { Transaction } from 'ethereumjs-tx';
import _bn from 'bn.js';
import assert from 'assert';
import Web3 from 'web3';
import abiDecoder from 'abi-decoder';

import helper from '../helpers/eth/eth';

import {
  getIntegralValue,
  getIntegralValueBN,
  getDecimalValue,
  bufferToInt,
} from '../helpers/unitConversions';

const getReceipt = async (txnIds: string[], network: string, callback: (txs: any[]) => void) => {
  const txns = [];
  const web3 = new Web3(new Web3.providers.HttpProvider(helper.explorerURL[network].ENDPOINT));

  for (let i = 0; i < txnIds.length; i++) {
    // console.log('getReceipt', {id: txnIds[i]})     ;
    const receipt = await web3.eth.getTransactionReceipt(txnIds[i]);
    txns.push(receipt);
  }
  // console.log('return')

  callback(txns);
};

function listTx(
  _abi: any,
  address: string,
  contractAddress: string,
  network: string
): Promise<any> {
  // Instantiate this.web3 with WebSocketProvider
  return new Promise((success, reject) => {
    // console.log({ENDPOINT: helper.explorerURL[network].ENDPOINT});
    // const web3Instance = new Web3(new Web3.providers.HttpProvider(helper.explorerURL[network].ENDPOINT));
    // const web3wss = new Web3(new Web3.providers.WebsocketProvider(helper.explorerURL[network].WSS_ENDPOINT));
    const web3wss = new Web3(new Web3.providers.HttpProvider(helper.explorerURL[network].ENDPOINT)); // Instantiate token contract object with JSON ABI and address
    // console.log({_abi});

    const tokenContract = new web3wss.eth.Contract(_abi, contractAddress);

    web3wss.eth
      .getBlockNumber()
      .then((curBlockNum) => {
        // Generate filter options
        const options = {
          filter: {
            _to: address,
          },
          fromBlock: curBlockNum - 20000,
        }; // Subscribe to Transfer events matching filter criteria

        tokenContract.getPastEvents('Transfer', options, (error: any, events: any) => {
          if (error) {
            console.error(error); // reject(error);

            success(null);
          }

          const txnIds: string[] = [];
          events.forEach((event: any) => {
            txnIds.push(event.transactionHash);
          });
          getReceipt(txnIds, network, (txns: any[]) => {
            success(txns);
          }).catch((ex) => {
            console.error(ex); // reject(ex);

            success(null);
          });
        });
      })
      .catch((ex) => {
        console.error(ex);
        success(null);
      });
  });
}

class Erc20 extends Ethereum {
  protected contractAddress: string;
  protected assetDecimal: number;
  protected ticker: string;
  protected name: string;

  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(assetData: any, network: string) {
    super(network); // this._setup = setup;

    this.contractAddress = assetData[0];
    this.ticker = assetData[2]?.ticker;
    this.assetDecimal = assetData[2]?.decimals;
    this.name = assetData[2]?.name;
  }

  /**
   * setup up the transaction
   * @param  {TxnDetail} config transaction detail
   *
   * @example
   *     init(config)
   */
  async init(config: any): Promise<any> {
    await this.baseInit(config);

    this.config = config;

    const contract = new this.web3.eth.Contract(helper.ERC20Abi, this.contractAddress);

    let total;
    if (this.config.sendAll) {
      total = await this.getBalance(this.config.from);
    } else {
      total = this.config.txnOuts[0].value;
    }
    this.config.sendValue = getIntegralValueBN(total, this.assetDecimal);

    const transferFunc = contract.methods.transfer(
      this.config.txnOuts[0].to.toLowerCase(),
      this.web3.utils.toHex(this.config.sendValue)
    );
    const data = transferFunc.encodeABI();

    if (this.config.networkFeeDecimal) {
      this.config.gasLimit = parseInt(
        getIntegralValue(this.config.networkFeeDecimal, this.etherDecimal) / this.config.gasPrice
      );
    } else {
      if (!this.config.gasLimit) {
        const rawTransaction = { from: this.config.from, value: '0x0' };
        // USDC on avalanche has raised an exception here. Their contract smart address was blacklisted. Switched to real sender.
        // However we should handle a case here where we get an exception and show it to user
        try {
          this.config.gasLimit = await transferFunc.estimateGas(rawTransaction);
        } catch {
          throw 'Insufficient amount';
        }
        this.config.gasLimit = this._estimatedGasWithCoeff(this.config.gasLimit);
      } else {
        this.config.gasLimit = parseInt(this.config.gasLimit);
      }
    }

    const trxConfig = {
      chainId: this.web3.utils.toHex(this.chainId),
      from: this.config.from,
      to: this.contractAddress,
      value: 0,
      data,
      gasPrice: this.web3.utils.toHex(this.config.gasPrice),
      gasLimit: this.web3.utils.toHex(this.config.gasLimit),
      nonce: this.web3.utils.toHex(this.config.nonce),
    };

    this.transaction = new Transaction(trxConfig, this._getTransactionOptions());
    this.rawTx = this.transaction.serialize().toString('hex');
    return this.rawTx;
  }

  async initFromHex(trxHex: string) {
    this.rawTx = trxHex;
    this.transaction = new Transaction(trxHex, this._getTransactionOptions());

    abiDecoder.addABI(helper.ERC20Abi);
    const decodedData = abiDecoder.decodeMethod('0x' + this.transaction.data.toString('hex'));

    // TODO add Smart Contract address validation

    this.config = {};
    // this.config.from = `0x${tx.getSenderAddress().toString('hex')}`;
    this.config.gasLimit = bufferToInt(this.transaction.gasLimit);
    this.config.gasPrice = bufferToInt(this.transaction.gasPrice);
    this.config.sendValue = new _bn(decodedData.params[1].value);
    this.config.nonce = this.transaction.nonce ? bufferToInt(this.transaction.nonce) : 0;
    // TODO Is this a bug here? why is this line different from NFT?
    this.config.txnOuts = [{ to: decodedData.params[0].value }];
    assert(this.config.txnOuts[0].to);

    return this.config;
  }

  assetName() {
    return this.name;
  }

  assetTicker() {
    return this.ticker;
  }

  async getBalance(address: string, fastFetch: boolean = false) {
    try {
      const contract = new this.web3.eth.Contract(helper.ERC20Abi, this.contractAddress);
      const balanceHEX = await contract.methods.balanceOf(address).call();
      // const balanceFloat = this.web3.utils.toBN(balanceHEX).div(new BN(10).pow(new BN(this.assetDecimal)))
      return getDecimalValue(this.web3.utils.toBN(balanceHEX).toString(10), this.assetDecimal);
      // return balanceFloat;
    } catch (ex) {
      return 0;
    }
  }

  getSendValue(feeAmt = 0) {
    assert(this.config);
    return getDecimalValue(this.config.sendValue, this.assetDecimal);
  }

  async checkGasPaid(targetAddress: string, reqGas: number) {
    const balance = await this.web3.eth.getBalance(targetAddress);
    return Number(balance) >= getIntegralValue(reqGas, this.etherDecimal);
  }

  async isFundsReady() {
    assert(this.config);
    const sourceAddress = this.config.from;
    const balance = await this.getBalance(sourceAddress);
    const isGasPaid = await this.checkGasPaid(sourceAddress, this.getTotalGasRequired());
    return balance >= this.getSendValue() && isGasPaid;
  }

  async getConfirmation(targetAddress: string) {
    const txns: any[] = await listTx(
      helper.ERC20Abi,
      targetAddress,
      this.contractAddress,
      this.network
    );

    let _minConf = null;
    const curBlockNumber = await this.web3.eth.getBlockNumber();

    for (let i = 0; i < txns.length; i++) {
      const height = Number(curBlockNumber) - Number(txns[i].blockNumber) + 1;
      _minConf = _minConf == null ? height : Math.min(height, _minConf);
    }

    return _minConf;
  }

  async _getGasLimit(estimateFeeParams: any, trxData: any) {
    let gasLimit: any;

    const contract = new this.web3.eth.Contract(helper.ERC20Abi, this.contractAddress);
    try {
      gasLimit = await contract.methods
        .transfer(trxData.to, this.web3.utils.toHex(trxData.value))
        .estimateGas(estimateFeeParams);
      gasLimit = this._estimatedGasWithCoeff(gasLimit);
    } catch (e) {
      gasLimit = 75000;
    }

    gasLimit = parseInt(gasLimit);

    return gasLimit;
  }

  _getParamsForEstimateGas(params: any): any {
    return { from: params.from, value: '0x0' };
  }
}

export default Erc20;
