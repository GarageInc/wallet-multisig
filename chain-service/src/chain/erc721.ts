import Erc20 from './erc20';
import { Transaction } from 'ethereumjs-tx';
import _bn from 'bn.js';
import assert from 'assert';
import abiDecoder from 'abi-decoder';

import helper from '../helpers/eth/eth';
import fetchHelper, { getTokenExplorerEndpoint } from '../helpers/fetch';

import { getIntegralValue, bufferToInt } from '../helpers/unitConversions'; // var this.web3, web3wss;

const getNftTokenIds = (network: any, address: any, contractAddress: any)=>
  new Promise((success, reject) => {
    const tokenExplorerEndpoint = getTokenExplorerEndpoint()
    const url = `${tokenExplorerEndpoint}/vaults/${network}/${address}/nft/${contractAddress}`;
    fetch(url)
      .then((ret) => {
        ret.json().then((ret) => {
          success(ret.result);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

class Erc721 extends Erc20 {
  supportMetaData: any;
  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(assetData: any, network: string) {
    super(assetData, network); // this._setup = setup;

    this.supportMetaData = assetData[2].supportMetaData;
  }

  async init(config: any): Promise<any> {
    await this.baseInit(config);

    this.config.sendValue = this.config.txnOuts[0].value;

    const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);

    const transferFunc = contract.methods.transferFrom(
      this.config.from,
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
        try {
          this.config.gasLimit = await transferFunc.estimateGas(rawTransaction);
        } catch {
          throw 'Insufficient amount';
        }
        this.config.gasLimit = parseInt(this.config.gasLimit * 1.05);
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

    abiDecoder.addABI(helper.ERC721Abi);
    const decodedData = abiDecoder.decodeMethod('0x' + this.transaction.data.toString('hex'));

    // TODO add Smart Contract address validation

    this.config = {};
    // this.config.from = `0x${tx.getSenderAddress().toString('hex')}`;
    this.config.gasLimit = bufferToInt(this.transaction.gasLimit);
    this.config.gasPrice = bufferToInt(this.transaction.gasPrice);
    this.config.sendValue = parseInt(decodedData.params[2].value);
    this.config.nonce = this.transaction.nonce ? bufferToInt(this.transaction.nonce) : 0;
    this.config.txnOuts = [
      { to: decodedData.params[1].value, value: parseInt(decodedData.params[2].value) },
    ];
    assert(this.config.txnOuts[0].to);

    return this.config;
  }

  async getBalance(address: string, fastFetch: boolean = false) {
    try {
      const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);
      const balanceHEX = await contract.methods.balanceOf(address).call();
      // const balanceFloat = this.web3.utils.toBN(balanceHEX).div(new BN(10).pow(new BN(this.assetDecimal)))
      return parseInt(this.web3.utils.toBN(balanceHEX).toString(10));
      // return balanceFloat;
    } catch (ex) {
      return 0;
    }
  }

  getSendValue() {
    assert(this.config);
    return this.config.sendValue;
  }

  async checkGasPaid(targetAddress: any, reqGas: any) {
    const balance = await this.web3.eth.getBalance(targetAddress);
    return Number(balance) >= getIntegralValue(reqGas, this.etherDecimal);
  }

  async isFundsReady() {
    assert(this.config);
    const sourceAddress = this.config.from.toLowerCase();
    const ownerOfToken = (await this._ownerOfToken(this.getSendValue())).toLowerCase();
    const isGasPaid = await this.checkGasPaid(sourceAddress, this.getTotalGasRequired());
    return ownerOfToken === sourceAddress && isGasPaid;
  }

  async getAssetIds(ownerAddress: string) {
    try {
      const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);
      let tokenIds = [];
      try {
        const balance = await this.getBalance(ownerAddress);
        for (let i = 0; i < balance; i++) {
          // Token listing from ERC721Enumerable standard
          tokenIds.push(await contract.methods.tokenOfOwnerByIndex(ownerAddress, i).call());
        }
      } catch (e) {
        try {
          // Token listing from CryptoKitties Core
          tokenIds = await contract.methods.tokensOfOwner(ownerAddress).call();
        } catch (e) {
          try {
            // Lets figure it out with transaction history
            tokenIds = await getNftTokenIds(
              this.network,
              ownerAddress,
              this.contractAddress
            );
          } catch (e) {
            // seems like we can't retrieve tokens of the owner
            console.log('error', e);
          }
        }
      }

      return tokenIds;
    } catch (ex) {
      return 0;
    }
  }

  async getAssetDataById(assetId: any) {
    const assetData: any = { id: assetId };

    try {
      const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);

      if (this.supportMetaData) {
        try {
          try {
            // Metadata from ERC721Metadata standard
            const uri = await contract.methods.tokenURI(new _bn(assetId)).call();
            assetData.uri = uri;

            try {
              assetData.metadata = await fetchHelper.fetchMetaData(uri);
              assetData.name = assetData.metadata.name;
              assetData.imageURL = assetData.metadata.image.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              );
              assetData.description = assetData.metadata.description;
            } catch (err) {
              console.log('getAssetDataById (parse URI):', err);
              // URI is invalid
            }
          } catch (err) {
            console.log('getAssetDataById (get token URI):', err);
            try {
              // Metadata from CryptoKitties Core
            } catch (err) {
              // seems like we can't retrieve tokens of the owner
            }
          }
        } catch (err) {
          // Something went wrong while retrieving token meta data
        }
      }

      return assetData;
    } catch (err) {
      return assetData;
    }
  }

  async _ownerOfToken(tokenId: string) {
    const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);
    let tokenOwnerAddress = '';

    try {
      tokenOwnerAddress = await contract.methods.ownerOf(this.web3.utils.toHex(tokenId)).call();
    } catch (e) {
      // Some error has occurred
    }

    return tokenOwnerAddress;
  }

  async _getGasLimit(estimateFeeParams: any, trxData: any) {
    let gasLimit: any;

    const contract = new this.web3.eth.Contract(helper.ERC721Abi, this.contractAddress);

    try {
      gasLimit = await contract.methods
        .transferFrom(trxData.from, trxData.to, this.web3.utils.toHex(trxData.value))
        .estimateGas(estimateFeeParams);
      gasLimit = this._estimatedGasWithCoeff(gasLimit);
    } catch (e) {
      gasLimit = 150000;
    }

    return gasLimit;
  }
}

export default Erc721;
