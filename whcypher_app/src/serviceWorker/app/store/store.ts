import { configureStore, Store } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { setupReduxed } from 'reduxed-chrome-storage'

import combineReducers, { createRootReducer } from './reducers'

// const globalChangeListener = (store, previousState) => {
//   const state = store.getState();
//   // Below is an example how to filter down state changes
//   // by comparing current state with previous one
//   const diff = diffDeep(state, previousState);
//   console.log("global state diff: ", diff)
//   // if (diff && ['someKey', 'anotherKey'].some(key => key in diff)) {
//   //   console.log("global changes")
//   // }
// };

// const localChangeListener = (store, previousState) => {
//   const state = store.getState();
//   const diff = diffDeep(state, previousState);
//   // Another (a simpler) example how to filter down state changes
//   console.log("local state diff: ", diff);
//   // if (isEqual(state.someKey, previousState.someKey)) {
//   //   // console.log("local state: ", state)
//   // }
// };

// const errorListener = (store, previousState) => {
//   const state = store.getState();
//   // Another (a simpler) example how to filter down state changes
//   console.log("error state: ", state)
//   // if (isEqual(state.someKey, previousState.someKey)) {
//   //   // console.log("local state: ", state)
//   // }
// };

const reduxOptions = {
  storageKey: 'reduxed',
  storageArea: 'local',
}

const listeners = {
  // onGlobalChange: globalChangeListener,
  // onLocalChange: localChangeListener,
  // onError: errorListener,
}

export type IStoreController = ReturnType<typeof combineReducers>

let store: Store<IStoreController>
const storeCreatorContainer = (preloadedState?: AppState) => {
  store = configureStore({
    reducer: createRootReducer(),
    preloadedState,
    // uncomment if you want a log for every dispatched action
    middleware(getDefaultMiddleware) {
      if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger({
          collapsed: true,
        })

        return getDefaultMiddleware().concat(loggerMiddleware)
      } else {
        return getDefaultMiddleware()
      }
    },
  })

  return store
}

export const getReduxedStore: any = setupReduxed(storeCreatorContainer, reduxOptions, listeners)

let reduxedStore

export const getStore = async () => {
  if (!reduxedStore) {
    reduxedStore = await getReduxedStore()
  }

  return reduxedStore
}

export type AppState = ReturnType<typeof store.getState>
