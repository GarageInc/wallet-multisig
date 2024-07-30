import { Chain, ESTIMATED_FEE_TYPES } from '@whalesheaven/chain-service'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import { EstimateFees } from '../../../shared/interfaces/Fees'

class Blockchain {
  chainAdapter: Chain

  constructor(blockchain: BlockchainNames) {
    this.chainAdapter = new Chain(blockchain)
  }

  // Refactored
  async getMetaInfo() {
    const blockchainSupportedAssets = await this.getBlockchainSupportedAssets()
    const blockchainDestinationPattern = await this.getBlockchainDestinationPattern()
    const blockchainDetails = {
      destinationPattern: blockchainDestinationPattern,
      supportedAssets: blockchainSupportedAssets,
    }
    return blockchainDetails
  }

  // TODO: where to/from/value/data ?
  async getAdapterMetaInfo(assetData: any, from: any) {
    const metaInfo = await this.getMetaInfo()
    const feeParams = await this.getBlockchainFeeParams(assetData, from)

    return { ...metaInfo, feeParams }
  }

  // Refactored
  async getBlockchainSupportedAssets() {
    try {
      return this.chainAdapter.supportedAssets()
    } catch (e) {
      return []
    }
  }

  // Refactored
  async getBlockchainFeeParams(assetData: any, from: any) {
    try {
      const assetType = assetData[1]

      let adapter
      if (assetType == 'coin') {
        adapter = this.chainAdapter
      } else {
        adapter = this.chainAdapter.assetAdapter(assetData)
      }

      return await adapter.feeParams(from)
    } catch (e) {
      return {}
    }
  }

  // Refactored
  async fetchAssetData(assetAddress: string) {
    return await this.chainAdapter.getAssetData(assetAddress)
  }

  // Refactored
  async estimateTransactionFee(assetData: any, from: string, spendData: any, feeData: any) {
    const { value, assetType, destination: to, data } = spendData

    let adapter
    if (assetType == CHAIN_ADAPTERS.COIN) {
      adapter = this.chainAdapter
    } else if (assetType == CHAIN_ADAPTERS.EVM_SMART_CONTRACT) {
      adapter = this.chainAdapter.assetAdapter(CHAIN_ADAPTERS.EVM_SMART_CONTRACT)
    } else {
      adapter = this.chainAdapter.assetAdapter(assetData)
    }

    const valueParse = parseInt(value) || 0

    const estimateFees: EstimateFees = await adapter.estimateNetworkFee(from, to, valueParse, data)

    const estimateFee = estimateFees.fees.find((item) => item.type === ESTIMATED_FEE_TYPES.ESTIMATE_FEE)

    const feeParams = await adapter.feeParams(from, to, valueParse, data)

    if (estimateFee && typeof feeData.feeRate !== 'undefined') {
      const feePercent = ((feeData.feeRate - 50) * 1) / 100
      estimateFee.value = estimateFee?.value * (1 + feePercent)
    }

    return { fees: estimateFees, feeParams }
  }

  // Refactored
  async getBlockchainDestinationPattern() {
    // todo implement in chainAdapter
    return this.chainAdapter.addressPattern()
  }
}

export default Blockchain
