import KnownHostsDB from '../../db/KnownHostsDB'
import * as knownHostsReducer from '../store/reducers/knownHostsReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'

class KnownHost {
  // Refactored
  static async refreshActiveAccountHosts() {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const knownHostsDB = new KnownHostsDB()
    const knownHosts = await knownHostsDB.getAccountHosts(accountPubKey)

    const store = await getStore()
    await store.dispatch(knownHostsReducer.setKnownHosts(knownHosts))
    await waitForSync()
  }

  // Refactored
  static async addToActiveAccount(host: string) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const knownHostsDB = new KnownHostsDB()
    await knownHostsDB.appendNewKnownHost(accountPubKey, host)

    await KnownHost.refreshActiveAccountHosts()
  }

  // Refactored
  static async deleteFromActiveAccount(host: string) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }

    const accountPubKey = await account.getAccountPubKey()

    const knownHostsDB = new KnownHostsDB()
    await knownHostsDB.removeHost(accountPubKey, host)

    await KnownHost.refreshActiveAccountHosts()
  }
}

export default KnownHost
