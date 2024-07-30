// Async load for scripts, allows to load before all other scripts on web-pages
import 'setimmediate'

import { CHANNELS } from 'src/app/constants/browserChannels'
import logger from 'src/app/helpers/appLogger'
import browser from 'webextension-polyfill'

import HandlersDB from '../db/HandlersDB'
import migrator from '../db/migrator'
import RpcManager from '../RpcManager'
import AccountsController from './controllers/AccountsController'
import ActivitiesController from './controllers/ActivitiesController'
import AppController from './controllers/AppController'
import BlockchainController from './controllers/BlockchainController'
import CurrencyRatesController from './controllers/CurrencyRatesController'
import KnownDestinationsController from './controllers/KnownDestinationsController'
import KnownHostsController from './controllers/KnownHostsController'
import MultisigController from './controllers/MultisigController'
import RequestsController from './controllers/RequestsController'
import SettingsController from './controllers/SettingsController'
import SubscriptionController from './controllers/SubscriptionController'
import TransactionSessionsController from './controllers/TransactionSessionsController'
import WalletController from './controllers/WalletController'
import Account from './models/Account'
import * as snackbarActions from './store/reducers/snackbarReducer'
import { getStore } from './store/store'
import { waitForSync } from './utils/dbHelper'
// [FIXME] Shall we dissbale this functionality for now?
import { decryptMessage } from './utils/decryptMessage'
import { getCurrentAccountEncryptionPublicKey } from './utils/getEncryptionPublicKey'

/**
 * Initializes the controllers, and sets up configuration.
 */
// Refactored
async function initFirstAccountIfMissing() {
  const accountsController = new AccountsController()

  const initiated = await accountsController.isDBInitiated()

  if (!initiated) {
    browser.windows.create({
      url: browser.runtime.getURL('app.html'),
      height: 600,
      width: 350,
      type: 'popup',
    })
  }
}

// ==================Event handlers START=====================
// Refactored
const importSeed = async (request: any, sendResponse: any) => {
  const { seedWords, password } = request

  try {
    const accountsController = new AccountsController()

    const { accountIndex, accountRootPubKey, accountPubKey } = await accountsController.importAccount(
      seedWords,
      password,
    )

    sendResponse({ success: true, accountIndex, accountRootPubKey, accountPubKey })
  } catch (e) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(e.message))
    console.log('importSeed: ', e)
    sendResponse({ success: false })
  }
}

// Refactored
const syncAccountDataOnImport = async (request: any, sendResponse: any) => {
  const { accountIndex, password } = request

  try {
    const accountsController = new AccountsController()
    await accountsController.syncAccountDataOnImport(accountIndex, password)

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(e.message))
    console.log('syncAccountDataOnImport: ', e)
    sendResponse({ success: false })
  }
}

// Refactored
const syncActiveAccountData = async (request: any, sendResponse: any) => {
  try {
    const accountsController = new AccountsController()
    await accountsController.syncActiveAccountData()

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(e.message))
    console.log('syncActiveAccountData: ', e)
    sendResponse({ success: false })
  }
}

// Refactored
const unlockApp = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { password } = request

  try {
    const accountsController = new AccountsController()

    const appUnlocked = await accountsController.unlock(password)
    if (appUnlocked) {
      const transactionSessionsController = new TransactionSessionsController()

      try {
        await updateCurrencyRates()
      } catch (err) {
        console.log(`Error on app unlock: updateCurrencyRates: `, err)
      }
      browser.alarms.create('updateCurrencyRates', { periodInMinutes: 10 })

      // Called from UI on login since it is a time consuming task and block other things
      // try {
      //   await syncActivitiesWithServer();
      // } catch (err) {
      //   console.log(`Error on app unlock: syncActivitiesWithServer: `, err);
      // }
      browser.alarms.create('syncActivitiesWithServer', { periodInMinutes: 5 })

      try {
        await transactionSessionsController.cleanupExpiredGroupTransactions()
      } catch (err) {
        console.log(`Error on app unlock: cleanupExpiredGroupTransactions: `, err)
      }
      browser.alarms.create('cleanupExpiredGroupTransactionRequests', { periodInMinutes: 1 })

      // Called from UI on login since it is monitoring task
      // try {
      //   await transactionSessionsController.fetchFromServerOnce(true);
      // } catch (err) {
      //   console.log(`Error on app unlock: fetchFromServerOnce: `, err);
      // }
      browser.alarms.create('monitorGroupTransactionRequests', { periodInMinutes: 1 })

      // Called from UI on login since it is monitoring task
      // try {
      //   await AccountController.pingRemoteIAmOnline();
      // } catch (err) {
      //   console.log(`Error on app unlock: pingRemoteIAmOnline: `, err);
      // }
      browser.alarms.create('pingRemoteIAmOnline', { periodInMinutes: 1 })

      // Called from UI on login since it is monitoring task
      // try {
      //   await transactionSessionsController.executeAutoApprovals();
      // } catch (err) {
      //   console.log(`Error on app unlock: executeAutoApprovals: `, err);
      // }
      browser.alarms.create('executeAutoApprovalRequests', { periodInMinutes: 1 })

      // Fetch known assets balances once a minute
      browser.alarms.create('getWalletsBalances', { periodInMinutes: 1 })

      // Called from UI on login since it is a time consuming task and block other things
      // try {
      //   const walletController = new WalletController();
      //   await walletController.syncWalletBackupsWithRemote();
      // } catch (err) {
      //   console.log(`Error on app unlock: syncWalletBackupsWithRemote: `, err);
      // }
      browser.alarms.create('syncWalletBackupsWithRemote', { periodInMinutes: 5 })

      const account = await Account.getActiveAccount()
      await account.syncSubscription()

      const activeAccountIndex = await accountsController.activeAccountIndex()
      sendResponse({ success: true, activeAccountIndex })
    } else {
      await store.dispatch(snackbarActions.setError('Password incorrect!'))
      sendResponse({ success: false })
    }
  } catch (e) {
    store.dispatch(snackbarActions.setError(e.message))
    console.log('unlockApp: ', e)
    sendResponse({ success: false })
  }
}

// Refactored
const initMultisigSession = async (request: any, sendResponse: any) => {
  const { blockchain, minimumSigAmount, participantsAmount, path } = request

  try {
    const multisigController = new MultisigController()

    const vaultSessionData = await multisigController.initSession(
      blockchain,
      minimumSigAmount,
      participantsAmount,
      path,
    )

    sendResponse(vaultSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('initMultisigSession: ', e)
    sendResponse({ success: false })
  }
}

// Refactored
const getMultisigSessionData = async (request: any, sendResponse: any) => {
  const { sessionId } = request

  try {
    const multisigController = new MultisigController()
    const multisigSessionData = await multisigController.getSessionData(sessionId)

    sendResponse(multisigSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getMultisigSessionData: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const joinMultisigSession = async (request: any, sendResponse: any) => {
  const { sessionId, path } = request

  try {
    const multisigController = new MultisigController()

    const multisigSessionData = await multisigController.joinSession(sessionId, path)

    sendResponse(multisigSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('joinMultisigSession: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const rejectMultisigSession = async (request: any, sendResponse: any) => {
  const { sessionId } = request

  try {
    const multisigController = new MultisigController()

    const alarmName = `resolveMultisigSession:${sessionId}`
    const alarmData = { name: alarmName, scheduledTime: +Date.now() }
    const multisigSessionData = await multisigController.rejectSession(alarmData, sessionId)

    sendResponse(multisigSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('joinMultisigSession: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const resolveMultisigSession = async (alarmData: any, sessionId: any) => {
  const multisigController = new MultisigController()

  try {
    await multisigController.resolveSession(alarmData, sessionId)
  } catch (e) {
    console.log('resolveMultisigSession: ', e)
    await multisigController.rejectSession(alarmData, sessionId)
  }
}

// Refactored
const getCurrentAccountSubscriptionData = async (request: any, sendResponse: any) => {
  try {
    const subscriptionController = new SubscriptionController()
    const currentSubscription = await subscriptionController.getCurrentAccountSubscriptionData()

    sendResponse(currentSubscription)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getCurrentAccountSubscriptionData: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getPendingSubscriptionPayments = async (request: any, sendResponse: any) => {
  try {
    const subscriptionController = new SubscriptionController()
    const currentSubscription = await subscriptionController.getPendingSubscriptionPayments()

    sendResponse(currentSubscription)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getPendingSubscriptionPayments: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getSubscriptionPaymentPlans = async (request: any, sendResponse: any) => {
  try {
    const subscriptionController = new SubscriptionController()
    const subscriptionOptions = await subscriptionController.getSubscriptionPaymentPlans()

    sendResponse(subscriptionOptions)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getSubscriptionPaymentPlans: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getSubscriptionPaymentPeriods = async (request: any, sendResponse: any) => {
  try {
    const { subscriptionPlan, referralCode } = request

    const subscriptionController = new SubscriptionController()
    const subscriptionPeriods = await subscriptionController.getSubscriptionPaymentPeriods(
      subscriptionPlan,
      referralCode,
    )

    sendResponse(subscriptionPeriods)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getSubscriptionPaymentPeriods: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getSubscriptionPaymentMethods = async (request: any, sendResponse: any) => {
  try {
    const { subscriptionPlan, referralCode, paymentPeriod } = request

    const subscriptionController = new SubscriptionController()
    const subscriptionMethods = await subscriptionController.getSubscriptionPaymentMethods(
      subscriptionPlan,
      referralCode,
      paymentPeriod,
    )

    sendResponse(subscriptionMethods)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getSubscriptionPaymentMethods: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const initSubscriptionPayment = async (request: any, sendResponse: any) => {
  try {
    const { subscriptionPlan, referralCode, paymentPeriod, paymentMethod } = request

    const subscriptionController = new SubscriptionController()
    const subscriptionPeriods = await subscriptionController.initSubscriptionPayment(
      subscriptionPlan,
      referralCode,
      paymentPeriod,
      paymentMethod,
    )

    sendResponse(subscriptionPeriods)
  } catch (e) {
    initSubscriptionPayment
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('initSubscriptionPayment: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getWalletData = async (request: any, sendResponse: any) => {
  const { walletId } = request

  try {
    const walletController = new WalletController()
    const walletData = await walletController.getWalletData(walletId)

    sendResponse({ walletData })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getWalletData: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getWalletMetaInfo = async (request: any, sendResponse: any) => {
  const { walletId } = request

  try {
    const walletController = new WalletController()
    const walletMetaInfo = await walletController.getWalletMetaInfo(walletId)

    sendResponse(walletMetaInfo)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getWalletMetaInfo: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getBlockchainMetaInfo = async (request: any, sendResponse: any) => {
  const { blockchain } = request
  try {
    const walletController = new WalletController()
    const blockchainMetaInfo = await walletController.getBlockchainMetaInfo(blockchain)

    sendResponse(blockchainMetaInfo)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getBlockchainMetaInfo: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getAdapterMetaInfo = async (request: any, sendResponse: any) => {
  const { blockchain, assetData, from } = request

  try {
    const walletController = new WalletController()
    const adapterMetaInfo = await walletController.getAdapterMetaInfo(blockchain, assetData, from)

    sendResponse(adapterMetaInfo)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getAdapterMetaInfo: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const updateWalletBalances = async (request: any, sendResponse: any) => {
  const { walletId } = request

  try {
    const walletController = new WalletController()
    const walletBalances = await walletController.updateWalletBalances(walletId)

    sendResponse({ balances: walletBalances })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('updateWalletBalances: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getAvailableERC721 = async (request: any, sendResponse: any) => {
  const { walletId, assetId } = request

  try {
    const walletController = new WalletController()
    const assets = await walletController.getAvailableERC721(walletId, assetId)

    sendResponse({ assets })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('updateWalletBalances: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const getWalletsBalances = async (request: any, sendResponse: any) => {
  const { filterName, recurrentUpdateWithFastForward, fullFetch } = request

  try {
    const walletController = new WalletController()

    if (recurrentUpdateWithFastForward) {
      await walletController.getRecurrentlyWalletsBalances(filterName)
    } else {
      await walletController.getWalletsBalances(filterName, fullFetch)
    }

    if (typeof sendResponse === 'function') sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getWalletsBalances: ', e)
    if (typeof sendResponse === 'function') sendResponse({ success: false, error: e })
  }
}

// Refactored
const fetchAssetData = async (request: any, sendResponse: any) => {
  const { blockchain, assetAddress } = request

  try {
    const blockchainController = new BlockchainController()
    const assetData = await blockchainController.fetchAssetData(blockchain, assetAddress)

    sendResponse({ assetData })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('fetchAssetData: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const addAssetToWallet = async (request: any, sendResponse: any) => {
  const { walletId, assetData } = request

  try {
    const walletController = new WalletController()
    await walletController.addAssetToWallet(walletId, assetData)

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('addAssetToWallet: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const estimateTransactionFee = async (request: any, sendResponse: any) => {
  const { blockchain, assetData, from, spendData, feeData } = request

  try {
    const walletController = new WalletController()
    const estimate: any = await walletController.estimateTransactionFee(blockchain, assetData, from, spendData, feeData)

    if (!estimate.error) {
      sendResponse(estimate)
    } else {
      sendResponse({ error: estimate.error })
    }
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('estimateTransactionFee: ', e)
    sendResponse({ error: e.message })
  }
}

const _handleInitTransactionSessionResponse = async (transactionData: any, sendResponse: any) => {
  if (!transactionData.error) {
    sendResponse({ transactionData })
  } else {
    const store = await getStore()
    if (transactionData.error.general) {
      await store.dispatch(snackbarActions.setError(transactionData.error.general))
    } else if (transactionData.error.value) {
      await store.dispatch(snackbarActions.setError(transactionData.error.value))
    } else {
      await store.dispatch(snackbarActions.setError(transactionData.error))
    }
    sendResponse({ error: transactionData.error })
  }
}
// Refactored
const initTransaction = async (request: any, sendResponse: any) => {
  const { walletId, assetData, spendData, feeData } = request

  try {
    const walletController = new WalletController()
    const transactionData = await walletController.initTransaction(walletId, assetData, spendData, feeData)

    await _handleInitTransactionSessionResponse(transactionData, sendResponse)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('initTransaction: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const initDappTransaction = async (request: any, sendResponse: any) => {
  const { walletId, rawData, feeData } = request

  try {
    const walletController = new WalletController()
    const transactionData = await walletController.initDappTransaction(walletId, rawData, feeData)

    await _handleInitTransactionSessionResponse(transactionData, sendResponse)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('initTransaction: ', e)
    sendResponse({ error: e.message })
  }
}

const initSignRawMessage = async (request: any, sendResponse: any) => {
  const { walletId, rawData } = request

  try {
    const walletController = new WalletController()
    const transactionData = await walletController.initSignRawMessage(walletId, rawData)

    await _handleInitTransactionSessionResponse(transactionData, sendResponse)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('initSignRawMessage: ', e)
    sendResponse({ error: e.message })
  }
}

// [FIXME] Shall we disable this functionality? We don't have a private key without
// compiling it in a single case and hence - compromising
const getEncryptionPublicKey = async (request: any, sendResponse: any) => {
  const { dappMessage } = request

  try {
    const encrypted = await getCurrentAccountEncryptionPublicKey(dappMessage)

    sendResponse({ encrypted })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('getEncryptionPublicKey: ', e)
    sendResponse({ error: e.message })
  }
}

// [FIXME] Shall we disable this functionality? We don't have a private key without
// compiling it in a single case and hence - compromising
const decryptDappMessage = async (request: any, sendResponse: any) => {
  const { dappMessage } = request

  try {
    const decrypted = await decryptMessage(dappMessage)

    sendResponse({ decrypted })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('decryptDappMessage: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const joinTransactionSession = async (request: any, sendResponse: any) => {
  const { walletId, sessionId } = request
  const transactionSessionsController = new TransactionSessionsController()
  try {
    const signatureSessionData = await transactionSessionsController.joinSession(walletId, sessionId)

    sendResponse(signatureSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('joinTransactionSession: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const rejectTransactionSession = async (request: any, sendResponse: any) => {
  const { sessionId } = request
  const transactionSessionsController = new TransactionSessionsController()

  try {
    const alarmName = `resolveTransactionSession:${sessionId}:false`
    const alarmData = { name: alarmName, scheduledTime: +Date.now() }
    const signatureSessionData = await transactionSessionsController.rejectSession(alarmData, sessionId, 'rejected')

    sendResponse(signatureSessionData)
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('rejectTransactionSession: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const removeWalletRequest = async (request: any, sendResponse: any) => {
  const { requestMatcher } = request
  const transactionSessionsController = new TransactionSessionsController()

  try {
    await transactionSessionsController.removeRequest(requestMatcher)

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('removeWalletRequest: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const resolveTransactionSession = async (alarmData: any, sessionId: any, broadcast: any) => {
  const transactionSessionsController = new TransactionSessionsController()

  try {
    await transactionSessionsController.resolveSession(alarmData, sessionId, broadcast)
  } catch (e) {
    console.log('resolveTransactionSession: ', e)
    await transactionSessionsController.rejectSession(alarmData, sessionId, 'failed')
  }
}

// Refactored
const expireActiveAccountSubscription = async (alarmData: any) => {
  const subscriptionController = new SubscriptionController()

  try {
    await subscriptionController.expireActiveAccountSubscription()
  } catch (e) {
    console.log('expireActiveAccountSubscription: ', e)
    // await subscriptionController.rejectSession(alarmData, sessionId, 'failed')
  }
}

// Refactored
const monitorSubscriptionPaymentSession = async (alarmData: any, sessionId: string) => {
  const subscriptionController = new SubscriptionController()

  try {
    await subscriptionController.monitorPaymentSession(sessionId)
  } catch (e) {
    console.log('resolveTransactionSession: ', e)
    // await subscriptionController.rejectSession(alarmData, sessionId, 'failed')
  }
}

// Refactored
// const asyncTransactionSignatureFinish = async (alarmData, sessionId, broadcast) => {
//   const transactionSessionsController = new TransactionSessionsController();

//   try {
//     console.log("Async transaction signature resolve via alarm")
//     await transactionSessionsController.asyncFinish(alarmData, sessionId, broadcast);
//   } catch (error) {
//     console.log("asyncTransactionSignatureFinish: ", e);
//     await transactionSessionsController.rejectSession(alarmData, sessionId, 'failed');
//   }
// }

// Refactored
const appClearState = async (sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.clearState()

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('lockApp: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const lockApp = async (sendResponse: any) => {
  try {
    const accountsController = new AccountsController()
    await accountsController.lock()

    sendResponse({ lock: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('lockApp: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const updateActiveAccountName = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { newAccountName } = request

  try {
    const accountsController = new AccountsController()

    const result = await accountsController.updateActiveAccountName(newAccountName)

    if (result) sendResponse({ success: true })
    else {
      store.dispatch(snackbarActions.setError(`Couldn't update account name`))
      sendResponse({ success: false })
    }
  } catch (error) {
    store.dispatch(snackbarActions.setError(`Couldn't save ${newAccountName}: ${error}`))
    console.log('updateActiveAccountName: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const updateWalletName = async (request: any, sendResponse: any) => {
  const { walletId, newWalletName } = request
  const walletController = new WalletController()

  try {
    await walletController.updateWalletName(walletId, newWalletName)

    sendResponse({ success: true })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('updateWalletName: ', e)
    sendResponse({ error: e.message })
  }
}

// Refactored
const setActiveAccountHiddenBlockchain = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { blockchain, state } = request

  try {
    const accountsController = new AccountsController()

    const result = await accountsController.setActiveAccountHiddenBlockchain(blockchain, state)

    if (result) sendResponse({ success: true })
    else {
      store.dispatch(snackbarActions.setError(`Error updating blockchain wallets visibility`))
      sendResponse({ success: false })
    }
  } catch (error) {
    store.dispatch(snackbarActions.setError(`Error updating blockchain ${blockchain} wallets visibility: ${error}`))
    console.log('setActiveAccountHiddenBlockchain: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setActiveAccountUnhideBlockchainWallets = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { blockchain, state } = request

  try {
    const accountsController = new AccountsController()

    const result = await accountsController.setActiveAccountUnhideBlockchainWallets(blockchain, state)

    if (result) sendResponse({ success: true })
    else {
      store.dispatch(snackbarActions.setError(`Error updating blockchain hidden wallets visibility`))
      sendResponse({ success: false })
    }
  } catch (error) {
    store.dispatch(
      snackbarActions.setError(`Error updating blockchain ${blockchain} hidden wallets visibility: ${error}`),
    )
    console.log('setActiveAccountUnhideBlockchainWallets: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setActiveAccountHiddenWallet = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { walletId, state } = request

  try {
    const walletController = new WalletController()

    const result = await walletController.setActiveAccountHiddenWallet(walletId, state)

    if (result) sendResponse({ success: true })
    else {
      store.dispatch(snackbarActions.setError(`Error updating wallet hidden status`))
      sendResponse({ success: false })
    }
  } catch (error) {
    store.dispatch(snackbarActions.setError(`Error updating wallet ${walletId} hidden status: ${error}`))
    console.log('setActiveAccountHiddenWallet: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const backupWalletDataOnRemote = async (request: any, sendResponse: any) => {
  const { walletId } = request
  const walletController = new WalletController()

  try {
    await walletController.backupWalletDataOnRemote(walletId)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('backupWalletDataOnRemote: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const addKnownHost = async (request: any, sendResponse: any) => {
  const { host } = request
  const knownHostsController = new KnownHostsController()

  try {
    await knownHostsController.addHost(host)

    sendResponse({ success: true })
  } catch (error: any) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('addKnownHost: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const deleteKnownHost = async (request: any, sendResponse: any) => {
  const { host } = request
  const knownHostsController = new KnownHostsController()

  try {
    await knownHostsController.deleteHost(host)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('deleteKnownHost: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const addKnownDestination = async (request: any, sendResponse: any) => {
  const { blockchain, address, name } = request
  const knownDestinationsController = new KnownDestinationsController()

  try {
    await knownDestinationsController.addNewDestination(blockchain, address, name)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('addKnownDestination: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const updateKnownDestinationName = async (request: any, sendResponse: any) => {
  const { blockchain, address, name } = request
  const knownDestinationsController = new KnownDestinationsController()

  try {
    await knownDestinationsController.updateDestination(blockchain, address, name)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('updateKnownDestinationName: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const deleteKnownDestination = async (request: any, sendResponse: any) => {
  const { blockchain, address } = request
  const knownDestinationsController = new KnownDestinationsController()

  try {
    await knownDestinationsController.deleteDestination(blockchain, address)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('deleteKnownDestination: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const addRequest = async (request: any, sendResponse: any) => {
  const { request: requestData } = request
  const requestsController = new RequestsController()

  try {
    await requestsController.addRequest(requestData)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('addRequest: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const removeRequest = async (request: any, sendResponse: any) => {
  const { requestMatcher } = request
  const requestsController = new RequestsController()

  try {
    await requestsController.removeRequest(requestMatcher)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('removeRequest: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const cancelAutoApproval = async (request: any, sendResponse: any) => {
  const { sessionId } = request
  const requestsController = new RequestsController()

  try {
    await requestsController.cancelAutoApproval(sessionId)

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('cancelAutoApproval: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const setBetaWarning = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.setBetaWarning()
    sendResponse({ success: true })
  } catch (error) {
    console.log('setBetaWarning: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setSnackBarMessage = async (messageType: any, request: any, sendResponse: any) => {
  const { message } = request
  try {
    const appController = new AppController()
    await appController.setSnackBarMessage(messageType, message)
    sendResponse({ success: true })
  } catch (error) {
    console.log('setSnackBarMessage: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const closeSnackBar = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.closeSnackBar()
    sendResponse({ success: true })
  } catch (error) {
    console.log('closeSnackBar: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setAppInitPath = async (request: any, sendResponse: any) => {
  const { path } = request
  try {
    const appController = new AppController()
    await appController.setAppInitPath(path)
    sendResponse({ success: true })
  } catch (error) {
    console.log('setAppInitPath: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const nukeAppData = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.nukeAppData()
    sendResponse({ success: true })
  } catch (error) {
    console.log('nukeAppData: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setCurrentStep = async (request: any, sendResponse: any) => {
  const { step } = request
  try {
    const appController = new AppController()
    await appController.setCurrentStep(step)
    sendResponse({ success: true })
  } catch (error) {
    console.log('setCurrentStep: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setPrevSteps = async (request: any, sendResponse: any) => {
  const { steps } = request
  try {
    const appController = new AppController()
    await appController.setPrevSteps(steps)
    sendResponse({ success: true })
  } catch (error) {
    console.log('setPrevSteps: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const setAppInitPassword = async (request: any, sendResponse: any) => {
  const { password } = request
  try {
    const appController = new AppController()
    await appController.setPassword(password)
    sendResponse({ success: true })

    console.log('saved password', password)
  } catch (error) {
    console.log('setAppInitPassword: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const nullifyAppInitState = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.nullifyAppInitState()
    sendResponse({ success: true })
  } catch (error) {
    console.log('nullifyAppInitState: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const clearSeed = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    await appController.clearSeed()
    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Can't generate new seed words: ${error}`))
    console.log('clearSeed: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const generateNewSeed = async (request: any, sendResponse: any) => {
  try {
    const appController = new AppController()
    const seedWords = await appController.generateNewSeed()
    sendResponse({ seedWords })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Can't generate new seed words: ${error}`))
    console.log('generateNewSeed: ', error)
    sendResponse(null)
  }
}

// Refactored
const setEnteredSeedWords = async (request: any, sendResponse: any) => {
  const { seedWords } = request

  try {
    const appController = new AppController()
    await appController.setEnteredSeedWords(seedWords)
    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Can't update entered seed words: ${error}`))
    console.log('setEnteredSeedWords: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const getActiveAccountHDPubKey = async (request: any, sendResponse: any) => {
  const { path } = request

  try {
    const accountsController = new AccountsController()

    const pubKey = await accountsController.getActiveAccountHDPubKey(path)

    sendResponse({ pubKey })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Can't get pubkey: ${error}`))
    console.log('getActiveAccountHDPubKey: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const switchToAccount = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { index } = request

  try {
    const accountsController = new AccountsController()

    const result = await accountsController.switchToAccount(index)

    if (result) sendResponse({ success: true })
    else {
      await store.dispatch(snackbarActions.setError(`Can't switch account`))
      sendResponse({ success: false })
    }
  } catch (error) {
    await store.dispatch(snackbarActions.setError(`Can't switch account: ${error}`))
    console.log('switchToAccount: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const deleteActiveAccount = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { password } = request

  try {
    const accountsController = new AccountsController()

    const result = await accountsController.deleteActiveAccount(password)

    if (result) sendResponse({ success: true })
    else {
      if (result == null) {
        await store.dispatch(snackbarActions.setError(`Password is incorrect`))
      } else {
        await store.dispatch(snackbarActions.setError(`Account was not deleted`))
      }
      sendResponse({ success: false })
    }
  } catch (error) {
    await store.dispatch(snackbarActions.setError(`Can't delete account: ${error}`))
    console.log('deleteActiveAccount: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const openImportWalletsInNewWindow = async (request: any, sendResponse: any) => {
  try {
    const requestsController = new RequestsController()
    await requestsController.openImportWalletsInNewWindow()

    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('openImportWalletsInNewWindow: ', error)
    sendResponse({ success: false })
  }
}

const closePopup = (request: any) => {
  if (request && request.id) {
    browser.windows.remove(request.id)
  } else {
    browser.windows.getCurrent().then((object: any) => {
      browser.windows.remove(object.id)
    })
  }
}

// Refactored
// UX ISSUE HERE: We should check public key if it is present and invalidate this request
// straight away if pub keys does not match
const requestPermission = async (request: any, sender: any) => {
  try {
    const requestsController = new RequestsController()
    await requestsController.openRequestWindow(request, sender)
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Request error: ${error.message}`))
    console.log('requestPermission: ', error)
  }
}

// (in progress) Refactored
// SECURITY ISSUE HERE: here we expect a message hash, however we don't validate what this hash is.
// Hence hacker may send us pretty much anything hash they want. We should fix this issue by
// Either making hash ourselves, checking its format, or partially preparing data for the hash.
const provideMessageHashSignatureOnRequestPermission = async (request: any, sendResponse: any) => {
  const { webPageRequest } = request
  const { messageHash } = webPageRequest.context // message in RequestDestination - token

  const requestsController = new RequestsController()

  try {
    const accountsController = new AccountsController()
    const [signature, pubKey] = await accountsController.signMessageHashByActiveUser(messageHash)

    const updatedContext = { signature, messageHash, pubKey }

    await requestsController.sendResponseToContentScript(webPageRequest, updatedContext)

    // Extension should now go into pending state which should expire in 30 seconds
    sendResponse({ pending: true })
  } catch (error) {
    const errorMessage = `Can't handle request. Error: ${error.message}`

    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Request error: ${error.message}`))
    await requestsController.sendErrorResponseToContentScript(webPageRequest, errorMessage)
    console.log('provideMessageHashSignatureOnRequestPermission: ', error)

    sendResponse({ error: error.message })
  }
}

// Refactored
const provideDestinationsSignaturesOnRequestPermission = async (request: any, sendResponse: any) => {
  const { webPageRequest } = request
  const { destinations } = webPageRequest.context

  const requestsController = new RequestsController()

  try {
    let responseWithSuccess = true
    const knownDestinationsController = new KnownDestinationsController()

    const updatedContext: any[] = []
    await Promise.all(
      destinations.map(async (destination: any) => {
        const signedDestination = { ...destination }
        const signature = await knownDestinationsController.signKnownDestination(
          destination.blockchain,
          destination.address,
        )
        if (signature) {
          signedDestination.signature = signature
          updatedContext.push(signedDestination)
        } else {
          responseWithSuccess = false
        }
      }),
    )

    setTimeout(async () => {
      if (responseWithSuccess) {
        await requestsController.sendResponseToContentScript(webPageRequest, updatedContext)
      } else {
        await requestsController.sendErrorResponseToContentScript(
          webPageRequest,
          'Destination signature was unsuccessful. Please try again.',
        )
      }
    }, 500)

    // Extension should now go into pending state which should expire in 30 seconds
    sendResponse({ success: true })
  } catch (error) {
    const errorMessage = `Can't handle request. Error: ${error.message}`

    const store = await getStore()
    await store.dispatch(snackbarActions.setError(errorMessage))
    await requestsController.sendErrorResponseToContentScript(webPageRequest, errorMessage)
    console.log('provideDestinationsSignaturesOnRequestPermission: ', error)

    sendResponse({ error: error.message })
  }
}

// (in progress) Refactored
const joinMultisigSessionAndProvideSignedAddress = async (request: any, sendResponse: any) => {
  const { webPageRequest, path } = request
  const { sessionId, pubKey } = webPageRequest.context

  const requestsController = new RequestsController()

  try {
    let responseWithSuccess = false
    let updatedContext: any = { sessionId, pubKey }

    const multisigController = new MultisigController()
    const response = await multisigController.joinSessionAndProvideSignedAddress(sessionId, path)

    if (response) {
      const [signature, addressWithBlockchain] = response
      updatedContext = { signature, message: addressWithBlockchain, ...updatedContext }
      responseWithSuccess = true
    }

    setTimeout(async () => {
      if (responseWithSuccess) {
        await requestsController.sendResponseToContentScript(webPageRequest, updatedContext)
      } else {
        await requestsController.sendErrorResponseToContentScript(
          webPageRequest,
          'Multisig session was unsuccessful. Please try again.',
        )
      }
    }, 500)

    // Cypher should now go into pending state which should expire in 30 seconds
    sendResponse({ success: true })
  } catch (error) {
    const errorMessage = `Can't handle request. Error: ${error.message}`

    const store = await getStore()
    await store.dispatch(snackbarActions.setError(errorMessage))
    await requestsController.sendErrorResponseToContentScript(webPageRequest, errorMessage)
    console.log('joinMultisigSessionAndProvideSignedAddress: ', error)

    sendResponse({ error: error.message })
  }
}

// Refactored
const requestPermissionResponseEcho = async () => {
  try {
    const requestsController = new RequestsController()
    await requestsController.cleanupCurrentWebPageRequest()
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(`Request error: ${error.message}`))
    console.log('requestPermissionResponseEcho: ', error)
  }
}

// Refactored
const provideErrorOnRequestPermission = async (request: any) => {
  const { webPageRequest, error } = request

  try {
    const requestsController = new RequestsController()

    await requestsController.sendErrorResponseToContentScript(webPageRequest, error)
  } catch (e) {
    console.log('provideErrorOnRequestPermission: ', e)
  }
}

// Refactored
const exportSelectedWallets = async (request: any, sendResponse: any) => {
  const { walletIds } = request

  const walletController = new WalletController()

  try {
    const walletsDataEncrypted = await walletController.exportWalletsData(walletIds)

    sendResponse({ walletsDataEncrypted })
  } catch (error) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(error.message))
    console.log('exportSelectedWallets: ', error)
    sendResponse({ error })
  }
}

// Refactored
const importWalletsFromFile = async (request: any, sendResponse: any) => {
  const { walletsDataEncrypted } = request

  const walletController = new WalletController()

  try {
    const walletsImportResults = await walletController.importWalletData(walletsDataEncrypted)

    sendResponse({ walletsImportResults })
  } catch (e) {
    const store = await getStore()
    await store.dispatch(snackbarActions.setError(e.message))
    console.log('importWalletsFromFile: ', e)
    sendResponse({ error: e })
  }
}

// Refactored
const updateCurrencyRates = async () => {
  try {
    // TODO Perhaps we should only update fees when user is logged in
    const currencyRatesController = new CurrencyRatesController()
    await currencyRatesController.updateRates()
  } catch (error) {
    console.log(`Failed to update currency rates: ${error}`)
  }
}

// Refactored
const syncCurrencyRates = async () => {
  try {
    // TODO Perhaps we should only update fees when user is logged in
    const currencyRatesController = new CurrencyRatesController()
    await currencyRatesController.syncRates()
  } catch (error) {
    console.log(`Failed to update currency rates: ${error}`)
  }
}

// Refactored
const getSeedPhrase = async (request: any, sendResponse: any) => {
  const store = await getStore()
  const { password } = request

  try {
    const accountsController = new AccountsController()

    const seedWords = await accountsController.getSeedPhrase(password)

    if (seedWords) sendResponse({ seed: seedWords })
    else {
      store.dispatch(snackbarActions.setError('Password is incorrect'))
      sendResponse({ error: 'Password is incorrect' })
    }
  } catch (error) {
    store.dispatch(snackbarActions.setError(`Something went wrong: ${error.message}`))
    console.log('getSeedPhrase: ', error)
    sendResponse({ error: error.message })
  }
}

// Refactored
const updateSettings = async (request: any, sendResponse: any) => {
  const { newSettings } = request

  try {
    const settingsController = new SettingsController()
    await settingsController.updateSettings(newSettings)
    sendResponse({ success: true })
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong while updating settings`))
    console.log('updateSettings: ', error)
    sendResponse({ success: false })
  }
}

// Refactored
const syncActivitiesWithServer = async () => {
  try {
    const activitiesController = new ActivitiesController()
    await activitiesController.syncWithRemote()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong while pushing syncing activities to server`))
    console.log(`Something went wrong while pushing syncing activities to server: ${error}`)
  }
}

// Refactored
const monitorGroupTransactionRequests = async () => {
  try {
    const transactionSessionsController = new TransactionSessionsController()
    await transactionSessionsController.fetchFromServer()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong. Referrer to console for details.`))
    console.log(`Something went wrong while pushing syncing activities to server: ${error}`)
  }
}

// Refactored
const syncWalletBackupsWithRemote = async () => {
  try {
    const walletController = new WalletController()
    await walletController.syncWalletBackupsWithRemote()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong. Referrer to console for details.`))
    console.log(`Something went wrong while monitoring wallet backups: ${error}`)
  }
}

// Refactored
const pingRemoteIAmOnline = async () => {
  try {
    const accountsController = new AccountsController()
    await accountsController.pingRemoteIAmOnline()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Can't ping remote servers. Referrer to console for details.`))
    console.trace(`Something went wrong while notifying remote about online presence: ${error}`)
  }
}

// Refactored
const executeAutoApprovalRequests = async () => {
  try {
    const transactionSessionsController = new TransactionSessionsController()
    await transactionSessionsController.executeAutoApprovals()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong. Referrer to console for details.`))
    console.log(`Something went wrong while executing autoapprovals: ${error}`)
  }
}

// Refactored
const cleanupExpiredGroupTransactionRequests = async () => {
  try {
    const transactionSessionsController = new TransactionSessionsController()
    await transactionSessionsController.cleanupExpiredGroupTransactions()
  } catch (error) {
    const store = await getStore()
    store.dispatch(snackbarActions.setError(`Something went wrong. Referrer to console for details.`))
    console.log(`Something went wrong while cleaning expired transaction requests: ${error}`)
  }
}

// =====================Event handlers END===========================;
// [REFACTORING] Extract this code to external class, that initialized all related handlers
browser.alarms.onAlarm.addListener(async (alarmData) => {
  // const startedAt = Date.now();

  // Dirty bug. Some Chrome versions seems to execute some alarms twice, at the same millisecond.
  // We can't control this condition. However we can wait a random time before the execution.
  // And then set a lock on one alarm and drop the other
  const waitMillis = parseInt((Math.random() * 1000).toString())
  await new Promise((r) => setTimeout(r, waitMillis)) // wait a bit before next check

  const handlersDB = new HandlersDB()
  const handlers = await handlersDB.getHandlers()

  // Another chrome bug is so that sometimes chrome storage updates may happen with 10ms difference
  // and this may overwrite other changes, because they are in different thread
  if (handlers[alarmData.name] && handlers[alarmData.name] > Date.now()) {
    // console.log(`${waitMillis}: Alarm ignored: ${alarmData.name}. Happened at: ${(new Date).toLocaleTimeString()}`);
    return true
  }

  // console.log(`${waitMillis}: Alarm called: ${alarmData.name}. Happened at: ${(new Date).toLocaleTimeString()}`);
  // console.log("Current alarms");
  // const allAlarms = await browser.alarms.getAll();
  // console.log(allAlarms);

  const [functionName, functionParam1, functionParam2] = alarmData.name.split(':')
  switch (functionName) {
    case 'getWalletsBalances':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await getWalletsBalances({ recurrentUpdateWithFastForward: true }, false)
      break
    case 'resolveMultisigSession': // tested and working
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 10000 - waitMillis }) // 10 seconds lock
      await waitForSync()

      await resolveMultisigSession(alarmData, functionParam1)
      break
    case 'resolveTransactionSession': // tested and working
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 10000 - waitMillis }) // 10 seconds lock
      await waitForSync()

      await resolveTransactionSession(alarmData, functionParam1, functionParam2)
      break
    // case 'asyncTransactionSignatureFinish':
    //   await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: (10000 - waitMillis) }); // 10 seconds lock
    //   await waitForSync();

    //   await asyncTransactionSignatureFinish(alarmData, functionParam1, functionParam2);
    //   break;
    case 'expireActiveAccountSubscription':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 10 seconds lock
      await waitForSync()

      await expireActiveAccountSubscription(alarmData)
      break
    case 'monitorSubscriptionPaymentSession': // tested and working
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 10 seconds lock
      await waitForSync()

      await monitorSubscriptionPaymentSession(alarmData, functionParam1)
      break
    case 'updateCurrencyRates':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await updateCurrencyRates()
      break
    case 'syncActivitiesWithServer':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await syncActivitiesWithServer()
      break
    case 'monitorGroupTransactionRequests':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 50000 - waitMillis }) // 50 seconds lock
      await waitForSync()

      await monitorGroupTransactionRequests()
      break
    case 'cleanupExpiredGroupTransactionRequests':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await cleanupExpiredGroupTransactionRequests()
      break
    case 'executeAutoApprovalRequests':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await executeAutoApprovalRequests()
      break
    case 'syncWalletBackupsWithRemote':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await syncWalletBackupsWithRemote()
      break
    case 'pingRemoteIAmOnline':
      await handlersDB.addHandler({ handlerName: alarmData.name, lockFor: 60000 - waitMillis }) // 1 minute lock
      await waitForSync()

      await pingRemoteIAmOnline()
      break
    default:
      break
  }

  // Wait 1 second just to be sure that if there is a second call pending,
  // it is makes a check and goes to ignoring, in case first execution started
  // early and was very quick
  await new Promise((r) => setTimeout(r, 1000))

  // console.log(`${waitMillis}: Alarm finished: ${alarmData.name}. Happened at: ${(new Date).toLocaleTimeString()}. Time took: ${Date.now() - startedAt}`);
  await handlersDB.removeHandler({ handlerName: alarmData.name })
  await waitForSync()

  return true
})

// async function initController() {
// [REFACTORING] Extract this code to external class, that initialized all related handlers
browser.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
  let sessionId, alarmName, alarmData, broadcast

  switch (request.func) {
    // App init
    case 'generateNewSeed':
      generateNewSeed(request, sendResponse)
      return true
    case 'setEnteredSeedWords':
      setEnteredSeedWords(request, sendResponse)
      return true
    case 'importSeed':
      importSeed(request, sendResponse)
      return true
    case 'syncAccountDataOnImport':
      syncAccountDataOnImport(request, sendResponse)
      return true
    case 'syncActiveAccountData':
      syncActiveAccountData(request, sendResponse)
      return true
    case 'clearSeed':
      clearSeed(request, sendResponse)
      return true
    case 'setAppInitPath':
      setAppInitPath(request, sendResponse)
      return true
    case 'setCurrentStep':
      setCurrentStep(request, sendResponse)
      return true
    case 'setPrevSteps':
      setPrevSteps(request, sendResponse)
      return true
    case 'setAppInitPassword':
      setAppInitPassword(request, sendResponse)
      return true
    case 'nullifyAppInitState':
      nullifyAppInitState(request, sendResponse)
      return true
    case 'nukeAppData':
      nukeAppData(request, sendResponse)
      return true

    // Wallet
    case 'unlockApp': // tested and working
      unlockApp(request, sendResponse)
      return true // tested and working
    case 'lockApp':
      lockApp(sendResponse)
      return true // tested and working
    case 'appClearState':
      appClearState(sendResponse)
      return true // tested and working
    case 'openImportWalletsInNewWindow':
      openImportWalletsInNewWindow(request, sendResponse)
      return true // tested and working
    case 'closePopup':
      closePopup(request)
      break

    // Account
    case 'getActiveAccountHDPubKey':
      getActiveAccountHDPubKey(request, sendResponse)
      return true
    case 'getSeedPhrase':
      getSeedPhrase(request, sendResponse)
      return true
    case 'switchToAccount':
      switchToAccount(request, sendResponse)
      return true
    case 'updateActiveAccountName':
      updateActiveAccountName(request, sendResponse)
      return true
    case 'deleteActiveAccount':
      deleteActiveAccount(request, sendResponse)
      return true

    // MULTISIG SESSIONS
    case 'initMultisigSession':
      initMultisigSession(request, sendResponse)
      return true
    case 'getMultisigSessionData':
      getMultisigSessionData(request, sendResponse)
      return true
    case 'joinMultisigSession':
      joinMultisigSession(request, sendResponse)
      return true
    case 'rejectMultisigSession':
      rejectMultisigSession(request, sendResponse)
      return true
    case 'resolveMultisigSession':
      sessionId = request.sessionId
      alarmName = `resolveMultisigSession:${sessionId}`
      alarmData = { name: alarmName, scheduledTime: +Date.now() }
      resolveMultisigSession(alarmData, sessionId)
      break

    // WALLET API
    case 'getCurrentAccountSubscriptionData':
      getCurrentAccountSubscriptionData(request, sendResponse)
      return true // hold channel open until send response
    case 'getPendingSubscriptionPayments':
      getPendingSubscriptionPayments(request, sendResponse)
      return true // hold channel open until send response
    case 'getSubscriptionPaymentPlans':
      getSubscriptionPaymentPlans(request, sendResponse)
      return true // hold channel open until send response
    case 'getSubscriptionPaymentPeriods':
      getSubscriptionPaymentPeriods(request, sendResponse)
      return true // hold channel open until send response
    case 'getSubscriptionPaymentMethods':
      getSubscriptionPaymentMethods(request, sendResponse)
      return true // hold channel open until send response
    case 'initSubscriptionPayment':
      initSubscriptionPayment(request, sendResponse)
      return true // hold channel open until send response
    case 'getWalletData':
      getWalletData(request, sendResponse)
      return true
    case 'getWalletMetaInfo':
      getWalletMetaInfo(request, sendResponse)
      return true
    case 'getBlockchainMetaInfo':
      getBlockchainMetaInfo(request, sendResponse)
      return true
    case 'getAdapterMetaInfo':
      getAdapterMetaInfo(request, sendResponse)
      return true // hold channel open until send response
    case 'updateWalletBalances':
      updateWalletBalances(request, sendResponse)
      return true
    case 'getAvailableERC721':
      getAvailableERC721(request, sendResponse)
      return true
    case 'getWalletsBalances':
      getWalletsBalances(request, sendResponse)
      return true
    case 'fetchAssetData':
      fetchAssetData(request, sendResponse)
      return true
    case 'addAssetToWallet':
      addAssetToWallet(request, sendResponse)
      return true
    case 'exportSelectedWallets':
      exportSelectedWallets(request, sendResponse)
      return true
    case 'importWalletsFromFile':
      importWalletsFromFile(request, sendResponse)
      return true
    case 'updateWalletName':
      updateWalletName(request, sendResponse)
      return true
    case 'setActiveAccountHiddenBlockchain':
      setActiveAccountHiddenBlockchain(request, sendResponse)
      return true
    case 'setActiveAccountUnhideBlockchainWallets':
      setActiveAccountUnhideBlockchainWallets(request, sendResponse)
      return true
    case 'setActiveAccountHiddenWallet':
      setActiveAccountHiddenWallet(request, sendResponse)
      return true
    case 'backupWalletDataOnRemote':
      backupWalletDataOnRemote(request, sendResponse)
      return true

    // GROUP TRANSACTIONS
    case 'estimateTransactionFee':
      estimateTransactionFee(request, sendResponse)
      return true
    case 'initTransaction':
      initTransaction(request, sendResponse)
      return true
    case 'initSignRawMessage':
      initSignRawMessage(request, sendResponse)
      return true
    case 'getEncryptionPublicKey':
      // [FIXME] Shall we leave this methods
      getEncryptionPublicKey(request, sendResponse)
      return true
    case 'decryptDappMessage':
      // [FIXME] Shall we leave this methods
      decryptDappMessage(request, sendResponse)
      return true
    case 'initDappTransaction':
      initDappTransaction(request, sendResponse)
      return true
    case 'joinTransactionSession':
      joinTransactionSession(request, sendResponse)
      return true
    case 'rejectTransactionSession':
      rejectTransactionSession(request, sendResponse)
      return true
    case 'removeWalletRequest':
      removeWalletRequest(request, sendResponse)
      return true
    case 'resolveTransactionSession':
      sessionId = request.sessionId
      broadcast = request.broadcast
      alarmName = `resolveTransactionSession:${sessionId}:${broadcast}`
      alarmData = { name: alarmName, scheduledTime: +Date.now() }
      resolveTransactionSession(alarmData, sessionId, broadcast)
      break

    // PERMISSIONS
    case 'requestPermission':
      requestPermission(request, sender)
      break
    case 'provideMessageHashSignatureOnRequestPermission':
      provideMessageHashSignatureOnRequestPermission(request, sendResponse)
      return true
    case 'provideDestinationsSignaturesOnRequestPermission':
      provideDestinationsSignaturesOnRequestPermission(request, sendResponse)
      return true
    case 'joinMultisigSessionAndProvideSignedAddress':
      joinMultisigSessionAndProvideSignedAddress(request, sendResponse)
      return true
    case 'provideErrorOnRequestPermission':
      provideErrorOnRequestPermission(request)
      break
    case 'requestPermissionResponseEcho':
      requestPermissionResponseEcho()
      break

    // OTHER
    case 'addKnownHost':
      addKnownHost(request, sendResponse)
      return true
    case 'deleteKnownHost':
      deleteKnownHost(request, sendResponse)
      return true
    case 'addKnownDestination':
      addKnownDestination(request, sendResponse)
      return true
    case 'updateKnownDestinationName':
      updateKnownDestinationName(request, sendResponse)
      return true
    case 'deleteKnownDestination':
      deleteKnownDestination(request, sendResponse)
      return true
    case 'addRequest':
      addRequest(request, sendResponse)
      return true
    case 'removeRequest':
      removeRequest(request, sendResponse)
      return true
    case 'cancelAutoApproval':
      cancelAutoApproval(request, sendResponse)
      return true
    case 'setBetaWarning':
      setBetaWarning(request, sendResponse)
      return true
    case 'setSnackBarWarning':
      setSnackBarMessage('warning', request, sendResponse)
      return true
    case 'setSnackBarError':
      setSnackBarMessage('error', request, sendResponse)
      return true
    case 'setSnackBarSuccess':
      setSnackBarMessage('success', request, sendResponse)
      return true
    case 'closeSnackBar':
      closeSnackBar(request, sendResponse)
      return true

    // ALERTS CALLED FROM UI FOR ASYNC EXECUTION
    case 'updateSettings':
      updateSettings(request, sendResponse)
      return true
    case 'syncWalletBackupsWithRemote':
      syncWalletBackupsWithRemote()
      break
    case 'syncActivitiesWithServer':
      syncActivitiesWithServer()
      break
    case 'syncCurrencyRates':
      syncCurrencyRates()
      break
    case 'monitorGroupTransactionRequests':
      monitorGroupTransactionRequests()
      break
    case 'executeAutoApprovalRequests':
      executeAutoApprovalRequests()
      break
    case 'cleanupExpiredGroupTransactionRequests':
      cleanupExpiredGroupTransactionRequests()
      break
    case 'pingRemoteIAmOnline':
      pingRemoteIAmOnline()
      break

    // case 'printLog':
    //   const { log } = request;
    //   console.log(log);
    //   break;
    default:
      break
  }

  return true
})
// }

async function nullifyState() {
  const store = await getStore()
  await store.dispatch(snackbarActions.closeSnackBar())

  await AccountsController.cleanUp()
}

async function initApplication() {
  const dataMigrated = await migrator()

  if (dataMigrated) console.log('Data was migrated')

  await nullifyState()
  await initFirstAccountIfMissing()
}

// On first install
browser.runtime.onInstalled.addListener(async () => await initApplication())

// On browser open
browser.runtime.onStartup.addListener(async () => await initApplication())

const rpcManager = new RpcManager()
export const getRpcManager = () => rpcManager

// We inject inpage into opened browser tab
// We switch to this approach since we have to overright metamask default Ethereum provider
// With the previous approach we could not do this
browser.scripting
  .getRegisteredContentScripts({
    ids: [CHANNELS.PAGE],
  })
  .then((r: any) => {
    if (r.length === 0)
      browser.scripting
        .registerContentScripts([
          {
            id: CHANNELS.PAGE,
            matches: ['file://*/*', 'http://*/*', 'https://*/*'],
            js: ['inpage.js'],
            runAt: 'document_start',
            // @ts-ignore
            world: 'MAIN',
          },
        ])
        .then((res: any) => {
          logger.info('EXTENSION was injected', res)
        })
        .catch((err: any) => {
          logger.info('EXTENSION has an error with injection', err)
        })
  })
