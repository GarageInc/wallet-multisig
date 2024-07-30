import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deReferenceValue } from 'src/app/helpers/deReferenceValue'

import { IDappsProvidersState } from './types'

const initialState: IDappsProvidersState = {
  settings: {
    prioritiseMultisig: true,
  },
}

// [TODO] perhaps we should rename this to web3Providers instead
const dappsProvidersReducer = createSlice({
  name: 'dappsProviders',
  initialState,
  reducers: {
    setState: (_: IDappsProvidersState, action: PayloadAction<IDappsProvidersState>) => {
      return {
        ...deReferenceValue(action.payload),
      }
    },
  },
})

export const { setState } = dappsProvidersReducer.actions

export default dappsProvidersReducer.reducer
