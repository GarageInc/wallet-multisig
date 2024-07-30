import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

export const useCurrentDappProviderChain = () => {
  const currentChain = useSelector((s: AppState) => {
    return s.application.currentChain
  })

  return currentChain
}
