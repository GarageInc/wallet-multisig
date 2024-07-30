import * as bip39 from 'bip39'
import _cryptoJs from 'crypto-js'
import HDKey from 'hdkey'
import { ACCOUNT_MASTER_PATH } from 'src/shared/appConfigs'

import LocalStorage from './localStorage'
import { WALLETS_STORAGE_KEY } from './WalletsDB'

const SEEDS_VAULT_KEY = 'CSGNR_VAULT'

interface IAccount {
  masterPubKey: string
  pubKey: string
  path: string
  name: string
  index: number
  active: boolean
  hiddenBlockchains: string[]
  unhideBlockchainWallets: string[]
}

interface IVault {
  [key: number]: string
}

/**
 * A secret vault
 * @param {string} password - password to encrypt secret key, generate from seed words
 * @class
 */
class SeedsDB {
  storage: LocalStorage
  password: any
  path: string
  vault: any
  accounts: never[]
  hdWallet: any
  _isUnlocked = false

  constructor(password?: string) {
    this.storage = new LocalStorage()
    this.password = password
    this.path = ACCOUNT_MASTER_PATH
    this.vault = {}
    this.accounts = []
    this.isUnlocked = false
  }

  // Refactored
  static async nukeAppData() {
    const storage = new LocalStorage()

    await storage.removeItem('activities')
    await storage.removeItem('handlers')
    await storage.removeItem('knownDestinations')
    await storage.removeItem('knownHosts')

    await storage.removeItem(WALLETS_STORAGE_KEY)
    await storage.removeItem('accounts')
    await storage.removeItem(SEEDS_VAULT_KEY)
  }

  // Refactored
  async isInitialized() {
    const entropy = await this.storage.getItem(SEEDS_VAULT_KEY)

    if (entropy) {
      const encryptedEntropy = typeof entropy === 'string' ? { entropy } : JSON.parse(entropy)

      if (encryptedEntropy && encryptedEntropy.entropy) {
        return true
      }
    }

    return false
  }

  /**
   * This api create an encrypted secret vault storage from seed words
   * @param {string} seedWords - 15 words seed phrase
   * @returns {boolean} result
   */
  async appendSeed(seedWords: string) {
    let accountIndex

    try {
      const initialized = await this.isInitialized()

      if (!initialized) {
        accountIndex = await this._initializeNewVault(seedWords)
      } else {
        accountIndex = await this._appendSeedToVault(seedWords)
      }

      this.isUnlocked = true
    } catch (error) {
      console.log(`Error while appending seed: ${error}`)
      return -1
    }

    return accountIndex
  }

  // Refactored
  /**
   * This api create an encrypted secret vault storage from seed words
   * @param {string} seedWords - 15 words seed phrase
   * @returns {boolean} result
   */
  async removeSeed(seedWords: string) {
    let accountIndex: number

    try {
      accountIndex = await this._removeSeedFromVault(seedWords)

      this.isUnlocked = false
    } catch (error) {
      return -1
    }

    return accountIndex
  }

  // Refactored
  // This api decrypts the secure data vault and stores the decrypted secret key in memory.
  //  Make sure you call this api first before any operation that needs the secret key
  //  @param {string} password - password to decrypt the secret key,
  //  @returns {boolean} result
  //
  async unlockVault(password: string) {
    const vaultRaw = await this.storage.getItem(SEEDS_VAULT_KEY)

    if (!vaultRaw) {
      throw new Error('Vault seed not found. Please initialize vault first')
    }

    try {
      this.vault = await this._getVault(password)
      this.password = password
      this.isUnlocked = true

      return true
    } catch (error) {
      return false
    }
  }

  // TODO rename to take this avay. this mthod does not belong here
  getNumberByPath(path: string) {
    const key = this.hdWallet.derive(path)
    return key.privateKey.toString('hex')
  }

  // Refactored
  get isUnlocked() {
    return this._isUnlocked
  }
  // Refactored
  set isUnlocked(v: boolean) {
    this._isUnlocked = v
  }

  getMnemonicFromEntropy(entropy: string) {
    return bip39.entropyToMnemonic(entropy)
  }

  // INTERNAL METHODS

  // Refactored
  async _initializeNewVault(seedWords: string) {
    const seedHex = bip39.mnemonicToSeedSync(seedWords).toString('hex')
    const entropyHex = bip39.mnemonicToEntropy(seedWords)

    const newAccountIndex = await this._appendAccountWithSeed([], seedHex)

    if (newAccountIndex) {
      const vault = { [newAccountIndex]: entropyHex }
      await this._storeVault(vault, this.password)
    }

    return newAccountIndex
  }

  // Refactored
  async _appendSeedToVault(seedWords: string) {
    const accounts = await this._getAccounts()
    const vault = await this._getVault()

    const seedHex = bip39.mnemonicToSeedSync(seedWords).toString('hex')
    const entropyHex = bip39.mnemonicToEntropy(seedWords)

    const duplicateAccountIndex = Object.keys(vault).find((k) => vault[k] === entropyHex)

    if (!duplicateAccountIndex) {
      const newAccountIndex = await this._appendAccountWithSeed(accounts, seedHex)
      if (newAccountIndex) {
        vault[newAccountIndex] = entropyHex
        await this._storeVault(vault, this.password)
      }
      return newAccountIndex
    } else {
      this.vault = vault
      return parseInt(duplicateAccountIndex)
    }
  }

  // Refactored
  async _removeSeedFromVault(seedWords: string): Promise<number> {
    const accounts = await this._getAccounts()
    const vault = await this._getVault()

    const seedHex = bip39.mnemonicToSeedSync(seedWords).toString('hex')
    const entropyHex = bip39.mnemonicToEntropy(seedWords)

    const accountIndex = Object.keys(vault).find((k) => vault[k] === entropyHex)

    if (accountIndex) {
      const result = await this._removeAccountBySeed(accounts, seedHex)
      if (result) {
        delete vault[accountIndex]
        if (Object.keys(vault).length > 0) {
          await this._storeVault(vault, this.password)
        } else {
          await this._removeVault()
        }
      }
      return accountIndex
    } else {
      return -1
    }
  }

  // Refactored
  async getSeedWordsForAccountByIndex(accountIndex: number) {
    if (!this.isUnlocked) await this.unlockVault(this.password)
    const entropyHex = this.vault[accountIndex]
    return bip39.entropyToMnemonic(entropyHex)
  }

  // Refactored
  async getSeedForAccountByIndex(accountIndex: number) {
    if (!this.isUnlocked) await this.unlockVault(this.password)
    const entropyHex = this.vault[accountIndex]
    const seedWords = bip39.entropyToMnemonic(entropyHex)
    return bip39.mnemonicToSeedSync(seedWords).toString('hex')
  }

  // Refactored
  async _storeVault(entropiesObject: IVault, password: string) {
    const entropiesObjectSerialized = JSON.stringify(entropiesObject)
    const encryptedEntropyString = _cryptoJs.enc.Base64.stringify(
      _cryptoJs.enc.Utf8.parse(_cryptoJs.AES.encrypt(entropiesObjectSerialized, password).toString()),
    )
    await this.storage.setItem(SEEDS_VAULT_KEY, encryptedEntropyString)
    this.vault = entropiesObject
  }

  // Refactored
  async _removeVault() {
    await this.storage.removeItem(SEEDS_VAULT_KEY)
  }

  // Refactored
  async _appendAccountWithSeed(accounts: IAccount[], seedHex: string) {
    const hdWallet = HDKey.fromMasterSeed(seedHex)
    const masterKey = hdWallet.derive('m').publicKey
    const { publicKey } = hdWallet.derive(this.path)
    const accountIndex = accounts.length ? accounts[accounts.length - 1].index + 1 : 1

    accounts.push({
      masterPubKey: masterKey.toString('hex'),
      pubKey: publicKey.toString('hex'),
      path: this.path,
      name: `Account ${accountIndex}`,
      index: accountIndex,
      active: true,
      hiddenBlockchains: [],
      unhideBlockchainWallets: [],
    })

    await this.storage.setItem('accounts', JSON.stringify(accounts))

    return accountIndex
  }

  // Refactored
  async _removeAccountBySeed(accounts: IAccount[], seedHex: string) {
    const hdWallet = HDKey.fromMasterSeed(seedHex)
    const masterKey = hdWallet.derive('m').publicKey.toString('hex')

    accounts = accounts.filter((account) => account.masterPubKey !== masterKey)

    await this.storage.setItem('accounts', JSON.stringify(accounts))

    return true
  }

  async _getAccounts() {
    const accountsRaw = await this.storage.getItem('accounts')

    if (accountsRaw) {
      return JSON.parse(accountsRaw)
    } else {
      return []
    }
  }

  async _getVault(password = this.password) {
    const vaultRaw = await this.storage.getItem(SEEDS_VAULT_KEY)

    if (!vaultRaw) {
      throw new Error('Vault seed not found. Please initialize vault first')
    }

    const encryptedEntropy = _cryptoJs.enc.Base64.parse(vaultRaw).toString(_cryptoJs.enc.Utf8)
    const vaultSerialized = _cryptoJs.AES.decrypt(encryptedEntropy, password).toString(_cryptoJs.enc.Utf8)
    return JSON.parse(vaultSerialized)
  }
}

export default SeedsDB
