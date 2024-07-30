import { createSlice } from '@reduxjs/toolkit'

interface IImportBackupState {
  backupFileName: string
  backupEncrypted: string
}

const initialState: IImportBackupState = {
  backupFileName: '',
  backupEncrypted: '',
}

const importBackup = createSlice({
  name: 'importBackup',
  initialState,
  reducers: {
    setBackup(state, { payload }) {
      state.backupFileName = payload.backupFileName
      state.backupEncrypted = payload.backupEncrypted
    },
    resetBackup(state) {
      state.backupFileName = ''
      state.backupEncrypted = ''
    },
  },
})

export const { setBackup, resetBackup } = importBackup.actions

export default importBackup.reducer
