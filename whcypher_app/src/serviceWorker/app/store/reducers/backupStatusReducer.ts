import { createSlice } from '@reduxjs/toolkit'

export interface IBackupStatusState {
  backupSyncInProgress: { [accountPubKey: string]: boolean }
  currentBackupsCounter: { [accountPubKey: string]: number }
  failedBackupsCounter: { [accountPubKey: string]: number }
  duplicatedBackupsCounter: { [accountPubKey: string]: number }
  totalBackupsCount: { [accountPubKey: string]: number }
}

const initialState: IBackupStatusState = {
  backupSyncInProgress: {},
  currentBackupsCounter: {},
  failedBackupsCounter: {},
  duplicatedBackupsCounter: {},
  totalBackupsCount: {},
}

const backupStatusSlice = createSlice({
  name: 'backupStatus',
  initialState,
  reducers: {
    setBackupSyncInProgress(state, { payload }) {
      state.backupSyncInProgress[payload.accountPubKey] = !!payload.syncStatus
    },
    setCurrentBackupsCounter(state, { payload }) {
      state.currentBackupsCounter[payload.accountPubKey] = payload.counter
    },
    setFailedBackupsCounter(state, { payload }) {
      state.failedBackupsCounter[payload.accountPubKey] = payload.counter
    },
    setDuplicatedBackupsCounter(state, { payload }) {
      state.duplicatedBackupsCounter[payload.accountPubKey] = payload.counter
    },
    setTotalBackupsCount(state, { payload }) {
      state.totalBackupsCount[payload.accountPubKey] = payload.count
    },
    resetBackupCounts(state, { payload }) {
      delete state.backupSyncInProgress[payload.accountPubKey]
      delete state.currentBackupsCounter[payload.accountPubKey]
      delete state.failedBackupsCounter[payload.accountPubKey]
      delete state.duplicatedBackupsCounter[payload.accountPubKey]
      delete state.totalBackupsCount[payload.accountPubKey]
    },
    nullifyState(state) {
      state.backupSyncInProgress = {}
      state.currentBackupsCounter = {}
      state.failedBackupsCounter = {}
      state.duplicatedBackupsCounter = {}
      state.totalBackupsCount = {}
    },
  },
})

export const {
  setBackupSyncInProgress,
  setCurrentBackupsCounter,
  setFailedBackupsCounter,
  setDuplicatedBackupsCounter,
  setTotalBackupsCount,
  resetBackupCounts,
  nullifyState,
} = backupStatusSlice.actions

export default backupStatusSlice.reducer
