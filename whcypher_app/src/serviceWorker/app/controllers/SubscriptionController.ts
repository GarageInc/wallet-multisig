import Account from '../models/Account'
import Subscription from '../models/Subscription'
import SubscriptionPayment from '../models/SubscriptionPayment'
import NotifierController from './NotifierController'

class SubscriptionController {
  async expireActiveAccountSubscription() {
    const subscription = new Subscription()
    const result = await subscription.expireActiveAccountSubscription()

    if (result) {
      NotifierController.create(
        'Subscription',
        'Premium subscription expired. Upgrade to get access to premium features',
      )
    }
  }

  async setAlarmsForPendingSubscriptionPayments() {
    await SubscriptionPayment.setAlarmsForPendingSubscriptionPayments()
  }

  async getCurrentAccountSubscriptionData() {
    const accountPubKey = await Account.getActiveAccountPubKey()
    const subscription = new Subscription()
    const activeAccountSubscriptionData = await subscription.getAccountSubscriptionData(accountPubKey, true)
    await subscription.setActiveAccountSubscription()
    return activeAccountSubscriptionData
  }

  async getPendingSubscriptionPayments() {
    return await SubscriptionPayment.getPendingSubscriptionPayments()
  }

  async getSubscriptionPaymentPlans() {
    return await SubscriptionPayment.getPaymentPlans()
  }

  async getSubscriptionPaymentPeriods(subscriptionPlan: any, referralCode: any) {
    return await SubscriptionPayment.getPaymentPeriods(subscriptionPlan, referralCode)
  }

  async getSubscriptionPaymentMethods(subscriptionPlan: any, referralCode: any, paymentPeriod: any) {
    return await SubscriptionPayment.getPaymentMethods(subscriptionPlan, referralCode, paymentPeriod)
  }

  async initSubscriptionPayment(subscriptionPlan: any, referralCode: any, paymentPeriod: any, paymentMethod: any) {
    return await SubscriptionPayment.initSubscriptionPayment(
      subscriptionPlan,
      referralCode,
      paymentPeriod,
      paymentMethod,
    )
  }

  async monitorPaymentSession(sessionId: string) {
    const subscriptionPayment = new SubscriptionPayment(sessionId)

    const subscription = new Subscription()
    const accountPubKey = await Account.getActiveAccountPubKey()

    const paymentExpired = await subscriptionPayment.hasExpired()
    const paymentSessionData = await subscriptionPayment.fetchPaymentSessionData()
    const paymentSuccessful = paymentSessionData.status === 'SUCCESSFUL'

    if (paymentSuccessful || paymentExpired) {
      await subscription.getAccountSubscriptionData(accountPubKey, true)

      await subscriptionPayment.remove()
      await subscription.updateAlarmsToExpireActiveAccountSubscription()

      if (paymentSuccessful) {
        await subscription.setActiveAccountSubscription()
        NotifierController.create('Subscription', 'Premium subscription has been activated')
      }

      return paymentSuccessful
    }

    return false
  }
}

export default SubscriptionController
