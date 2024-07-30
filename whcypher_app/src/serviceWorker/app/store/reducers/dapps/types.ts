import { ICurrentTab } from 'src/serviceWorker/app/types/interfaces'

export interface ITab {
  faviconUrl: string
  title: string
}

export interface IConnected extends ITab {
  walletIds: string[]
}

export interface IDAppController {
  dappsConnections: Record<string, IConnected> // as a key use site url and value is wallet that connected to site
  currentTab: ICurrentTab
}
