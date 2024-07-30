import LocalStorage from './localStorage'

interface IKnownHost {
  accountPubKey: string
  host: string
}

/**
 * A secret vault
 * @class
 */
class KnownHostsDB {
  storage: LocalStorage
  knownHosts: IKnownHost[]
  constructor() {
    this.storage = new LocalStorage()
    this.knownHosts = []
  }

  // Refactored
  async appendNewKnownHost(accountPubKey: string, host: string) {
    await this._loadHosts()

    const hostExists = this.knownHosts.some(
      (knownHost) => knownHost.accountPubKey === accountPubKey && knownHost.host === host,
    )

    if (!hostExists) {
      this.knownHosts.push({ accountPubKey, host })
      await this.storage.setItem('knownHosts', JSON.stringify(this.knownHosts))
    }

    return this.knownHosts
  }

  // Refactored
  async getAccountHosts(accountPubKey: string) {
    await this._loadHosts()

    return this.knownHosts.filter((knownHost) => knownHost.accountPubKey == accountPubKey)
  }

  // Refactored
  async removeHost(accountPubKey: string, host: string) {
    await this._loadHosts()

    this.knownHosts = this.knownHosts.filter((knownHost) => {
      return !(knownHost.accountPubKey === accountPubKey && knownHost.host === host)
    })
    await this.storage.setItem('knownHosts', JSON.stringify(this.knownHosts))
    return this.knownHosts
  }

  // Refactored
  async removeHostsByPubKey(accountPubKey: string) {
    await this._loadHosts()

    this.knownHosts = this.knownHosts.filter((knownHost) => knownHost.accountPubKey !== accountPubKey)
    await this.storage.setItem('knownHosts', JSON.stringify(this.knownHosts))
    return this.knownHosts
  }

  // Refactored
  async _loadHosts() {
    const hostsInStorageJSON = await this.storage.getItem('knownHosts')
    if (hostsInStorageJSON) {
      this.knownHosts = JSON.parse(hostsInStorageJSON)
    }
    return this.knownHosts
  }
}

export default KnownHostsDB
