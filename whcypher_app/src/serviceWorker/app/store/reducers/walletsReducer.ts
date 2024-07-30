import { createSlice } from '@reduxjs/toolkit'
import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'

import { IWalletRequest } from './walletRequestsReducer'

export interface IWalletData {
  joinedParties: any[]
  accountPubKey: string
  assetsData: any[]
  balances?: any[]
  blockchain: BlockchainNames
  calculatedAddress: string
  calculatedPubKey: string
  createdAt: number
  isBackup: boolean
  isHidden: boolean
  minimumSigAmount: number
  name: string
  protocolVersion: string
  paillierPubKeys: any[]
  participants: string[]
  partiesAmount: number
  partyId: number
  path: string
  secretsEncrypted: string
  sessionId?: string
  supportedAssets: any[]
  walletId: string
  requests: IWalletRequest[]
  encryptedVaultName: string
}

interface IWalletsState {
  walletsData: IWalletData[]
}

const initialState: IWalletsState = {
  walletsData: [],
}

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    appendWallet(state, { payload }) {
      state.walletsData.push({ ...payload.walletData })
    },
    updateWallet(state, { payload }) {
      const walletPosition = state.walletsData.findIndex((walletData) => walletData.walletId === payload.walletId)
      state.walletsData[walletPosition] = payload.walletData
    },
    setWallets(state, { payload }) {
      state.walletsData = [...payload]
    },
    resetState(state) {
      state.walletsData = []
    },
  },
})

export const { appendWallet, updateWallet, setWallets, resetState } = walletsSlice.actions

export default walletsSlice.reducer
