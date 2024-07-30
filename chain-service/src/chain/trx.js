const Web3 = require('web3');
const BaseCoin = require('./base.js');
const TronUtils = require('../helpers/tron/TronUtils').TronUtils;
const TronTrxSchema = require('../helpers/tron/Tron_pb');
const TronMessageSchema = require('../helpers/tron/balance_contract_pb');
const google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

const assert = require('assert');
const fetch = require('node-fetch');
const { utils } = require('ethers');
const ethHelper = require('../helpers/eth/eth');
const { hexToUtf8 } = require('../helpers/unitConversions');

const {
  getIntegralValue,
  getDecimalValue,
} = require('../helpers/unitConversions');
const { BlockchainNames } = require('../helpers/supportedBlockchains');

const explorerURL = {
  [BlockchainNames.TronShasta]: {
    ENDPOINT: 'https://api.shasta.trongrid.io/',
    DUMMY_ADDRESS_RAW: 'TMqUxaUuKpkVYzBfExoVWenRzeyRiNPVtS',
    MIN_BLOCK: 30000000, // ~ 2022-12-20
  },
  [BlockchainNames.Tron]: {
    ENDPOINT: 'https://api.trongrid.io/',
    DUMMY_ADDRESS_RAW: 'TYL7z7VSVRShLoJ6YRQMA4t9pSECt9ZLmz',
    MIN_BLOCK: 47000000, // ~ 2022-12-21
  },
};

const ADDRESS_PREFIX = '41';
const DUMMY_SIGNATURE = Buffer.from(
  '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  'hex'
);

const listAssets = (address, apiConfig) =>
  new Promise((success, reject) => {
    // curl --request GET  --url https://api.shasta.trongrid.io/v1/accounts/TWsH2oND2BEzt4u7cvFK4fkoT9M1q31T7Y
    const url = `${apiConfig.ENDPOINT}/v1/accounts/${address}`;
    fetch(url)
      .then((ret) => {
        ret.json().then((ret) => {
          success(ret.data[0]);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

/*
 * Tron has the best documentation one could imagine - it is THE CODE. Uncommented of course!
 *
 * If you want to know how anything about how its transaction works - you simply read their massive code base.
 *
 * Anyways, here is transaction documentation that one can refer to in case of any question regarding some of its processing aspects
 *
 *   Manager#processTransaction
 *   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/core/db/Manager.java#L1380
 *
 *     Manager#consumeBandwidth
 *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/core/db/Manager.java#L942
 *
 *       BandwidthProcessor#consume
 *       https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L96
 *
 *     TransactionTrace#exec
 *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/TransactionTrace.java#L184
 *
 *       RuntimeImpl#execute
 *       https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/common/runtime/RuntimeImpl.java#L40
 *
 *         TransferActuator#execute
 *         https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/actuator/src/main/java/org/tron/core/actuator/TransferActuator.java
 *
 *     TransactionTrace#finalize & TransactionTrace#pay
 *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/TransactionTrace.java#L227
 *
 * Good luck reading it!
 *
 */
class Tron extends BaseCoin {
  // static getAssetAdapter(assetData: any, network: any) {
  //   return AssetsAdapterResolver.getAsset(assetData, network);
  // }

  constructor(network) {
    super();
    this.type = 'ACCOUNT';
    this.trxDecimal = 6;
    this.network = network;

    this.apiConfig = explorerURL[network];
    this.sendTransaction = this.sendTransaction.bind(this);

    this.web3 = new Web3(new Web3.providers.HttpProvider(this.apiConfig.ENDPOINT));
  }

  // TRON protocol description
  // https://github.com/tronprotocol/java-tron/blob/40b7e1ce127e9a1bc71da28857e00bbeaabacf16/protocol/src/main/protos/English%20version%20of%20TRON%20Protocol%20document.md
  //
  // Tron transactions are encoded Protobuf messages. Transaction object contains 2 important things: "raw" and signatures array. Raw includes array of contracts and some
  // chain related information. It is has a initialization moment (on ofe recent block hashes) current timestamp and timeframe that can maximum be 24 hour from the specified timestamp.
  //
  //   https://github.com/tronprotocol/Documentation/blob/master/English_Documentation/TRON_Protocol/TRON_Protobuf_Protocol_document.md
  //
  // The maximum amount of contracts in array is, obviously, 1.
  //
  //   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/core/db/Manager.java#L1404
  //
  // Each contract is sort of a program and they vary from transfer of TRX to staking functionality. We only concerned about TRX, TRC10, TRC20 and NFT. List of Contracts types.
  //
  //   https://github.com/tronprotocol/java-tron/blob/develop/protocol/src/main/protos/core/Tron.proto#L336
  //   https://github.com/tronprotocol/documentation/blob/master/English_Documentation/TRON_Protocol/TX_ContractTypes_Update.MD
  //
  // Get transaction's "raw" to debug (This returns the raw only, without signatures). The final transaction MUST include signature and its total length will influence the bandwidth
  //
  // curl -X POST 'https://api.shasta.trongrid.io/jsonrpc' --data '{
  //     "jsonrpc": "2.0",
  //     "method": "eth_getTransactionByHash",
  //     "params": ["5e74fa51e037e878e796e90149783ccf9cbe006da5bd0f94b73a2740cb086afe"],
  //     "id": 64
  // }'
  //
  // curl -X GET 'https://api.shasta.trongrid.io/wallet/gettransactionbyid?value=6e3db1a919a3beea0d001ade44c159d24f6127800a31b5940a3d35d00bc41c06'
  //
  async init(config) {
    this.config = config;

    // Tron does not provide option to redefine transaction cost. Hence this.config.feeRate is ignored in Tron context

    // We should revert if global netLimit is reached. Transaction will not go through in this case.
    //
    //   https://github.com/tronprotocol/java-tron/blob/develop/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L195
    //

    this.config.timestamp = new Date().getTime();
    this.config.expiresAt = this.config.timestamp + 3600000; // Miliseconds
    // this.config.gasPrice = bandwidthUnitFee;

    let totalCents;
    if (this.config.sendAll) {
      const account = await this._getAccount(addressRaw);
      totalCents = account.balance || 0;
    } else {
      totalCents = getIntegralValue(this.config.txnOuts[0].value, this.trxDecimal);
    }

    this.config.networkFee = await this.estimateNetworkFee(
      this.config.from,
      this.config.txnOuts[0].to
    );
    const trxFeeCents = getIntegralValue(this.config.networkFee.fees[0].value, this.trxDecimal);

    if (this.config.sendAll) totalCents = totalCents - trxFeeCents;
    if (totalCents <= 0) throw 'Insufficient funds';
    this.config.sendValue = totalCents;

    const value = parseInt(totalCents.toString());
    const trxData = this._getTrxData(this.config.from, this.config.txnOuts[0].to, value);
    const trxRaw = await this._getTransactionRaw(
      trxData,
      this.config.timestamp,
      this.config.expiresAt
    );

    this.transaction = new TronTrxSchema.Transaction();
    this.transaction.setRawData(trxRaw);

    return Buffer.from(trxRaw.serializeBinary()).toString('hex');
  }

  async initFromHex(trxHex) {
    const trxBuffer = Buffer.from(trxHex, 'hex');

    this.config = {};

    const trxRaw = new TronTrxSchema.Transaction.raw.deserializeBinary(trxBuffer);
    const trxContract = trxRaw.getContractList()[0];
    const trxTransferContractType = trxContract.getType();

    if (
      trxTransferContractType === TronTrxSchema.Transaction.Contract.ContractType.TRANSFERCONTRACT
    ) {
      const trxParameterAnyWrapped = trxContract.getParameter();
      const trxParameterBuffer = trxParameterAnyWrapped.getValue();
      const trxParameter = new TronMessageSchema.TransferContract.deserializeBinary(
        trxParameterBuffer
      );

      this.config.from = TronUtils.addressHexToStr(
        Buffer.from(trxParameter.getOwnerAddress()).toString('hex')
      );
      this.config.txnOuts = [
        { to: TronUtils.addressHexToStr(Buffer.from(trxParameter.getToAddress()).toString('hex')) },
      ];
      this.config.sendValue = trxParameter.getAmount();

      this.config.networkFee = await this.estimateNetworkFee(
        this.config.from,
        this.config.txnOuts[0].to,
        this.config.sendValue
      );
      this.config.timestamp = trxRaw.getTimestamp();
    }

    assert(this.config.txnOuts[0].to);

    this.transaction = new TronTrxSchema.Transaction();
    this.transaction.setRawData(trxRaw);

    return this.config;
  }

  // https://github.com/tronprotocol/tronweb/blob/4b131bbcaa94f9d70fffd1dc36577703d42eefa1/src/lib/trx.js#L781
  getHash(withSign = false) {
    const useTronHeader = true;

    let messageDigest;

    messageDigest = utils.sha256(this.transaction.getRawData().serializeBinary());

    return [messageDigest.toString('HEX').substring(2)];
  }

  getTxnId() {
    return this.getHash()[0];
  }

  serializeTransaction(withSign = false) {
    return Buffer.from(this.transaction.serializeBinary()).toString('hex');
  }

  addressPattern() {
    return '^T[A-Za-z1-9]{33}$';
  }

  getAddress(pubKeyHex) {
    const pubkeyBytes = TronUtils.pubkeyHexToBytes(pubKeyHex);
    const addressBytes = TronUtils.computeAddressBytes(pubkeyBytes, ADDRESS_PREFIX);
    return TronUtils.addressBytesToStr(addressBytes);
  }

  async feeParams(addressFromRaw, addressToRaw, value) {
    const { bandwidthUnitFee } = await this._getNetworkUnitFees();

    if (!addressToRaw || addressToRaw == '') addressToRaw = this.apiConfig.DUMMY_ADDRESS_RAW;
    value = value || 1; // Default value to estimate sending cost is 1 cent of token
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
      },
      options: {
        feeSlider: false,
      },
    };
  }

  async _getDummyTransaction(addressFromRaw, addressToRaw, value) {
    const trxData = this._getTrxData(addressFromRaw, addressToRaw, value);

    // Trough providing default fee to _getTransactionRaw method we can disable inclusion of
    // fee limit into Tron transaction. Fee limit is optional for sending TRX and TRC10,  but it is compulsory for
    // sending TRC20 and TRC721 and acts similarly to ethereum gas.
    const defaultFeeLimit = this._getDefaultFeeLimit();
    const skipNetworkFetch = true;
    const timestamp = new Date().getTime();
    const expiresAt = timestamp + 3600000; // Miliseconds

    const trxRaw = await this._getTransactionRaw(
      trxData,
      timestamp,
      expiresAt,
      defaultFeeLimit,
      skipNetworkFetch
    );

    const transaction = new TronTrxSchema.Transaction();
    transaction.setRawData(trxRaw);
    transaction.addSignature(DUMMY_SIGNATURE);

    return { trxData, transaction };
  }

  /*
   * Estimate network fee that user will pay to send a transaction. We try to make as precise estimations as possible
   * because Tron chain is quite straightforward in this terms.
   *
   * Hint materials:
   *
   *   https://developers.tron.network/docs/resource-model
   *   https://shasta.tronscan.org/#/data/stats2/network/resourcesCost
   *   https://github.com/tronprotocol/tips/issues/286
   *   https://github.com/trustee-wallet/trusteeWallet/blob/master/crypto/blockchains/trx/TrxTransferProcessor.ts
   *   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L96
   *   https://stackoverflow.com/a/73222761
   *
   * Anyways, here is transaction documentation that one can refer to in case of any question regarding some of its processing aspects
   *
   *   Manager#processTransaction
   *   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/core/db/Manager.java#L1380
   *
   *     Manager#consumeBandwidth
   *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/core/db/Manager.java#L942
   *
   *       BandwidthProcessor#consume
   *       https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L96
   *
   *     TransactionTrace#exec
   *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/TransactionTrace.java#L184
   *
   *       RuntimeImpl#execute
   *       https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/framework/src/main/java/org/tron/common/runtime/RuntimeImpl.java#L40
   *
   *         TransferActuator#execute
   *         https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/actuator/src/main/java/org/tron/core/actuator/TransferActuator.java
   *
   *     TransactionTrace#finalize & TransactionTrace#pay
   *     https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/TransactionTrace.java#L227
   *
   * Good luck reading it!
   *
   */
  async estimateNetworkFee(addressFromRaw, addressToRaw, value) {
    if (!addressToRaw || addressToRaw == '') addressToRaw = this.apiConfig.DUMMY_ADDRESS_RAW;

    const { trxData, transaction } = await this._getDummyTransaction(
      addressFromRaw,
      addressToRaw,
      value
    );

    let trxCostInSun = 0;

    const fees = await this._getNetworkUnitFees();
    const { bandwidthUnitFee, energyUnitFee } = fees;

    let accountFromBandwidthPoints;
    let accountFromEnergyPoints;

    if (addressToRaw !== this.apiConfig.DUMMY_ADDRESS_RAW) {
      // https://developers.tron.network/reference/getaccountresource
      // Address in HEX format (starts with 41)
      const accountFromResourceData = await this._getAPI('wallet/getaccountresource', {
        address: trxData.owner_address,
      });

      const {
        freeNetUsed = 0,
        freeNetLimit = 0,
        NetUsed = 0,
        NetLimit = 0,
      } = accountFromResourceData;
      accountFromBandwidthPoints = freeNetLimit - freeNetUsed + (NetLimit - NetUsed);

      const { EnergyUsed = 0, EnergyLimit = 0 } = accountFromResourceData;
      accountFromEnergyPoints = EnergyLimit - EnergyUsed;
    } else {
      // We skip bandwidth estimates for dummy account to decrease the amount of external calls.
      accountFromBandwidthPoints = 0;
      accountFromEnergyPoints = 0;
    }

    this.config ||= {};
    this.config.timestamp = new Date().getTime();
    this.config.expiresAt = this.config.timestamp + 3600000; // Miliseconds

    this.transaction = transaction;

    // https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L117
    const tronContractMagicNumber = 64; // Seems this is a length of signature
    const someOtherMagicNumber = 1; // Assumption is - this number represents additional byte coming as a protobuf indication of signature
    const transactionBytesCount =
      this.transaction.serializeBinary().length + someOtherMagicNumber + tronContractMagicNumber;

    const accountToData = await this._getAccount(addressToRaw);
    const accountToExists = Object.keys(accountToData).length !== 0;

    // CALCULATE THE ENERGY BASED ON DATA FIELD
    const estimatedEnergyNominal = await this._estimateEnergy(
      addressFromRaw,
      addressToRaw,
      trxData.value
    );
    const estimatedEnergy = this._estimatedGasWithCoeff(estimatedEnergyNominal);
    if (estimatedEnergy > accountFromEnergyPoints) {
      trxCostInSun += estimatedEnergy * energyUnitFee;
    }

    // Smart contract execution is decoupled from Tron machine. Hence if we address a new account within a smart contract,
    // Tron network won't create this new account and will simply let smart contract to do whatever it does.
    //
    //   https://github.com/tronprotocol/java-tron/blob/develop/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#LL204C28-L204C58
    //
    if (estimatedEnergy == 0 && !accountToExists) {
      const {
        createAccountFee,
        createNewAccountFeeInSystemContract,
        createNewAccountBandwidthRate,
      } = fees;
      trxCostInSun += createAccountFee;
      trxCostInSun += createNewAccountFeeInSystemContract * createNewAccountBandwidthRate;
    } else {
      // The bandwidth_unit_price is currently hardcoded to 1000 sun (0.001 TRX) per byte.
      // This means that the cost of additional bandwidth points can be estimated using the following formula:
      //
      //   cost = (total_bandwidth_used - initial_bandwidth) * 1000 sun
      //
      // where total_bandwidth_used is the total amount of bandwidth used in your transaction
      // and initial_bandwidth is the initial amount of bandwidth allocated to the sender's account.
      //
      // More info at
      //
      //   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/db/BandwidthProcessor.java#L187
      //
      // TransactionCapsule is an encoded transaction including signatures
      //
      //   https://github.com/tronprotocol/java-tron/blob/370a86b44163d2541287d94c7c8be0d5f700ab07/chainbase/src/main/java/org/tron/core/capsule/TransactionCapsule.java#L134
      //
      let remainingBandwidthPoints = accountFromBandwidthPoints - transactionBytesCount;
      if (remainingBandwidthPoints < 0)
        trxCostInSun += Math.abs(transactionBytesCount) * bandwidthUnitFee;

      // We multiply estimated transaction by a coeff assuming that actual gas value might fluctuate
      trxCostInSun = trxCostInSun;
    }

    // getCreateAccountFee returns the cost of creating a new account in TRX when the new
    // account is created by an existing account. This cost is calculated based on the current
    // market price of TRX and other factors such as network congestion.
    //
    // On the other hand, createNewAccountFeeInSystemContract returns the cost of creating
    // a new account in Sun when the new account is created by a smart contract.
    // This cost is fixed and is not affected by market conditions

    return {
      fees: [
        {
          value: getDecimalValue(trxCostInSun, this.trxDecimal),
          type: 0,
        },
      ],
      options: {
        trxData,
      },
    };
  }

  getNetworkFee() {
    assert(this.config);
    return parseInt(this.config.gasLimit * this.config.gasPrice);
  }

  getTotalGasRequired() {
    return this.config.networkFee.fees[0].value;
  }

  async getBalance(addressRaw, fastFetch = false) {
    const account = await this._getAccount(addressRaw);
    if (account.balance) {
      return getDecimalValue(account.balance, this.trxDecimal);
    } else {
      return 0;
    }
  }

  getSendValue(feeAmt = 0) {
    assert(this.config); // return this.config.sendValue / Math.pow(10, this.trxDecimal);

    return getDecimalValue(
      this.config.sendValue - getIntegralValue(feeAmt, this.trxDecimal),
      this.trxDecimal
    );
  }

  supportedAssets() {
    return ['TRC10', 'TRC20', 'TRC721'];
  }

  async getAvailableAssetsMetaData(targetAddress) {
    const assetsData = await listAssets(targetAddress, this.apiConfig);
    const supportedAssets = this.supportedAssets();
    const assetsMetaData = [];

    await Promise.all(
      supportedAssets.map(async (assetType) => {
        let assetTypeNormalized;
        if (assetType === 'TRC10') {
          assetTypeNormalized = 'assetV2';
        } else {
          assetTypeNormalized = assetType.toLowerCase();
        }

        const assetsOfType = assetsData[assetTypeNormalized] || [];

        await Promise.all(
          assetsOfType.map(async (assetData) => {
            if (assetTypeNormalized == 'trc20' || assetTypeNormalized == 'trc721') {
              const assetId = Object.keys(assetData)[0];

              // TRC721 and TRC20 are all returned as trc20. We however assume that they might change this behavior in the future
              // and just to be double sure we are deriving asset type from smart contract
              const derivedAssetType = await this._getSmartContractAssetType(assetId);
              if (derivedAssetType) {
                assetsMetaData.push({ id: assetId, assetType: derivedAssetType });
              }
            } else {
              const assetId = assetData.key;

              assetsMetaData.push({ id: assetId, assetType });
            }
          })
        );
      })
    );

    return assetsMetaData;
  }

  async getAssetData(assetMetaData) {
    const fromAddressRaw = this.apiConfig.DUMMY_ADDRESS_RAW;

    const assetAddressRaw = assetMetaData.id;
    const assetType = assetMetaData.assetType;

    if (assetType === 'TRC20' || assetType === 'TRC721') {
      return await this._getSmartContractAssetData(assetAddressRaw, assetType, fromAddressRaw);
    } else if (assetType === 'TRC10') {
      return await this._getNativeAssetData(assetAddressRaw, assetType, fromAddressRaw);
    }
  }

  async _getNativeAssetData(assetAddressRaw, assetType, fromAddressRaw) {
    const assetData = [assetAddressRaw, 'TRC10', {}];

    const assetRawData = await this._getAPI('wallet/getassetissuebyid', {
      value: parseInt(assetAddressRaw),
    });

    assetData[2]['name'] = hexToUtf8(assetRawData.name);
    assetData[2]['ticker'] = hexToUtf8(assetRawData.abbr);
    assetData[2]['decimals'] = parseInt(assetRawData.precision || 0);

    return assetData;
  }

  // https://github.com/tronprotocol/tronweb/blob/4b131bbcaa94f9d70fffd1dc36577703d42eefa1/src/lib/trx.js#L630
  // https://github.com/tronprotocol/java-tron/blob/develop/framework/src/main/java/org/tron/core/services/jsonrpc/types/TransactionResult.java#L58
  async verifySignature(signatures, pubKey) {
    const signature = signatures[0];

    let messageDigest;

    messageDigest = utils.sha256(this.transaction.getRawData().serializeBinary());

    const recovered = utils.recoverAddress(messageDigest, {
      recoveryParam: signature.recoveryParam,
      r: '0x' + signature.r,
      s: '0x' + signature.s,
    });

    const recoveredAddressHex = ADDRESS_PREFIX + recovered.substring(2);
    const recoveredAddress = TronUtils.addressHexToStr(recoveredAddressHex);

    const walletAddressHex = TronUtils.pubHexToAddressHex(pubKey, ADDRESS_PREFIX);
    const walletAddress = TronUtils.addressHexToStr(walletAddressHex);

    return recoveredAddress == walletAddress;
  }

  async setSignature(signatures, pubKey) {
    const signature = signatures[0];

    const signatureHex = signature.r + signature.s + signature.v.toString(16);
    this.transaction.addSignature(Buffer.from(signatureHex, 'hex'));

    return true;
  }

  sendTransaction(hex, callback) {
    // send trx https://developers.tron.network/reference/broadcasthex
    const trxParams = { transaction: hex };

    this._getAPI('wallet/broadcasthex', trxParams).then((response) => {
      callback({
        transactionHash: response.txid,
        completed: false,
      });
    });
  }

  // NOT IMPLEMENTED
  async getConfirmation(targetAddress) {
    // let currentBlockHeight = (await tronWeb.trx.getCurrentBlock()).block_header.raw_data.number;
    // let confirmedTx = await tronWeb.trx.getTransactionInfo(this.transaction.txID);
    // let confirmedBlockHeight = confirmedTx.blockNumber;
    // return currentBlockHeight - confirmedBlockHeight;
    // let txns = await fetch('https://api.shasta.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=50&start=0&total=0&address='+targetAddress).then((ret) => {
    //     return ret.json().then((ret) => {
    //         return ret.data;
    //     })
    // });

    try {
      // const txns = await listTx(targetAddress, this.network);

      // if (txns.length > 0) {
      //   let latestBlock = 0;

      //   for (let i = 0; i < txns.length; i++) {
      //     if (latestBlock < txns[i].block) {
      //       latestBlock = txns[i].block;
      //     }
      //   }

      //   const currentBlock = await this.tronWeb.trx.getCurrentBlock();
      //   const currentHeight = currentBlock.block_header.raw_data.number;
      //   console.log({
      //     latestBlock,
      //     currentHeight,
      //   });
      //   return currentHeight - latestBlock + 1;
      // }
      return 0;
    } catch (ex) {
      console.error(ex);
      return 0;
    }

    // try {
    //     let currentBlockHeight = (await this.tronWeb.trx.getCurrentBlock()).block_header.raw_data.number;
    //     const txns = await listTx(targetAddress, this.network);
    //     var _minConf = null;
    //     for (var i = 0; i < txns.length; i++) {
    //         let confirmedTx = await this.tronWeb.trx.getTransactionInfo(txns[i].txID);
    //         let confirmations = Number(currentBlockHeight) - Number(confirmedTx.blockNumber) + 1;
    //         if ( confirmations > 0) {
    //             _minConf = (_minConf == null ? confirmations : Math.min(confirmations , Number(_minConf)));
    //             // if (this.showLog) console.log({conf: Number(txns[i].confirmations), min: Math.min(Number(txns[i].confirmations) , Number(_minConf))})
    //         }
    //     }
    //     // let confirmedTx = await tronWeb.trx.getTransactionInfo(this.transaction.txID);
    //     // let confirmedBlockHeight = confirmedTx.blockNumber;
    //     // return currentBlockHeight - confirmedBlockHeight;
    //     return _minConf;
    // } catch (ex) {
    //     console.error(ex);
    //     return 0;
    // }
  }

  // Transaction contract is an object that specifies what is actually happening withing the transaction. This is composed of the contract type
  // and contract parameters. This method should be overwritten for each individual asset type.
  // Current method implements transaction of TRX from one wallet to another.
  _getTrxContract(trxData) {
    const trxParameter = new TronMessageSchema.TransferContract();
    trxParameter.setOwnerAddress(Buffer.from(trxData.owner_address, 'hex'));
    trxParameter.setToAddress(Buffer.from(trxData.to_address, 'hex'));
    trxParameter.setAmount(trxData.value);

    const trxParameterAnyWrapped = new google_protobuf_any_pb.Any();
    trxParameterAnyWrapped.setTypeUrl('type.googleapis.com/protocol.TransferContract');
    trxParameterAnyWrapped.setValue(trxParameter.serializeBinary());

    const trxTransferContractType =
      TronTrxSchema.Transaction.Contract.ContractType.TRANSFERCONTRACT;
    const trxContract = new TronTrxSchema.Transaction.Contract();
    trxContract.setType(trxTransferContractType);
    trxContract.setParameter(trxParameterAnyWrapped);

    return trxContract;
  }

  async _fetchRefBlockData() {
    // If this value is provided incorrectly, this will raise TAPOS_ERROR
    // https://github.com/tronprotocol/java-tron/blob/4b6e0a5c85dabcb972dcc7e0962d18ffd359ef71/framework/src/main/java/org/tron/core/db/Manager.java#L750
    const currentBlock = await this._getAPI('wallet/getnowblock', {});
    const currentBlockNumber = currentBlock.block_header.raw_data.number;

    const refBlockCount = 17;
    const privBlock = await this._getAPI('wallet/getblockbynum', {
      num: currentBlockNumber - refBlockCount,
    });
    const refBlock = privBlock;

    // https://developers.tron.network/docs/tron-protocol-transaction
    return TronUtils.blockToRefData(refBlock);
  }

  // Transaction Raw is an object that contains all the details about a transaction. This object later on
  // will be included in another object that will contain signature of this object's hash.
  // It is very unlikely that this method should be overwritten
  async _getTransactionRaw(trxData, timestamp, expiresAt, feeLimit = 0, skipNetworkFetch = false) {
    const trxContract = this._getTrxContract(trxData);

    let refBlockData;

    if (skipNetworkFetch) {
      refBlockData = {
        ref_block_hash: Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]),
        ref_block_bytes: Uint8Array.from([0, 0]),
      };
    } else {
      refBlockData = await this._fetchRefBlockData();
    }

    const refBlockBytes = refBlockData.ref_block_bytes;
    const refBlockHash = refBlockData.ref_block_hash;

    const trxRaw = new TronTrxSchema.Transaction.raw();
    trxRaw.setRefBlockBytes(refBlockBytes);
    trxRaw.setRefBlockHash(refBlockHash);
    trxRaw.setTimestamp(timestamp);
    trxRaw.setExpiration(expiresAt);
    trxRaw.addContract(trxContract);

    if (feeLimit > 0) {
      // This is optional for sending TRX and TRC10 and compulsory for sending TRC20 and TRC721
      // https://developers.tron.network/docs/faq#1-why-do-i-need-to-submit-the-fee_limit-field-when-sending-a-transaction-to-call-a-smart-contract%EF%BC%9F
      trxRaw.setFeeLimit(feeLimit);
    }

    return trxRaw;
  }

  async _getNetworkUnitFees() {
    // 2: {key: 'getCreateAccountFee', value: 100000}
    // 3: {key: 'getTransactionFee', value: 1000}
    // 7: {key: 'getCreateNewAccountFeeInSystemContract', value: 1000000}
    // 8: {key: 'getCreateNewAccountBandwidthRate', value: 1}
    // 11: {key: 'getEnergyFee', value: 420}
    // 25: {key: 'getMultiSignFee', value: 1000000}
    // 55: {key: 'getMemoFee', value: 1000000}
    // 60: {key: 'getDynamicEnergyThreshold', value: 3000000000}
    // 61: {key: 'getDynamicEnergyIncreaseFactor', value: 2000}
    // 62: {key: 'getDynamicEnergyMaxFactor', value: 12000}
    const { chainParameter } = await this._getAPI('wallet/getchainparameters', {});

    const createAccountFee = chainParameter.find(
      (param) => param.key === 'getCreateAccountFee'
    ).value;
    const transactionFee = chainParameter.find((param) => param.key === 'getTransactionFee').value;
    const energyUnitFee = chainParameter.find((param) => param.key === 'getEnergyFee').value;
    const bandwidthUnitFee = await this._getBandwidthPrices();
    const createNewAccountFeeInSystemContract = chainParameter.find(
      (param) => param.key === 'getCreateNewAccountFeeInSystemContract'
    ).value;
    const createNewAccountBandwidthRate = chainParameter.find(
      (param) => param.key === 'getCreateNewAccountBandwidthRate'
    ).value;

    return {
      transactionFee,
      energyUnitFee,
      bandwidthUnitFee,
      createAccountFee,
      createNewAccountFeeInSystemContract,
      createNewAccountBandwidthRate,
    };
  }

  // Fetch bandwidth price fron remote node
  async _getBandwidthPrices() {
    const bandwidthPricesHistory = await this._getAPI('wallet/getbandwidthprices', {});
    const bandwidthPrices = bandwidthPricesHistory.prices.split(',');
    const bandwidthPricesLatest = bandwidthPrices[bandwidthPrices.length - 1].split(':');

    return parseInt(bandwidthPricesLatest[1]);
  }

  // This method returns raw parameters that later on will be provided to _getTransactionRaw
  // to receive a raw transaction body in HEX format
  _getTrxData(addressFromRaw, addressToRaw, value) {
    const addressToHex = TronUtils.addressToHex(addressToRaw);
    const addressFromHex = TronUtils.addressToHex(addressFromRaw);

    return {
      to_address: addressToHex,
      owner_address: addressFromHex,
      value: parseFloat(value) || 1, // if no amount is provided we are trying to send the smallest unit available
    };
  }

  // Overwrite this method to enable feeLimit in trxRaw
  _getDefaultFeeLimit() {
    return 0;
  }

  // Overwrite this method to calculate energy required to successfully mine a transaction
  async _estimateEnergy() {
    return 0;
  }

  async _getAccount(addressRaw) {
    const address = TronUtils.addressToHex(addressRaw);
    const account = await this._getAPI('wallet/getaccount', { address });

    return account;
  }

  // This is mostly to receive information about function execution. This is very helpful to estimate required amount of gas
  async _triggerSmartContract(
    abiData,
    fromAddressRaw,
    conrtactAddressRaw,
    functionName,
    params = []
  ) {
    const functionAbi = abiData.find(
      (functionAbi) => functionAbi.name == functionName && functionAbi.type == 'function'
    );
    const encodedParamsHex = TronUtils.encodeFunctionParams(functionAbi, params, false);

    const trxParams = {
      owner_address: fromAddressRaw,
      contract_address: conrtactAddressRaw,
      function_selector: TronUtils.getFunctionSelector(functionAbi),
      parameter: encodedParamsHex,
      visible: true,
    };

    return await this._getAPI('wallet/triggerconstantcontract', trxParams);
  }

  // This is used to receive data from smart contract through JSON-RPC method
  async _requestSmartContract(
    abiData,
    fromAddressRaw,
    contractAddressRaw,
    functionName,
    params = []
  ) {
    // Option 1 how to call smart contract
    // const functionAbi = abiData.find(functionAbi => functionAbi.name == functionName && functionAbi.type == 'function');
    // const response = await this._triggerSmartContract(fromAddressRaw, contractAddressRaw, functionName, params);
    // return TronUtils.decodeFunctionParams(functionAbi.outputs, response.constant_result);

    // Option 2 how to call smart contract
    const functionAbi = abiData.find(
      (functionAbi) => functionAbi.name == functionName && functionAbi.type == 'function'
    );
    const dataHex = TronUtils.encodeFunctionCall(functionAbi, params);

    const jsonResponse = await this._callEthApi(fromAddressRaw, contractAddressRaw, dataHex);
    return TronUtils.decodeFunctionParams(functionAbi.outputs, jsonResponse.result);
  }

  // We guess asset type based on the contents of its smart contract code. We check is a signature of a certain method present
  // in the smart contract's compiled code.
  async _getSmartContractAssetType(contractAddress) {
    const erc20Signature = TronUtils.functionSelectorToSignature('decimals()', 'function');
    const erc721Signature = TronUtils.functionSelectorToSignature('ownerOf(uint256)', 'function');

    const code = await this._getSmartContractCode(contractAddress);

    // https://ethereum.stackexchange.com/questions/11856/how-to-detect-from-web3-if-method-exists-on-a-deployed-contract/50091#50091
    if (code.indexOf(erc20Signature) > 0) {
      return 'TRC20';
    }

    if (code.indexOf(erc721Signature) > 0) {
      return 'TRC721';
    }

    return null;
  }

  async _getSmartContractAssetData(assetAddressRaw, assetType, fromAddressRaw) {
    const assetData = [assetAddressRaw, null, {}];
    let abiData;

    if (assetType === 'TRC20') {
      assetData[1] = 'TRC20';
      abiData = ethHelper.ERC20Abi;
    } else if (assetType === 'TRC721') {
      assetData[1] = 'TRC721';
      abiData = ethHelper.ERC721Abi;
    }

    try {
      const responseData = await this._requestSmartContract(
        abiData,
        fromAddressRaw,
        assetAddressRaw,
        'name'
      );
      assetData[2]['name'] = responseData[0];
    } catch (err) {
      // Name unavailable
      console.error('error: ', err);
    }

    try {
      const responseData = await this._requestSmartContract(
        abiData,
        fromAddressRaw,
        assetAddressRaw,
        'symbol'
      );
      assetData[2]['ticker'] = responseData[0];
    } catch (err) {
      // Symbol unavailable
    }

    if (assetType === 'TRC20') {
      try {
        const responseData = await this._requestSmartContract(
          abiData,
          fromAddressRaw,
          assetAddressRaw,
          'decimals'
        );
        assetData[2]['decimals'] = parseInt(responseData[0]);
      } catch (err) {
        assetData[2]['decimals'] = 0;
      }
    } else {
      assetData[2]['decimals'] = false;
    }

    if (assetType === 'TRC721') {
      try {
        // See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
        const responseData = await this._requestSmartContract(
          abiData,
          fromAddressRaw,
          assetAddressRaw,
          'supportsInterface',
          ['0x5b5e139f']
        );
        assetData[2]['supportMetaData'] = responseData[0];
      } catch (err) {
        assetData[2]['supportMetaData'] = false;
      }
    }

    return assetData;
  }

  async _getSmartContractCode(contractAddress) {
    const contractAddressHex = '0x' + TronUtils.addressToHex(contractAddress);

    const payload = {
      jsonrpc: '2.0',
      method: 'eth_getCode',
      params: [contractAddressHex, 'latest'],
      id: 1,
    };

    const response = await this._getAPI('jsonrpc', payload);

    return response.result;
  }

  async _callEthApi(fromAddressRaw, contractAddressRaw, dataHex) {
    const fromAddressHex = TronUtils.addressToHex(fromAddressRaw);
    const contractAddressHex = TronUtils.addressToHex(contractAddressRaw);

    const payload = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: fromAddressHex,
          to: contractAddressHex,
          // "gas": "0x0",
          // "gasPrice": "0x0",
          value: '0x0',
          data: dataHex,
        },
        'latest',
      ],
      id: 1,
    };

    const response = await this._getAPI('jsonrpc', payload);

    return response;
  }

  async _getAPI(resource, body) {
    return await fetch(`${explorerURL[this.network].ENDPOINT}${resource}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => json);
  }
}

module.exports = Tron;
