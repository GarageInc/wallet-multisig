import Blockchain from '../models/Blockchain'

class BlockchainController {
  async fetchAssetData(blockchainName: string, assetAddress: string) {
    const blockchain = new Blockchain(blockchainName)
    return await blockchain.fetchAssetData(assetAddress)
  }
}

export default BlockchainController
