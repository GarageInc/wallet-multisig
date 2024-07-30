import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface IBaseRequest {
  id?: string
  requestName: string
  requestPath: string
  sessionId?: string
  status?: string
  accountPubKey: string
}

export interface IAppRequest extends IBaseRequest {
  currentStep: string
}

interface IRequestsState {
  requestsList: IAppRequest[]
  monitoringRequestsIds: {
    [id: string]: number
  }
}

const initialState: IRequestsState = {
  requestsList: [],
  monitoringRequestsIds: {},
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest(state, { payload }) {
      state.requestsList.push({ id: uuidv4(), ...payload })
    },
    removeRequest(state, { payload }) {
      if (payload.id) {
        state.requestsList = state.requestsList.filter((request) => request.id !== payload.id)
      } else if (payload.sessionId) {
        state.requestsList = state.requestsList.filter((request) => request.sessionId !== payload.sessionId)
      }
    },
    updateRequestBySessionId(state, { payload }) {
      state.requestsList.forEach((element, index) => {
        if (state.requestsList[index].sessionId == payload.sessionId) {
          Object.keys(payload).forEach((k) => {
            if (k != 'sessionId') state.requestsList[index][k] = payload[k]
          })
        }
      })
    },
  },
})

export const { addRequest, removeRequest, updateRequestBySessionId } = requestsSlice.actions

export default requestsSlice.reducer
