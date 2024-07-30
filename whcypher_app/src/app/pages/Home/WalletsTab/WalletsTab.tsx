import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import WalletsList from './List/WalletsList'
import NoWallets from './NoWallets/NoWallets'
import { SContainer, SContent } from './styleds'

const WalletsTab = () => {
  const walletsData = useSelector((state: AppState) => state.wallets.walletsData)

  return (
    <SContainer>
      <SContent>{walletsData.length > 0 ? <WalletsList /> : <NoWallets />}</SContent>
    </SContainer>
  )
}

export default WalletsTab
