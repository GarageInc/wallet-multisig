import Account from '../models/Account'
import AccountActivities from '../models/AccountActivities'
import AccountsController from './AccountsController'

class ActivitiesController {
  async syncWithRemote() {
    const account = await Account.getActiveAccount()
    const applicationUnlocked = await AccountsController.isUnlocked()

    if (account && applicationUnlocked) {
      const accountActivities = new AccountActivities(account.data.id, account)

      await accountActivities.syncToServer()
      await accountActivities.syncFromServer()
    } else {
      // user has logged out
      return
    }
  }

  async syncFromServer() {
    const accountActivities = new AccountActivities()
    return await accountActivities.syncFromServer()
  }

  async syncToServer() {
    const accountActivities = new AccountActivities()
    return await accountActivities.syncToServer()
  }
}

export default ActivitiesController
