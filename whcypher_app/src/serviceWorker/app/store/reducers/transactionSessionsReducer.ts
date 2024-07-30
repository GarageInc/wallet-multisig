import { createSlice } from '@reduxjs/toolkit'

interface ISessionState {
  sessions: {
    [key: string]: {
      walletId: string
      status: string
      joined: number
      joinedParties: string[]
      step: number
      totalSteps: number
      transactionId: string | null
      expiresAt: number | null
    }
  }
}

const initialState: ISessionState = {
  sessions: {
    // ID => {
    //   Session Data
    // }
  },
}

interface ISession {
  walletId: string
  status: string
  joined: number
  joinedParties: string[]
  step: number
  totalSteps: number
  transactionId: string | null
  expiresAt: number | null
}

const blankSession: ISession = {
  walletId: '',
  status: '',
  joined: 0,
  joinedParties: [],
  step: 0,
  totalSteps: 9,
  transactionId: null,
  expiresAt: null,
}

const transactionSessionsSlice = createSlice({
  name: 'transactionSessions',
  initialState,
  reducers: {
    newSession(state, { payload }) {
      const newSession = { ...blankSession, ...payload.session }
      state.sessions[payload.sessionId] = newSession
    },
    updateJoinedParties(state, { payload }) {
      state.sessions[payload.sessionId]['joined'] = payload.joinedParties.length
      state.sessions[payload.sessionId]['joinedParties'] = payload.joinedParties
    },
    updateStep(state, { payload }) {
      state.sessions[payload.sessionId]['step'] = payload.step
    },
    updateStatus(state, { payload }) {
      state.sessions[payload.sessionId]['status'] = payload.status
    },
    updateTransactionId(state, { payload }) {
      state.sessions[payload.sessionId]['transactionId'] = payload.transactionId
    },
    removeSession(state, { payload }) {
      delete state.sessions[payload.sessionId]
    },
  },
})

export const { newSession, updateJoinedParties, updateStep, updateStatus, updateTransactionId, removeSession } =
  transactionSessionsSlice.actions

export default transactionSessionsSlice.reducer
