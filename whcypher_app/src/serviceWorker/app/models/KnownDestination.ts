import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import KnownDestinationsDB from '../../db/KnownDestinationsDB'
import * as knownDestinationsReducer from '../store/reducers/knownDestinationsReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'
import Account from './Account'

class KnownDestination {
  // Refactored
  static async refreshActiveAccountDestinations() {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }

    const accountPubKey = await account.getAccountPubKey()

    const knownDestinationsDB = new KnownDestinationsDB()
    const knownDestinations = await knownDestinationsDB.getAccountDestinations(accountPubKey)

    const store = await getStore()
    await store.dispatch(knownDestinationsReducer.setKnownDestinations(knownDestinations))
    await waitForSync()
  }

  // Refactored
  static async addNewToActiveAccount(blockchain: BlockchainNames, address: string, name: string) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const knownDestinationsDB = new KnownDestinationsDB()
    await knownDestinationsDB.appendNewKnownDestination(accountPubKey, blockchain, address, name)

    await KnownDestination.refreshActiveAccountDestinations()
  }

  // Refactored
  static async updateOnActiveAccount(blockchain: BlockchainNames, address: string, newName: string) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const knownDestinationsDB = new KnownDestinationsDB()
    await knownDestinationsDB.updateKnownDestination(accountPubKey, blockchain, address, newName)

    await KnownDestination.refreshActiveAccountDestinations()
  }

  // Refactored
  static async deleteFromActiveAccount(blockchain: BlockchainNames, address: string) {
    const account = await Account.getActiveAccount()
    if (!account) {
      return
    }
    const accountPubKey = await account.getAccountPubKey()

    const knownDestinationsDB = new KnownDestinationsDB()
    await knownDestinationsDB.removeDestination(accountPubKey, blockchain, address)

    await KnownDestination.refreshActiveAccountDestinations()
  }
}

export default KnownDestination
