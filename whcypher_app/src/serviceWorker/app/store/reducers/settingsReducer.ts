import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum NodeUrlKey {
  rpc = 'rpc',
}

export type NodeUrl = {
  [NodeUrlKey.rpc]: string
}

export interface ICustomRPCUrls {
  [chain: string]: NodeUrl
}

export interface ISettingsState {
  walletBackupsEnabled: boolean
  currencyRatesEnabled: boolean
  pushNotificationsEnabled: boolean
  syncActivitiesWithServerEnabled: boolean
  autoApproveEnabled: boolean
  autoApproveTimeoutSeconds: number
  autoApproveLimitUSD: number
  customRPCUrls: ICustomRPCUrls
}

const initialState: ISettingsState = {
  walletBackupsEnabled: true,
  currencyRatesEnabled: true,
  pushNotificationsEnabled: true,
  syncActivitiesWithServerEnabled: false,
  autoApproveEnabled: true,
  autoApproveTimeoutSeconds: 30,
  autoApproveLimitUSD: 5000,
  customRPCUrls: {} as ICustomRPCUrls,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state: any, action) {
      Object.keys(action.payload).map((key) => {
        if (key in state) {
          state[key] = action.payload[key]
        }
      })
    },

    updateCustomRpcUrls(state: ISettingsState, action: PayloadAction<ICustomRPCUrls>) {
      return {
        ...state,
        customRPCUrls: action.payload,
      }
    },
  },
})

export const { updateSettings, updateCustomRpcUrls } = settingsSlice.actions

export default settingsSlice.reducer
