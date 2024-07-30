import { createSlice } from '@reduxjs/toolkit'

interface ICurrencyState {
  rates: {
    [key: string]: number
  }
  base: string
}

const initialState: ICurrencyState = {
  rates: {},
  base: '',
}

const currencyRatesSlice = createSlice({
  name: 'currencyRates',
  initialState,
  reducers: {
    setRates(state, { payload }) {
      state.rates = { ...payload.rates }
      state.base = payload.base
    },
  },
})

export const { setRates } = currencyRatesSlice.actions

export default currencyRatesSlice.reducer
