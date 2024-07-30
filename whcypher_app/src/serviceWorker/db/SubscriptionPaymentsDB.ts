import LocalStorage from './localStorage'

export interface ISubscriptionPayments {
  accountPubKey: string
  paymentId: string
  firstFetchedAt: number
  recentFetchedAt: number
  retriesCount: number
}

/**
 * A secret vault
 * @class
 */
class SubscriptionPaymentsDB {
  storage: LocalStorage
  subscriptionPayments: ISubscriptionPayments[]
  subscriptionPaymentPlans: any

  constructor() {
    this.storage = new LocalStorage()
    this.subscriptionPayments = []
    this.subscriptionPaymentPlans = {
      lastFetchedAt: null,
      paymentPlans: [],
    }
  }

  async getSubscriptionPaymentsByAccountPubKey(accountPubKey: string) {
    await this._loadSubscriptionPayments()
    return this.subscriptionPayments.filter((subscriptionPayment) => subscriptionPayment.accountPubKey == accountPubKey)
  }

  // Refactored
  async getSubscriptionPaymentPlans() {
    await this._loadSubscriptionPaymentPlans()

    return this.subscriptionPaymentPlans
  }

  // Refactored
  async getSubscriptionPaymentByPaymentId(subscriptionPaymentId: string) {
    await this._loadSubscriptionPayments()
    return this.subscriptionPayments.find(
      (subscriptionPayment) => subscriptionPayment.paymentId == subscriptionPaymentId,
    )
  }

  // Refactored
  async appendSubscriptionPayment(accountPubKey: string, subscriptionPaymentId: string) {
    await this._loadSubscriptionPayments()

    const subscriptionPaymentPosition = this.subscriptionPayments.findIndex(
      (subscriptionPayment) => subscriptionPayment.paymentId == subscriptionPaymentId,
    )

    if (subscriptionPaymentPosition) {
      return this.subscriptionPayments[subscriptionPaymentPosition]
    }

    const subscriptionPayment = {
      accountPubKey,
      paymentId: subscriptionPaymentId,
      firstFetchedAt: +Date.now(),
      recentFetchedAt: 0,
      retriesCount: 0,
    }

    this.subscriptionPayments.push(subscriptionPayment)

    await this.storage.setItem('subscriptionPayments', JSON.stringify(this.subscriptionPayments))

    return subscriptionPayment
  }

  // Refactored
  async updateSubscriptionPaymentOnRetryCount(subscriptionPaymentId: string) {
    await this._loadSubscriptionPayments()

    const subscriptionPaymentPosition = this.subscriptionPayments.findIndex(
      (subscriptionPayment) => subscriptionPayment.paymentId == subscriptionPaymentId,
    )
    let subscriptionPayment = this.subscriptionPayments[subscriptionPaymentPosition]

    if (!subscriptionPayment) return null

    subscriptionPayment = {
      ...subscriptionPayment,
      recentFetchedAt: +Date.now(),
      retriesCount: subscriptionPayment.retriesCount + 1,
    }

    this.subscriptionPayments[subscriptionPaymentPosition] = subscriptionPayment

    await this.storage.setItem('subscriptionPayments', JSON.stringify(this.subscriptionPayments))

    return subscriptionPayment
  }

  async removeSubscriptionPaymentByPaymentId(subscriptionPaymentId: string) {
    await this._loadSubscriptionPayments()
    this.subscriptionPayments = this.subscriptionPayments.filter(
      (subscriptionPayment) => subscriptionPayment.paymentId == subscriptionPaymentId,
    )
    await this.storage.setItem('subscriptionPayments', JSON.stringify(this.subscriptionPayments))
    return this.subscriptionPayments
  }

  // Refactored
  async updateSubscriptionPaymentPlans(newSubscriptionPaymentPlans: any) {
    this.subscriptionPaymentPlans = {
      lastFetchedAt: +Date.now(),
      paymentPlans: newSubscriptionPaymentPlans,
    }

    await this.storage.setItem('subscriptionPaymentPlans', JSON.stringify(this.subscriptionPaymentPlans))

    return this.subscriptionPaymentPlans
  }

  // Refactored
  async _loadSubscriptionPayments() {
    const subscriptionPaymentsJSON = await this.storage.getItem('subscriptionPayments')
    if (subscriptionPaymentsJSON) {
      this.subscriptionPayments = JSON.parse(subscriptionPaymentsJSON)
    } else {
      this.subscriptionPayments = []
    }
  }

  // Refactored
  async _loadSubscriptionPaymentPlans() {
    const subscriptionPaymentPlansJSON = await this.storage.getItem('subscriptionPaymentPlans')
    if (subscriptionPaymentPlansJSON) {
      this.subscriptionPaymentPlans = JSON.parse(subscriptionPaymentPlansJSON)
    } else {
      this.subscriptionPaymentPlans = {}
    }
  }
}

export default SubscriptionPaymentsDB
