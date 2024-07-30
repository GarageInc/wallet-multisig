import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useSelector } from 'react-redux'
import { useCurrentDapp } from 'src/app/hooks/useCurrentDapp'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'
import { AppState } from 'src/serviceWorker/app/store/store'

import { SBadge } from './styled'

// We show green badge in 3 cases:
// 1) Web3 tab in account header
// 2) Currently active network (application wide and this info is available though web3 to all dapps)
// 3) Currently active wallet (dapp specific, and only visible when currently active tab is showing a dapp)
export const ConnectedBadge = ({
  blockchain, // [TODO] rename comparedBlockchain???
  walletId, // [TODO] rename comparedWallet???
  ifConnected, // [TODO] rename to isAccountHeaderTab or similar
}: {
  blockchain?: BlockchainNames
  walletId?: string
  ifConnected?: boolean
}) => {
  // [TODO] Rename to currentDapp
  const dapp = useCurrentDapp()
  const isWeb3Enabled = useSelector((store: AppState) => store.dappsProviders.settings.prioritiseMultisig)
  // Here we should take into account currently active chain

  const wallet = useDappActiveWallet()

  if (ifConnected && isWeb3Enabled) {
    return <SBadge />
  }

  if (!isWeb3Enabled || !wallet) {
    return null
  }

  if (blockchain && wallet.blockchain !== blockchain) {
    return null
  }

  if (walletId && wallet.walletId !== walletId) {
    return null
  }

  if (!dapp) {
    return null
  }

  return <SBadge />
}
