import browser from 'webextension-polyfill'

import SubscriptionsDB from '../../db/SubscriptionsDB'
import NotifierController from '../controllers/NotifierController'
import * as subscriptionReducer from '../store/reducers/subscriptionReducer'
import { getStore } from '../store/store'
import { getSubscriptionApi } from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'

class Subscription {
  async setActiveAccountSubscription(forceUpdate = false) {
    const accountPubKey = await Account.getActiveAccountPubKey()
    const { plan, expiresAt, limits, consumed } = await this.getAccountSubscriptionData(accountPubKey, forceUpdate)

    const store = await getStore()
    await store.dispatch(subscriptionReducer.updateSubscription({ plan, expiresAt, limits, consumed }))
    await waitForSync()

    return true
  }

  async expireActiveAccountSubscription() {
    const accountPubKey = await Account.getActiveAccountPubKey()
    const { plan, expiresAt, limits, consumed } = await this.getAccountSubscriptionData(accountPubKey)

    if (plan == 'FREE' || expiresAt < Date.now()) {
      const store = await getStore()
      await store.dispatch(subscriptionReducer.updateSubscription({ plan, expiresAt, limits, consumed }))
      await waitForSync()

      return true
    }

    return false
  }

  async updateAlarmsToExpireActiveAccountSubscription() {
    const accountPubKey = await Account.getActiveAccountPubKey()
    const subscriptionData = await this.getAccountSubscriptionData(accountPubKey)

    await browser.alarms.clear(`expireActiveAccountSubscription`)

    if (subscriptionData && subscriptionData.plan !== 'FREE') {
      const tenMinutes = 10 * 60 * 1000
      await browser.alarms.create(`expireActiveAccountSubscription`, {
        when: subscriptionData.expiresAt + tenMinutes,
      })
    }

    return true
  }

  async getAccountSubscriptionData(accountPubKey: string, forceUpdate = false) {
    const subscriptionDB = new SubscriptionsDB()
    const accountSubscription = await subscriptionDB.getAccountSubscription(accountPubKey)

    // Check if subscription last fetched at is not present or more than 5 min old
    const updateFromServer =
      !accountSubscription.lastFetchedAt || Date.now() - accountSubscription.lastFetchedAt > 1000 * 60 * 5
    if (!accountSubscription || updateFromServer || forceUpdate) {
      const newSubscriptionData = await this._fetchAccountSubscriptionData(accountPubKey)
      await subscriptionDB.updateAccountSubscriptionData(accountPubKey, newSubscriptionData)
      await waitForSync()

      return newSubscriptionData
    }

    return accountSubscription.data
  }

  async syncActiveAccountSubscription() {
    const accountPubKey = await Account.getActiveAccountPubKey()

    const fetchedSubscriptionData = await this._fetchAccountSubscriptionData(accountPubKey)

    const subscriptionDB = new SubscriptionsDB()
    const recorderSubscriptionDataWithMetaData = await subscriptionDB.getAccountSubscription(accountPubKey)
    let oldSubscriptionData

    if (recorderSubscriptionDataWithMetaData) {
      oldSubscriptionData = recorderSubscriptionDataWithMetaData.data
    } else {
      oldSubscriptionData = fetchedSubscriptionData
    }

    await subscriptionDB.updateAccountSubscriptionData(accountPubKey, fetchedSubscriptionData)
    await waitForSync()

    const oldPlan = oldSubscriptionData.plan
    const newPlan = fetchedSubscriptionData.plan

    if (oldPlan !== newPlan) {
      if (oldPlan == 'FREE') NotifierController.create('Subscription', 'Premium subscription has been activated')
      if (newPlan == 'FREE')
        NotifierController.create(
          'Subscription',
          'Premium subscription expired. Upgrade to get access to premium features',
        )
    }
  }

  async _fetchAccountSubscriptionData(accountPubKey: string) {
    const requestBody = '/v1/subscriptions/get_subscription'
    const account = await Account.findByPubKey(accountPubKey)
    if (!account) {
      return Error(`No active account`)
    }
    const authHeaders = await account.authHeaders(requestBody)

    const response = await getSubscriptionApi(authHeaders)
    if (response.status !== 200) {
      throw new Error(`Remote responded with error: ${response.error}`)
    }

    return response.body
  }
}

export default Subscription
