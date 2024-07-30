// Move business logic to approprately called models and methods
import { Store } from '@reduxjs/toolkit'
import { PartialPick } from '@types/partial'
import logger from 'src/app/helpers/appLogger'
import { IWalletData } from 'src/serviceWorker/app/store/reducers/walletsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'
import { IMessage } from 'src/shared/interfaces/interfaces'

export interface WalletCredentials {
  walletPassword: string
}

class DappMessageParser {
  #store: Store<AppState>

  constructor(store: Store<AppState>) {
    this.#store = store
  }

  static getFromAccountIMessage(imsg: PartialPick<IMessage, 'raw'>): string | undefined {
    return imsg?.raw?.params?.from || imsg?.raw?.params?.[0]?.from || imsg?.raw?.params?.[0]
  }

  /**
   *
   * @param _dappMessage
   * @returns walletId
   * @throws if the address could not be found in the wallet
   */
  getWalletIdWithMessage = (_dappMessage: IMessage): string => {
    const { walletsData: wallets } = this.#store.getState().wallets

    const fromAddr = DappMessageParser.getFromAccountIMessage(_dappMessage)

    const fromAddrStr = String(fromAddr).toLowerCase()

    const walletsArr = wallets

    logger.debug({ fromAddr, walletsArr, wallets })

    const wallet = walletsArr.find((w: IWalletData) => {
      // Some dapps does n't provide chainId, need to take first matched by address (for ex 'personal_sign' method)
      const matchBlockchain = _dappMessage.chainId ? _dappMessage.chainId === w.blockchain : true
      return w.calculatedAddress?.toLowerCase().includes(fromAddrStr) && matchBlockchain
    })

    return wallet?.walletId || ''
  }
}

export default DappMessageParser
