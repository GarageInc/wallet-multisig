import { createSlice } from '@reduxjs/toolkit'

import { updateBadgeCounter } from '../utils/badge'

interface IBadgeState {
  counter: number
}

const initialState: IBadgeState = {
  counter: 0,
}

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    updateBadge(state, { payload }) {
      state.counter += payload
      if (state.counter < 0) state.counter = 0
      updateBadgeCounter(state.counter)
    },
    setBadge(state, { payload }) {
      state.counter = payload
      if (state.counter < 0) state.counter = 0
      updateBadgeCounter(state.counter)
    },
  },
})

export const { updateBadge, setBadge } = badgeSlice.actions

export default badgeSlice.reducer
