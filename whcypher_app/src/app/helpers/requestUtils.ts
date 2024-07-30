import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'

export const filterRequestsByTypeAndPubKey = (
  requests: IWalletRequest[],
  requestTypes: any,
  accountPubKey?: string,
): IWalletRequest[] => {
  return requests.filter((req) => {
    if (accountPubKey && req.accountPubKey) {
      return Object.keys(requestTypes).includes(req.requestName) && accountPubKey === req.accountPubKey
    } else {
      return Object.keys(requestTypes).includes(req.requestName)
    }
  })
}
