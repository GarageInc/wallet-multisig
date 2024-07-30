import { createSlice } from '@reduxjs/toolkit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface IAccountData {
  active: boolean
  index: number
  masterPubKey: string
  pubKey: string
  name: string
  hiddenBlockchains: string[]
  unhideBlockchainWallets: string[]
}

export interface IAccountItem {
  index: number
  pubKey: string
  active: boolean
  name: string
}

interface IApplicationState {
  appInitialized: boolean
  password: string
  unlocked: boolean
  unlockedTimeStamp: number
  activeAccountPubkey: string
  activeAccountIndex: number
  activeAccountData: IAccountData
  accountsList: IAccountData[]
  deletingAccountIndex: number
  currentChain: BlockchainNames
}

const initialState: IApplicationState = {
  appInitialized: false,
  password: '',
  unlocked: false,
  unlockedTimeStamp: 0,
  activeAccountPubkey: '',
  activeAccountIndex: 0,
  activeAccountData: {} as any,
  accountsList: [],
  deletingAccountIndex: 0,
  currentChain: BlockchainNames.Ethereum,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    appInitialized(state) {
      state.appInitialized = true
    },
    setPassword(state, action) {
      state.password = action.payload
      state.unlockedTimeStamp = Date.now()
    },
    setUnlocked(state) {
      state.unlocked = true
    },
    setLocked(state) {
      state.password = ''
      state.unlocked = false
      state.unlockedTimeStamp = 0
    },
    setActiveAccountData(state, { payload }) {
      state.activeAccountPubkey = payload.pubKey
      state.activeAccountIndex = payload.index
      state.activeAccountData = { ...payload }
    },
    setAccountsList(state, { payload }) {
      state.accountsList = [...payload]
    },
    setDeletingAccountIndex(state, { payload }) {
      state.deletingAccountIndex = payload
    },
    unsetDeletingAccountIndex(state) {
      state.deletingAccountIndex = 0
    },
    updateApplicationChain(state, { payload }) {
      state.currentChain = payload
    },
    nullifyState(state) {
      state.activeAccountPubkey = ''
      state.activeAccountIndex = 0
      state.activeAccountData = {} as any
      state.appInitialized = false
      state.accountsList = []
      state.deletingAccountIndex = 0
      state.currentChain = BlockchainNames.Ethereum
    },
  },
})

export const {
  appInitialized,
  setPassword,
  setUnlocked,
  setLocked,
  setActiveAccountData,
  setAccountsList,
  setDeletingAccountIndex,
  unsetDeletingAccountIndex,
  nullifyState,
  updateApplicationChain,
} = applicationSlice.actions

export default applicationSlice.reducer
