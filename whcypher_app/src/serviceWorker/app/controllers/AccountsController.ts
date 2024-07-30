import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import SeedsDB from '../../db/SeedsDB'
import Account from '../models/Account'
import AccountActivities from '../models/AccountActivities'
import KeyManager from '../models/KeyManager'
import Wallet from '../models/Wallet'
import * as applicationReducer from '../store/reducers/applicationReducer'
import * as snackbarReducer from '../store/reducers/snackbarReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'

class AccountsController {
  // Refactored
  static async isUnlocked() {
    const store = await getStore()
    const { application } = store.getState()
    return application.unlocked
  }

  // Refactored
  static async cleanUp() {
    await Account.cleanUp()
  }

  // Refactored
  async activeAccountIndex() {
    const store = await getStore()
    const { application } = store.getState()
    return application.activeAccountIndex
  }

  // Refactored
  async isDBInitiated() {
    return await Account.isDBInitiated()
  }

  // Refactored
  async importAccount(seedWords: string, password: string) {
    const seedsDB = new SeedsDB(password)

    const newAccountIndex = await seedsDB.appendSeed(seedWords)
    await waitForSync()

    if (newAccountIndex > 0) {
      const store = await getStore()
      const { application } = await store.getState()

      const syncSubscription = application.appInitialized
      await this.switchToAccount(newAccountIndex, syncSubscription)
      await waitForSync(300)

      const account = await Account.getActiveAccount()

      if (!account) throw new Error('No active account.')

      const accountRootPubKey = await account.getRootPubKey()
      const accountPubKey = await account.getAccountPubKey()

      return { accountIndex: newAccountIndex, accountRootPubKey, accountPubKey }
    }

    return { accountIndex: newAccountIndex }
  }

  async syncAccountDataOnImport(accountIndex: number, password: string) {
    const seedsDB = new SeedsDB(password)

    if (accountIndex > 0) {
      const account = await Account.find(accountIndex)

      if (!account) throw new Error('No active account.')

      await this.syncAccountData(account, seedsDB)

      const accountActivities = new AccountActivities(account.data.id, account)
      const accountHasActivities = await accountActivities.hasLocalActivities()

      if (!accountHasActivities) {
        await accountActivities.newAccount()
        await waitForSync()
      }
    }
  }

  // Refactored
  async syncActiveAccountData() {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    await this.syncAccountData(account)
  }

  // Refactored
  async syncAccountData(account: Account, seedsDB?: any) {
    // We have to do it sync as otherwise we would need to wait 1 minute with alarm or
    // we would have to trigger this from UI
    const result = await Wallet.syncWalletBackupsWithRemote(account, seedsDB)
    if (result) {
      await account.refreshWalletsData()
      await waitForSync()
    }

    const accountActivities = new AccountActivities(account.data.index, account)
    await accountActivities.syncFromServer()
    await waitForSync()
  }

  // Refactored
  async switchToAccount(index: number, syncSubscription = true) {
    const account = await Account.find(index)

    if (account) {
      return await account.setActive(syncSubscription)
    } else {
      throw new Error(`Account with index ${index} does not exist`)
    }
  }

  // Refactored
  async unlock(password: string) {
    const store = await getStore()

    const seedsDB = new SeedsDB(password)
    const result = await seedsDB.unlockVault(password)

    if (result) {
      await store.dispatch(applicationReducer.setPassword(password))
      await waitForSync()

      await store.dispatch(applicationReducer.setUnlocked())
      await waitForSync()

      const account = await Account.getActiveAccount()

      if (!account) throw new Error('No active account.')

      await account.refreshBadgeCounter()
      await waitForSync()
    } else {
      await store.dispatch(applicationReducer.setLocked())
      await waitForSync()
    }

    return result
  }

  // Refactored
  async lock() {
    await Account.cleanUp()

    const store = await getStore()
    await store.dispatch(snackbarReducer.setSuccess('Logout successful'))
    await waitForSync()

    return true
  }

  // Refactored
  async getSeedPhrase(password: string) {
    const account = await Account.getActiveAccount()

    if (account) {
      return await account.getSeedWords(password)
    } else {
      throw new Error(`Application is not initiated`)
    }
  }

  // (in progress) Refactored
  async deleteActiveAccount(password: string) {
    const store = await getStore()
    const { application } = store.getState()

    if (application.password === password) {
      const account = await Account.getActiveAccount()

      if (!account) throw new Error('No active account.')

      await store.dispatch(applicationReducer.setDeletingAccountIndex(account.data.index))
      await waitForSync(300)

      const result = await account.deleteAllDataFromDB(password)

      if (result) await this.lock()

      await store.dispatch(applicationReducer.unsetDeletingAccountIndex())
      await waitForSync()

      return result
    }

    return null
  }

  // Refactored
  async getActiveAccountHDPubKey(path: string) {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    const keyManager = new KeyManager(account.data.index)
    const key = await keyManager.getKeyByPath(path)
    return key.pubKey
  }

  // Refactored
  async updateActiveAccountName(accountName: string) {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    return await account.setAccountName(accountName)
  }

  // Refactored
  async setActiveAccountHiddenBlockchain(blockchain: BlockchainNames, state: any) {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    return await account.setAccountHiddenBlockchain(blockchain, state)
  }

  // Refactored
  async setActiveAccountUnhideBlockchainWallets(blockchain: BlockchainNames, state: any) {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    return await account.setAccountUnhideBlockchainWallets(blockchain, state)
  }

  async pingRemoteIAmOnline() {
    const roundTimeMilli = 5000
    const totalDurationMilli = 60000
    const rounds = totalDurationMilli / roundTimeMilli - 1 // next alarm will be executed after

    const timeoutAt = +Date.now() + rounds * roundTimeMilli
    let roundStartAt,
      nextRoundInMilli = 0
    let i = 0

    // give 1 second tolerance to time, to avoid accidental boundary conditions
    while (Date.now() < timeoutAt + 1000) {
      roundStartAt = +Date.now()

      const account = await Account.getActiveAccount()
      const applicationUnlocked = await AccountsController.isUnlocked()

      if (account && applicationUnlocked) {
        await account.pingRemoteIAmOnline()
      } else {
        // user has logged out
        return false
      }

      if (i++ >= rounds) return false

      nextRoundInMilli = roundTimeMilli - (+Date.now() - roundStartAt)
      await new Promise((r) => setTimeout(r, nextRoundInMilli)) // wait a bit before next check
    }

    return false
  }

  // TO BE REFACTORED
  // We should not sing message without knowing what is its content.
  // But for now we've implemented things this way and we should refactor them once
  // updated wallet is released into production
  async signMessageHashByActiveUser(messageHash: string) {
    const account = await Account.getActiveAccount()

    if (!account) throw new Error('No active account.')

    const signature = await account.signMessageHash(messageHash)
    const accountPubKey = await account.getAccountPubKey()

    return [signature, accountPubKey]
  }
}

export default AccountsController
