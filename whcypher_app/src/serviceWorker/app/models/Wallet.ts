import { supportedBlockchains } from '@whalesheaven/chain-service'
import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import _jsSha from 'js-sha256'
import isEqual from 'lodash/isEqual'
import { GROUP_TRANSACTION_STATES } from 'src/app/constants/groupTransactionRequests'
import { ISpendData } from 'src/app/pages/WalletPage/hooks'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import Browser from 'webextension-polyfill'

import HandlersDB from '../../db/HandlersDB'
import WalletsDB from '../../db/WalletsDB'
import { SUPPORTED_PROTOCOLS } from '../lib/constants/protocols'
import { initWalletShardFromData } from '../lib/TsWalletShard'
import * as backupStatusReducer from '../store/reducers/backupStatusReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import * as walletsReducer from '../store/reducers/walletsReducer'
import { getStore } from '../store/store'
import {
  getBackupWalletByIdRawApi,
  getBackupWalletIdsRawApi,
  sendEncryptedVaultBackupApi,
  updateEncryptedVaultBackupApi,
} from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import { onlyInFirstArr } from '../utils/functionalHelpers'
import Account from './Account'
import AccountActivities from './AccountActivities'
import Blockchain from './Blockchain'
import TransactionSession from './TransactionSession'
import { validateWallet } from './utils/wallet'

const hashStringData = function (stringData: string) {
  const hash = _jsSha.sha256.create()
  return hash.update(stringData).toString(16)
}

const walletDataToWalletId = function (walletData: IWalletData) {
  return hashStringData(`${walletData.blockchain}(${walletData.calculatedAddress}):${walletData.partyId}`)
}

const walletDataToHashedId = function (walletData?: IWalletData | null) {
  return hashStringData(`${walletData?.blockchain}:${walletData?.calculatedAddress}:${walletData?.partyId}`)
}

class Wallet {
  walletId: string
  walletData?: IWalletData | null

  constructor(walletId: string, walletData?: IWalletData | null) {
    this.walletId = walletId
    this.walletData = walletData
  }

  static async cloneWalletDataToChain(targetWallet: IWalletData, toChain: BlockchainNames) {
    if (!toChain) {
      return null
    }

    const newWalletData = { ...targetWallet }

    newWalletData.name = `Copy of ${targetWallet.name}`
    newWalletData.blockchain = toChain
    newWalletData.balances = []
    newWalletData.createdAt = Date.now()
    newWalletData.assetsData = []
    newWalletData.walletId = walletDataToHashedId(newWalletData)
    newWalletData.isBackup = false
    newWalletData.isHidden = false

    try {
      const walletsDB = new WalletsDB()

      const account = await Account.getActiveAccount()

      if (!account) throw new Error('No active account.')

      const [added, resultingWallet] = await walletsDB.appendWalletData(newWalletData, account)

      if (added && resultingWallet) {
        const accountActivity = new AccountActivities(account.data.index, account)
        await accountActivity.addNewWallet(resultingWallet, `Cloned ${resultingWallet.blockchain} wallet`)
      }

      return newWalletData
    } catch (error) {
      return null
    }
  }

  // Refactored
  static async appendWalletShard(walletShard: any, account: Account) {
    const walletsDB = new WalletsDB()
    const walletData = await walletsDB.appendWalletShard(walletShard, account)

    const wallet = new Wallet(walletData.walletId, walletData)

    if (wallet) {
      const store = await getStore()

      await store.dispatch(walletsReducer.appendWallet({ walletData }))
      await waitForSync()

      const { settings } = await store.getState()
      if (settings.walletBackupsEnabled) await wallet.sendEncryptedBackupToRemote()
    }

    return wallet
  }

  // Refactored
  static async getWalletsDataByAccountRootPubKey(accountRootPubKey: string) {
    const walletsDB = new WalletsDB()
    return await walletsDB.getWalletsDataByAccountRootPubKey(accountRootPubKey)
  }

  // Refactored

  static async getWalletsBalances(filterName: string, fullFetch = false) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountRootPubKey = await account.getRootPubKey()
    const wallets = await this.findByAccountRootPubKey(accountRootPubKey)

    await Promise.all(
      wallets.map(async (wallet) => {
        await Account.shouldInterceptAccountRoutine(account)

        let filterResult

        if (!filterName || filterName === 'all') filterResult = true
        if (filterName === 'missing') filterResult = !wallet.walletData?.balances

        if (filterResult) {
          try {
            await wallet.updateBalances(fullFetch)
          } catch (e) {
            console.log(`Failed to fetch balances for wallet: ${e}`)
          }
        }
      }),
    )
  }

  // Refactored
  static async findByAccountRootPubKey(accountRootPubKey: string) {
    const walletsData = await this.getWalletsDataByAccountRootPubKey(accountRootPubKey)
    const wallets = walletsData.map((walletData) => new Wallet(walletData.walletId, walletData))
    return wallets
  }

  // Refactored
  static async findByBlockchainAndAddress(
    blockchain: BlockchainNames | undefined,
    address: string,
    accountRootPubKey: string,
  ) {
    const walletsDB = new WalletsDB()

    const walletData = await walletsDB.getWalletDataByParams(accountRootPubKey, blockchain, address)
    return walletData ? new Wallet(walletData.walletId, walletData) : null
  }

  // (in progress) Refactored
  static async importWallets(walletsData: IWalletData[]) {
    const walletsDB = new WalletsDB()
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountWalletsData = await account.getWalletsData()

    const validWallets = []
    const invalidWallets = []

    console.log('Starting import =======> ')

    for (const walletData of walletsData) {
      const walletDataId = walletDataToWalletId(walletData)
      const existingWallets = accountWalletsData.filter(({ walletId }) => walletId === walletDataId)
      const walletErrors = validateWallet(walletData)

      if (existingWallets.length > 0) {
        invalidWallets.push({
          [walletData.name]: [`Wallet already exists`],
        })
      } else if (Object.keys(walletErrors).length > 0) {
        invalidWallets.push(walletErrors)
      } else {
        const normalizedWalletData = await Wallet.normalizeWalletData(walletData)
        console.log('Importing wallet', normalizedWalletData)
        const [added, storedWalletData] = await walletsDB.appendWalletData(normalizedWalletData, account)
        if (added) validWallets.push(storedWalletData)
      }
    }

    return [validWallets, invalidWallets]
  }

  static async normalizeWalletData(walletData: IWalletData) {
    const blockchain = new Blockchain(walletData.blockchain)
    const shouldSupportedAssets = await blockchain.getBlockchainSupportedAssets()
    const supportedAssets = walletData.supportedAssets

    if (!supportedAssets || !isEqual(shouldSupportedAssets, supportedAssets)) {
      walletData.supportedAssets = shouldSupportedAssets
      walletData.assetsData = []
    }

    if (!walletData.protocolVersion) walletData.protocolVersion = SUPPORTED_PROTOCOLS.SECP256K1_V1
    return walletData
  }

  // (in progress) Refactored
  static async syncWalletBackupsWithRemote(account: Account, seedDB = null) {
    const accountRootPubKey = await account.getRootPubKey()
    const accountPubKey = await account.getAccountPubKey()
    const handlerName = `syncWalletBackups:${accountRootPubKey}`

    const handlersDB = new HandlersDB()
    const handlers: { [key: string]: number } = await handlersDB.getHandlers()

    if (handlers[handlerName] && handlers[handlerName] > Date.now()) return

    await handlersDB.addHandler({ handlerName, lockFor: 120000 }) // 2 minute lock
    await waitForSync()

    const store = await getStore()
    const { settings } = await store.getState()

    const keyManager = await account.getKeyManager()
    if (seedDB) await keyManager.setSeedDB(seedDB)

    let syncResult = false

    if (settings.walletBackupsEnabled) {
      try {
        await store.dispatch(
          backupStatusReducer.setBackupSyncInProgress({
            accountPubKey,
            syncStatus: true,
          }),
        )
        await waitForSync()

        const backupWalletIdsResponse = await getBackupWalletIdsRawApi(accountPubKey)

        if (backupWalletIdsResponse.status === 200) {
          await store.dispatch(
            backupStatusReducer.setTotalBackupsCount({
              accountPubKey,
              count: backupWalletIdsResponse.body.length,
            }),
          )
          await waitForSync()

          const accountWalletsData = await this.getWalletsDataByAccountRootPubKey(accountRootPubKey)
          const walletBackupsOnRemote = await Promise.all(
            backupWalletIdsResponse.body.map(async (backupWallet: IWalletData) => {
              if (backupWallet.encryptedVaultName) {
                const name = await account.decryptData(backupWallet.encryptedVaultName)
                return { ...backupWallet, name }
              }
              return backupWallet
            }),
          )

          const knownWallets = accountWalletsData.map((knownVault) => {
            const hashedName = hashStringData(knownVault.name)
            const hashedVaultId = walletDataToHashedId(knownVault)
            return { ...knownVault, hashedName, hashedVaultId }
          })

          // [TODO] This was disabled and we should make sure this is not needed any more. We believe that all wallets are now
          // working and
          //
          // There are some backups that used an older function of generating hashedVaultId.
          // It relied of Blockchain and address only. The problem with that system was that
          // it would produce two equivalent hashedVaultIds for all wallet participants
          // which is not good from many points of view. Newer system adds party id into account.
          // This produces different hashedVaultId for all wallet participants now. Hence, in order not to waist
          // client's we should not try to recover old backups as we assume that newer ones are equivalent.
          // POSSIBLE SOLUTION: Perhaps we should cautiously delete such wallets, providing blockchain and address, so that
          // backup server could validate that information on its side and only then delete obsolete records.
          // accountWalletsData.map((knownVault) => {
          //   const hashedName = hashStringData(knownVault.name)
          //   const hashedVaultId = walletDataToHashedIdLegacy(knownVault)
          //   knownWallets.push({ ...knownVault, hashedName, hashedVaultId })
          // })

          // Failing wallet we are ignoring. They will be attempted to recover on each backup sync.
          // We assume there are very few wallets with this problem.

          const backupsWithChangedName = onlyInFirstArr(knownWallets, walletBackupsOnRemote, [
            'hashedVaultId',
            'hashedName',
          ])
          const walletsWithoutBackup = onlyInFirstArr(knownWallets, walletBackupsOnRemote, ['hashedVaultId'])
          const unknownWallets = onlyInFirstArr(walletBackupsOnRemote, knownWallets, ['hashedVaultId'])

          // Create wallet backups on remote
          for (const walletData of walletsWithoutBackup) {
            if (await Account.shouldInterceptAccountRoutine(account)) {
              throw new Error(`Intercepting backup process`)
            }

            const wallet = new Wallet(walletData.walletId, walletData)
            await wallet.sendEncryptedBackupToRemote()
          }

          // Make sure that any wallet with isBackup == false is synced to remote server
          // Assumption is this block is residual. Note sure if is or not
          // const localWalletsMarkedWithoutBackup = knownWallets.filter(wallet => !wallet.isBackup);
          // for(const walletData of localWalletsMarkedWithoutBackup ) {
          //     const wallet = new Wallet(walletData.walletId, walletData);
          //     await wallet.sendEncryptedBackupToRemote();
          // };

          // Recover wallet backups from remote
          const walletsDB = new WalletsDB()
          let counter = 1,
            failedCounter = 0,
            duplicatedCounter = 0

          for (const unknownWallet of unknownWallets) {
            if (await Account.shouldInterceptAccountRoutine(account)) {
              throw new Error(`Intercepting backup process`)
            }

            await store.dispatch(
              backupStatusReducer.setCurrentBackupsCounter({
                accountPubKey,
                counter,
              }),
            )
            await waitForSync()

            try {
              const { hashedVaultId } = unknownWallet
              const result = await getBackupWalletByIdRawApi({
                hashedVaultId,
                accountPubKey,
              })
              if (result.status === 200) {
                const walletDataJSON = await keyManager.decryptData(result.body.encryptedVaultData)
                const walletData = JSON.parse(walletDataJSON)
                walletData.name = await keyManager.decryptData(result.body.encryptedVaultName)

                const normalizedWalletData = await Wallet.normalizeWalletData(walletData)
                const [added] = await walletsDB.appendWalletData(normalizedWalletData, account)

                if (!added) {
                  duplicatedCounter = duplicatedCounter + 1
                  await store.dispatch(
                    backupStatusReducer.setDuplicatedBackupsCounter({
                      accountPubKey,
                      counter: duplicatedCounter,
                    }),
                  )
                  await waitForSync()
                }
              } else {
                // handle error
                failedCounter = failedCounter + 1
                await store.dispatch(
                  backupStatusReducer.setFailedBackupsCounter({
                    accountPubKey,
                    counter: failedCounter,
                  }),
                )
                await waitForSync()
              }
            } catch (e) {
              console.log(`Error while backup process syncWalletBackupsWithRemote(1), counter ${failedCounter}: `, {
                e,
              })
              // handle error
              failedCounter = failedCounter + 1
              await store.dispatch(
                backupStatusReducer.setFailedBackupsCounter({
                  accountPubKey,
                  counter: failedCounter,
                }),
              )
              await waitForSync()
            }

            counter = counter + 1
          }

          // Sync wallet names from remote
          for (const backupWithChangedName of backupsWithChangedName) {
            if (await Account.shouldInterceptAccountRoutine(account)) {
              throw new Error(`Intercepting backup process`)
            }

            const hashedVaultId = walletDataToHashedId(backupWithChangedName)
            const walletDataFromRemote = walletBackupsOnRemote.find((vlt) => vlt.hashedVaultId === hashedVaultId)
            if (walletDataFromRemote) {
              const result = await getBackupWalletByIdRawApi({
                hashedVaultId,
                accountPubKey,
              })
              if (result.status === 200) {
                const decryptedName = await keyManager.decryptData(result.body.encryptedVaultName)
                const wallet = new Wallet(backupWithChangedName.walletId)
                await wallet.setWalletName(decryptedName, false)
              }
            }
          }

          syncResult = true
        } else {
          // handle error
        }
      } catch (e) {
        // handle error
        console.log('Error while backup process syncWalletBackupsWithRemote(2): ', { e })
      }

      await store.dispatch(
        requestsReducer.updateRequestBySessionId({
          sessionId: `import:${accountPubKey}`,
          status: 'backupReady',
        }),
      )
      await waitForSync()

      await store.dispatch(backupStatusReducer.resetBackupCounts({ accountPubKey }))
      await waitForSync()
    }

    await handlersDB.removeHandler({ handlerName })
    await waitForSync()

    return syncResult
  }

  async isWalletActive() {
    await this._loadWalletData()
    return !supportedBlockchains.isUnsupportedNetwork(this.walletData?.blockchain)
  }

  // Refactored
  async setWalletName(newWalletName: string, syncWithRemote = true) {
    await this._loadWalletData()

    const walletsDB = new WalletsDB()
    const updatedWalletData = await walletsDB.setWalletName(this.walletId, newWalletName)
    this.walletData = updatedWalletData

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: updatedWalletData }))
    await waitForSync()

    const { settings } = await store.getState()
    if (settings.walletBackupsEnabled && this.walletData?.isBackup && syncWithRemote) {
      const response = await this.updateEncryptedBackupToRemote()
      if (response.error) {
        throw new Error(response.error)
      }
    }

    return updatedWalletData
  }

  async setHiddenState(newIsHidden: boolean) {
    await this._loadWalletData()

    const walletsDB = new WalletsDB()
    const updatedWalletData = await walletsDB.updateWalletData(this.walletId, {
      isHidden: newIsHidden,
    })
    this.walletData = updatedWalletData

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: updatedWalletData }))
    await waitForSync()

    return updatedWalletData
  }

  // Refactored
  async getWalletData() {
    await this._loadWalletData()

    // There was a bug in cloning, wheres `balances` turned out to be missing in wallet's clone
    if (!this.walletData.balances) this.walletData.balances = []

    return this.walletData
  }

  async normalizeWalletData() {
    const shouldSupportedAssets = await this.getBlockchainSupportedAssets()
    const supportedAssets = this.walletData?.supportedAssets

    if (!supportedAssets || !isEqual(shouldSupportedAssets, supportedAssets) || !this.walletData?.assetsData) {
      // update wallet data
      const walletsDB = new WalletsDB()
      this.walletData = await walletsDB.updateWalletData(this.walletId, {
        supportedAssets: shouldSupportedAssets,
        assetsData: [],
      })
    }
    return this.walletData
  }

  // Refactored
  async getBlockchainMetaInfo() {
    await this._loadWalletData()

    if (!this.walletData) {
      return
    }
    const blockchain = new Blockchain(this.walletData?.blockchain)
    return blockchain.getMetaInfo()
  }

  // Refactored
  async getBlockchainSupportedAssets() {
    await this._loadWalletData()

    if (!this.walletData) {
      return
    }

    const blockchain = new Blockchain(this.walletData?.blockchain)
    return blockchain.getBlockchainSupportedAssets()
  }

  _extractPrevBalance(prevBalances: any[], assetId: string) {
    const prevBalance = prevBalances?.find((item) => item.assetId === assetId)
    return prevBalance && typeof prevBalance.balance === 'number' ? prevBalance.balance : 0
  }

  // fullFetch won't discover any new tokens. It will only update know token balances using the
  // simpliest method. This might rely on some explorers

  async fetchBalances(prevBalances: any[], fullFetch = false) {
    await this._loadWalletData(true)

    if (!this.walletData) {
      return
    }

    const account = await Account.getActiveAccount()
    const blockchain = new Blockchain(this.walletData.blockchain)

    const chainAdapter = blockchain.chainAdapter
    const { calculatedAddress } = this.walletData

    let balance
    try {
      balance = await chainAdapter.getBalance(calculatedAddress, fullFetch)
    } catch (e) {
      balance = this._extractPrevBalance(prevBalances, chainAdapter.assetTicker())
    }

    const coinBalance = {
      assetId: chainAdapter.assetTicker(),
      type: CHAIN_ADAPTERS.COIN,
      name: chainAdapter.assetName(),
      ticker: chainAdapter.assetTicker(),
      balance,
    }

    if (account && (await Account.shouldInterceptAccountRoutine(account)))
      throw new Error(`Intercepting balance updates`)

    const assetBalances = []

    if (!this.walletData?.supportedAssets) {
      // update wallet data
      const walletsDB = new WalletsDB()
      this.walletData = await walletsDB.updateWalletData(this.walletId, {
        supportedAssets: await this.getBlockchainSupportedAssets(),
        assetsData: [],
      })
    }

    if (!this.walletData || !account) {
      return
    }

    if (this.walletData.supportedAssets.length > 0) {
      if (await Account.shouldInterceptAccountRoutine(account)) throw new Error(`Intercepting balance updates`)

      let assetsData: any[] = this.walletData.assetsData
      if (fullFetch) {
        // Update list of assets. Different blockchains implement this part differently.
        // Some may pick a history of past transaction and will perform some sort of
        // analytical process to compose a list of assets. There might be more than a single
        // request involved underneath.
        // Some other may simply fetch such info from some endpoint and that is it.
        //
        // This process is skipped while we do a fast fetch where we only update current balances.
        let knownAssets: any
        try {
          // const explorerEndpoint = getEndpoint()
          knownAssets = await chainAdapter.getAvailableAssetsMetaData(calculatedAddress)
        } catch (e) {
          knownAssets = []
        }

        let assetPresent
        let newAssetData

        let updateWalletData = false

        for (let i = 0; i < knownAssets.length; i++) {
          if (await Account.shouldInterceptAccountRoutine(account)) throw new Error(`Intercepting balance updates`)

          assetPresent = assetsData.find((assetData) => assetData[0].toLowerCase() == knownAssets[i].id.toLowerCase())
          if (!assetPresent && knownAssets[i]) {
            try {
              newAssetData = await chainAdapter.getAssetData(knownAssets[i])
              if (newAssetData[1]) {
                await this.addAsset(newAssetData)
                updateWalletData = true
              }
            } catch (e) {
              // Cant add asset for whatever reason
            }
          }
        }

        if (updateWalletData) {
          await this._loadWalletData(true)
          assetsData = this.walletData.assetsData
        }
      }

      let assetAdapter
      let assetData

      for (const i in assetsData) {
        if (await Account.shouldInterceptAccountRoutine(account)) throw new Error(`Intercepting balance updates`)

        assetData = assetsData[i]
        assetAdapter = chainAdapter.assetAdapter(assetData)

        const assetId = assetData[0]
        try {
          balance = await assetAdapter.getBalance(calculatedAddress, fullFetch)
        } catch (e) {
          balance = this._extractPrevBalance(prevBalances, assetId)
        }

        assetBalances.push({
          assetId,
          type: assetData[1],
          name: assetData[2].name,
          ticker: assetData[2].ticker,
          balance,
        })
      }
    }

    return [coinBalance, ...assetBalances]
  }

  // Refactored

  async updateBalances(fullFetch = false) {
    const isWalletActive = await this.isWalletActive()
    if (!isWalletActive) return

    const walletsData = await this.getWalletData()
    if (!walletsData) {
      return
    }

    const latestBalances = await this.fetchBalances(walletsData.balances, fullFetch)

    const walletsDB = new WalletsDB()
    const updatedWalletData = await walletsDB.updateWalletData(this.walletId, {
      balances: latestBalances,
    })
    this.walletData = updatedWalletData

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: updatedWalletData }))
    await waitForSync()

    return latestBalances
  }

  // Refactored
  async getAvailableERC721(assetAddress: string) {
    await this._loadWalletData()

    if (!this.walletData) {
      return
    }

    const blockchain = new Blockchain(this.walletData.blockchain)
    const chainAdapter = blockchain.chainAdapter
    let assetData = this.walletData?.assetsData.find((data) => data[0] === assetAddress)

    if (typeof assetData[2]['supportMetaData'] === 'undefined') {
      assetData = await chainAdapter.getAssetData(assetAddress)
      await this.updateAsset(assetData)
    }

    const assetAdapter = chainAdapter.assetAdapter(assetData)

    const assetIds = await assetAdapter.getAssetIds(this.walletData?.calculatedAddress)
    const assetsData = await Promise.all(
      assetIds.map(async (assetId: string) => {
        const assetData = await assetAdapter.getAssetDataById(assetId)
        if (!assetData.name) {
          assetData.name = `#${assetId}`
        }

        return assetData
      }),
    )

    return assetsData
  }

  // Refactored
  async addAsset(assetData: any) {
    await this._loadWalletData()

    const walletsDB = new WalletsDB()
    // For internal use. When you need to rewrite a assets of incorrectly fetched data while
    // doing some development.
    // const updatedWalletData = await walletsDB.replaceAssetByWalletId(this.walletId, assetData);
    const updatedWalletData = await walletsDB.appendAssetByWalletId(this.walletId, assetData)
    this.walletData = updatedWalletData

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: updatedWalletData }))
    await waitForSync()

    return true
  }

  async updateAsset(assetData: any) {
    await this._loadWalletData()

    const walletsDB = new WalletsDB()
    const updatedWalletData = await walletsDB.replaceAssetByWalletId(this.walletId, assetData)
    this.walletData = updatedWalletData

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: updatedWalletData }))
    await waitForSync()

    return true
  }

  // Refactored
  async initTransaction(assetData: any, spendData: ISpendData, feeData: any) {
    await this._loadWalletData()

    const account = await Account.getActiveAccount()
    if (!account || !this.walletData) {
      return
    }
    const keyManager = await account.getKeyManager()
    const walletShard = await initWalletShardFromData(keyManager, this.walletData)
    const { response, adapter } = await walletShard.initTransactionSignature(assetData, spendData, feeData)

    return await this._formSessionData(
      response,
      account,
      async (transactionSession: any, transactionSessionData: any) => {
        await transactionSession.appendNewGroupTransactionRequest(
          adapter,
          GROUP_TRANSACTION_STATES.SESSION,
          transactionSessionData.joinedParties,
        )
      },
    )
  }

  async initDappTransaction(rawData: any, feeData: any) {
    await this._loadWalletData()

    const account = await Account.getActiveAccount()
    if (!account || !this.walletData) {
      return
    }
    const keyManager = await account.getKeyManager()
    const walletShard = await initWalletShardFromData(keyManager, this.walletData)
    const { response, adapter } = await walletShard.initDappTransactionSignature(rawData, feeData)

    return await this._formSessionData(
      response,
      account,
      async (transactionSession: any, transactionSessionData: any) => {
        await transactionSession.appendNewGroupTransactionRequest(
          adapter,
          GROUP_TRANSACTION_STATES.SESSION,
          transactionSessionData.joinedParties,
        )
      },
    )
  }

  async initSignRawMessage(rawData: any) {
    await this._loadWalletData()
    const account = await Account.getActiveAccount()
    if (!account || !this.walletData) {
      return
    }
    const keyManager = await account.getKeyManager()
    const walletShard = await initWalletShardFromData(keyManager, this.walletData)
    const { response } = await walletShard.initRawMsgSignature(rawData)

    return await this._formSessionData(
      response,
      account,
      async (transactionSession: any, transactionSessionData: any) => {
        await transactionSession.appendRawSignTransactionRequest(
          GROUP_TRANSACTION_STATES.SESSION,
          transactionSessionData.joinedParties,
        )
      },
    )
  }

  async _formSessionData(response: any, account: Account, handler: any) {
    const { sessionId } = response

    if (sessionId) {
      // Set here alarm
      const alarmName = `resolveTransactionSession:${sessionId}:true`
      // this will be executed after 1 minute, each minute, until alarm is cleared after 10 minutes
      Browser.alarms.create(alarmName, { periodInMinutes: 1 })

      const accountPubKey = await account.getAccountPubKey()

      const transactionSessionData = {
        joinedParties: [accountPubKey],
        processStep: 0,
        processSteps: 9,
        expiresAt: Date.parse(response.initiatedAt) + response.expiresIn,
      }

      await this._loadWalletData()

      if (!this.walletData) {
        return
      }

      const transactionSession = new TransactionSession(this, sessionId)

      await handler(transactionSession, transactionSessionData)

      const store = await getStore()
      await store.dispatch(walletRequestsReducer.updateRequestBySessionId({ sessionId, ...transactionSessionData }))
      await waitForSync()
    }

    return response
  }

  // Refactored
  async sendEncryptedBackupToRemote() {
    const response = await this._sendEncryptedBackupToRemote()

    const documentExist = response.error == 'Document already exists. Max count 1.'
    if (response.accountPubKey || documentExist) {
      await this.markWalletAsBackuped()
      await this.refreshWalletDataInRedux()
      return true
    }

    return false
  }

  async markWalletAsBackuped() {
    await this._loadWalletData()

    const walletsDB = new WalletsDB()
    const walletDataUpdates = { isBackup: true }
    this.walletData = await walletsDB.updateWalletData(this.walletData?.walletId, walletDataUpdates)

    return this.walletData
  }

  async refreshWalletDataInRedux() {
    await this._loadWalletData()

    const store = await getStore()
    await store.dispatch(walletsReducer.updateWallet({ walletId: this.walletId, walletData: this.walletData }))
    await waitForSync()
  }

  // (in progress) Refactored
  async _sendEncryptedBackupToRemote() {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const { name, ...dataToEncrypt } = await this.getBackupData()

    if (!name) {
      return
    }

    const encryptedVaultData = await account.encryptData(JSON.stringify(dataToEncrypt))
    const encryptedVaultName = await account.encryptData(name)
    const hashedName = name && hashStringData(name)
    const hashedVaultId = walletDataToHashedId(this.walletData)

    const requestBody = JSON.stringify({
      encryptedVaultData,
      encryptedVaultName,
      hashedName,
      hashedVaultId,
      accountPubKey,
    })
    const authHeaders = await account.authHeaders(requestBody)

    return await sendEncryptedVaultBackupApi(requestBody, authHeaders)
  }

  // (in progress) Refactored
  async getBackupData() {
    await this._loadWalletData()

    const backupData = {
      name: this.walletData?.name,
      blockchain: this.walletData?.blockchain,
      calculatedAddress: this.walletData?.calculatedAddress,
      calculatedPubKey: this.walletData?.calculatedPubKey,
      createdAt: this.walletData?.createdAt,
      minimumSigAmount: this.walletData?.minimumSigAmount,
      partiesAmount: this.walletData?.partiesAmount,
      partyId: this.walletData?.partyId,
      participants: this.walletData?.participants,
      protocolVersion: this.walletData?.protocolVersion || SUPPORTED_PROTOCOLS.SECP256K1_V1,
      paillierPubKeys: this.walletData?.paillierPubKeys,
      path: this.walletData?.path,
      secretsEncrypted: this.walletData?.secretsEncrypted,
      sessionId: this.walletData?.sessionId,
      // supportedAssets: this.walletData?.supportedAssets,
      // isBackup: this.walletData?.isBackup,
    }

    return backupData
  }

  // (in progress) Refactored
  async updateEncryptedBackupToRemote() {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const { name } = await this.getBackupData()

    if (!name) {
      return
    }

    const encryptedVaultName = await account.encryptData(name)
    const hashedName = name ? hashStringData(name) : ''
    const hashedVaultId = walletDataToHashedId(this.walletData)

    const requestBody = JSON.stringify({
      encryptedVaultName,
      hashedName,
      hashedVaultId,
      accountPubKey,
    })
    const authHeaders = await account.authHeaders(requestBody)

    return updateEncryptedVaultBackupApi({ accountPubKey, hashedVaultId }, requestBody, authHeaders)
  }

  // Refactored
  async _loadWalletData(force = false) {
    if (!this.walletData || force) {
      const walletsDB = new WalletsDB()
      this.walletData = await walletsDB.getWalletDataByWalletId(this.walletId)
      await this.normalizeWalletData()
    }
  }
}

export default Wallet
