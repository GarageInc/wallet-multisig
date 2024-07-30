import Browser from 'webextension-polyfill'

import Browser from 'webextension-polyfill'

import Account from '../models/Account'
import TransactionSession from '../models/TransactionSession'
import Wallet from '../models/Wallet'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as walletRequestsReducer from '../store/reducers/walletRequestsReducer'
import { AppState, getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'
import AccountsController from './AccountsController'
import { IAlarmData } from './MultisigController'
import NotifierController from './NotifierController'

class TransactionSessionsController {
  // Refactored
  async fetchFromServerOnce(executeImmediately = false) {
    try {
      const appUnlocked = await AccountsController.isUnlocked()
      if (!appUnlocked) return false

      const account = await Account.getActiveAccount()
      await TransactionSession.fetchTransactionsSessionsFromServer(account, executeImmediately)
    } catch (e) {
      // handle error on connection
      console.log(`Fetch requests from server error: ${e}`)
    }

    return true
  }

  // Refactored
  async fetchFromServer() {
    const roundTimeMilli = 10000
    const totalDurationMilli = 60000
    const rounds = totalDurationMilli / roundTimeMilli - 1 // next alarm will be executed after

    const timeoutAt = +Date.now() + rounds * roundTimeMilli
    let roundStartAt,
      nextRoundInMilli = 0
    let i = 0

    // give 1 second tolerance to time, to avoid accidental boundary conditions
    while (Date.now() < timeoutAt + 1000) {
      roundStartAt = +Date.now()

      await this.fetchFromServerOnce()

      if (i++ >= rounds) return false

      nextRoundInMilli = roundTimeMilli - (+Date.now() - roundStartAt)
      await new Promise((r) => setTimeout(r, nextRoundInMilli)) // wait a bit before next check
    }

    return false
  }

  // Refactored
  async joinSession(walletId: string, sessionId: string) {
    const wallet = new Wallet(walletId)
    const transactionSession = new TransactionSession(wallet, sessionId)
    return await transactionSession.joinSession()
  }

  // Refactored
  async rejectSession(alarmData: IAlarmData, sessionId: string, status = 'failed') {
    const store = await getStore()
    const { walletRequests, application }: AppState = await store.getState()
    const session = walletRequests.requestsList.find((request) => request.sessionId == sessionId)

    if (session) {
      const wallet = new Wallet(session.walletId)
      const transactionSession = new TransactionSession(wallet, sessionId)
      const transactionSessionData = await transactionSession.getSessionData()
      const partyHasJoined = transactionSessionData.partiesState.find(
        (partyState: any) => partyState.accountPubKey == application.activeAccountPubkey,
      )
      if (!partyHasJoined) await transactionSession.joinSession()
      await transactionSession.rejectSession(status)
      if (status == 'failed') {
        NotifierController.create('Transaction', 'Transaction has failed')
      } else {
        NotifierController.create('Transaction', 'Transaction was rejected')
      }
    } else {
      Browser.alarms.clear(alarmData.name)
    }

    return { sessionId }
  }

  // Refactored
  async resolveSession(alarmData: IAlarmData, sessionId: string, broadcast: boolean) {
    const store = await getStore()
    const { walletRequests }: AppState = store.getState()
    const session = walletRequests.requestsList.find((request) => request.sessionId == sessionId)
    const isSessionExpired = !session?.expiresAt || Date.now() > session.expiresAt

    if (!isSessionExpired) {
      // TODO Handle exception with try/catch

      const wallet = new Wallet(session.walletId)
      const transactionSession = new TransactionSession(wallet, sessionId)
      const participantsJoined = await transactionSession.awaitParticipants()

      if (participantsJoined) {
        const result = await transactionSession.resolveSession(broadcast)

        if (result?.transactionId) {
          NotifierController.create('Transaction', 'Transaction is successful.')
          return true
        }
      }

      return false
    }

    await this.rejectSession(alarmData, sessionId, 'failed')
    return false
  }

  // Refactored
  async removeRequest(requestMatcher: any) {
    const store = await getStore()
    await store.dispatch(walletRequestsReducer.removeRequest(requestMatcher))
    await store.dispatch(badgeReducer.updateBadge(-1))
    await waitForSync()
  }

  // (in progress) Refactored
  async executeAutoApprovals() {
    const roundTimeMilli = 3000
    const totalDurationMilli = 60000
    const rounds = totalDurationMilli / roundTimeMilli - 1 // next alert will be executed after

    const timeoutAt = +Date.now() + rounds * roundTimeMilli
    let roundStartAt,
      nextRoundInMilli = 0
    let i = 0

    // give 1 second tolerance to time, to avoid accidental boundary conditions
    while (Date.now() < timeoutAt + 1000) {
      roundStartAt = +Date.now()

      const applicationUnlocked = await AccountsController.isUnlocked()
      if (!applicationUnlocked) return

      try {
        await TransactionSession.executeAutoApprovals()
      } catch (e) {
        // handle error on connection
        console.log('executeAutoApprovals error: ', e)
      }

      if (i++ >= rounds) return false

      nextRoundInMilli = roundTimeMilli - (+Date.now() - roundStartAt)
      await new Promise((r) => setTimeout(r, nextRoundInMilli)) // wait a bit before next iteration
    }

    return true
  }

  // (in progress) Refactored
  async cleanupExpiredGroupTransactions() {
    const timeoutAt = Date.now() + 40000 // wait 60 seconds and then new alarm is fired

    while (Date.now() < timeoutAt) {
      const applicationUnlocked = await AccountsController.isUnlocked()
      if (!applicationUnlocked) return

      try {
        return await TransactionSession.cleanupExpiredTransactionRequests()
      } catch {
        // handle error on connection
      }

      await new Promise((r) => setTimeout(r, 20000)) // wait a bit before next check
    }
  }
}
export default TransactionSessionsController
