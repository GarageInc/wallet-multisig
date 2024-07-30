import { createSlice } from '@reduxjs/toolkit'

interface ISubscriptionState {
  plan: string
  expiresAt: Date | number
  limits: any
  consumed: any
}

const initialState: ISubscriptionState = {
  plan: 'FREE',
  expiresAt: new Date(0),
  limits: {
    vaultsInit: 1,
    vaultsJoin: 3,
    maxPartiesAmount: 2,
    dailyInitTransactions: 1,
    dailyJoinTransactions: 3,
  },
  consumed: {
    vaultsInit: 1,
    vaultsJoin: 3,
    dailyInitTransactions: 1,
    dailyJoinTransactions: 3,
  },
}

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    updateSubscription(state, { payload }) {
      const { plan, expiresAt, limits, consumed } = payload
      state.plan = plan
      state.expiresAt = expiresAt
      state.limits = limits
      state.consumed = consumed
    },
  },
})

export const { updateSubscription } = subscriptionSlice.actions

export default subscriptionSlice.reducer
