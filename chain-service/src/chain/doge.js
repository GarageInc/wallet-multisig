const { BlockchainNames } = require('../helpers/supportedBlockchains');
const Litecoin = require('./ltc');

const apiDatas = {
  [BlockchainNames.Dogecoin]: {
    prefix: 'https://dogebook.nownodes.io/api/v2',
    apiKey: '97d82170-4ee3-4bed-acc3-17817719b6e6',
  },
};

class Dogecoin extends Litecoin {
  /**
   * constructor description
   * @param  {Setup} setup [configration of the coins/token]
   */
  constructor(network) {
    try {
      super();

      this.type = 'UTXO';
      this.decimal = 8;
      this.network = network;

      this.apiPrefix = network ? apiDatas[network].prefix : undefined;
      this.apiKey = network ? apiDatas[network].apiKey : undefined;

      switch (this.network) {
        case BlockchainNames.Dogecoin:
          this._networkType = {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bip32: {
              public: 0x02facafd,
              private: 0x02fac398,
            },
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            wif: 0x9e,
          };
          break;
        default:
          throw Error('Undefined network type');
          break;
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  assetTicker() {
    return 'DOGE';
  }

  addressPattern() {
    return '^D{1}[56789ABCDEFGHJKLMNPQRSTU]{1}[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{32}$';
  }

  getNetworkFee() {
    return 1;
  }

  async estimateNetworkFee() {
    return {
      fees: [
        {
          value: 1,
          type: 0,
        },
      ],
    };
  }
}

module.exports = Dogecoin;
