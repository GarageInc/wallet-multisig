import { createSlice } from '@reduxjs/toolkit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { IMessage } from 'src/shared/interfaces/interfaces'
import { v4 as uuidv4 } from 'uuid'

import { IBaseRequest } from './requestsReducer'

export interface IJoinedPubKeys {
  [key: string]: string
}

export interface IPartiesState {
  accountPubKey: string
  status: string
  partyPubKey: string
}

export interface IWalletRequest extends IBaseRequest {
  partiesAmount: number
  initiatedAt: string
  minimumSigAmount: number
  autoApproveProcessStep: string
  expiresIn: number
  accountPubKey: string
  blockchain: BlockchainNames
  from: string
  walletId: string
  state: string
  addressFrom: string
  destinationSignatureValid: boolean
  destinationSignature: string
  destinationSignedByPubKey: string
  partiesState: IPartiesState[]
  assetType: string
  joinedParties: IJoinedPubKeys
  assetId: string
  value: number
  destination: string
  networkFee: number
  startAutoApproving: boolean
  networkFeeTicker: string
  autoApproveAt: number
  ticker: string
  initiatorAccountPubKey: string
  transactionId: string
  processStep: number
  processSteps: number
  expiresAt: number
  rawData?: IMessage
  initiatorPubKey: string
  transactionHex: string
  dealHash: string
  nonce: any
  _id: any
}

interface IWalletRequestsState {
  requestsList: IWalletRequest[]
  monitoringRequestsIds: {
    [key: string]: string | number
  }
}

const initialState: IWalletRequestsState = {
  requestsList: [] as IWalletRequest[],
  monitoringRequestsIds: {},
}

const walletRequests = createSlice({
  name: 'walletRequests',
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
          Object.keys(payload).forEach((k: string) => {
            if (k != 'sessionId' && state.requestsList[index]) state.requestsList[index][k] = payload[k] as any
          })
        }
      })
    },
    addMonitoredSessionIds(state, { payload }) {
      state.monitoringRequestsIds[payload.sessionId] = Date.parse(payload.initiatedAt)
    },
    removeMonitoredSessionIds(state, { payload }) {
      delete state.monitoringRequestsIds[payload.sessionId]
    },
    nullifyMonitoredSessions(state) {
      state.monitoringRequestsIds = {}
    },
  },
})

export const {
  addRequest,
  removeRequest,
  updateRequestBySessionId,
  addMonitoredSessionIds,
  removeMonitoredSessionIds,
  nullifyMonitoredSessions,
} = walletRequests.actions

export default walletRequests.reducer
