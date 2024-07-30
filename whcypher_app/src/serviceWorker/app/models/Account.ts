/* global Buffer */

import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import AccountsDB, { IDbAccount } from 'src/serviceWorker/db/AccountsDB'
import browser from 'webextension-polyfill'

import * as steps from '../../../app/constants/appInitSteps'
import { APP_INIT_REQUEST_TYPES, USER_REQUEST_TYPES, WEB_PAGE_REQUEST_TYPES } from '../../../app/constants/requestTypes'
import ActivitiesDB from '../../db/ActivitiesDB'
import HandlersDB from '../../db/HandlersDB'
import KnownDestinationsDB from '../../db/KnownDestinationsDB'
import KnownHostsDB from '../../db/KnownHostsDB'
import SeedsDB from '../../db/SeedsDB'
import WalletsDB from '../../db/WalletsDB'
import * as appInitReducer from '../store/reducers/appInitReducer'
import * as applicationReducer from '../store/reducers/applicationReducer'
import * as backupStatusReducer from '../store/reducers/backupStatusReducer'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as multisigSessionsReducer from '../store/reducers/multisigSessionsReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import * as transactionSessionsReducer from '../store/reducers/transactionSessionsReducer'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import * as walletsReducer from '../store/reducers/walletsReducer'
import { AppState, getStore } from '../store/store'
import { sendIAmOnlineApi } from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import AccountActivities from './AccountActivities'
import KeyManager from './KeyManager'
import KnownDestination from './KnownDestination'
import KnownHost from './KnownHost'
import Subscription from './Subscription'
import SubscriptionPayment from './SubscriptionPayment'
import Wallet from './Wallet'

class Account {
  data: any
  constructor(data: IDbAccount) {
    this.data = data
  }

  // Refactored
  static async cleanUp() {
    const store = await getStore()

    const { appInit, application, requests, multisigSessions, transactionSessions }: AppState = await store.getState()

    await store.dispatch(applicationReducer.setLocked())
    await waitForSync()

    // Initiate the app if user got to "Congratulation" screen but hasn't proceed further
    if (!application.appInitialized && appInit.currentStep == steps.CONGRATULATIONS) {
      await store.dispatch(applicationReducer.appInitialized())
      await waitForSync()
    }

    await store.dispatch(appInitReducer.nullifyState())
    await waitForSync()

    await store.dispatch(backupStatusReducer.nullifyState())
    await waitForSync()

    await store.dispatch(walletRequestsReducer.nullifyMonitoredSessions())
    await waitForSync()

    const userRequestsToClean = requests.requestsList.filter((request) =>
      Object.values(USER_REQUEST_TYPES).includes(request.requestName),
    )
    await userRequestsToClean.forEach(async (request) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await waitForSync()
    })

    const initRequestsToClean = requests.requestsList.filter((request) =>
      Object.values(APP_INIT_REQUEST_TYPES).includes(request.requestName),
    )
    await initRequestsToClean.forEach(async (request) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await waitForSync()
    })

    const webPageRequestsToClean = requests.requestsList.filter((request) =>
      Object.values(WEB_PAGE_REQUEST_TYPES).includes(request.requestName),
    )
    await webPageRequestsToClean.forEach(async (request) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await waitForSync()
    })

    const importRequestsToClean = requests.requestsList.filter((request) => request.id === 'import')
    await importRequestsToClean.forEach(async (request) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await waitForSync()
    })

    const multisigSessionIds = Object.keys(multisigSessions.sessions)
    await multisigSessionIds.forEach(async (sessionId) => {
      await store.dispatch(multisigSessionsReducer.removeSession({ sessionId }))
      await waitForSync()
    })

    const transactionSessionIds = Object.keys(transactionSessions.sessions)
    await transactionSessionIds.forEach(async (sessionId) => {
      await store.dispatch(transactionSessionsReducer.removeSession({ sessionId }))
      await waitForSync()
    })

    const handlersDB = new HandlersDB()
    await handlersDB.clearHandlers()
    await waitForSync()

    await browser.alarms.clear('updateCurrencyRates')
    await browser.alarms.clear('syncActivitiesWithServer')
    await browser.alarms.clear('monitorGroupTransactionRequests')
    await browser.alarms.clear('executeAutoApprovalRequests')
    await browser.alarms.clear('cleanupExpiredGroupTransactionRequests')
    await browser.alarms.clear('pingRemoteIAmOnline')
    await browser.alarms.clear('syncWalletBackupsWithRemote')
    await browser.alarms.clear('getWalletsBalances')
    await browser.alarms.clear(`expireActiveAccountSubscription`)

    await SubscriptionPayment.unsetAlarmsForPendingSubscriptionPayments()
  }

  // Refactored
  static async shouldInterceptAccountRoutine(account: Account) {
    const store = await getStore()
    const { application } = await store.getState()
    if (
      (application.appInitialized && !application.unlocked) ||
      application.deletingAccountIndex ||
      application.activeAccountIndex !== account.data.index
    ) {
      return true
    }
    return false
  }

  // Refactored
  static async isDBInitiated() {
    const seedsDB = new SeedsDB()
    return await seedsDB.isInitialized()
  }

  // Refactored
  static async getActiveAccount() {
    const accountsDB = new AccountsDB()
    const accountData = await accountsDB.getActiveAccount()
    return accountData ? new Account(accountData) : null
  }

  static async getActiveAccountPubKey() {
    const account = await this.getActiveAccount()
    if (!account) {
      return Error(`No active account`)
    }
    return await account.getAccountPubKey()
  }

  static async getAuthHeadersForActiveAccount(requestBody: any) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return Error(`No active account`)
    }
    return await account.authHeaders(requestBody)
  }

  // Refactored
  static async find(accountIndex?: number) {
    const accountsDB = new AccountsDB()
    const accountData = await accountsDB.getAccountByIndex(accountIndex)
    return accountData ? new Account(accountData) : null
  }

  // Refactored
  static async findByPubKey(accountPubKey: string) {
    const accountsDB = new AccountsDB()
    const accountData = await accountsDB.getAccountByPubKey(accountPubKey)
    return accountData ? new Account(accountData) : null
  }

  // Refactored
  static async allAccountsData() {
    const accountsDB = new AccountsDB()
    return await accountsDB.loadAccounts()
  }

  // Refactored
  async getRootPubKey() {
    return this.data.masterPubKey
  }

  // Refactored
  async getAccountPubKey() {
    return this.data.pubKey
  }

  // Refactored
  async getPubKeyByPath(path: string) {
    const keyManager = await this.getKeyManager()
    const pubKey_obj = await keyManager.getKeyByPath(path)
    return pubKey_obj.pubKey
  }

  // Refactored
  async getKeyManager() {
    return new KeyManager(this.data.index)
  }

  // Refactored
  async getSeedWords(password: string) {
    const seedsDB = new SeedsDB()
    const result = await seedsDB.unlockVault(password)

    if (result) {
      return await seedsDB.getSeedWordsForAccountByIndex(this.data.index)
    } else {
      return null
    }
  }

  // Refactored
  async findAllWallets() {
    const accountPubKey = await this.getRootPubKey()
    return await Wallet.findByAccountRootPubKey(accountPubKey)
  }

  // Refactored
  async getWalletsData() {
    const accountRootPubKey = await this.getRootPubKey()
    return await Wallet.getWalletsDataByAccountRootPubKey(accountRootPubKey)
  }

  // Refactored
  async setActive(syncSubscription = true) {
    const accountsDB = new AccountsDB()

    const newData = await accountsDB.setActiveAccount(this.data.index)
    const result = !!newData?.active

    if (result) {
      const store = await getStore()

      this.data = { ...newData }

      await store.dispatch(applicationReducer.setActiveAccountData(this.data))
      await waitForSync()

      await store.dispatch(applicationReducer.setAccountsList(accountsDB.accounts))
      await waitForSync()

      await this.refreshWalletsData()

      await this.refreshBadgeCounter()

      const accountActivity = new AccountActivities(this.data.index, this)
      await accountActivity.updateAccountActivities()

      await KnownHost.refreshActiveAccountHosts()

      await KnownDestination.refreshActiveAccountDestinations()

      if (syncSubscription) {
        await this.syncSubscription()
      }
    }

    return result
  }

  async syncSubscription() {
    const subscription = new Subscription()
    await subscription.syncActiveAccountSubscription()
    await subscription.setActiveAccountSubscription()
    await subscription.updateAlarmsToExpireActiveAccountSubscription()
    await SubscriptionPayment.setAlarmsForPendingSubscriptionPayments()
  }

  // Refactored
  async refreshWalletsData() {
    const store = await getStore()

    const walletsData = await this.getWalletsData()
    await store.dispatch(walletsReducer.setWallets(walletsData))
    await waitForSync()
  }

  async refreshBadgeCounter() {
    const store = await getStore()
    const { walletRequests, requests }: AppState = await store.getState()

    const accountPubKey = await this.getAccountPubKey()

    const appRequestsCount = requests.requestsList.filter((request) => request.accountPubKey === accountPubKey)
    const walletRequestsCount = walletRequests.requestsList.filter(
      (walletRequest) => walletRequest.accountPubKey === accountPubKey,
    )
    const requestsCount = appRequestsCount.length + walletRequestsCount.length

    await store.dispatch(badgeReducer.setBadge(requestsCount))
    await waitForSync()
  }

  // Refactored
  async deleteAllDataFromDB(password: string) {
    const seedsDB = new SeedsDB()
    const result = await seedsDB.unlockVault(password)

    if (result) {
      const seedWords = await seedsDB.getSeedWordsForAccountByIndex(this.data.index)

      const knownDestinationsDB = new KnownDestinationsDB()
      await knownDestinationsDB.removeDestinationsByPubKey(this.data.pubKey)
      await waitForSync()

      const knownHostsDB = new KnownHostsDB()
      await knownHostsDB.removeHostsByPubKey(this.data.pubKey)
      await waitForSync()

      const activitiesDB = new ActivitiesDB()
      await activitiesDB.removeActivitiesByPubKey(this.data.pubKey)
      await waitForSync()

      const walletsDB = new WalletsDB()
      await walletsDB.removeWalletsByAccountRootPubKey(this.data.masterPubKey)
      await waitForSync()

      const accountIndex = await seedsDB.removeSeed(seedWords)
      await waitForSync()

      const accountsDB = new AccountsDB()
      const newAccountsList = await accountsDB.loadAccounts()

      if (newAccountsList.length > 0) {
        const account = await Account.find(newAccountsList[0].index)
        if (account) await account.setActive()
      } else {
        await Account.cleanUp()

        const store = await getStore()
        await store.dispatch(applicationReducer.nullifyState())
        await waitForSync()
      }

      return accountIndex >= 0
    }

    return false
  }

  async _getPrivateKey(path = null) {
    const accountPath = path || this.data.path
    const keyManager = await this.getKeyManager()
    const accountPrivKey = await keyManager.getKeyByPath(accountPath)

    return accountPrivKey
  }

  // Refactored
  async signMessage(message: string, path = null) {
    const accountPrivKey = await this._getPrivateKey(path)

    return accountPrivKey.sign(message, true)
  }

  // Refactored
  async signMessageHash(messageHash: string, path = null) {
    const accountPrivKey = await this._getPrivateKey(path)

    return accountPrivKey.sign_raw(Buffer.from(messageHash, 'utf-8'))
  }

  // Refactored
  async setAccountName(newAccountName: string) {
    const accountsDB = new AccountsDB()
    const updatedAccountData = await accountsDB.setAccountName(this.data.index, newAccountName)

    if (updatedAccountData) {
      this.data = updatedAccountData
      await this._updateAccountData(accountsDB)
      return true
    }

    return false
  }

  // Refactored
  async setAccountHiddenBlockchain(blockchain: BlockchainNames, state: any) {
    const accountsDB = new AccountsDB()

    let updatedAccountData

    if (state) {
      updatedAccountData = await accountsDB.setAccountHiddenBlockchain(this.data.index, blockchain)
    } else {
      updatedAccountData = await accountsDB.unsetAccountHiddenBlockchain(this.data.index, blockchain)
    }

    if (updatedAccountData) {
      this.data = updatedAccountData
      await this._updateAccountData(accountsDB)
      return true
    }

    return false
  }

  // Refactored
  async setAccountUnhideBlockchainWallets(blockchain: BlockchainNames, state: any) {
    const accountsDB = new AccountsDB()

    let updatedAccountData

    if (state) {
      updatedAccountData = await accountsDB.setAccountUnhideBlockchainWallets(this.data.index, blockchain)
    } else {
      updatedAccountData = await accountsDB.unsetAccountUnhideBlockchainWallets(this.data.index, blockchain)
    }

    if (updatedAccountData) {
      this.data = updatedAccountData
      await this._updateAccountData(accountsDB)
      return true
    }

    return false
  }

  // Refactored
  async pingRemoteIAmOnline() {
    const knownHostsDB = new KnownHostsDB()
    const knownHosts = await knownHostsDB.getAccountHosts(this.data.pubKey)

    const store = await getStore()
    const { settings } = store.getState()
    const { autoApproveLimitUSD } = settings

    for (const knownHost of knownHosts) {
      const requestBody = JSON.stringify({
        autoapprovalAmount: autoApproveLimitUSD,
        autoapprovalCurrency: 'USD',
      })

      const authHeaders = await this.authHeaders(requestBody)

      const response = await sendIAmOnlineApi(requestBody, authHeaders, knownHost.host)
      if (response.status !== 200) {
        throw new Error(`Remote responded with error: ${response.error}`)
      }
    }
  }

  // Refactored
  async encryptData(stringData: string, partyPath = null) {
    const path = partyPath ? partyPath : this.data.path
    const keyManager = await this.getKeyManager()
    return await keyManager.encryptData(stringData, path)
  }

  // Refactored
  async decryptData(encryptedStringData: string, partyPath = null) {
    const path = partyPath ? partyPath : this.data.path
    const keyManager = await this.getKeyManager()

    return await keyManager.decryptData(encryptedStringData, path)
  }

  // Refactored
  async authHeaders(requestBody: any, partyPath = null) {
    const path = partyPath ? partyPath : this.data.path
    const keyManager = await this.getKeyManager()
    return await keyManager.authHeaders(requestBody, path)
  }

  // Refactored
  async _updateAccountData(accountsDB: AccountsDB) {
    const store = await getStore()
    await store.dispatch(applicationReducer.setActiveAccountData(this.data))
    await waitForSync()

    await store.dispatch(applicationReducer.setAccountsList(accountsDB.accounts))
    await waitForSync()
  }
}

export default Account
