import { createSlice } from '@reduxjs/toolkit'

interface IHost {
  host: string
  port: number
  username: string
  password: string
  privateKey: string
  passphrase: string
}

interface IHostsState {
  list: IHost[]
}

const initialState: IHostsState = {
  list: [],
}

const knownHostsSlice = createSlice({
  name: 'knownHosts',
  initialState,
  reducers: {
    addKnownHost(state, { payload }) {
      state.list.push({ ...payload })
    },
    setKnownHosts(state, { payload }) {
      state.list = payload
    },
  },
})

export const { addKnownHost, setKnownHosts } = knownHostsSlice.actions

export default knownHostsSlice.reducer
