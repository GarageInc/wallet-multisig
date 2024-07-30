import { createSlice } from '@reduxjs/toolkit'

import * as steps from '../../../../app/constants/appInitSteps'

interface IAppInitState {
  seedWords: string[]
  enteredSeedWords: string[]
  password: string
  confirmPassword: string
  currentStep: string
  prevSteps: string[]
  appInitPath: string
}

const initialState: IAppInitState = {
  seedWords: [],
  enteredSeedWords: [],
  password: '',
  confirmPassword: '',
  currentStep: steps.WELCOME,
  prevSteps: [],
  appInitPath: steps.NEW_SEED_WORDS,
}

const appInitSlice = createSlice({
  name: 'appInit',
  initialState,
  reducers: {
    setSeedWords(state, { payload }) {
      state.seedWords = payload
    },
    setEnteredSeedWords(state, { payload }) {
      state.enteredSeedWords = payload
    },
    setPassword(state, { payload }) {
      state.password = payload
    },
    setCurrentStep(state, { payload }) {
      state.currentStep = payload
    },
    setPrevSteps(state, { payload }) {
      state.prevSteps = [...payload]
    },
    setAppInitPath(state, { payload }) {
      state.appInitPath = payload
    },
    nullifyState(state) {
      state.seedWords = []
      state.enteredSeedWords = []
      state.password = ''
      state.confirmPassword = ''
      state.currentStep = steps.WELCOME
      state.prevSteps = []
      state.appInitPath = steps.NEW_SEED_WORDS
    },
  },
})

export const {
  setSeedWords,
  setEnteredSeedWords,
  setPassword,
  setCurrentStep,
  setPrevSteps,
  setAppInitPath,
  nullifyState,
} = appInitSlice.actions

export default appInitSlice.reducer
