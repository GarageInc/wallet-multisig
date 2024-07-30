const Trc10 = require('./trc10.js');
const TronUtils = require('../helpers/tron/TronUtils').TronUtils;
const TronTrxSchema = require('../helpers/tron/Tron_pb');
const TronMessageSchema = require('../helpers/tron/smart_contract_pb');
const google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

const assert = require('assert');
const ethHelper = require('../helpers/eth/eth');
const { getDecimalValue, getIntegralValueBN, getIntegralValue } = require('../helpers/unitConversions'); 

// console.log('Trx: ', Trx)
class Trc20 extends Trc10 {
  constructor(assetData, network) {
    super(assetData, network);

    this.contractAddressRaw = this.assetId;
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

    this.config.sendValue = getIntegralValueBN(totalAmount, this.trxDecimal);
    this.config.networkFee = await this.estimateNetworkFee(this.config.from, this.config.txnOuts[0].to, this.config.sendValue);
    const trxData = this.config.networkFee.options.trxData;
    const trxFeeCents = getIntegralValueBN(this.config.networkFee.fees[0].value, this.trxDecimal);

    const trxRaw = await this._getTransactionRaw(trxData, this.config.timestamp, this.config.expiresAt, trxFeeCents);

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

    if (trxContractType === TronTrxSchema.Transaction.Contract.ContractType.TRIGGERSMARTCONTRACT) {
      const trxParameterAnyWrapped = trxContract.getParameter();
      const trxParameterBuffer = trxParameterAnyWrapped.getValue();
      const trxParameter = new TronMessageSchema.TriggerSmartContract.deserializeBinary(trxParameterBuffer);

      const contractAddressHex = TronUtils.addressHexToStr(Buffer.from(trxParameter.getContractAddress()).toString('hex'));
      assert(contractAddressHex == this.contractAddressRaw); // Validate that received token address matches the provided address

      this.config.from = TronUtils.addressHexToStr(Buffer.from(trxParameter.getOwnerAddress()).toString('hex'));

      const functionName = 'transfer';
      const abiData = ethHelper.ERC20Abi;
      const functionAbi = abiData.find(functionAbi => functionAbi.name == functionName && functionAbi.type == 'function');
      const trxDataHex = '0x'+Buffer.from(trxParameter.getData()).toString('hex');
      const trxData = TronUtils.decodeFunctionCall(functionAbi, trxDataHex);
      this.config.txnOuts = [{ to: TronUtils.addressHexToStr(trxData[0].replace('0x', '41')) }];

      this.config.sendValue = parseInt(trxData[1]);

      this.config.networkFee = await this.estimateNetworkFee(this.config.from, this.config.txnOuts[0].to, this.config.sendValue);
      this.config.timestamp = trxRaw.getTimestamp();
    }
  
    assert(this.config.txnOuts[0].to);

    this.transaction = new TronTrxSchema.Transaction();
    this.transaction.setRawData(trxRaw);

    return this.config;
  }

  async feeParams(addressFromRaw, addressToRaw, value) {
    const { energyUnitFee, bandwidthUnitFee } = await this._getNetworkUnitFees();

    addressToRaw ||= this.apiConfig.DUMMY_ADDRESS_RAW;
    value = value || 1; // Default value to estimate sending cost is 1 cent of token
    const estimatedEnergyNominal = await this._estimateEnergy(addressFromRaw, addressToRaw, value);
    const estimatedEnergy = this._estimatedGasWithCoeff(estimatedEnergyNominal);

    const { transaction } = await this._getDummyTransaction(addressFromRaw, addressToRaw, value);
    // See transactionBytesCount of estimateNetworkFee method for details
    const transactionBytesCount = transaction.serializeBinary().length + 65;

    return {
      params: {
        bandwidthPrice: {
          key: 'Bandwidth price',
          subkey: 'SUN per point',
          value: bandwidthUnitFee,
          locked: true,
          hint: 'Transactions are transmitted and stored in the TRON network in the form of byte arrays. One byte requires one Bandwidth Point, so the Bandwidth Points that a transaction needs to consume is equal to the number of transaction bytes.',
        },
        bandwidthAmount: {
          key: 'Bandwidth Points',
          value: transactionBytesCount,
          locked: true,
          hint: 'Transactions are transmitted and stored in the TRON network in the form of byte arrays. One byte requires one Bandwidth Point, so the Bandwidth Points that a transaction needs to consume is equal to the number of transaction bytes.',
        },
        energyPrice: {
          key: 'Energy price',
          subkey: 'SUN per energy',
          value: energyUnitFee,
          locked: true,
          hint: 'The execution of each instruction of smart contract consume a certain amount of energy while running, so contracts of different complexity consume different amounts of energy. When the contract is executed, energy is calculated and deducted according to instruction one by one.',
        },
        energyAmount: {
          key: 'Energy amount',
          value: estimatedEnergy,
          hint: 'The execution of each instruction of smart contract consume a certain amount of energy while running, so contracts of different complexity consume different amounts of energy. When the contract is executed, energy is calculated and deducted according to instruction one by one.',
        }
        
      },
      options: {
        feeSlider: false
      }
    };
  }

  async getBalance(addressRaw, fastFetch = false) {
    try {
      // https://github.com/tronprotocol/tronweb/blob/4b131bbcaa94f9d70fffd1dc36577703d42eefa1/src/utils/abi.js#LL69C57-L69C93
      const addressHex = TronUtils.addressToHex(addressRaw).replace(/^41/, '0x');
      const responseData = await this._requestSmartContract(ethHelper.ERC20Abi, addressRaw, this.contractAddressRaw, 'balanceOf', [addressHex]);

      const balanceCents = parseInt(responseData[0]);

      return getDecimalValue(balanceCents, this.assetDecimal);
      // return balanceFloat;
    } catch (ex) {
      return 0;
    }
  }

  // Transaction Raw is an object that contains all the details about contents of actual Tron transaction. 
  // This overwrites a method in TRX adapter and configures the transaction to send TRC20 instead
  _getTrxContract(trxData) {
    const addressToHex = TronUtils.addressToHex(trxData.to_address).replace(/^41/, '0x');
    const addressContractHex = TronUtils.addressToHex(this.contractAddressRaw);

    // TODO here we should add option to rewrite this in erc721
    const functionName = 'transfer';
    const functionAbi = ethHelper.ERC20Abi.find(functionAbi => functionAbi.name == functionName && functionAbi.type == 'function');
    const dataHex = TronUtils.encodeFunctionCall(functionAbi, [addressToHex, trxData.value], false);

    // https://developers.tron.network/reference/triggersmartcontract
    const trxParameter = new TronMessageSchema.TriggerSmartContract();
    trxParameter.setOwnerAddress(Buffer.from(trxData.owner_address, 'hex'));
    trxParameter.setContractAddress(Buffer.from(addressContractHex, 'hex'));
    trxParameter.setCallValue(0);
    trxParameter.setData(Buffer.from(dataHex, 'hex'));

    const trxParameterAnyWrapped = new google_protobuf_any_pb.Any();
    trxParameterAnyWrapped.setTypeUrl('type.googleapis.com/protocol.TriggerSmartContract');
    trxParameterAnyWrapped.setValue(trxParameter.serializeBinary()); 

    const trxTransferContractType = TronTrxSchema.Transaction.Contract.ContractType.TRIGGERSMARTCONTRACT;
    const trxContract = new TronTrxSchema.Transaction.Contract();
    trxContract.setType(trxTransferContractType);
    trxContract.setParameter(trxParameterAnyWrapped);

    return trxContract;
  }

  _getDefaultFeeLimit() {
    return 30000000; // default fee limit is 30 TRX
  }

  // https://developers.tron.network/reference/triggerconstantcontract
  async _estimateEnergy(addressFromRaw, addressToRaw, amount) {
    const addressToHex = TronUtils.addressToHex(addressToRaw).replace(/^41/, '0x');
    const response = await this._triggerSmartContract(ethHelper.ERC20Abi, addressFromRaw, this.contractAddressRaw, 'transfer', [addressToHex, amount]);
    return  response['energy_used'];
  }
}

module.exports = Trc20;
