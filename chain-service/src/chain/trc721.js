const Trc20 = require('./trc20.js');
const TronUtils = require('../helpers/tron/TronUtils').TronUtils;
const TronTrxSchema = require('../helpers/tron/Tron_pb');
const TronMessageSchema = require('../helpers/tron/smart_contract_pb');
const google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

const assert = require('assert');
const web3 = require('web3');
const ethHelper = require('../helpers/eth/eth');
const fetchHelper = require('../helpers/fetch');

const { getDecimalValue, getIntegralValueBN, getIntegralValue } = require('../helpers/unitConversions'); 


class Trc721 extends Trc20 {
    constructor(assetData, network) {
        super(assetData, network);

        this.supportMetaData = assetData[2].supportMetaData;
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

        this.config.sendValue = this.config.txnOuts[0].value;
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
    
          const recoveredContractAddressRaw = TronUtils.addressHexToStr(Buffer.from(trxParameter.getContractAddress()).toString('hex'));
          assert(recoveredContractAddressRaw == this.contractAddressRaw); // Validate that received token address matches the provided address
    
          this.config.from = TronUtils.addressHexToStr(Buffer.from(trxParameter.getOwnerAddress()).toString('hex'));
    
          const functionName = 'transferFrom';
          const abiData = ethHelper.ERC721Abi;
          const functionAbi = abiData.find(functionAbi => functionAbi.name == functionName && functionAbi.type == 'function');
          const trxDataHex = '0x'+Buffer.from(trxParameter.getData()).toString('hex');
          const trxData = TronUtils.decodeFunctionCall(functionAbi, trxDataHex);
          this.config.txnOuts = [{ to: TronUtils.addressHexToStr(trxData[1].replace('0x', '41')) }];

          const smartContractAddressFrom = TronUtils.addressHexToStr(trxData[0].replace('0x', '41'));
          assert(this.config.from == smartContractAddressFrom);
    
          this.config.sendValue = parseInt(trxData[2]);
    
          this.config.networkFee = await this.estimateNetworkFee(this.config.from, this.config.txnOuts[0].to, this.config.sendValue);
          this.config.timestamp = trxRaw.getTimestamp();
        }
      
        assert(this.config.txnOuts[0].to);
    
        this.transaction = new TronTrxSchema.Transaction();
        this.transaction.setRawData(trxRaw);
    
        return this.config;
    }

    async getBalance(addressRaw, fastFetch = false) {
        try {
          // https://github.com/tronprotocol/tronweb/blob/4b131bbcaa94f9d70fffd1dc36577703d42eefa1/src/utils/abi.js#LL69C57-L69C93
          const addressHex = TronUtils.addressToHex(addressRaw).replace(/^41/, '0x');
          const responseData = await this._requestSmartContract(ethHelper.ERC721Abi, addressRaw, this.contractAddressRaw, 'balanceOf', [addressHex]);
          const balanceCents = parseInt(responseData[0]);
    
          return getDecimalValue(balanceCents, this.assetDecimal);
          // return balanceFloat;
        } catch (ex) {
          return 0;
        }
    }

    getSendValue() {
        assert(this.config);
        return this.config.sendValue;
    }

    async checkGasPaid(sourceAddressRaw, reqGas) {
        const account = await this._getAccount(sourceAddressRaw);
        const coinBalance = parseInt(account.balance);
        return coinBalance >= getIntegralValue(reqGas, this.trxDecimal);
    }

    async isFundsReady() {
        assert(this.config);
        const sourceAddressRaw = this.config.from;
        const ownerOfToken = (await this._ownerOfToken(this.getSendValue()));
        const isGasPaid = await this.checkGasPaid(sourceAddressRaw, this.getTotalGasRequired());
        return ownerOfToken === sourceAddressRaw && isGasPaid;
    }

    async getAssetIds(ownerAddress) {
        const ownerAddressHex = TronUtils.addressToHex(ownerAddress).replace(/^41/, '0x');

        try {
          let availableAssets = [];
          try {
            const balance = await this.getBalance(ownerAddress);
            for (let i = 0; i < balance; i++) {
              // Token listing from ERC721Enumerable standard
              availableAssets.push(await this._requestSmartContract(ethHelper.ERC721Abi, ownerAddress, this.contractAddressRaw, 'tokenOfOwnerByIndex', [ownerAddressHex, i]));
            }
          } catch (e) {
            try {
                // Lets figure it out with transaction history
                const ownerAddressAsTopic = web3.utils.padLeft(ownerAddressHex, 64);
                
                const txnsIn = await this._getLogs(
                    this.contractAddressRaw, null, ownerAddressAsTopic
                );

                const txnsOut = await this._getLogs(
                    this.contractAddressRaw, ownerAddressAsTopic 
                );
                const assetsAddresses = {};
    
                for (let i = 0; i < txnsIn.length; i++) {
                  const assetId = txnsIn[i]['topics'][3];
                  if (!assetsAddresses[assetId]) assetsAddresses[assetId] = 0;
                  assetsAddresses[assetId] += 1;
                }
    
                for (let i = 0; i < txnsOut.length; i++) {
                  const assetId = txnsOut[i]['topics'][3];
                  if (!assetsAddresses[assetId]) assetsAddresses[assetId] = 1;
                  assetsAddresses[assetId] -= 1;
                }
    
                const historicalTokenIds = Object.keys(assetsAddresses);
                const tokenIds = [];
    
                for (let i = 0; i < historicalTokenIds.length; i++) {
                  if (assetsAddresses[historicalTokenIds[i]] > 0)
                    tokenIds.push(parseInt(historicalTokenIds[i], 16));
                }
    
                return tokenIds;
            } catch (e) {
                // seems like we can't retrieve tokens of the owner
                console.log('error', e);
            }
          }
    
          return availableAssets;
        } catch (ex) {
          return 0;
        }
    }

    async getAssetDataById(assetId) {
        const assetData = { id: assetId };
    
        try {
          if (this.supportMetaData) {
            try {
              try {
                // Metadata from ERC721Metadata standard
                const responseData = await this._requestSmartContract(ethHelper.ERC721Abi, this.apiConfig.DUMMY_ADDRESS_RAW, this.contractAddressRaw, 'tokenURI', [assetId]);
                assetData.uri = responseData[0];
    
                try {
                  assetData.metadata = await fetchHelper.fetchMetaData(assetData.uri);
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

    // This method returns raw parameters that later on will be provided to _getTransactionRaw
    // to receive a raw transaction body in HEX format
    _getTrxData(addressFromRaw, addressToRaw, value) {
        const addressToHex = TronUtils.addressToHex(addressToRaw);
        const addressFromHex = TronUtils.addressToHex(addressFromRaw);

        return {
            to_address: addressToHex,
            owner_address: addressFromHex,
            value
        };
    }

    // Transaction Raw is an object that contains all the details about contents of actual Tron transaction. 
    // This overwrites a method in TRX adapter and configures the transaction to send TRC721 instead
    _getTrxContract(trxData) {
      const addressFromHex = TronUtils.addressToHex(trxData.owner_address).replace(/^41/, '0x');
      const addressToHex = TronUtils.addressToHex(trxData.to_address).replace(/^41/, '0x');
      const addressContractHex = TronUtils.addressToHex(this.contractAddressRaw);

      // TODO here we should add option to rewrite this in erc721
      const functionName = 'transferFrom';
      const functionAbi = ethHelper.ERC721Abi.find(functionAbi => functionAbi.name == functionName && functionAbi.type == 'function');
      const dataHex = TronUtils.encodeFunctionCall(functionAbi, [addressFromHex, addressToHex, trxData.value], false);

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

    // https://developers.tron.network/reference/triggerconstantcontract
    async _estimateEnergy(addressFromRaw, addressToRaw, value) {
        const addressFromHex = TronUtils.addressToHex(addressFromRaw).replace(/^41/, '0x');
        const addressToHex = TronUtils.addressToHex(addressToRaw).replace(/^41/, '0x');

        const response = await this._triggerSmartContract(ethHelper.ERC721Abi, addressFromRaw, this.contractAddressRaw, 'transferFrom', [addressFromHex, addressToHex, value]);

        return  response['energy_used'];
    }

    async _ownerOfToken(tokenId) {
        try {
            const ownerAddressHex = await this._requestSmartContract(ethHelper.ERC721Abi, this.apiConfig.DUMMY_ADDRESS_RAW, this.contractAddressRaw, 'ownerOf', [tokenId])
            return TronUtils.addressHexToStr(ownerAddressHex[0].replace('0x', '41'));
        } catch {
            return '';
        }
    }

    async _getLogs(contractAddress, topic1 = null, topic2 = null) {
        const contractAddressHex = TronUtils.addressToHex(contractAddress).replace(/^41/, '0x');
    
        const payload = {
          "jsonrpc": "2.0",
          "method": "eth_getLogs",
          "params": [{
                "fromBlock": web3.utils.toHex(this.apiConfig.MIN_BLOCK),
                "toBlock": "latest",
                "address": contractAddressHex,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    topic1,
                    topic2
                ]
          }],
          "id": 1
        }
    
        const response = await this._getAPI('jsonrpc', payload);
    
        return response.result;
    }
}

module.exports = Trc721;
