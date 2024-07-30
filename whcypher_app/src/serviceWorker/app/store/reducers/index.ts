import { combineReducers } from 'redux'

import accountActivitiesReducer from './accountActivitiesReducer'
import appInitReducer from './appInitReducer'
import applicationReducer from './applicationReducer'
import backupStatusReducer from './backupStatusReducer'
import badgeReducer from './badgeReducer'
import currencyRatesReducer from './currencyRatesReducer'
import dappsReducer from './dapps/dapps'
import dappsConnectReducer from './dappsConnect/dappsConnect'
import dappsMessagesReducer from './dappsMessages/dappsMessages'
import dappsProvidersReducer from './dappsProviders/dappsProviders'
import knownDestinationsReducer from './knownDestinationsReducer'
import knownHostsReducer from './knownHostsReducer'
import multisigSessionsReducer from './multisigSessionsReducer'
import requestsReducer from './requestsReducer'
import settingsReducer from './settingsReducer'
import snackbarReducer from './snackbarReducer'
import subscriptionReducer from './subscriptionReducer'
import transactionSessionsReducer from './transactionSessionsReducer'
import walletRequestsReducer from './walletRequestsReducer'
import walletsReducer from './walletsReducer'

export default combineReducers({
  snackbar: snackbarReducer,
  appInit: appInitReducer,
  application: applicationReducer,
  backupStatus: backupStatusReducer,
  accountActivities: accountActivitiesReducer,
  requests: requestsReducer,
  walletRequests: walletRequestsReducer,
  wallets: walletsReducer,
  multisigSessions: multisigSessionsReducer,
  transactionSessions: transactionSessionsReducer,
  currencyRates: currencyRatesReducer,
  settings: settingsReducer,
  subscription: subscriptionReducer,
  badge: badgeReducer,
  knownDestinations: knownDestinationsReducer,
  knownHosts: knownHostsReducer,
  dappsProviders: dappsProvidersReducer,
  dapps: dappsReducer,
  dappsConnect: dappsConnectReducer,
  dappsMessages: dappsMessagesReducer,
})

export const createRootReducer = () => {
  const rootReducerFn = combineReducers({
    snackbar: snackbarReducer,
    appInit: appInitReducer,
    application: applicationReducer,
    backupStatus: backupStatusReducer,
    accountActivities: accountActivitiesReducer,
    requests: requestsReducer,
    walletRequests: walletRequestsReducer,
    wallets: walletsReducer,
    multisigSessions: multisigSessionsReducer,
    transactionSessions: transactionSessionsReducer,
    currencyRates: currencyRatesReducer,
    settings: settingsReducer,
    subscription: subscriptionReducer,
    badge: badgeReducer,
    knownDestinations: knownDestinationsReducer,
    knownHosts: knownHostsReducer,
    dappsProviders: dappsProvidersReducer,
    dapps: dappsReducer,
    dappsConnect: dappsConnectReducer,
    dappsMessages: dappsMessagesReducer,
  })

  return (state, action) => rootReducerFn(action.type === 'RESET' ? undefined : state, action)
}
