import LocalStorage from './localStorage'

/**
 * A secret vault
 * @class
 */
class SubscriptionsDB {
  storage: LocalStorage
  subscriptions: any

  constructor() {
    this.storage = new LocalStorage()
    this.subscriptions = []
  }

  // Refactored
  async getAccountSubscription(accountPubKey: string) {
    await this._loadSubscriptions()

    const subscription = this.subscriptions.find((subscription: any) => subscription.accountPubKey == accountPubKey)

    return subscription
  }

  // Refactored
  async updateAccountSubscriptionData(accountPubKey: string, newSubscriptionData: any) {
    const subscriptionDataIndex = this.subscriptions.findIndex(
      (subscription: any) => subscription.accountPubKey == accountPubKey,
    )

    if (subscriptionDataIndex < 0) {
      const newSubscription = {
        accountPubKey,
        lastFetchedAt: +Date.now(),
        data: newSubscriptionData,
      }

      this.subscriptions.push(newSubscription)
    } else {
      // [TODO] Remove following 2 lines. We were adding a subscription instead of updating it.
      // This has polluted subscriptions array.
      this.subscriptions = this.subscriptions.filter(
        (subscription: any, index: number) =>
          subscription.accountPubKey != accountPubKey ||
          (subscription.accountPubKey == accountPubKey && index == subscriptionDataIndex),
      )

      this.subscriptions[subscriptionDataIndex].lastFetchedAt = +Date.now()
      this.subscriptions[subscriptionDataIndex].data = newSubscriptionData
    }

    await this.storage.setItem('subscriptions', JSON.stringify(this.subscriptions))

    return newSubscriptionData
  }

  async _loadSubscriptions() {
    const subscriptionsJSON = await this.storage.getItem('subscriptions')
    if (subscriptionsJSON) {
      this.subscriptions = JSON.parse(subscriptionsJSON)
    }

    return this.subscriptions
  }
}

export default SubscriptionsDB
