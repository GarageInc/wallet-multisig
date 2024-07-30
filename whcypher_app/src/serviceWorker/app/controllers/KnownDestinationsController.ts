import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { blockchainList } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { DISTINATION_NAME_REGEXP } from 'src/app/constants/destination'

import Account from '../models/Account'
import Blockchain from '../models/Blockchain'
import KnownDestination from '../models/KnownDestination'
import * as snackbarReducer from '../store/reducers/snackbarReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'

class KnownDestinationsController {
  // Refactored
  async addNewDestination(blockchainName: BlockchainNames, address: string, name: string) {
    const blockchain = new Blockchain(blockchainName)
    const { destinationPattern } = await blockchain.getMetaInfo()
    const destinationRegexp = new RegExp(destinationPattern)

    if (DISTINATION_NAME_REGEXP.test(name)) {
      if (destinationRegexp.test(address)) {
        await KnownDestination.addNewToActiveAccount(blockchainName, address, name)

        const store = await getStore()
        await store.dispatch(snackbarReducer.setSuccess('New destination book entry added'))
        await waitForSync()
      } else {
        throw new Error(`Destination wallet is invalid`)
      }
    } else {
      throw new Error(`Destination name is invalid`)
    }
  }

  // Refactored
  async updateDestination(blockchainName: BlockchainNames, address: string, newName: string) {
    if (DISTINATION_NAME_REGEXP.test(newName)) {
      await KnownDestination.updateOnActiveAccount(blockchainName, address, newName)

      const store = await getStore()
      await store.dispatch(snackbarReducer.setSuccess('Destination book record updated'))
      await waitForSync()
    } else {
      throw new Error(`Destination name is invalid`)
    }
  }

  // Refactored
  async deleteDestination(blockchain: BlockchainNames, address: string) {
    await KnownDestination.deleteFromActiveAccount(blockchain, address)

    const store = await getStore()
    await store.dispatch(snackbarReducer.setSuccess('Destination book entry deleted'))
    await waitForSync()
  }

  // Refactored
  async signKnownDestination(blockchain: BlockchainNames, address: string) {
    const account = await Account.getActiveAccount()
    const blockchainAdapter = new Blockchain(blockchain)

    const { destinationPattern } = await blockchainAdapter.getMetaInfo()

    const blockchainIsSupported = blockchainList.includes(blockchain)
    const destinationIsValid = new RegExp(destinationPattern).test(address)

    if (account && blockchainIsSupported && destinationIsValid) {
      const signature = await account.signMessage(`${blockchain}(${address})`)
      await KnownDestination.addNewToActiveAccount(blockchain, address)
      return signature
    } else {
      return null
    }
  }
}

export default KnownDestinationsController
