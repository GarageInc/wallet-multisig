import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { filterRequestsByTypeAndPubKey } from 'src/app/helpers/requestUtils'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { WALLET_REQUEST_TYPES } from '../../../../constants/requestTypes'
import { BlockchainWithWallets } from './BlockchainWithWallets/BlockchainWithWallets'
import { SContainer, SSection } from './styleds'

const addRequestsToWalletsData = (walletsData: IWalletData[], requestsList: IWalletRequest[], pubKey: string) =>
  walletsData.map((walletData, index) => {
    const walletDataWithRequest = { ...walletData, requests: [] as IWalletRequest[], index }
    filterRequestsByTypeAndPubKey(requestsList, WALLET_REQUEST_TYPES, pubKey).forEach((request: IWalletRequest) => {
      if (
        walletDataWithRequest.blockchain === request.blockchain &&
        walletDataWithRequest.calculatedAddress === request.from
      ) {
        walletDataWithRequest.requests.push(request)
      }
    })
    return walletDataWithRequest
  })

const WalletsList = () => {
  const walletsData = useSelector((state: AppState) => state.wallets.walletsData)

  const requestsList: IWalletRequest[] = useSelector((state: AppState) => state.walletRequests.requestsList)
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)

  const walletsDataWithRequests = useMemo(
    () => addRequestsToWalletsData(walletsData, requestsList, activeAccountPubkey),
    [walletsData, requestsList, activeAccountPubkey],
  )

  const allBlockchains: BlockchainNames[] = [
    ...new Set(
      walletsDataWithRequests.reduce((a: any, c: any) => (c.blockchain ? [...a, c.blockchain] : a), [] as string[]),
    ),
  ] as BlockchainNames[]

  return (
    <SContainer>
      {allBlockchains.map((blockchain) => (
        <SSection key={blockchain}>
          <BlockchainWithWallets blockchain={blockchain} walletsDataWithRequests={walletsDataWithRequests} />
        </SSection>
      ))}
    </SContainer>
  )
}

export default WalletsList
