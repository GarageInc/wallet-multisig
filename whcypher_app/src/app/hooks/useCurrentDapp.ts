import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

export const useCurrentDapp = () => {
  const currentTab = useSelector((s: AppState) => s.dapps.currentTab)

  // [TODO] Rename to currentTabId
  const { id: targetDappId } = currentTab
  const connectedDapps = useSelector((s: AppState) => s.dapps.dappsConnections)

  const dapp = connectedDapps[targetDappId]

  return dapp
}
