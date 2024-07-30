const Tron = require('./trx.js');
const TronUtils = require('../helpers/tron/TronUtils').TronUtils;
const TronTrxSchema = require('../helpers/tron/Tron_pb');
const TronMessageSchema = require('../helpers/tron/asset_issue_contract_pb');
const google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

const assert = require('assert');
const ethHelper = require('../helpers/eth/eth');
const { getDecimalValue, getIntegralValueBN, getIntegralValue, utf8ToHex, hexToUtf8 } = require('../helpers/unitConversions'); 

// console.log('Trx: ', Trx)
class Trc10 extends Tron {
  constructor(assetData, network) {
    super(network);

    this.assetId = assetData[0];
    this.ticker = assetData[2].ticker;
    this.assetDecimal = assetData[2].decimals;
    this.name = assetData[2].name;
  }

  async init(config) {
    this.config = config;

    // Tron does not provide option to redefine transaction cost. Hence this.config.feeRate is ignored in Tron context
    
    // We should revert if global netLimit is reached. Transaction will not go through in this case.
    //
    //   https://github.com/tronprotocol/java-tron/blob/develop/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L195
    //

    this.config.timestamp = new Date().getTime();
    this.config.expiresAt = this.config.timestamp + 3600000; // Miliseconds 
    // this.config.gasPrice = bandwidthPointFee;

    let totalAmount;
    if ( this.config.sendAll ) {
      totalAmount = await this.getBalance(this.config.from);
    } else {
      totalAmount = this.config.txnOuts[0].value;
    }

    this.config.sendValue = getIntegralValueBN(totalAmount, this.assetDecimal);
    this.config.networkFee = await this.estimateNetworkFee(this.config.from, this.config.txnOuts[0].to, this.config.sendValue);

    const trxRaw = await this._getTransactionRaw(this.config.networkFee.options.trxData, this.config.timestamp, this.config.expiresAt);

    this.transaction = new TronTrxSchema.Transaction();
    this.transaction.setRawData(trxRaw);

    return Buffer.from(trxRaw.serializeBinary()).toString('hex');
  }
  
  async initFromHex(trxHex) {
    const trxBuffer = Buffer.from(trxHex, 'hex');

    this.config = {};

    const trxRaw = new TronTrxSchema.Transaction.raw.deserializeBinary(trxBuffer);
    const trxContract = trxRaw.getContractList()[0];
    const trxContractType = trxContract.getType();

    if (trxContractType === TronTrxSchema.Transaction.Contract.ContractType.TRANSFERASSETCONTRACT) {
      const trxParameterAnyWrapped = trxContract.getParameter();
      const trxParameterBuffer = trxParameterAnyWrapped.getValue();
      const trxParameter = new TronMessageSchema.TransferAssetContract.deserializeBinary(trxParameterBuffer);

      const assetNameHex = Buffer.from(trxParameter.getAssetName()).toString('hex');
      assert(hexToUtf8(assetNameHex) == this.assetId.toString()); // Validate that received token address matches the provided address

      this.config.from = TronUtils.addressHexToStr(Buffer.from(trxParameter.getOwnerAddress()).toString('hex'));
      this.config.txnOuts = [{ to: TronUtils.addressHexToStr(Buffer.from(trxParameter.getToAddress()).toString('hex')) }];
      this.config.sendValue = trxParameter.getAmount();

      this.config.networkFee = await this.estimateNetworkFee(this.config.from, this.config.txnOuts[0].to, this.config.sendValue);
      this.config.timestamp = trxRaw.getTimestamp();
    }
  
    assert(this.config.txnOuts[0].to);

    this.transaction = new TronTrxSchema.Transaction();
    this.transaction.setRawData(trxRaw);

    return this.config;
  }

  assetName() {
    return this.name;
  }

  assetTicker() {
    return this.ticker;
  }

  // We fetch all TRC10 balances and then fetch this one that we need
  //
  // curl -X POST  https://api.trongrid.io/wallet/getaccount -d '{
  //   "address": "41E552F6487585C2B58BC2C9BB4492BC1F17132CD0"
  // }'
  async getBalance(addressRaw, fastFetch = false) {
    try {
      const account = await this._getAccount(addressRaw);

      const allTrc10Assets = account.assetV2;
      const assetsBalanceObj = allTrc10Assets.find(balanceObj => balanceObj.key === this.assetId);

      return getDecimalValue(assetsBalanceObj.value, this.assetDecimal);
    } catch (ex) {
      return 0;
    }
  }

  getSendValue(feeAmt = 0) {
    assert(this.config);
    return getDecimalValue(this.config.sendValue, this.assetDecimal);
  }

  async checkGasPaid(sourceAddressRaw, reqGas) {
    const account = await this._getAccount(sourceAddressRaw);
    const coinBalance = parseInt(account.balance);
    return coinBalance >= getIntegralValue(reqGas, this.trxDecimal);
  }

  async isFundsReady() {
    assert(this.config);
    const sourceAddressRaw = this.config.from;
    const assetBalance = await this.getBalance(sourceAddressRaw);
    const gasRequired = this.getTotalGasRequired();
    const isGasPaid = await this.checkGasPaid(sourceAddressRaw, gasRequired);
    return assetBalance >= this.getSendValue() && isGasPaid;
  }

  // Transaction Raw is an object that contains all the details about contents of actual Tron transaction. 
  // This overwrites a method in TRX adapter and configures the transaction to send TRC10 instead
  _getTrxContract(trxData) {
    const trxParameter = new TronMessageSchema.TransferAssetContract();
    trxParameter.setAssetName(Buffer.from(utf8ToHex(this.assetId.toString()), 'hex'));
    trxParameter.setOwnerAddress(Buffer.from(trxData.owner_address, 'hex'));
    trxParameter.setToAddress(Buffer.from(trxData.to_address, 'hex'));
    trxParameter.setAmount(trxData.value);

    const trxParameterAnyWrapped = new google_protobuf_any_pb.Any();
    trxParameterAnyWrapped.setTypeUrl('type.googleapis.com/protocol.TransferAssetContract');
    trxParameterAnyWrapped.setValue(trxParameter.serializeBinary()); 

    const trxTransferContractType = TronTrxSchema.Transaction.Contract.ContractType.TRANSFERASSETCONTRACT;
    const trxContract = new TronTrxSchema.Transaction.Contract();
    trxContract.setType(trxTransferContractType);
    trxContract.setParameter(trxParameterAnyWrapped);

    return trxContract;
  }

}

module.exports = Trc10;
