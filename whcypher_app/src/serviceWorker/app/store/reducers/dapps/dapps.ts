import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deReferenceValue } from 'src/app/helpers/deReferenceValue'
import { ICurrentTab } from 'src/serviceWorker/app/types/interfaces'

import { IDAppController } from './types'

const DEFAULT_TAB_INFO = {
  id: '',
  url: '',
  domain: '',
  title: '',
  favicon: '',
}

const initialState: IDAppController = {
  // [TODO] Perhaps we should rename this to connectedDapps
  dappsConnections: {}, // [TODO] Add type
  currentTab: DEFAULT_TAB_INFO,
}

const dappsSlice = createSlice({
  name: 'dapps',
  initialState,
  reducers: {
    changeCurrentTab(state: IDAppController, action: PayloadAction<ICurrentTab>) {
      if (state.currentTab.domain !== action.payload.domain) {
        state.currentTab = deReferenceValue(action.payload)
      }
    },
    resetCurrentTab(state: IDAppController) {
      state.currentTab = DEFAULT_TAB_INFO
    },
    addDApp(
      state: IDAppController,
      action: PayloadAction<{
        dappId: string
        walletIds: Array<string>
        faviconUrl: string
        title: string
      }>,
    ) {
      const { dappId, walletIds, faviconUrl, title } = deReferenceValue(action.payload)
      return {
        ...state,
        dappsConnections: {
          ...state.dappsConnections,
          [dappId]: { walletIds, faviconUrl, title },
        },
      }
    },

    removeConnectedDApp(state: IDAppController, action: PayloadAction<{ dappId: string }>) {
      delete state.dappsConnections[action.payload.dappId]
    },

    removeWalletFromDApp(state: IDAppController, action: PayloadAction<{ dappId: string; walletId: string }>) {
      const { dappId, walletId } = action.payload
      const filteredWalletIds =
        state.dappsConnections[dappId]?.walletIds.filter((_walletId) => _walletId !== walletId) || []

      const newState = deReferenceValue(state)

      if (filteredWalletIds.length === 0) {
        delete newState.dappsConnections[action.payload.dappId]
      } else {
        newState.dappsConnections[dappId].walletIds = filteredWalletIds
      }

      return newState
    },
    addWalletToDApp(
      state: IDAppController,
      action: PayloadAction<{ dappId: string; walletId: string; asCurrentActive?: boolean }>,
    ) {
      const { dappId, walletId, asCurrentActive } = action.payload

      const alreadyHas =
        state.dappsConnections[dappId]?.walletIds.filter((_walletId) => _walletId === walletId).length === 0

      if (alreadyHas || asCurrentActive) {
        const ids = state.dappsConnections[dappId]?.walletIds || []
        const walletIds = asCurrentActive
          ? [walletId, ...ids?.filter((_walletId) => _walletId !== walletId)]
          : [...ids, walletId]

        state.dappsConnections[dappId].walletIds = walletIds
      }
    },
  },
})

export const {
  resetCurrentTab,
  changeCurrentTab,
  addDApp,
  addWalletToDApp,
  removeConnectedDApp,
  removeWalletFromDApp,
} = dappsSlice.actions

export default dappsSlice.reducer
