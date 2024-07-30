import 'fetch-mock-jest'

import { CHAIN_ADAPTERS } from '@whalesheaven/chain-service/src/helpers/adapters'
import fetchMock from 'node-fetch'

import AccountsController from '../../../../src/serviceWorker/app/controllers/AccountsController'
import TransactionSessionsController from '../../../../src/serviceWorker/app/controllers/TransactionSessionsController'
import WalletController from '../../../../src/serviceWorker/app/controllers/WalletController'
import * as walletRequestsReducer from '../../../../src/serviceWorker/app/store/reducers/walletRequestsReducer'
import { getStore } from '../../../../src/serviceWorker/app/store/store'
import fakeLocalStorage from '../../../helpers/fakeLocalStorage'
import { fetchMockReset, fetchMockSeed3 } from '../../../helpers/fetchBackupsMocks'
import { transactionSearchPayload, transactionsSearchUrl } from '../../../helpers/fetchTransactionsMocks'
import { transactionPostUrl } from '../../../helpers/fetchTransactionsMocks'
import { fetchMockTransactionsWithNoRequests } from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction1FromUs,
  fetchMockTransactionsWithRequestFromUs,
} from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction1FromUsCreatorNotJoined,
  fetchMockTransactionsWithRequestFromUsCreatorNotJoined,
} from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction1FromThem,
  fetchMockTransactionsWithRequestFromThem,
} from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction1FromThemAdvancedVersion,
  fetchMockTransactionsWithRequestFromThemAdvancedVersion,
} from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction1FromThemCreatorNotJoined,
  fetchMockTransactionsWithRequestFromThemCreatorNotJoined,
} from '../../../helpers/fetchTransactionsMocks'
import { fetchWalletBalanceRequest, transaction1WalletRequestPayload } from '../../../helpers/fetchTransactionsMocks'
import {
  fetchMockTransaction2ByUs,
  fetchMockTransaction2Post,
  fetchMockTransactionsWithRequestByUs,
} from '../../../helpers/fetchTransactionsMocks'
import { fetchMockTransaction3Reject } from '../../../helpers/fetchTransactionsMocks'

global.chrome.action = {
  setBadgeText: jest.fn(),
}

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())

const getCurrentState = async () => {
  const store = await getStore()
  return store.getState()
}

describe('Transaction Sessions Controller', () => {
  let state
  let accountsController
  let walletController
  let transactionSessionsController

  const SEED_WORDS_WITHOUT_BACKUPS =
    'side spin fan reduce aisle anger sunny core palace lava aware lamp escape social sunset'
  const SEED_WORDS_WITH_BACKUPS =
    'east decorate sunset hood armor plastic dune tiny duty ice season brick never frozen view'

  const PASSWORD = 'test123'

  beforeEach(async () => {
    accountsController = new AccountsController()
    transactionSessionsController = new TransactionSessionsController()
    walletController = new WalletController()
  })

  afterEach(async () => {
    const store = await getStore()
    await store.dispatch({ type: 'RESET' })

    fakeLocalStorage.clear()
    fetchMockReset()
  })

  describe('Account with backups', () => {
    beforeEach(async () => {
      fetchMockSeed3()
      await accountsController.importAccount(SEED_WORDS_WITH_BACKUPS, PASSWORD)
      await accountsController.unlock(PASSWORD)
    })

    test('Validate state', async () => {
      state = await getCurrentState()
      let transactionSessions = state.transactionSessions

      expect(transactionSessions.sessions).toEqual({})
    })

    describe('No requests', () => {
      beforeEach(async () => {
        fetchMockTransactionsWithNoRequests()
      })

      test('Can fetch transactions from remote', async () => {
        await transactionSessionsController.fetchFromServerOnce()

        state = await getCurrentState()
        let transactionSessions = state.transactionSessions

        expect(transactionSessions.sessions).toEqual({})

        expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
          method: 'post',
          body: transactionSearchPayload(),
        })
      })
    })

    describe('With requests from us', () => {
      describe('We initiate a request', () => {
        beforeEach(async () => {
          fetchMockTransaction2Post()
          fetchMockTransactionsWithRequestByUs()
          fetchMockTransaction2ByUs()
        })

        test('Initiation', async () => {
          // Ethereum Goerli
          const walletId = '292bc98763c159570a87900ef423cc6b20ef004db1c723051228f7b8481468ca'
          const spendData = {
            assetId: 'ETH',
            assetType: CHAIN_ADAPTERS.COIN,
            destination: '0x0123456789012345678901234567890123456789',
            amount: 0,
            sendAll: true,
          }

          const feeData = {
            feeRate: 50,
            manualFee: false,
          }

          const response = await walletController.initTransaction(walletId, spendData, feeData)

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(response.sessionId).toBe('63639fc1a1a0b155908d5fc3')
          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('pending')
          expect(Object.keys(monitoringRequestsIds)).toEqual([])

          expect(fetchMock).toHaveFetched(transactionPostUrl, {
            method: 'POST',
            matchPartialBody: true,
            body: {
              blockchain: 'EthereumGoerli',
              assetId: 'ETH',
              assetType: CHAIN_ADAPTERS.COIN,
              addressFrom: '0xe835ac9f13c3f4899e7cea0dc4aad363ab01284f',
              destination: '0x0123456789012345678901234567890123456789',
              partiesAmount: 2,
              partyId: 2,
              // "transactionHex":"eb808506ee592b3182520894012345678901234567890123456789012345678987214e626d21f47880808080",
              protocolVersion: 'secp256k1-v1',
            },
          })
        })

        describe('Initiated', () => {
          beforeEach(async () => {
            // Ethereum Goerli
            const walletId = '292bc98763c159570a87900ef423cc6b20ef004db1c723051228f7b8481468ca'
            const spendData = {
              assetId: 'ETH',
              assetType: CHAIN_ADAPTERS.COIN,
              destination: '0x0123456789012345678901234567890123456789',
              amount: 0,
              sendAll: true,
            }

            const feeData = {
              feeRate: 50,
              manualFee: false,
            }

            await walletController.initTransaction(walletId, spendData, feeData)
          })

          test('Can fetch transactions from remote', async () => {
            await transactionSessionsController.fetchFromServerOnce()

            state = await getCurrentState()
            const { requestsList } = state.walletRequests
            const { monitoringRequestsIds } = state.walletRequests

            const request = requestsList[0]

            expect(requestsList.length).toBe(1)
            expect(request.status).toBe('pending')
            expect(Object.keys(monitoringRequestsIds)).toEqual(['63639fc1a1a0b155908d5fc3'])

            expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
              method: 'post',
              body: transactionSearchPayload(),
            })
          })

          test('Can fetch transactions from remote multiple times', async () => {
            await transactionSessionsController.fetchFromServerOnce()
            await transactionSessionsController.fetchFromServerOnce()

            state = await getCurrentState()
            const { requestsList } = state.walletRequests
            const { monitoringRequestsIds } = state.walletRequests

            const request = requestsList[0]

            expect(requestsList.length).toBe(1)
            expect(request.status).toBe('pending')
            expect(Object.keys(monitoringRequestsIds)).toEqual(['63639fc1a1a0b155908d5fc3'])

            expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
              method: 'post',
              body: transactionSearchPayload(),
            })
          })
        })
      })

      describe('Started on another client', () => {
        beforeEach(async () => {
          fetchMockTransactionsWithRequestFromUs()
          fetchMockTransaction1FromUs()
        })

        test('Can fetch transactions from remote', async () => {
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          expect(requestsList.length).toBe(0)
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63622310a1a0b155908d5f75'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })

        test('Can fetch transactions from remote multiple times', async () => {
          await transactionSessionsController.fetchFromServerOnce()
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          expect(requestsList.length).toBe(0)
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63622310a1a0b155908d5f75'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })

        describe('Wallet request exists', () => {
          beforeEach(async () => {
            const store = await getStore()
            await store.dispatch(walletRequestsReducer.addRequest(transaction1WalletRequestPayload()))
          })

          test('Can fetch transactions from remote', async () => {
            await transactionSessionsController.fetchFromServerOnce()

            state = await getCurrentState()
            const { requestsList } = state.walletRequests
            const { monitoringRequestsIds } = state.walletRequests

            const request = requestsList[0]

            expect(requestsList.length).toBe(1)
            expect(request.status).toBe('pending')
            expect(Object.keys(monitoringRequestsIds)).toEqual(['63622310a1a0b155908d5f75'])

            expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
              method: 'post',
              body: transactionSearchPayload(),
            })
          })
        })
      })

      describe('Started on another client, creator not joined', () => {
        beforeEach(async () => {
          fetchMockTransactionsWithRequestFromUsCreatorNotJoined()
          fetchMockTransaction1FromUsCreatorNotJoined()
        })

        test('Can fetch transactions from remote', async () => {
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          expect(requestsList.length).toBe(0)
          expect(Object.keys(monitoringRequestsIds)).toEqual([])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })

        test('Can fetch transactions from remote multiple times', async () => {
          await transactionSessionsController.fetchFromServerOnce()
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          expect(requestsList.length).toBe(0)
          expect(Object.keys(monitoringRequestsIds)).toEqual([])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })
      })
    })

    describe('With requests from them', () => {
      describe('Creator has joined', () => {
        beforeEach(async () => {
          fetchMockTransactionsWithRequestFromThem()
          fetchMockTransaction1FromThem()
          fetchWalletBalanceRequest()
        })

        test('Can fetch transactions from remote', async () => {
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('pending')
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63626566a1a0b155908d5f77'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })

        test('Can fetch transactions from remote multiple times', async () => {
          await transactionSessionsController.fetchFromServerOnce()
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('pending')
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63626566a1a0b155908d5f77'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })
      })

      describe('Creator not joined', () => {
        beforeEach(async () => {
          fetchMockTransactionsWithRequestFromThemCreatorNotJoined()
          fetchMockTransaction1FromThemCreatorNotJoined()
        })

        test('Can fetch transactions from remote', async () => {
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('pending')
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63626566a1a0b155908d5f77'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })

        test('Can fetch transactions from remote multiple times', async () => {
          await transactionSessionsController.fetchFromServerOnce()
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('pending')
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63626566a1a0b155908d5f77'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })
      })

      describe('Unsupported version', () => {
        beforeEach(async () => {
          fetchMockTransactionsWithRequestFromThemAdvancedVersion()
          fetchMockTransaction1FromThemAdvancedVersion()
          fetchMockTransaction3Reject()
          fetchWalletBalanceRequest()
        })

        test('Can fetch transactions from remote', async () => {
          await transactionSessionsController.fetchFromServerOnce()

          state = await getCurrentState()
          const { requestsList } = state.walletRequests
          const { monitoringRequestsIds } = state.walletRequests

          const request = requestsList[0]

          expect(requestsList.length).toBe(1)
          expect(request.status).toBe('unsupported')
          expect(Object.keys(monitoringRequestsIds)).toEqual(['63626566a1a0b155908d5f77'])

          expect(fetchMock).toHaveFetched(transactionsSearchUrl, {
            method: 'post',
            body: transactionSearchPayload(),
          })
        })
      })
    })
  })
})
