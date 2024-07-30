import { createSlice } from '@reduxjs/toolkit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface IActivityData {
  field: string
  value: BlockchainNames | string[] | string | number
  subvalue: string
  error: string
  link: string
  assetId: string
  accountKey: string
}

export interface IActivity {
  payload: {
    labelError: string | boolean
    time: number | string
    data: IActivityData[]
    label: string
    initiatedAt: number
  }
  id: string
  accountKey: string
}

interface IActivityState {
  activities: IActivity[]
}

const initialState: IActivityState = {
  activities: [],
}

const accountActivitiesSlice = createSlice({
  name: 'accountActivities',
  initialState,
  reducers: {
    appendActivity(state, { payload }) {
      state.activities.push({ ...payload })
    },
    setActivities(state, { payload }) {
      state.activities = payload
    },
  },
})

export const { appendActivity, setActivities } = accountActivitiesSlice.actions

export default accountActivitiesSlice.reducer
