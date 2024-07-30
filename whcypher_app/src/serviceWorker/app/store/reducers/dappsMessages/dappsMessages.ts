import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from 'src/shared/interfaces/interfaces'
import { Runtime } from 'webextension-polyfill'

import { IDappsMessagesController } from './types'

const initialState: IDappsMessagesController = {
  messages: [],
  lastRejectMessage: {} as any,
  lastConnectMessage: {} as any,
}

const dappsMessagesSlice = createSlice({
  name: 'dappsMessages',
  initialState,
  reducers: {
    pushMessage(state: IDappsMessagesController, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload)
    },

    popMessage(state: IDappsMessagesController) {
      if (state.messages.length > 0) {
        state.messages.splice(state.messages.length - 1, 1)
      }
    },

    removeMessageById(state: IDappsMessagesController, action: PayloadAction<{ id: number }>) {
      const index = state.messages.findIndex((msg: IMessage) => msg.messageId === action.payload.id)
      if (index > -1) {
        state.messages.splice(index, 1)
      }
    },
    removeMessageByIds(state: IDappsMessagesController, action: PayloadAction<{ ids: number[] }>) {
      const { ids } = action.payload
      const filteredMessages = state.messages.filter((msg) => ids.includes(msg.messageId))
      state.messages = filteredMessages
    },
    resetMessages(state: IDappsMessagesController) {
      state.messages = []
    },
    purgeExpiredMessages(state: IDappsMessagesController, action: PayloadAction<{ beforeDate: number }>) {
      const { beforeDate } = action.payload
      const filteredMessages = state.messages.filter((msg) => msg.time >= beforeDate)
      state.messages = filteredMessages
    },
    setRejectedMsg(
      state: IDappsMessagesController,
      action: PayloadAction<{
        origin: Runtime.MessageSender | undefined
        time: number
      }>,
    ) {
      if (!state.lastRejectMessage) {
        state.lastRejectMessage = {} as any
      }
      state.lastRejectMessage.origin = action.payload.origin
      state.lastRejectMessage.timestamp = action.payload.time
    },
    setConnectMsg(
      state: IDappsMessagesController,
      action: PayloadAction<{
        origin: Runtime.MessageSender | undefined
        time: number
      }>,
    ) {
      if (!state.lastConnectMessage) {
        state.lastConnectMessage = {} as any
      }
      state.lastConnectMessage.origin = action.payload.origin
      state.lastConnectMessage.timestamp = action.payload.time
    },

    setRejectedMsgTime(
      state: IDappsMessagesController,
      action: PayloadAction<{
        time: number
      }>,
    ) {
      if (!state.lastRejectMessage) {
        state.lastRejectMessage = {} as any
      }
      state.lastRejectMessage.timestamp = action.payload.time
    },
    setConnectMsgTime(
      state: IDappsMessagesController,
      action: PayloadAction<{
        time: number
      }>,
    ) {
      if (!state.lastConnectMessage) {
        state.lastConnectMessage = {} as any
      }
      state.lastConnectMessage.timestamp = action.payload.time
    },
  },
})

export const {
  pushMessage,
  popMessage,
  removeMessageById,
  removeMessageByIds,
  resetMessages,
  purgeExpiredMessages,
  setRejectedMsg,
  setConnectMsg,
  setRejectedMsgTime,
  setConnectMsgTime,
} = dappsMessagesSlice.actions

export default dappsMessagesSlice.reducer
