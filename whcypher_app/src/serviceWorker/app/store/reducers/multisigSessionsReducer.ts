import { createSlice } from '@reduxjs/toolkit'

export interface ISession {
  status: string
  step: number
  totalSteps: number
  joined: number
  joinedSequence: number
  joinedParties: []
  minimumSigAmount: number
  partiesAmount: number
  blockchain: string
  address?: string | null
  path: string
  expiresAt?: number | null
}
interface IMultisigSessions {
  sessions: {
    [id: string]: ISession
  }
}

const initialState: IMultisigSessions = {
  sessions: {},
}

const blankSession: ISession = {
  status: '',
  step: 0,
  totalSteps: 5,
  joined: 0,
  joinedSequence: 0,
  joinedParties: [],
  minimumSigAmount: 0,
  partiesAmount: 0,
  blockchain: '',
  address: null,
  path: '',
  expiresAt: null,
}

const multisigSessionsSlice = createSlice({
  name: 'multisigSessions',
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
    setAddress(state, { payload }) {
      state.sessions[payload.sessionId]['address'] = payload.address
    },
    removeSession(state, { payload }) {
      delete state.sessions[payload.sessionId]
    },
  },
})

export const { newSession, updateJoinedParties, updateStep, updateStatus, setAddress, removeSession } =
  multisigSessionsSlice.actions

export default multisigSessionsSlice.reducer
