import { Transaction } from 'ethereumjs-tx';
import _bn from 'bn.js';
import assert from 'assert';

import { getIntegralValue, bufferToInt } from '../helpers/unitConversions';
import Ethereum from './eth';

class EvmSmartContract extends Ethereum {
  /**
   * constructor description
   * @param  {Setup} setup [configuration of the coins/asset]
   */
  constructor(network: string) {
    super(network);
  }

  // [TODO] This should accept config and optional data
  // and return transaction hex and metadata
  async init(config: any, txData: any): Promise<any> {
    await this.baseInit(config);

    const txParams = {
      from: this.config.from.toLowerCase(),
      to: this.config.to.toLowerCase(),
      value: this.web3.utils.toHex(txData.value),
      data: txData.data || '0x',
      nonce: this.web3.utils.toHex(this.config.nonce),
    };

    if (this.config.networkFeeDecimal) {
      this.config.gasLimit = parseInt(
        getIntegralValue(this.config.networkFeeDecimal, this.etherDecimal) / this.config.gasPrice
      );
    } else {
      if (!this.config.gasLimit) {
        this.config.gasLimit = await this.web3.eth.estimateGas(txParams);
      } else {
        this.config.gasLimit = parseInt(this.config.gasLimit);
      }
    }

    this.config.sendValue = parseInt(txData.value);

    const trxConfig = {
      ...txParams,
      chainId: this.web3.utils.toHex(this.chainId),
      gasLimit: this.web3.utils.toHex(this.config.gasLimit),
      gasPrice: this.web3.utils.toHex(this.config.gasPrice),
    };

    this.transaction = new Transaction(trxConfig, this._getTransactionOptions());
    this.rawTx = this.transaction.serialize().toString('hex');

    return this.rawTx;
  }

  // [TODO] Add a wrapper for initFromHex method, that validates that the hex data matches metaData
  // async initFromHex(trxHex: string) {
  //   super(trxHex);
  //   assert(We assert here that metaData matches hex);
  // }

  getDestination() {
    return this.config.to || this.config.txnOuts[0]?.to;
  }
}

export default EvmSmartContract;
