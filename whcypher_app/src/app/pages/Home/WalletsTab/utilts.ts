import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'

export const filterWalletsOfBlockchain = (walletsData: IWalletData[], blockchain: string) =>
  walletsData.filter((walletData) => walletData.blockchain === blockchain)
