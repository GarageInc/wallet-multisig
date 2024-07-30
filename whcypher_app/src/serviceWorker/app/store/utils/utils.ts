import { Store } from '@reduxjs/toolkit'
import { isArray } from 'lodash'

import { removeConnectedDApp } from '../reducers/dapps/dapps'
import { IDAppController } from '../reducers/dapps/types'
import { AppState } from '../store'

export const isWalletConnected = (walletId: string, store: Store<AppState>) => {
  const { dappsConnections, currentTab }: IDAppController = store.getState().dapps
  if (!dappsConnections?.[currentTab?.id]) return false
  if (isArray(dappsConnections?.[currentTab?.id]?.walletIds)) {
    return dappsConnections?.[currentTab?.id]?.walletIds?.includes(walletId)
  }
  store.dispatch(removeConnectedDApp({ dappId: currentTab?.id }))
  return false
}
