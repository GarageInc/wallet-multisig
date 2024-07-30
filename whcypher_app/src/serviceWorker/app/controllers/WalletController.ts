import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { ISpendData } from 'src/app/pages/WalletPage/hooks'
import { IMessage } from 'src/shared/interfaces/interfaces'

import Account from '../models/Account'
import Blockchain from '../models/Blockchain'
import Wallet from '../models/Wallet'
import AccountsController from './AccountsController'

class WalletController {
  // Refactored
  async updateWalletName(walletId: string, newWalletName: string) {
    const wallet = new Wallet(walletId)
    const result = await wallet.setWalletName(newWalletName)
    return result
  }

  // Refactored
  async setActiveAccountHiddenWallet(walletId: string, newHiddenState: boolean) {
    const wallet = new Wallet(walletId)
    const result = await wallet.setHiddenState(newHiddenState)
    return result
  }

  // Refactored
  async getWalletData(walletId: string) {
    const wallet = new Wallet(walletId)
    return await wallet.getWalletData()
  }

  // Refactored
  async getWalletMetaInfo(walletId: string) {
    const wallet = new Wallet(walletId)
    return await wallet.getBlockchainMetaInfo()
  }

  // Refactored
  async getBlockchainMetaInfo(blockchainName: BlockchainNames) {
    const blockchain = new Blockchain(blockchainName)
    return blockchain.getMetaInfo()
  }

  // Refactored
  async getAdapterMetaInfo(blockchainName: BlockchainNames, assetData: any, from: string) {
    const blockchain = new Blockchain(blockchainName)
    return blockchain.getAdapterMetaInfo(assetData, from)
  }

  // Refactored
  async updateWalletBalances(walletId: string) {
    const wallet = new Wallet(walletId)
    const fullFetch = true
    return await wallet.updateBalances(fullFetch)
  }

  // Refactored
  async getAvailableERC721(walletId: string, assetId: string) {
    const wallet = new Wallet(walletId)
    return await wallet.getAvailableERC721(assetId)
  }

  // Refactored
  async getWalletsBalances(filterName: string, fastFetch = false) {
    return await Wallet.getWalletsBalances(filterName, fastFetch)
  }

  // Refactored
  async getRecurrentlyWalletsBalances(filterName: string) {
    const roundTimeMilli = 30000
    const totalDurationMilli = 60000
    const rounds = totalDurationMilli / roundTimeMilli - 1 // next alarm will be executed after

    const timeoutAt = +Date.now() + rounds * roundTimeMilli
    let roundStartAt,
      nextRoundInMilli = 0,
      currentMinute
    let i = 0

    // give 1 second tolerance to time, to avoid accidental boundary conditions
    while (Date.now() < timeoutAt + 1000) {
      roundStartAt = +Date.now()
      // currentMinute = new Date().getMinutes()

      if (i == 0) {
        await this.getWalletsBalances(filterName)
      } else {
        await this.getWalletsBalances(filterName, true)
      }

      const timeTookMilli = +Date.now() - roundStartAt
      if (timeTookMilli >= roundTimeMilli) {
        i += parseInt(timeTookMilli / roundTimeMilli)
      }

      if (i++ >= rounds) return false

      nextRoundInMilli = roundTimeMilli - (+Date.now() - roundStartAt)
      await new Promise((r) => setTimeout(r, nextRoundInMilli)) // wait a bit before next check
    }

    return false
  }

  // Refactored
  async estimateTransactionFee(
    blockchainName: BlockchainNames,
    assetData: any,
    from: string,
    spendData: ISpendData,
    feeData: any,
  ) {
    const blockchain = new Blockchain(blockchainName)
    return await blockchain.estimateTransactionFee(assetData, from, spendData, feeData)
  }

  // Refactored
  async initTransaction(walletId: string, assetData: any, spendData: ISpendData, feeData: any) {
    const wallet = new Wallet(walletId)
    return await wallet.initTransaction(assetData, spendData, feeData)
  }

  // Refactored
  async initDappTransaction(walletId: string, rawData: IMessage, feeData: any) {
    const wallet = new Wallet(walletId)
    return await wallet.initDappTransaction(rawData, feeData)
  }

  async initSignRawMessage(walletId: string, rawData: IMessage) {
    const wallet = new Wallet(walletId)
    return await wallet.initSignRawMessage(rawData)
  }

  // Refactored
  async addAssetToWallet(walletId: string, assetData: any) {
    const wallet = new Wallet(walletId)
    await wallet.getWalletData()

    if (!wallet?.walletData) {
      return
    }

    const blockchain = new Blockchain(wallet?.walletData?.blockchain)
    const fetchedAssetData = await blockchain.fetchAssetData(assetData[0])

    await wallet.addAsset(fetchedAssetData)
    return await wallet.updateBalances()
  }

  // Refactored
  async backupWalletDataOnRemote(walletId: string) {
    const wallet = new Wallet(walletId)
    return await wallet.sendEncryptedBackupToRemote()
  }

  // Refactored
  async exportWalletsData(walletIds: string[]) {
    const account = await Account.getActiveAccount()

    const walletsBackupData = await Promise.all(
      walletIds.map(async (walletId) => {
        const wallet = new Wallet(walletId)
        return await wallet.getBackupData()
      }),
    )

    for (let i = 0; i < walletIds.length; i++) {
      const wallet = new Wallet(walletIds[i])
      await wallet.markWalletAsBackuped()
      await wallet.refreshWalletDataInRedux()
    }

    return await account?.encryptData(JSON.stringify(walletsBackupData))
  }

  // Refactored
  async importWalletData(walletsDataEncrypted: string) {
    const account = await Account.getActiveAccount()
    let walletsBackupData

    if (!account) throw new Error('No active account.')

    try {
      const walletsBackupDataJSON = await account.decryptData(walletsDataEncrypted)
      walletsBackupData = JSON.parse(walletsBackupDataJSON)
    } catch (e) {
      throw new Error('Wrong file type or wrong account.')
    }

    const walletsImportResults = await Wallet.importWallets(walletsBackupData)
    await account.refreshWalletsData()

    return walletsImportResults
  }

  // Refactored
  async syncWalletBackupsWithRemote() {
    const account = await Account.getActiveAccount()
    const applicationUnlocked = await AccountsController.isUnlocked()

    if (account && applicationUnlocked) {
      const result = await Wallet.syncWalletBackupsWithRemote(account)
      if (result) await account.refreshWalletsData()
    } else {
      // user has logged out
      return
    }
  }
}
export default WalletController
