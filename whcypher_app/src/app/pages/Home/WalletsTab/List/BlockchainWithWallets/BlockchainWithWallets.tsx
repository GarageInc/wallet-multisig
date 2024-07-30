import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from 'src/app/componentElements'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { filterWalletsOfBlockchain } from '../../utilts'
import { BlockchainInfo } from './BlockchainInto/BlockchainInfo'
import { BlockchainWallet } from './BlockchainWallet/BlockchainWallet'
import { SHiddenBox } from './styleds'

export const BlockchainWithWallets = ({
  blockchain,
  walletsDataWithRequests,
}: {
  blockchain: BlockchainNames
  walletsDataWithRequests: IWalletData[]
}) => {
  const hiddenBlockchains = useSelector(
    (state: AppState) => state.application.activeAccountData.hiddenBlockchains || [],
  )
  const unhideBlockchainWallets = useSelector(
    (state: AppState) => state.application.activeAccountData.unhideBlockchainWallets || [],
  )

  const blockchainWalletsToShow = useMemo(() => {
    const walletsData = filterWalletsOfBlockchain(walletsDataWithRequests, blockchain)
    const walletsDataWithPresentRequests = walletsData.filter(
      (walletData: IWalletData) => walletData.requests.length > 0,
    )
    return hiddenBlockchains.includes(blockchain) ? walletsDataWithPresentRequests : walletsData
  }, [walletsDataWithRequests, hiddenBlockchains, blockchain])

  const visible = unhideBlockchainWallets.includes(blockchain)

  const hasHidden = blockchainWalletsToShow.some((w) => w.isHidden)

  return (
    <>
      <BlockchainInfo
        blockchain={blockchain}
        hiddenBlockchains={hiddenBlockchains}
        walletsDataWithRequests={walletsDataWithRequests}
        unhideBlockchainWallets={unhideBlockchainWallets}
      />
      {blockchainWalletsToShow.map((walletData: IWalletData) => {
        if (walletData.requests.length == 0 && walletData.isHidden && !visible) return null

        return <BlockchainWallet key={walletData.walletId} walletData={walletData} />
      })}

      {!hiddenBlockchains.includes(blockchain) && !visible && hasHidden && (
        <SHiddenBox>
          <Typography textAlign="left">Hidden wallets</Typography>
        </SHiddenBox>
      )}
    </>
  )
}
