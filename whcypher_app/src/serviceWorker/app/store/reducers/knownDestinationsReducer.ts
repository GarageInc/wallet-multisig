import { createSlice } from '@reduxjs/toolkit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

export interface IDestItem {
  blockchain: BlockchainNames
  name: string
  address: string
}

interface IDestState {
  list: IDestItem[]
}

const initialState: IDestState = {
  list: [],
}

const knownDestinationsSlice = createSlice({
  name: 'knownDestinations',
  initialState,
  reducers: {
    addKnownDestination(state, { payload }) {
      state.list.push({ ...payload })
    },
    setKnownDestinations(state, { payload }) {
      state.list = payload
    },
  },
})

export const { addKnownDestination, setKnownDestinations } = knownDestinationsSlice.actions

export default knownDestinationsSlice.reducer
