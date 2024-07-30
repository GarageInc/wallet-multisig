import 'fetch-mock-jest'

import fetchMock from 'node-fetch'

import AccountsController from '../../../../src/serviceWorker/app/controllers/AccountsController'
import { getStore } from '../../../../src/serviceWorker/app/store/store'
import SeedsDB from '../../../../src/serviceWorker/db/SeedsDB'
import WalletsDB from '../../../../src/serviceWorker/db/WalletsDB'
import fakeLocalStorage from '../../../helpers/fakeLocalStorage'
import {
  fetchMockReset,
  fetchMockSeed1,
  fetchMockSeed2,
  fetchMockSeed3,
  fetchMockSeeds,
} from '../../../helpers/fetchBackupsMocks'
import { fetchMockSeed3WithDuplicated, seed1BackupsUrl } from '../../../helpers/fetchBackupsMocks'

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())

const getCurrentState = async () => {
  const store = await getStore()
  return store.getState()
}

describe('Accounts controller', () => {
  let state
  let accountsController

  const SEED_WORDS = 'side spin fan reduce aisle anger sunny core palace lava aware lamp escape social sunset'
  const SEED_WORDS_2 = 'curve address baby truly hour latin glide bread airport engage hood win cross cluster improve'
  const SEED_WORDS_3 = 'east decorate sunset hood armor plastic dune tiny duty ice season brick never frozen view'

  // Checksum does not match
  const WRONG_SEED_WORDS =
    'angry convince angry convince angry convince angry convince angry convince angry convince angry convince angry'
  const PASSWORD = 'test123'
  const WRONG_PASSWORD = 'TEST12345'

  beforeEach(async () => {
    accountsController = new AccountsController()
  })

  afterEach(async () => {
    const store = await getStore()
    await store.dispatch({ type: 'RESET' })

    fakeLocalStorage.clear()
    fetchMockReset()
  })

  describe('App not initialzed', () => {
    let seedDB

    beforeEach(async () => {
      seedDB = new SeedsDB(PASSWORD)
    })

    test('Validate state', async () => {
      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()

      expect(application.activeAccountIndex).toBe(0)
      expect(application.appInitialized).toBeFalsy()
      expect(dbInitialized).toBeFalsy()
      expect(accounts.length).toBe(0)
      await expect(seedDB._getVault()).rejects.toThrow('Vault seed not found. Please initialize vault first')
    })

    test('Imports a seed for the first time', async () => {
      fetchMockSeed1()
      const newAccountIndex = await accountsController.importAccount(SEED_WORDS, PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(newAccountIndex).toBe(1)
      expect(application.activeAccountIndex).toBe(newAccountIndex)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(1)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1'])
      expect(typeof vault['1']).toBe('string')

      expect(fetchMock).toHaveFetched(seed1BackupsUrl)
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test('Imports a wrong seed for the first time', async () => {
      fetchMockSeed1()
      const newAccountIndex = await accountsController.importAccount(WRONG_SEED_WORDS, PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()

      expect(newAccountIndex).toBe(-1)
      expect(application.activeAccountIndex).toBe(0)
      expect(dbInitialized).toBeFalsy()
      expect(accounts.length).toBe(0)
      await expect(seedDB._getVault()).rejects.toThrow('Vault seed not found. Please initialize vault first')
      expect(application.appInitialized).toBeFalsy()
    })

    test("Can't export seed phrase", async () => {
      await expect(accountsController.getSeedPhrase(PASSWORD)).rejects.toThrow('Application is not initiated')
    })

    describe('Unlocking', () => {
      test('Validate state', async () => {
        state = await getCurrentState()
        let application = state.application

        expect(application.password).toBe('')
        expect(application.unlocked).toBe(false)
      })

      test("Can't unlock", async () => {
        await expect(accountsController.unlock(PASSWORD)).rejects.toThrow(
          'Vault seed not found. Please initialize vault first',
        )

        state = await getCurrentState()
        let application = state.application

        expect(application.password).toBe('')
        expect(application.unlocked).toBe(false)
      })
    })
  })

  describe('Seed imported, App initiated', () => {
    let seedDB

    beforeEach(async () => {
      fetchMockSeed1()
      await accountsController.importAccount(SEED_WORDS, PASSWORD)

      seedDB = new SeedsDB(PASSWORD)
    })

    test('Validate state', async () => {
      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()
      let { walletsData } = state.wallets

      expect(application.activeAccountIndex).toBe(1)
      expect(application.appInitialized).toBeFalsy()
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(1)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1'])
      expect(typeof vault['1']).toBe('string')
      expect(walletsData).toEqual([])
    })

    test('Imports same seed', async () => {
      const newAccountIndex = await accountsController.importAccount(SEED_WORDS, PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(newAccountIndex).toBe(1)
      expect(application.activeAccountIndex).toBe(1)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(1)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1'])
      expect(typeof vault['1']).toBe('string')

      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test('Imports wrong seed', async () => {
      const newAccountIndex = await accountsController.importAccount(WRONG_SEED_WORDS, PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(newAccountIndex).toBe(-1)
      expect(application.activeAccountIndex).toBe(1)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(1)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1'])
      expect(typeof vault['1']).toBe('string')
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test('Imports second seed', async () => {
      fetchMockSeed2()

      const newAccountIndex = await accountsController.importAccount(SEED_WORDS_2, PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(newAccountIndex).toBe(2)
      expect(application.activeAccountIndex).toBe(2)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(2)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(false)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1', '2'])
      expect(typeof vault['1']).toBe('string')
      expect(typeof vault['2']).toBe('string')
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test("Can't remove seed with locked app", async () => {
      const result = await accountsController.deleteActiveAccount(PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(result).toBe(null)
      expect(application.activeAccountIndex).toBe(1)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(1)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1'])
      expect(typeof vault['1']).toBe('string')
      // Disabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test('Export seed phrase', async () => {
      const result = await accountsController.getSeedPhrase(PASSWORD)

      expect(result).toBe(SEED_WORDS)
    })

    test("Can't export seed phrase with incorrect password", async () => {
      const result = await accountsController.getSeedPhrase(WRONG_PASSWORD)

      expect(result).toBe(null)
    })

    describe('Unlocking', () => {
      test('Validate state', async () => {
        state = await getCurrentState()
        let application = state.application

        expect(application.password).toBe('')
        expect(application.unlocked).toBe(false)
      })

      test("Can't unlock with incorrect password", async () => {
        const result = await accountsController.unlock(WRONG_PASSWORD)

        state = await getCurrentState()
        let application = state.application

        expect(result).toBe(false)
        expect(application.password).toBe('')
        expect(application.unlocked).toBe(false)
      })
    })

    describe('Unlocked app', () => {
      beforeEach(async () => {
        const result = await accountsController.unlock(PASSWORD)
        expect(result).toBe(true)
      })

      test('Validate state', async () => {
        state = await getCurrentState()
        let application = state.application

        expect(application.password).toBe(PASSWORD)
        expect(application.unlocked).toBe(true)
      })

      test('Can remove seed', async () => {
        const result = await accountsController.deleteActiveAccount(PASSWORD)

        state = await getCurrentState()
        let application = state.application
        let dbInitialized = await seedDB.isInitialized()
        let accounts = await seedDB._getAccounts()

        expect(result).toBe(true)
        expect(application.activeAccountIndex).toBe(0)
        expect(dbInitialized).toBeFalsy()
        expect(accounts.length).toBe(0)
        await expect(seedDB._getVault()).rejects.toThrow('Vault seed not found. Please initialize vault first')
        // Dissabled as we currently set this up in UI, which is wrong
        // expect(application.appInitialized).toBeFalsy();
      })
    })
  })

  describe('Two accounts', () => {
    let seedDB

    beforeEach(async () => {
      fetchMockSeed1()
      fetchMockSeed2()

      await accountsController.importAccount(SEED_WORDS, PASSWORD)
      await accountsController.importAccount(SEED_WORDS_2, PASSWORD)

      seedDB = new SeedsDB(PASSWORD)
    })

    test("Can't remove seed with locked app", async () => {
      const result = await accountsController.deleteActiveAccount(PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(result).toBe(null)
      expect(application.activeAccountIndex).toBe(2)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(2)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(false)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1', '2'])
      expect(typeof vault['1']).toBe('string')
      expect(typeof vault['2']).toBe('string')
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeTruthy();
    })

    test('Can switch accounts', async () => {
      const result = await accountsController.switchToAccount(1)

      state = await getCurrentState()
      let application = state.application
      let accounts = await seedDB._getAccounts()

      expect(result).toBe(true)
      expect(application.activeAccountIndex).toBe(1)
      expect(accounts.length).toBe(2)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(false)
    })

    test('Export seed phrase of the second account', async () => {
      const result = await accountsController.getSeedPhrase(PASSWORD)

      expect(result).toBe(SEED_WORDS_2)
    })

    test('Export seed phrase of the first account after switched', async () => {
      await accountsController.switchToAccount(1)
      const result = await accountsController.getSeedPhrase(PASSWORD)

      expect(result).toBe(SEED_WORDS)
    })

    describe('Unlocked app', () => {
      beforeEach(async () => {
        const result = await accountsController.unlock(PASSWORD)
        expect(result).toBe(true)
      })

      test('Can remove second account', async () => {
        const result = await accountsController.deleteActiveAccount(PASSWORD)

        state = await getCurrentState()
        let application = state.application
        let dbInitialized = await seedDB.isInitialized()
        let accounts = await seedDB._getAccounts()
        let vault = await seedDB._getVault()

        expect(result).toBe(true)
        expect(application.activeAccountIndex).toBe(1)
        expect(dbInitialized).toBeTruthy()
        expect(accounts.length).toBe(1)
        expect(accounts[0].index).toBe(1)
        expect(accounts[0].active).toBe(true)
        expect(Object.keys(vault)).toEqual(['1'])
        expect(typeof vault['1']).toBe('string')
        // Dissabled as we currently set this up in UI, which is wrong
        // expect(application.appInitialized).toBeFalsy();
      })

      describe('First account removed', () => {
        beforeEach(async () => {
          await accountsController.switchToAccount(1)
          const result = await accountsController.deleteActiveAccount(PASSWORD)
          expect(result).toBe(true)
        })

        test('Validate state', async () => {
          state = await getCurrentState()
          let application = state.application
          let dbInitialized = await seedDB.isInitialized()
          let accounts = await seedDB._getAccounts()
          let vault = await seedDB._getVault()

          expect(application.activeAccountIndex).toBe(2)
          expect(dbInitialized).toBeTruthy()
          expect(accounts.length).toBe(1)
          expect(accounts[0].index).toBe(2)
          expect(accounts[0].active).toBe(true)
          expect(Object.keys(vault)).toEqual(['2'])
          expect(typeof vault['2']).toBe('string')
          // Dissabled as we currently set this up in UI, which is wrong
          // expect(application.appInitialized).toBeFalsy();
        })

        describe('First account added back', () => {
          beforeEach(async () => {
            const newAccountIndex = await accountsController.importAccount(SEED_WORDS, PASSWORD)
            expect(newAccountIndex).toBe(3)
          })

          test('Validate state', async () => {
            state = await getCurrentState()
            let application = state.application
            let dbInitialized = await seedDB.isInitialized()
            let accounts = await seedDB._getAccounts()
            let vault = await seedDB._getVault()

            expect(application.activeAccountIndex).toBe(3)
            expect(dbInitialized).toBeTruthy()
            expect(accounts.length).toBe(2)
            expect(accounts[0].index).toBe(2)
            expect(accounts[0].active).toBe(false)
            expect(accounts[1].index).toBe(3)
            expect(accounts[1].active).toBe(true)
            expect(Object.keys(vault)).toEqual(['2', '3'])
            expect(typeof vault['2']).toBe('string')
            expect(typeof vault['3']).toBe('string')
            // Dissabled as we currently set this up in UI, which is wrong
            // expect(application.appInitialized).toBeFalsy();
          })

          test("Can't switch to unexisting account", async () => {
            await expect(accountsController.switchToAccount(1)).rejects.toThrow('Account with index 1 does not exist')

            state = await getCurrentState()
            let application = state.application
            let dbInitialized = await seedDB.isInitialized()
            let accounts = await seedDB._getAccounts()
            let vault = await seedDB._getVault()

            expect(application.activeAccountIndex).toBe(3)
            expect(dbInitialized).toBeTruthy()
            expect(accounts.length).toBe(2)
            expect(accounts[0].index).toBe(2)
            expect(accounts[0].active).toBe(false)
            expect(accounts[1].index).toBe(3)
            expect(accounts[1].active).toBe(true)
            expect(Object.keys(vault)).toEqual(['2', '3'])
            expect(typeof vault['2']).toBe('string')
            expect(typeof vault['3']).toBe('string')
            // Dissabled as we currently set this up in UI, which is wrong
            // expect(application.appInitialized).toBeFalsy();
          })
        })

        describe('Third account added', () => {
          beforeEach(async () => {
            fetchMockSeed3()
            const newAccountIndex = await accountsController.importAccount(SEED_WORDS_3, PASSWORD)
            expect(newAccountIndex).toBe(3)
          })

          test('Validate state', async () => {
            state = await getCurrentState()
            let application = state.application
            let dbInitialized = await seedDB.isInitialized()
            let accounts = await seedDB._getAccounts()
            let vault = await seedDB._getVault()

            expect(application.activeAccountIndex).toBe(3)
            expect(dbInitialized).toBeTruthy()
            expect(accounts.length).toBe(2)
            expect(accounts[0].index).toBe(2)
            expect(accounts[0].active).toBe(false)
            expect(accounts[1].index).toBe(3)
            expect(accounts[1].active).toBe(true)
            expect(Object.keys(vault)).toEqual(['2', '3'])
            expect(typeof vault['2']).toBe('string')
            expect(typeof vault['3']).toBe('string')
            // Dissabled as we currently set this up in UI, which is wrong
            // expect(application.appInitialized).toBeFalsy();
          })
        })
      })

      describe('Second account removed', () => {
        beforeEach(async () => {
          const result = await accountsController.deleteActiveAccount(PASSWORD)
          expect(result).toBe(true)
        })

        test('Validate state', async () => {
          state = await getCurrentState()
          let application = state.application
          let dbInitialized = await seedDB.isInitialized()
          let accounts = await seedDB._getAccounts()
          let vault = await seedDB._getVault()

          expect(application.activeAccountIndex).toBe(1)
          expect(dbInitialized).toBeTruthy()
          expect(accounts.length).toBe(1)
          expect(accounts[0].index).toBe(1)
          expect(accounts[0].active).toBe(true)
          expect(Object.keys(vault)).toEqual(['1'])
          expect(typeof vault['1']).toBe('string')
          // Dissabled as we currently set this up in UI, which is wrong
          // expect(application.appInitialized).toBeFalsy();
        })

        describe('Second account added back', () => {
          beforeEach(async () => {
            const newAccountIndex = await accountsController.importAccount(SEED_WORDS_2, PASSWORD)
            expect(newAccountIndex).toBe(2)
          })

          test('Validate state', async () => {
            state = await getCurrentState()
            let application = state.application
            let dbInitialized = await seedDB.isInitialized()
            let accounts = await seedDB._getAccounts()
            let vault = await seedDB._getVault()

            expect(application.activeAccountIndex).toBe(2)
            expect(dbInitialized).toBeTruthy()
            expect(accounts.length).toBe(2)
            expect(accounts[0].index).toBe(1)
            expect(accounts[0].active).toBe(false)
            expect(accounts[1].index).toBe(2)
            expect(accounts[1].active).toBe(true)
            expect(Object.keys(vault)).toEqual(['1', '2'])
            expect(typeof vault['1']).toBe('string')
            expect(typeof vault['2']).toBe('string')
            // Dissabled as we currently set this up in UI, which is wrong
            // expect(application.appInitialized).toBeFalsy();
          })
        })
      })
    })
  })

  describe('Three accounts', () => {
    let seedDB

    beforeEach(async () => {
      fetchMockSeeds()
      await accountsController.importAccount(SEED_WORDS, PASSWORD)
      await accountsController.importAccount(SEED_WORDS_2, PASSWORD)
      await accountsController.importAccount(SEED_WORDS_3, PASSWORD)

      seedDB = new SeedsDB(PASSWORD)
    })

    test('Validate state', async () => {
      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(application.activeAccountIndex).toBe(3)
      expect(application.appInitialized).toBeFalsy()
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(3)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(false)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(false)
      expect(accounts[2].index).toBe(3)
      expect(accounts[2].active).toBe(true)
      expect(Object.keys(vault)).toEqual(['1', '2', '3'])
      expect(typeof vault['1']).toBe('string')
      expect(typeof vault['2']).toBe('string')
      expect(typeof vault['3']).toBe('string')
    })

    test('Can switch account to first account', async () => {
      const result = await accountsController.switchToAccount(1)

      state = await getCurrentState()
      let application = state.application
      let accounts = await seedDB._getAccounts()

      expect(result).toBe(true)
      expect(application.activeAccountIndex).toBe(1)
      expect(accounts.length).toBe(3)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(false)
      expect(accounts[2].index).toBe(3)
      expect(accounts[2].active).toBe(false)
    })

    test('Can switch account to first and then second  acount', async () => {
      await accountsController.switchToAccount(1)
      const result = await accountsController.switchToAccount(2)

      state = await getCurrentState()
      let application = state.application
      let accounts = await seedDB._getAccounts()

      expect(result).toBe(true)
      expect(application.activeAccountIndex).toBe(2)
      expect(accounts.length).toBe(3)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(false)
      expect(accounts[1].index).toBe(2)
      expect(accounts[1].active).toBe(true)
      expect(accounts[2].index).toBe(3)
      expect(accounts[2].active).toBe(false)
    })

    test('Can remove second account', async () => {
      await accountsController.unlock(PASSWORD)
      await accountsController.switchToAccount(2)
      const result = await accountsController.deleteActiveAccount(PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(result).toBe(true)
      expect(application.activeAccountIndex).toBe(1)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(2)
      expect(accounts[0].index).toBe(1)
      expect(accounts[0].active).toBe(true)
      expect(accounts[1].index).toBe(3)
      expect(accounts[1].active).toBe(false)
      expect(Object.keys(vault)).toEqual(['1', '3'])
      expect(typeof vault['1']).toBe('string')
      expect(typeof vault['3']).toBe('string')
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeFalsy();
    })

    test('Can remove first account', async () => {
      await accountsController.unlock(PASSWORD)
      await accountsController.switchToAccount(1)
      const result = await accountsController.deleteActiveAccount(PASSWORD)

      state = await getCurrentState()
      let application = state.application
      let dbInitialized = await seedDB.isInitialized()
      let accounts = await seedDB._getAccounts()
      let vault = await seedDB._getVault()

      expect(result).toBe(true)
      expect(application.activeAccountIndex).toBe(2)
      expect(dbInitialized).toBeTruthy()
      expect(accounts.length).toBe(2)
      expect(accounts[0].index).toBe(2)
      expect(accounts[0].active).toBe(true)
      expect(accounts[1].index).toBe(3)
      expect(accounts[1].active).toBe(false)
      expect(Object.keys(vault)).toEqual(['2', '3'])
      expect(typeof vault['2']).toBe('string')
      expect(typeof vault['3']).toBe('string')
      // Dissabled as we currently set this up in UI, which is wrong
      // expect(application.appInitialized).toBeFalsy();
    })
  })

  describe('Wallets backups', () => {
    let walletsDB

    beforeEach(async () => {
      walletsDB = new WalletsDB()
    })

    describe('App not initialized', () => {
      test('Validate state', async () => {
        state = await getCurrentState()
        let { walletsData: accountWalletsData } = state.wallets
        let dbWalletsData = await walletsDB._loadWalletsData()

        expect(accountWalletsData).toEqual([])
        expect(dbWalletsData).toEqual([])
      })
    })

    describe('App initialized with acсount without backups', () => {
      beforeEach(async () => {
        fetchMockSeed1()
        await accountsController.importAccount(SEED_WORDS, PASSWORD)
      })

      test('Validate state', async () => {
        state = await getCurrentState()
        let { walletsData: accountWalletsData } = state.wallets
        let dbWalletsData = await walletsDB._loadWalletsData()

        expect(accountWalletsData).toEqual([])
        expect(dbWalletsData).toEqual([])
      })

      describe('Imports a seed with backups', () => {
        beforeEach(async () => {
          fetchMockSeed3()
          await accountsController.importAccount(SEED_WORDS_3, PASSWORD)
        })

        test('Validate state', async () => {
          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(4)
          expect(dbWalletsData.length).toEqual(4)
        })

        test('Switch account', async () => {
          await accountsController.unlock(PASSWORD)
          await accountsController.switchToAccount(1)

          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(0)
          expect(dbWalletsData.length).toEqual(4)
        })

        test('Switch back and forth', async () => {
          await accountsController.unlock(PASSWORD)
          await accountsController.switchToAccount(1)
          await accountsController.switchToAccount(2)

          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(4)
          expect(dbWalletsData.length).toEqual(4)
        })
      })
    })

    describe('App initialized with acсount with backups', () => {
      beforeEach(async () => {
        fetchMockSeed3()
        await accountsController.importAccount(SEED_WORDS_3, PASSWORD)
      })

      test('Validate state', async () => {
        state = await getCurrentState()
        let { walletsData: accountWalletsData } = state.wallets
        let dbWalletsData = await walletsDB._loadWalletsData()

        expect(accountWalletsData.length).toEqual(4)
        expect(dbWalletsData.length).toEqual(4)
      })

      describe('Imports a seed without backups', () => {
        beforeEach(async () => {
          fetchMockSeed1()
          await accountsController.importAccount(SEED_WORDS, PASSWORD)
        })

        test('Validate state', async () => {
          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(0)
          expect(dbWalletsData.length).toEqual(4)
        })

        test('Switch account', async () => {
          await accountsController.unlock(PASSWORD)
          await accountsController.switchToAccount(1)

          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(4)
          expect(dbWalletsData.length).toEqual(4)
        })

        test('Switch back and forth', async () => {
          await accountsController.unlock(PASSWORD)
          await accountsController.switchToAccount(1)
          await accountsController.switchToAccount(2)

          state = await getCurrentState()
          let { walletsData: accountWalletsData } = state.wallets
          let dbWalletsData = await walletsDB._loadWalletsData()

          expect(accountWalletsData.length).toEqual(0)
          expect(dbWalletsData.length).toEqual(4)
        })
      })
    })

    describe('App initialized with acсount with duplicated backups', () => {
      beforeEach(async () => {
        fetchMockSeed3WithDuplicated()
        await accountsController.importAccount(SEED_WORDS_3, PASSWORD)
      })

      test('Validate state', async () => {
        state = await getCurrentState()
        let { walletsData: accountWalletsData } = state.wallets
        let dbWalletsData = await walletsDB._loadWalletsData()

        expect(accountWalletsData.length).toEqual(4)
        expect(dbWalletsData.length).toEqual(4)
      })
    })
  })
})
