import { Store } from 'redux'
import { AppState } from 'src/serviceWorker/app/store/store'

export const getDappEthereumChain = (store: Store<AppState>) => {
  const {
    application: { currentChain },
  } = store.getState()
  return currentChain
}
