import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import Account from '../app/models/Account'
import { IWalletData } from '../app/store/reducers/walletsReducer'
import LocalStorage from './localStorage'

const _cryptoJs = require('crypto-js')
const _jsSha = require('js-sha256')

export const WALLETS_STORAGE_KEY = 'tsVaults'

export interface IWalletShard {
  sessionId: string
  blockchain: BlockchainNames
  calculatedPubKey: string
  calculatedAddress: string
  minimumSigAmount: number
  partiesAmount: number
  partyId: number
  protocolVersion: string
  paillierPubKeys: string[]
  accountPubKey: string
  path: string
  supportedAssets: string[]
  participants: string[]
  isBackup: boolean
  tsKeyShare: {
    x_i: bigint
    u_i: bigint
    dk: {
      _p: bigint
      _q: bigint
    }
  }
}

export const walletDataToId = (walletData: IWalletData) => {
  const hash = _jsSha.sha256.create()
  return hash.update(`${walletData.blockchain}(${walletData.calculatedAddress}):${walletData.partyId}`).toString(16)
}

const intToHex = function intToHex(bigint: bigint) {
  const base = 16
  const hex = bigint.toString(base).padStart(64, '0')
  return hex
}

/**
 * A secret vault
 * @class
 */
class WalletsDB {
  storage: LocalStorage
  wallets: IWalletData[]

  constructor() {
    this.storage = new LocalStorage()
    this.wallets = []
  }

  // Refactored
  async getWalletsDataByAccountRootPubKey(accountRootPubKey: string) {
    await this._loadWalletsData()
    return this.wallets.filter((walletData) => walletData.accountPubKey === accountRootPubKey)
  }

  // Refactored
  async getWalletDataByParams(
    accountRootPubKey: string,
    blockchain: BlockchainNames | undefined,
    calculatedAddress: string,
  ) {
    await this._loadWalletsData()
    const walletData = this.wallets.find((walletData) => {
      return (
        walletData.accountPubKey == accountRootPubKey &&
        (!blockchain || walletData.blockchain == blockchain) &&
        walletData.calculatedAddress == calculatedAddress
      )
    })

    return walletData
  }

  // Refactored
  async getWalletDataByWalletId(walletId: string) {
    await this._loadWalletsData()
    return this.wallets.find((walletData) => walletData.walletId == walletId)
  }

  // Refactored
  async appendWalletShard(walletShard: IWalletShard, account: Account) {
    await this._loadWalletsData()
    if (!walletShard.tsKeyShare) throw new Error('walletShard should have assigned threshold key share')

    // TODO migrate from using masterPubKey -> pubKey
    const accountRootPubKey = account.data.masterPubKey
    const secrets = JSON.stringify(
      {
        x_i: walletShard.tsKeyShare.x_i.toString(16),
        paillier: {
          p: walletShard.tsKeyShare.dk._p.toString(16),
          q: walletShard.tsKeyShare.dk._q.toString(16),
        },
      },
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    )

    const secretsEncrypted = _cryptoJs.enc.Base64.stringify(
      _cryptoJs.enc.Utf8.parse(_cryptoJs.AES.encrypt(secrets, intToHex(walletShard.tsKeyShare.u_i)).toString()),
    )
    const blockchainWalletCount = this.wallets.filter(
      (walletData) => walletData.accountPubKey === accountRootPubKey && walletData.blockchain == walletShard.blockchain,
    ).length
    const walletName = `${walletShard.blockchain} multisig ${blockchainWalletCount + 1}`

    // sessionId is unique identifier in this case at it includes all details uniquely identifying this vault
    const walletData: IWalletData = {
      name: walletName,
      sessionId: walletShard.sessionId,
      blockchain: walletShard.blockchain,
      calculatedPubKey: walletShard.calculatedPubKey,
      calculatedAddress: walletShard.calculatedAddress,
      minimumSigAmount: walletShard.minimumSigAmount,
      partiesAmount: walletShard.partiesAmount,
      partyId: walletShard.partyId,
      protocolVersion: walletShard.protocolVersion,
      paillierPubKeys: walletShard.paillierPubKeys,
      accountPubKey: accountRootPubKey,
      path: walletShard.path,
      createdAt: Date.now(),
      supportedAssets: walletShard.supportedAssets,
      participants: walletShard.participants,
      secretsEncrypted,
      isBackup: !!walletShard.isBackup,
      isHidden: false,
      balances: undefined,
      joinedParties: [],
      assetsData: [],
      walletId: '',
      requests: [],
      encryptedVaultName: '',
    }

    walletData.walletId = walletDataToId(walletData)

    if (walletShard.supportedAssets.length > 0) {
      walletData.assetsData = []
    }

    try {
      await this._appendWalletData(walletData)
      return walletData
    } catch (error) {
      return null
    }
  }

  // Refactored
  async appendWalletData(walletData: IWalletData, account: Account): Promise<[boolean, IWalletData | undefined]> {
    await this._loadWalletsData()

    const accountRootPubKey = account.data.masterPubKey

    walletData.walletId = walletDataToId(walletData)
    walletData.accountPubKey = accountRootPubKey
    walletData.isBackup = true
    walletData.isHidden = false
    walletData.balances = undefined // we will then cache this

    if (walletData.supportedAssets.length > 0) {
      walletData.assetsData = []
    }

    try {
      const added = await this._appendWalletData(walletData)
      return [added, walletData]
    } catch (error) {
      return [false, undefined]
    }
  }

  // Refactored
  async removeWalletsByAccountRootPubKey(accountRootPubKey: string) {
    await this._loadWalletsData()

    this.wallets = this.wallets.filter((walletData) => walletData.accountPubKey !== accountRootPubKey)
    await this.storage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(this.wallets))
    return this.wallets
  }

  // Refactored
  async setWalletName(walletId: string, newWalletName: string) {
    await this._loadWalletsData()

    const walletPosition = this.wallets.findIndex((walletData) => walletData.walletId === walletId)

    // TODO Raise an error here if position is not found

    this.wallets[walletPosition].name = newWalletName

    await this.storage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(this.wallets))
    return this.wallets[walletPosition]
  }

  // Refactored
  async updateWalletData(walletId: string | undefined, modifiedWalletData: any) {
    await this._loadWalletsData()

    const walletPosition = this.wallets.findIndex((walletData) => walletData.walletId === walletId)

    // TODO Raise an error here if position is not found

    this.wallets[walletPosition] = { ...this.wallets[walletPosition], ...modifiedWalletData }
    await this.storage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(this.wallets))
    return this.wallets[walletPosition]
  }

  async checkAssetPresent(walletId: string, newAssetData: any) {
    const [assetPresent] = await this._checkAssetPresent(walletId, newAssetData)

    return assetPresent
  }

  // Refactored
  async appendAssetByWalletId(walletId: string, newAssetData: any) {
    const [assetPresent, walletData] = await this._checkAssetPresent(walletId, newAssetData)

    if (!assetPresent && walletData) {
      const normalizedNewAssetData = [newAssetData[0], newAssetData[1], newAssetData[2]]

      walletData?.assetsData.push(normalizedNewAssetData)

      await this._replaceWalletData(walletId, walletData)
    }

    return walletData
  }

  // Refactored
  async replaceAssetByWalletId(walletId: string, newAssetData: any) {
    const [assetPresent, walletData] = await this._checkAssetPresent(walletId, newAssetData)

    if (assetPresent && walletData) {
      const assetDataIndex = walletData.assetsData.findIndex(
        (assetData) => assetData[0].toLowerCase() == newAssetData[0].toLowerCase(),
      )

      const normalizedNewAssetData = [newAssetData[0], newAssetData[1], newAssetData[2]]

      walletData.assetsData[assetDataIndex] = normalizedNewAssetData
      await this._replaceWalletData(walletId, walletData)
    }

    return walletData
  }

  // INTERNAL METHODS

  async _checkAssetPresent(walletId: string, newAssetData: any): Promise<[boolean, IWalletData | undefined]> {
    await this._loadWalletsData()

    const walletData = this.wallets.find((walletData) => walletData.walletId == walletId)

    if (walletData && walletData.supportedAssets.length > 0) {
      const assetPresent = walletData.assetsData.find(
        (assetData) => assetData[0].toLowerCase() == newAssetData[0].toLowerCase(),
      )

      return [!!assetPresent, walletData]
    }

    return [false, walletData]
  }

  // Refactored
  async _appendWalletData(newWalletData: IWalletData) {
    // check if wallet is already present in DB
    const walletPosition = this.wallets.findIndex(
      (walletData) =>
        walletData.blockchain == newWalletData.blockchain &&
        walletData.calculatedAddress == newWalletData.calculatedAddress &&
        walletData.partyId == newWalletData.partyId,
    )

    if (walletPosition < 0) {
      this.wallets.push(newWalletData)
      await this.storage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(this.wallets))
      return true
    }

    return false
  }

  // Refactored
  async _replaceWalletData(walletId: string, newTsVaultData: any) {
    await this._loadWalletsData()

    const walletPosition = this.wallets.findIndex((walletData) => walletData.walletId == walletId)

    // TODO Raise an error here if position is not found

    this.wallets[walletPosition] = newTsVaultData
    await this.storage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(this.wallets))
  }

  // Refactored
  async _loadWalletsData() {
    const walletsInStorageRaw = await this.storage.getItem(WALLETS_STORAGE_KEY)
    const walletsInStorage = walletsInStorageRaw ? JSON.parse(walletsInStorageRaw) : []
    this.wallets = walletsInStorage
    return this.wallets
  }
}

export default WalletsDB
