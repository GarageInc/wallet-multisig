// Consider it this files is needed at all now
import { useMemo } from 'react'
import { useStore } from 'react-redux'
import DAppsController from 'src/serviceWorker/app/controllers/dapps/DAppsController'
import DappsProvidersController from 'src/serviceWorker/app/controllers/dapps/DappsProvidersController'
import NotifierController from 'src/serviceWorker/app/controllers/NotifierController'
import { DappChainsResolver } from 'src/serviceWorker/app/models/DappChainsResolver'
import DappMessageParser from 'src/serviceWorker/app/models/DappMessageParser'
import { AppState } from 'src/serviceWorker/app/store/store'

export const useDAppsController = () => {
  const store = useStore<AppState>()
  return useMemo(() => new DAppsController(store), [store])
}

export const useDAppsProvidersController = () => {
  const store = useStore<AppState>()
  return useMemo(() => new DappsProvidersController(store), [store])
}

export const useChainsController = () => {
  const store = useStore<AppState>()
  return useMemo(() => new DappChainsResolver(store), [store])
}

export const useDappMessageParser = () => {
  const store = useStore<AppState>()
  return useMemo(() => new DappMessageParser(store), [store])
}

export const useNotifications = () => {
  return {
    addNotification: ({ title, message }: { title: string; message: string }) => {
      NotifierController.create(title, message)
    },
  }
}
