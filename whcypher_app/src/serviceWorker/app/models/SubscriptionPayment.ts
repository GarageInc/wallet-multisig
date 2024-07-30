import browser from 'webextension-polyfill'

import SubscriptionPaymentsDB from '../../db/SubscriptionPaymentsDB'
import {
  getSubscriptionPaymentApi,
  getSubscriptionPaymentMethodsApi,
  getSubscriptionPaymentPeriodsApi,
  getSubscriptionPaymentPlansApi,
  getSubscriptionPaymentsApi,
  initSubscriptionPaymentApi,
} from '../utils/api'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000

class SubscriptionPayment {
  subscriptionPaymentId: string

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(subscriptionPaymentId: string) {
    this.subscriptionPaymentId = subscriptionPaymentId
  }

  static async setAlarmsForPendingSubscriptionPayments() {
    await this.unsetAlarmsForPendingSubscriptionPayments()

    const subscriptionPayments = await this.getAccountSubscriptionPayments()
    subscriptionPayments.forEach((subscriptionPayment) => subscriptionPayment.setMonitoring())
  }

  static async unsetAlarmsForPendingSubscriptionPayments() {
    const allAlarms = await browser.alarms.getAll()
    allAlarms.forEach(async (alarmData) => {
      const [functionName] = alarmData.name.split(':')
      if (functionName == 'monitorSubscriptionPaymentSession') {
        await browser.alarms.clear(alarmData.name)
      }
    })
  }

  static async getPendingSubscriptionPayments() {
    const pendingSubscriptionPayments = await this._fetchPendingSubscriptionPayments()
    return pendingSubscriptionPayments
  }

  static async getAccountSubscriptionPayments() {
    const accountPubKey = await Account.getActiveAccountPubKey()

    const subscriptionPaymentDB = new SubscriptionPaymentsDB()
    const subscriptionPaymentsData = await subscriptionPaymentDB.getSubscriptionPaymentsByAccountPubKey(accountPubKey)

    const subscriptionPayments = Object.keys(subscriptionPaymentsData).map(
      (subscriptionPaymentId) => new SubscriptionPayment(subscriptionPaymentId),
    )

    return subscriptionPayments
  }

  static async getPaymentPlans() {
    const subscriptionPaymentDB = new SubscriptionPaymentsDB()
    const subscriptionPaymentPlans = await subscriptionPaymentDB.getSubscriptionPaymentPlans()

    // Check if subscription last fetched at is not present or more than 24 hours old
    const cashTooOld =
      !subscriptionPaymentPlans.lastFetchedAt ||
      Date.now() - subscriptionPaymentPlans.lastFetchedAt > 1000 * 60 * 60 * 24
    if (cashTooOld || subscriptionPaymentPlans.paymentPlans.length == 0) {
      const newSubscriptionPaymentPlans = await this._fetchSubscriptionPaymentPlans()
      await subscriptionPaymentDB.updateSubscriptionPaymentPlans(newSubscriptionPaymentPlans)
      await waitForSync()

      return newSubscriptionPaymentPlans
    }

    return subscriptionPaymentPlans.paymentPlans
  }

  static async getPaymentPeriods(subscriptionPlan: any, referralCode: any) {
    return await this._fetchSubscriptionPaymentPeriods(subscriptionPlan, referralCode)
  }

  static async getPaymentMethods(subscriptionPlan: any, referralCode: any, paymentPeriod: any) {
    return await this._fetchSubscriptionPaymentMethods(subscriptionPlan, referralCode, paymentPeriod)
  }

  static async initSubscriptionPayment(
    subscriptionPlan: any,
    referralCode: any,
    paymentPeriod: any,
    paymentMethod: any,
  ) {
    const initPaymentSessionData = await this._initSubscriptionPayment(
      subscriptionPlan,
      referralCode,
      paymentPeriod,
      paymentMethod,
    )
    let subscriptionPayment: SubscriptionPayment | null = null

    if (initPaymentSessionData.sessionId) {
      const accountPubKey = await Account.getActiveAccountPubKey()

      const subscriptionPaymentDB = new SubscriptionPaymentsDB()
      await subscriptionPaymentDB.appendSubscriptionPayment(accountPubKey, initPaymentSessionData.sessionId)

      subscriptionPayment = new SubscriptionPayment(initPaymentSessionData.sessionId)
      await subscriptionPayment.setMonitoring()
    }

    return initPaymentSessionData
  }

  async setMonitoring() {
    await browser.alarms.create(`monitorSubscriptionPaymentSession:${this.subscriptionPaymentId}`, {
      periodInMinutes: 1,
    })
  }

  async unsetMonitoring() {
    await browser.alarms.clear(`monitorSubscriptionPaymentSession:${this.subscriptionPaymentId}`)
  }

  async fetchPaymentSessionData() {
    const paymentSessionData = await this._fetchPaymentSessionData(this.subscriptionPaymentId)
    await this._updateRetryCount()
    return paymentSessionData
  }

  async _updateRetryCount() {
    const subscriptionPaymentDB = new SubscriptionPaymentsDB()
    return await subscriptionPaymentDB.updateSubscriptionPaymentOnRetryCount(this.subscriptionPaymentId)
  }

  async hasExpired() {
    const subscriptionPaymentDB = new SubscriptionPaymentsDB()
    const subscriptionPaymentData = await subscriptionPaymentDB.getSubscriptionPaymentByPaymentId(
      this.subscriptionPaymentId,
    )

    if (subscriptionPaymentData) {
      const { firstFetchedAt } = subscriptionPaymentData

      const timeSinceFirstFetchInMilliseconds = Date.now() - firstFetchedAt

      return timeSinceFirstFetchInMilliseconds > ONE_HOUR_IN_MILLISECONDS
    } else {
      return false
    }
  }

  async remove() {
    await this.unsetMonitoring()

    const subscriptionPaymentDB = new SubscriptionPaymentsDB()
    await subscriptionPaymentDB.removeSubscriptionPaymentByPaymentId(this.subscriptionPaymentId)
    return true
  }

  async _fetchPaymentSessionData(sessionId: string) {
    const requestBody = JSON.stringify({
      sessionId,
    })
    const authHeaders = await Account.getAuthHeadersForActiveAccount(requestBody)

    const response = await getSubscriptionPaymentApi(requestBody, authHeaders)
    if (response.status !== 200) {
      throw new Error(`Failed to initialize payment: ${response.error}`)
    }

    return response.body
  }

  static async _fetchPendingSubscriptionPayments() {
    const requestBody = JSON.stringify({
      status: 'pending',
    })
    const authHeaders = await Account.getAuthHeadersForActiveAccount(requestBody)
    const response = await getSubscriptionPaymentsApi(requestBody, authHeaders)
    if (response.status !== 200) {
      throw new Error(`Failed to initialize payment: ${response.error}`)
    }
    return response.body
  }

  static async _fetchSubscriptionPaymentPlans() {
    const response = await getSubscriptionPaymentPlansApi()
    if (response.status !== 200) {
      throw new Error(`Remote responded with error: ${response.error}`)
    }

    return response.body
  }

  static async _fetchSubscriptionPaymentPeriods(plan: any, referralCode: any) {
    const requestBody = JSON.stringify({
      plan,
      referralCode,
    })
    const authHeaders = await Account.getAuthHeadersForActiveAccount(requestBody)

    const response = await getSubscriptionPaymentPeriodsApi(requestBody, authHeaders)
    if (response.status !== 200) {
      throw new Error(`Remote responded with error: ${response.error}`)
    }

    return response.body
  }

  static async _fetchSubscriptionPaymentMethods(plan: any, referralCode: any, period: any) {
    const requestBody = JSON.stringify({
      plan,
      referralCode,
      period,
    })
    const authHeaders = await Account.getAuthHeadersForActiveAccount(requestBody)

    const response = await getSubscriptionPaymentMethodsApi(requestBody, authHeaders)

    if (response.status !== 200) {
      throw new Error(`Remote responded with error: ${response.error}`)
    }

    return response.body
  }

  static async _initSubscriptionPayment(plan: any, referralCode: any, period: any, method: any) {
    const requestBody = JSON.stringify({
      plan,
      referralCode,
      period,
      method,
    })
    const authHeaders = await Account.getAuthHeadersForActiveAccount(requestBody)

    const response = await initSubscriptionPaymentApi(requestBody, authHeaders)
    if (![200, 201].includes(response.status)) {
      throw new Error(`Failed to initialize payment: ${response.error}`)
    }

    return response.body
  }
}

export default SubscriptionPayment
