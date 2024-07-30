import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import LocalStorage from './localStorage'

export interface IDbAccount {
  index: number
  name: string
  pubKey: string
  active: boolean
  hiddenBlockchains: string[]
  unhideBlockchainWallets: string[]
}

/**
 * A secret vault
 * @class
 */
class AccountsDB {
  storage: LocalStorage
  accounts: IDbAccount[]

  constructor() {
    this.storage = new LocalStorage()
    this.accounts = []
  }

  // Refactored
  async loadAccounts() {
    const accountsDataJSON = await this.storage.getItem('accounts')
    if (accountsDataJSON) {
      this.accounts = JSON.parse(accountsDataJSON)
    }
    return this.accounts
  }

  async getAccountByIndex(index?: number) {
    await this.loadAccounts()

    const accountIndex = index
    return this.accounts.find((acc) => acc.index == accountIndex)
  }

  async getAccountByPubKey(pubKey: string) {
    await this.loadAccounts()

    const accountPubKey = pubKey
    return this.accounts.find((acc) => acc.pubKey == accountPubKey)
  }

  async getActiveAccount() {
    await this.loadAccounts()
    return this.accounts.find((acc) => acc.active)
  }

  // Refactored
  async setActiveAccount(index: number): Promise<IDbAccount> {
    await this.loadAccounts()

    const accountIndex = index
    let accountData: IDbAccount = {} as IDbAccount

    const keys = Object.keys(this.accounts)

    keys.forEach((arrIndex: number) => {
      if (this.accounts[arrIndex].index === accountIndex) {
        this.accounts[arrIndex].active = true
        accountData = this.accounts[arrIndex]
      } else this.accounts[arrIndex].active = false
    })

    await this.storage.setItem('accounts', JSON.stringify(this.accounts))

    return { ...accountData }
  }

  // Refactored
  async setAccountName(index: number, newName: string) {
    const accountData = await this.getAccountByIndex(index)
    if (accountData) {
      return await this._updateAccountInStorage(index, { name: newName })
    } else {
      return null
    }
  }

  // Refactored
  async setAccountHiddenBlockchain(index: number, blockchain: BlockchainNames) {
    const accountData = await this.getAccountByIndex(index)
    if (accountData) {
      const prevHiddenBlockchains = accountData.hiddenBlockchains || []
      const hiddenBlockchains = Array.from(new Set([...prevHiddenBlockchains, blockchain]))
      return await this._updateAccountInStorage(index, { hiddenBlockchains })
    } else {
      return null
    }
  }

  // Refactored
  async unsetAccountHiddenBlockchain(index: number, blockchain: BlockchainNames) {
    const accountData = await this.getAccountByIndex(index)
    if (accountData) {
      const prevHiddenBlockchains = accountData.hiddenBlockchains || []
      const hiddenBlockchains = prevHiddenBlockchains.filter((hiddenBlockchain) => hiddenBlockchain !== blockchain)
      return await this._updateAccountInStorage(index, { hiddenBlockchains })
    } else {
      return null
    }
  }

  // Refactored
  async setAccountUnhideBlockchainWallets(index: number, blockchain: BlockchainNames) {
    const accountData = await this.getAccountByIndex(index)
    if (accountData) {
      const prevUnhideBlockchainWallets = accountData.unhideBlockchainWallets || []
      const unhideBlockchainWallets = Array.from(new Set([...prevUnhideBlockchainWallets, blockchain]))
      return await this._updateAccountInStorage(index, { unhideBlockchainWallets })
    } else {
      return null
    }
  }

  // Refactored
  async unsetAccountUnhideBlockchainWallets(index: number, blockchain: BlockchainNames) {
    const accountData = await this.getAccountByIndex(index)
    if (accountData) {
      const prevUnhideBlockchainWallets = accountData.unhideBlockchainWallets || []
      const unhideBlockchainWallets = prevUnhideBlockchainWallets.filter(
        (hiddenBlockchain) => hiddenBlockchain !== blockchain,
      )
      return await this._updateAccountInStorage(index, { unhideBlockchainWallets })
    } else {
      return null
    }
  }

  // INTERNAL METHODS

  // Refactored
  async _updateAccountInStorage(index: number, params: any) {
    const accountIndex = index
    const accountNewParams = params
    const accounts: any[] = JSON.parse(await this.storage.getItem('accounts'))

    accounts.forEach((acc) => {
      if (acc.index == accountIndex) Object.assign(acc, accountNewParams)
    })

    await this.storage.setItem('accounts', JSON.stringify(accounts))
    this.accounts = accounts

    return this.accounts.find((acc) => acc.index == accountIndex)
  }
}

export default AccountsDB
