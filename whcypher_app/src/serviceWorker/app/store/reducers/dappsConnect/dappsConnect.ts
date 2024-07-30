import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { deReferenceValue } from '../../../../../app/helpers/deReferenceValue'
import { IDappsConnectController } from './types'

const initialState: IDappsConnectController = {}

const dappsSlice = createSlice({
  // TODO rename to dappConnections
  name: 'dappsConnect',
  initialState,
  reducers: {
    /**
     * Add a dApp Connection Request
     *
     * @param state IDappsConnectController
     * @param action IMessage to upsert by origin
     */
    addRequestedDAppConnect(state: IDappsConnectController, action: PayloadAction<IMessage>) {
      const message = deReferenceValue(action.payload)
      state.message = message
    },

    /**
     * Remove a dApp Connection
     *
     * @param state {IDappsConnectController} - current state
     * @param action {number} - messageId to remove connection for the dApp which sent the message
     *
     */
    removeRequestDappConnect(state: IDappsConnectController, action: PayloadAction<number>) {
      if (state?.message?.messageId === action.payload) delete state.message
    },
  },
})

export const { addRequestedDAppConnect, removeRequestDappConnect } = dappsSlice.actions

export default dappsSlice.reducer
