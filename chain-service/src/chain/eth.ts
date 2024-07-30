import fetchEstimatedL1Fee from '../helpers/eth/optimism/fetchEstimatedL1Fee';

import fetch from 'node-fetch';

import { AssetsContractController } from '@metamask/assets-controllers';

import { ec as EC } from 'elliptic';
import { Transaction } from 'ethereumjs-tx';
import { bufferToHex, pubToAddress } from 'ethereumjs-util';
import ethCommon from 'ethereumjs-common';
import _bn from 'bn.js';
import Web3 from 'web3';
import assert from 'assert';

import helper, { FEE_TYPES } from '../helpers/eth/eth';

import {
  getIntegralValue,
  getIntegralValueBN,
  getDecimalValue,
  bufferToInt,
} from '../helpers/unitConversions';
import BaseCoin from './base';
import { isMultiLayerFeeNetwork } from '../helpers/eth/multilayer';
import { getTokenExplorerEndpoint } from '../helpers/fetch';

const DEFAULT_ADDRESS = '0x0123456789012345678901234567890123456789';

const getAssetAddresses = (network: string, address: string): Promise<any>  =>
  new Promise((success, reject) => {
    const tokenExplorerEndpoint = getTokenExplorerEndpoint()
    const url = `${tokenExplorerEndpoint}/vaults/${network}/${address}/tokens`;
    fetch(url)
      .then((ret: any) => {
        ret.json().then((ret: any) => {
          // console.log({result: ret.result});
          success(ret.result);
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });

const GWEI = 1000000000;

class Ethereum extends BaseCoin {
  protected config: any;
  protected etherDecimal: number;
  protected gweiDecimal: number;
  protected network: string;
  protected apiConfig: any;
  protected chainId: number;
  protected provider: any;
  protected web3: any;
  protected assetsContractController: AssetsContractController;
  protected rawTx: string;
  protected transaction: Transaction;

  /**
   * constructor description
   * @param  {Setup} setup [configuration of the coins/asset]
   */
  constructor(network: string) {
    super();

    this.type = 'ACCOUNT';
    this.etherDecimal = 18;
    this.gweiDecimal = 9;
    this.network = network;
    this.apiConfig = helper.explorerURL[network];
    this.chainId = this.apiConfig.CHAIN_ID;
    this.provider = new Web3.providers.HttpProvider(this.apiConfig.ENDPOINT);
    this.web3 = new Web3(this.provider);

    this.assetsContractController = new AssetsContractController(
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onPreferencesStateChange: (listener: any) => {},
        // This handler is misnamed, and is a known issue that will be resolved
        // by planned refactors. It should be onNetworkDidChange which happens
        // AFTER the provider in the network controller is updated to reflect
        // the new state of the network controller. In #18041 we changed this
        // handler to be triggered by the change in the network state because
        // that is what the handler name implies, but this triggers too soon
        // causing the provider of the AssetsContractController to trail the
        // network provider by one update.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onNetworkStateChange: (cb: any) => {},
      },
      {
        provider: this.provider,
      },
      {}
    );
  }

  async baseInit(config: any) {
    this.config = config;

    if (typeof this.config.feeRate !== 'undefined') {
      // We got fee from wallet frontend. Simplified version
      // simple way to define fee on the wallet though drag bar
      // Comes from from 0 to 100. we take 50 (middle) as recommended value, given by gas estimator
      const feePercent = ((this.config.feeRate - 50) * 1) / 100;
      const gasPrice = parseInt(await this.web3.eth.getGasPrice());

      this.config.gasPrice = parseInt(gasPrice * (1 + feePercent));
      if (this.config.gasPrice < GWEI) this.config.gasPrice = GWEI; // minimum fee is 1 Gwei
    } else {
      if (!this.config.gasPrice) this.config.gasPrice = parseInt(await this.web3.eth.getGasPrice());

      if (this.config.gasPrice * 1000 < getIntegralValue(1, this.gweiDecimal)) {
        // We got fee from wallet frontend. Advanced version. Value in Gwei
        this.config.gasPrice = parseInt(getIntegralValue(this.config.gasPrice, this.gweiDecimal));
      }
    }

    this.config.nonce = await this.web3.eth.getTransactionCount(this.config.from);
  }

  async init(config: any, txData?: any): Promise<any> {
    await this.baseInit(config);

    let totalCents: any;
    if (this.config.sendAll) {
      totalCents = new _bn(await this.web3.eth.getBalance(this.config.from));
    } else {
      totalCents = getIntegralValueBN(this.config.txnOuts[0].value, this.etherDecimal);
    }

    if (this.config.networkFeeDecimal) {
      this.config.gasLimit = parseInt(
        getIntegralValue(this.config.networkFeeDecimal, this.etherDecimal) / this.config.gasPrice
      );
    } else {
      if (!this.config.gasLimit) {
        this.config.gasLimit = await this.web3.eth.estimateGas({
          from: this.config.from.toLowerCase(),
          to: this.config.txnOuts[0].to.toLowerCase(),
          value: this.web3.utils.toHex(totalCents),
          data: '0x',
          nonce: this.web3.utils.toHex(this.config.nonce),
        });
      } else {
        this.config.gasLimit = parseInt(this.config.gasLimit);
      }
    }

    if (this.config.sendAll)
      totalCents = totalCents.sub(new _bn(this.config.gasPrice * this.config.gasLimit));
    if (totalCents.isNeg()) throw 'Insufficient funds';
    this.config.sendValue = totalCents;

    const trxConfig = {
      chainId: this.web3.utils.toHex(this.chainId),
      from: this.config.from,
      to: this.config.txnOuts[0].to,
      value: this.web3.utils.toHex(this.config.sendValue),
      data: '0x',
      gasLimit: this.web3.utils.toHex(this.config.gasLimit),
      gasPrice: this.web3.utils.toHex(this.config.gasPrice),
      nonce: this.web3.utils.toHex(this.config.nonce),
    };

    this.transaction = new Transaction(trxConfig, this._getTransactionOptions());
    this.rawTx = this.transaction.serialize().toString('hex');
    return this.rawTx;
  }

  async initFromHex(trxHex: string) {
    this.rawTx = trxHex;
    this.transaction = new Transaction(trxHex, this._getTransactionOptions());

    this.config = {};
    // this.config.from = this.transaction.from;
    this.config.gasLimit = bufferToInt(this.transaction.gasLimit);
    this.config.gasPrice = bufferToInt(this.transaction.gasPrice);
    this.config.sendValue = new _bn(this.transaction.value);
    this.config.nonce = this.transaction.nonce ? bufferToInt(this.transaction.nonce) : 0;
    this.config.txnOuts = [{ to: this.web3.utils.toHex(this.transaction.to) }];
    assert(this.config.txnOuts[0].to);

    return this.config;
  }

  getHash(sign = false): any {
    return [this.transaction.hash(sign).toString('hex')];
  }

  getTxnId() {
    return `0x${this.getHash(true)}`;
  }

  getNetworkFee() {
    assert(this.config);
    return parseInt(this.config.gasLimit * this.config.gasPrice);
  }

  async _getGasLimit(estimateFeeParams: any, trxData?: any) {
    let gasLimit: any;

    try {
      gasLimit = await this.web3.eth.estimateGas(estimateFeeParams);
      gasLimit = this._estimatedGasWithCoeff(gasLimit);
    } catch (e) {
      gasLimit = 25000;
    }

    return gasLimit;
  }

  async estimateNetworkFee(from: any, to: any, value: any, data?: any) {
    const estimated = await this._estimateNetworkFee(from, to, value, data);

    let { gasPriceWei } = estimated;
    const { gasLimit, multiLayerL1TradeFeeTotal } = estimated;

    if (gasPriceWei < getIntegralValue(1, this.gweiDecimal))
      gasPriceWei = getIntegralValue(1, this.gweiDecimal);

    const fees = [
      {
        value: getDecimalValue(gasPriceWei * gasLimit, this.etherDecimal),
        type: FEE_TYPES.ESTIMATE_FEE,
        label: 'Network fee',
      },
    ];

    if (multiLayerL1TradeFeeTotal) {
      return {
        fees: [
          ...fees,
          {
            value: multiLayerL1TradeFeeTotal,
            type: FEE_TYPES.L1_TRADE_FEE,
            label: 'L1 Network Fee',
          },
        ],
      };
    }

    return { fees };
  }

  feeParams = async (from: string, to: string, value: any, data: any) => {
    const { gasPriceGwei, gasLimit, multiLayerL1TradeFeeTotal } = await this._estimateNetworkFee(
      from || this.config?.from,
      to || this.config?.to,
      value || this.config?.value,
      data || this.config?.data
    );

    const params = {
      gasPrice: {
        key: 'Gas price',
        subkey: 'in Gwei',
        value: gasPriceGwei > 0 ? gasPriceGwei : 1,
        hint: 'The cost of transactions is a product of the gas price, measured in a unit called Gwei, and the gas limit. The higher gas price you will provide, the faster will your transaction will be confirmed by the network. ',
      },
      gasLimit: {
        key: 'Gas limit',
        value: gasLimit,
        hint: 'Gas Limit is the maximum cost you are willing to pay to successfully make a transaction on the blockchain. Low gas limit may fail the transaction.',
      },
    };

    if (multiLayerL1TradeFeeTotal) {
      return {
        params: {
          ...params,
          multiLayerL1TradeFeeTotal: {
            key: 'L1 Fee',
            subkey: 'in ETH',
            value: multiLayerL1TradeFeeTotal,
            hint: 'You are currently on L2 network. Your transaction will be confirmed once its hash is reflected on L1 network. L1 network fee is the maximum cost you are willing to pay to successfully make a transaction on the L1 network.',
            locked: true,
          },
        },
      };
    }

    return { params };
  };

  getAddress(pubKey: any) {
    const ec = new EC('secp256k1');
    const keyPair = ec.keyFromPublic(pubKey, 'hex');
    // @ts-ignore
    const buffer = Buffer.from(keyPair.getPublic('string'));
    const pubBuffAddr = pubToAddress(buffer, true);
    const pubAddr = bufferToHex(pubBuffAddr);
    return pubAddr;
  }

  // [TODO] This should also be available as a static method.
  checkAddress(address: string) {
    return this.web3.utils.isAddress(address);
  }

  addressPattern() {
    return '^0x[0-9a-fA-F]{40}$';
  }

  supportedAssets(): any {
    return ['ERC20', 'ERC721'];
  }

  async getAvailableAssetsMetaData(ownerAddress: string): Promise<any> {
    const assetAddresses = await getAssetAddresses(this.network, ownerAddress);

    const assetMetaDatas = assetAddresses.map((assetAddress: string) => {
      return { id: assetAddress };
    });

    return assetMetaDatas;
  }

  async getAssetData(assetAddress: string): Promise<any> {
    const assetData = [assetAddress, null, {}];

    const { type: assetType } = await this._getAssetInfo(assetAddress);

    let assetContract;

    if (assetType === 'ERC20') {
      assetData[1] = 'ERC20';
      assetContract = new this.web3.eth.Contract(helper.ERC20Abi, assetAddress);
    } else if (assetType === 'ERC721') {
      assetData[1] = 'ERC721';
      assetContract = new this.web3.eth.Contract(helper.ERC721Abi, assetAddress);
    } else {
      return assetData;
    }

    try {
      assetData[2]['name'] = await assetContract.methods.name().call();
    } catch (err) {
      // Name unavailable
    }

    try {
      assetData[2]['ticker'] = await assetContract.methods.symbol().call();
    } catch (err) {
      // Symbol unavailable
    }

    if (assetType === 'ERC20') {
      try {
        assetData[2]['decimals'] = parseInt(await assetContract.methods.decimals().call());
      } catch (err) {
        assetData[2]['decimals'] = 0;
      }
    } else {
      assetData[2]['decimals'] = false;
    }

    if (assetType === 'ERC721') {
      try {
        // See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
        const supportMetaData = await assetContract.methods.supportsInterface('0x5b5e139f').call();
        assetData[2]['supportMetaData'] = supportMetaData;
      } catch (err) {
        assetData[2]['supportMetaData'] = false;
      }
    }

    return assetData;
  }

  async setSignature(signatures: any): Promise<any> {
    const signature = signatures[0];
    const sig = {
      r: new _bn(signature.r, 16),
      s: new _bn(signature.s, 16),
      recoveryParam: signature.recoveryParam,
      v: signature.v,
    };

    sig.v = this.chainId * 2 + 35 + sig.recoveryParam;

    // Set the signature of the transaction
    Object.assign(this.transaction, sig);
    return true;
  }

  serializeTransaction(sign = false) {
    return `0x${this.transaction.serialize().toString('hex')}`;
  }

  async verifySignature(signatures: any, pubKey: any): Promise<any> {
    // Create a temp transaction
    const signature = signatures[0];

    let tx: any;
    if (this.rawTx) {
      tx = new Transaction(this.rawTx, this._getTransactionOptions());
    }

    const sig = {
      r: new _bn(signature.r, 16),
      s: new _bn(signature.s, 16),
      recoveryParam: signature.recoveryParam,
      v: signature.v,
    };

    sig.v = this.chainId * 2 + 35 + sig.recoveryParam;
    // Sign the temp transaction and check the address is correct or not

    Object.assign(tx, sig);

    try {
      const recoverAddr = `0x${tx.getSenderAddress().toString('HEX')}`;
      const curAddr = this.getAddress(pubKey); // console.log({recoverAddr, curAddr})

      if (recoverAddr === curAddr) {
        return true;
      }
      return false;
    } catch (e) {
      // It might be exception, for v, it could be 27 or 28
      // Create a temp transaction
      const tmpTx = new Transaction(this.rawTx, this._getTransactionOptions());

      const tmpSig = {
        r: new _bn(signature.r, 16),
        s: new _bn(signature.s, 16),
        recoveryParam: signature.recoveryParam,
        v: signature.v,
      };

      sig.v = this.chainId * 2 + 35 + sig.recoveryParam - 14;

      // Sign the temp transaction and check the address is correct or not
      Object.assign(tmpTx, tmpSig);
      const tmpRecoverAddr = `0x${tmpTx.getSenderAddress().toString('hex')}`;
      const tmpCurAddr = this.getAddress(pubKey);

      if (tmpRecoverAddr === tmpCurAddr) {
        return true;
      }
      return false;
    }
  }

  getTotalGasRequired() {
    assert(this.config);
    return getDecimalValue(this.getNetworkFee(), this.etherDecimal);
  }

  getSendValue() {
    assert(this.config);

    return getDecimalValue(this.config.sendValue, this.etherDecimal);
  }

  sendTransaction(hex: any, callback: any): any {
    this.web3.eth
      .sendSignedTransaction(hex)
      .once('transactionHash', (hash: any) => {
        callback({
          transactionHash: hash,
          completed: false,
        });
      })
      .once('receipt', (receipt: any) => {
        Object.assign(receipt, {
          completed: true,
        });

        callback(receipt);

        return receipt;
      })
      .on('error', (error: any) => {
        callback({
          type: 'error',
          error,
        });
        return error;
      });
  }
  getCoinBalance = async (address: string) => {
    return await this.web3.eth.getBalance(address);
  };

  async getBalance(address: string, fastFetch = false): Promise<number> {
    const balance = await this.web3.eth.getBalance(address);

    return getDecimalValue(balance, this.etherDecimal);
  }

  async getConfirmation(targetAddress: string) {
    const txns: any[] = []; // [TODO] Implement confirmation fetching
    let _minConf = null;

    for (let i = 0; i < txns.length; i++) {
      if (Number(txns[i].confirmations) > 0) {
        _minConf =
          _minConf == null
            ? Number(txns[i].confirmations)
            : Math.min(Number(txns[i].confirmations), Number(_minConf));
      }
    }

    return _minConf;
  }

  _getTransactionOptions() {
    if (this.chainId == 1 || this.chainId == 3) {
      return { chain: this.chainId };
    } else {
      const chain = ethCommon.forCustomChain(
        'mainnet',
        {
          name: this.assetTicker(),
          networkId: this.chainId,
          chainId: this.chainId,
        },
        'byzantium'
      );

      return { common: chain };
    }
  }

  _getParamsForEstimateGas = ({ from, to, data, value }: any) => {
    return {
      from: from,
      to: to,
      data: data,
      value: getIntegralValueBN(value, this.etherDecimal),
    };
  };

  _estimateNetworkFee = async (
    from: any,
    to: any = DEFAULT_ADDRESS,
    value: any = 1,
    data: any = '0x'
  ) => {
    const gasPriceWei = parseInt(await this.web3.eth.getGasPrice());
    const gasPriceGwei = parseInt(getDecimalValue(gasPriceWei, this.gweiDecimal));

    const estimateFeeParams = this._getParamsForEstimateGas({
      from,
      to,
      data,
      value,
    });

    const transactionParams = {
      to,
      value,
      from,
    };

    const estimatedFeeData = {
      gasPriceWei,
      gasPriceGwei,
      gasLimit: await this._getGasLimit(estimateFeeParams, transactionParams),
      multiLayerL1TradeFeeTotal: 0,
    };

    if (isMultiLayerFeeNetwork(this.network)) {
      const l1Fee = await fetchEstimatedL1Fee({ txParams: estimateFeeParams }, this.web3);

      estimatedFeeData.multiLayerL1TradeFeeTotal = getDecimalValue(l1Fee, this.etherDecimal);
    }

    return estimatedFeeData;
  };

  async _getAssetType(contractAddress: string) {
    const erc20Signature = 'decimals()';
    const erc721Signature = 'ownerOf(uint256)';

    const code = await this.web3.eth.getCode(contractAddress);

    // https://ethereum.stackexchange.com/questions/11856/how-to-detect-from-web3-if-method-exists-on-a-deployed-contract/50091#50091
    let hash;
    hash = this.web3.eth.abi.encodeFunctionSignature(erc20Signature);
    if (code.indexOf(hash.slice(2, hash.length)) > 0) {
      return 'ERC20';
    }

    hash = this.web3.eth.abi.encodeFunctionSignature(erc721Signature);
    if (code.indexOf(hash.slice(2, hash.length)) > 0) {
      return 'ERC721';
    }

    return null;
  }

  async _getAssetInfo(contractAddress: any) {
    try {
      // This approach will take into account if contract is a proxy contract and will return an answer for proxy smart contract.
      // In particular USDC and USDT on Ethereum are both proxy smart contracts.
      //
      // Here is how it works
      //
      // https://github.com/MetaMask/core/blob/0c620dfab22b009337f05fb8ad485a1983aed71b/packages/assets-controllers/src/AssetsContractController.ts#L231
      // https://github.com/MetaMask/core/blob/0c620dfab22b009337f05fb8ad485a1983aed71b/packages/assets-controllers/src/Standards/NftStandards/ERC721/ERC721Standard.ts#L173
      // https://github.com/MetaMask/core/blob/0c620dfab22b009337f05fb8ad485a1983aed71b/packages/assets-controllers/src/Standards/NftStandards/ERC721/ERC721Standard.ts#L59
      // https://github.com/MetaMask/core/blob/0c620dfab22b009337f05fb8ad485a1983aed71b/packages/assets-controllers/src/Standards/NftStandards/ERC721/ERC721Standard.ts#L144
      //
      const { standard } = await this.assetsContractController.getTokenStandardAndDetails(
        contractAddress,
        undefined,
        undefined
      );

      if (standard) {
        return {
          type: standard,
        };
      }
    } catch (e) {}

    // This approach will work for CryptoKitties. CryptoKittis were release before ERC721 standard and it does not fully compatible
    // with ERC721 standard and if does not implements interface
    return {
      type: await this._getAssetType(contractAddress),
    };
  }
}

export default Ethereum;
