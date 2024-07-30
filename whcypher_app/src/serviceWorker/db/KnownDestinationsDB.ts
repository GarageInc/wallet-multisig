import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import LocalStorage from './localStorage'

export interface IKnownDestination {
  accountPubKey: string
  blockchain: BlockchainNames
  address: string
  name: string
}

/**
 * A secret vault
 * @class
 */
class KnownDestinationsDB {
  storage: LocalStorage
  knownDestinations: IKnownDestination[]

  constructor() {
    this.storage = new LocalStorage()
    this.knownDestinations = []
  }

  // Refactored
  async appendNewKnownDestination(accountPubKey: string, blockchain: BlockchainNames, address: string, name: string) {
    await this._loadDestinations()

    const destinationExists = this.knownDestinations.some(
      (knownDestination) =>
        knownDestination.accountPubKey === accountPubKey &&
        knownDestination.blockchain === blockchain &&
        knownDestination.address === address,
    )

    if (!destinationExists) {
      this.knownDestinations.push({ accountPubKey, blockchain, address, name })
      await this.storage.setItem('knownDestinations', JSON.stringify(this.knownDestinations))
    }

    return this.knownDestinations
  }

  // Refactored
  async updateKnownDestination(accountPubKey: string, blockchain: BlockchainNames, address: string, newName: string) {
    await this._loadDestinations()

    const knownDestinationPosition = this.knownDestinations.findIndex(
      (knownDestination) =>
        knownDestination.accountPubKey === accountPubKey &&
        knownDestination.blockchain === blockchain &&
        knownDestination.address === address,
    )

    // TODO Raise an error here if position is not found

    this.knownDestinations[knownDestinationPosition].name = newName
    await this.storage.setItem('knownDestinations', JSON.stringify(this.knownDestinations))

    return this.knownDestinations
  }

  // Refactored
  async getAccountDestinations(accountPubKey: string) {
    await this._loadDestinations()

    return this.knownDestinations.filter((knownDestination) => knownDestination.accountPubKey == accountPubKey)
  }

  // Refactored
  async removeDestination(accountPubKey: string, blockchain: BlockchainNames, address: string) {
    await this._loadDestinations()

    this.knownDestinations = this.knownDestinations.filter((knownDestination) => {
      return !(
        knownDestination.accountPubKey === accountPubKey &&
        knownDestination.blockchain === blockchain &&
        knownDestination.address === address
      )
    })
    await this.storage.setItem('knownDestinations', JSON.stringify(this.knownDestinations))
    return this.knownDestinations
  }

  // Refactored
  async removeDestinationsByPubKey(accountPubKey: string) {
    await this._loadDestinations()

    this.knownDestinations = this.knownDestinations.filter(
      (knownDestination) => knownDestination.accountPubKey !== accountPubKey,
    )
    await this.storage.setItem('knownDestinations', JSON.stringify(this.knownDestinations))
    return this.knownDestinations
  }

  // Refactored
  async _loadDestinations() {
    const destinationsInStorageJSON = await this.storage.getItem('knownDestinations')
    if (destinationsInStorageJSON) {
      this.knownDestinations = JSON.parse(destinationsInStorageJSON)
    }
    return this.knownDestinations
  }
}

export default KnownDestinationsDB
