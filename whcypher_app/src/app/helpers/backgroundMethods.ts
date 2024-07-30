import { IAppRequest } from 'src/serviceWorker/app/store/reducers/requestsReducer'
import { IMessage } from 'src/shared/interfaces/interfaces'
import Browser from 'webextension-polyfill'

const sendMessage = (message: any, response?: any) => {
  Browser.runtime.sendMessage(undefined, message).then(response)
}

export const setAppInitPath = (path: any, response: any) => sendMessage({ func: 'setAppInitPath', path }, response)

export const nukeAppData = (response: any) => sendMessage({ func: 'nukeAppData' }, response)

export const setAppInitPassword = (password: any, response?: any) =>
  sendMessage({ func: 'setAppInitPassword', password }, response)

export const getWalletsBalances = (options: any, response: any) =>
  sendMessage({ func: 'getWalletsBalances', ...options }, response)

export const setCurrentStep = (step: any, response?: any) => sendMessage({ func: 'setCurrentStep', step }, response)

export const setPrevSteps = (steps: any, response?: any) => sendMessage({ func: 'setPrevSteps', steps }, response)

export const setBetaWarning = (response?: any) => sendMessage({ func: 'setBetaWarning' }, response)

export const setSnackBarSuccess = (message: any, response?: any) =>
  sendMessage({ func: 'setSnackBarSuccess', message }, response)

export const setSnackBarWarning = (message: any, response?: any) =>
  sendMessage({ func: 'setSnackBarWarning', message }, response)

export const setSnackBarError = (message: any, response?: any) =>
  sendMessage({ func: 'setSnackBarError', message }, response)

export const closeSnackBar = (response?: any) => sendMessage({ func: 'closeSnackBar' }, response)

export const nullifyAppInitState = (response: any) => sendMessage({ func: 'nullifyAppInitState' }, response)

export const generateNewSeed = (response?: any) => sendMessage({ func: 'generateNewSeed' }, response)

export const setEnteredSeedWords = (seedWords: any, response?: any) =>
  sendMessage({ func: 'setEnteredSeedWords', seedWords }, response)

export const importSeed = (seedWords: any, password: any, response: any) =>
  sendMessage({ func: 'importSeed', seedWords, password }, response)

export const syncAccountDataOnImport = (accountIndex: any, password: any, response: any) =>
  sendMessage({ func: 'syncAccountDataOnImport', accountIndex, password }, response)

export const syncActiveAccountData = (response?: any) => sendMessage({ func: 'syncActiveAccountData' }, response)

export const clearSeed = (response: any) => sendMessage({ func: 'clearSeed' }, response)

export const getSeedPhrase = (password: any, response: any) =>
  sendMessage({ func: 'getSeedPhrase', password }, response)

export const appClearState = (response: any) => sendMessage({ func: 'appClearState' }, response)

export const unlockApp = (pass: any, response: any) => {
  sendMessage({ func: 'unlockApp', password: pass }, response)
}

export const lockApp = (response: any) => sendMessage({ func: 'lockApp' }, response)

export const switchToAccount = (index: any, response: any) => sendMessage({ func: 'switchToAccount', index }, response)

export const addRequest = (request: IAppRequest) => sendMessage({ func: 'addRequest', request })

export const removeRequest = (requestMatcher: any, response?: any) =>
  sendMessage({ func: 'removeRequest', requestMatcher }, response)

export const removeWalletRequest = (requestMatcher: any, response: any) =>
  sendMessage({ func: 'removeWalletRequest', requestMatcher }, response)

export const updateActiveAccountName = (newAccountName: any, response: any) =>
  sendMessage({ func: 'updateActiveAccountName', newAccountName }, response)

export const deleteActiveAccount = (password: any, response: any) =>
  sendMessage({ func: 'deleteActiveAccount', password }, response)

export const syncWalletBackupsWithRemote = () => sendMessage({ func: 'syncWalletBackupsWithRemote' })

export const syncActivitiesWithServer = () => sendMessage({ func: 'syncActivitiesWithServer' })

export const updateSettings = (newSettings: any, response?: any) =>
  sendMessage({ func: 'updateSettings', newSettings }, response)

export const syncCurrencyRates = () => sendMessage({ func: 'syncCurrencyRates' })

export const monitorGroupTransactionRequests = () => sendMessage({ func: 'monitorGroupTransactionRequests' })

export const executeAutoApprovalRequests = () => sendMessage({ func: 'executeAutoApprovalRequests' })

export const cleanupExpiredGroupTransactionRequests = () =>
  sendMessage({ func: 'cleanupExpiredGroupTransactionRequests' })

export const pingRemoteIAmOnline = () => sendMessage({ func: 'pingRemoteIAmOnline' })

export const exportSelectedWallets = (walletIds: any, response: any) =>
  sendMessage({ func: 'exportSelectedWallets', walletIds }, response)

export const importWalletsData = (walletsDataEncrypted: any, response: any) =>
  sendMessage({ func: 'importWalletsFromFile', walletsDataEncrypted }, response)

export const initMultisigSession = (
  blockchain: any,
  minimumSigAmount: any,
  participantsAmount: any,
  path: any,
  response: any,
) => sendMessage({ func: 'initMultisigSession', blockchain, minimumSigAmount, participantsAmount, path }, response)

export const getMultisigSessionData = (sessionId: any, response: any) =>
  sendMessage({ func: 'getMultisigSessionData', sessionId }, response)

export const resolveMultisigSession = (sessionId: any) => sendMessage({ func: 'resolveMultisigSession', sessionId })

export const joinMultisigSession = (sessionId: any, path: any, response: any) =>
  sendMessage({ func: 'joinMultisigSession', sessionId, path }, response)

export const rejectMultisigSession = (sessionId: any, response?: any) =>
  sendMessage({ func: 'rejectMultisigSession', sessionId }, response)

export const getActiveAccountHDPubKey = (path: any, response: any) =>
  sendMessage({ func: 'getActiveAccountHDPubKey', path }, response)

export const addKnownDestination = (blockchain: any, address: any, name: any, response: any) =>
  sendMessage({ func: 'addKnownDestination', blockchain, address, name }, response)

export const updateKnownDestinationName = (blockchain: any, address: any, name: any, response: any) =>
  sendMessage({ func: 'updateKnownDestinationName', blockchain, address, name }, response)

export const getWalletMetaInfo = (walletId: string, response: any) =>
  sendMessage({ func: 'getWalletMetaInfo', walletId }, response)

export const getBlockchainMetaInfo = (blockchain: string, response: any) =>
  sendMessage({ func: 'getBlockchainMetaInfo', blockchain }, response)

export const getAdapterMetaInfo = (blockchain: string, assetData: any, from: string, response: any) =>
  sendMessage({ func: 'getAdapterMetaInfo', blockchain, assetData, from }, response)

export const deleteKnownDestination = (blockchain: any, address: any, response: any) =>
  sendMessage({ func: 'deleteKnownDestination', blockchain, address }, response)

export const signAddress = ({ network, address }: any) => sendMessage({ func: 'signAddress', network, address })

export const addKnownHost = (host: any, response: any) => sendMessage({ func: 'addKnownHost', host }, response)

export const deleteKnownHost = (host: any, response: any) => sendMessage({ func: 'deleteKnownHost', host }, response)

export const backupWalletDataOnRemote = (walletId: any, response: any) =>
  sendMessage({ func: 'backupWalletDataOnRemote', walletId }, response)

export const setActiveAccountHiddenBlockchain = (blockchain: any, state: any, response: any) =>
  sendMessage({ func: 'setActiveAccountHiddenBlockchain', blockchain, state }, response)

export const setActiveAccountUnhideBlockchainWallets = (blockchain: any, state: any, response: any) =>
  sendMessage({ func: 'setActiveAccountUnhideBlockchainWallets', blockchain, state }, response)

export const getMissingWalletsBalances = (response: any) =>
  sendMessage({ func: 'getWalletsBalances', filterName: 'missing' }, response)

export const setActiveAccountHiddenWallet = (walletId: any, state: any, response: any) =>
  sendMessage({ func: 'setActiveAccountHiddenWallet', walletId, state }, response)

export const provideErrorOnRequestPermission = (webPageRequest: any, error: any) =>
  sendMessage({ func: 'provideErrorOnRequestPermission', webPageRequest, error })

export const provideMessageHashSignatureOnRequestPermission = (webPageRequest: any, response: any) =>
  sendMessage({ func: 'provideMessageHashSignatureOnRequestPermission', webPageRequest }, response)

export const provideDestinationsSignaturesOnRequestPermission = (
  webPageRequest: any,
  accountData: any,
  response: any,
) => sendMessage({ func: 'provideDestinationsSignaturesOnRequestPermission', webPageRequest, accountData }, response)

export const joinMultisigSessionAndProvideSignedAddress = (
  webPageRequest: any,
  accountData: any,
  path: any,
  response?: any,
) => sendMessage({ func: 'joinMultisigSessionAndProvideSignedAddress', webPageRequest, accountData, path }, response)

export const cancelAutoApproval = (sessionId: any, response: any) =>
  sendMessage({ func: 'cancelAutoApproval', sessionId }, response)

export const getCurrentAccountSubscriptionData = (response: any) =>
  sendMessage({ func: 'getCurrentAccountSubscriptionData' }, response)

export const getPendingSubscriptionPayments = (response: any) =>
  sendMessage({ func: 'getPendingSubscriptionPayments' }, response)

export const getSubscriptionPaymentPlans = (response: any) =>
  sendMessage({ func: 'getSubscriptionPaymentPlans' }, response)

export const getSubscriptionPaymentPeriods = (subscriptionPlan: any, referralCode: any, response: any) =>
  sendMessage({ func: 'getSubscriptionPaymentPeriods', subscriptionPlan, referralCode }, response)

export const getSubscriptionPaymentMethods = (
  subscriptionPlan: any,
  referralCode: any,
  paymentPeriod: any,
  response: any,
) => sendMessage({ func: 'getSubscriptionPaymentMethods', subscriptionPlan, referralCode, paymentPeriod }, response)

export const initSubscriptionPayment = (
  subscriptionPlan: any,
  referralCode: any,
  paymentPeriod: any,
  paymentMethod: any,
  response: any,
) =>
  sendMessage(
    { func: 'initSubscriptionPayment', subscriptionPlan, referralCode, paymentPeriod, paymentMethod },
    response,
  )

export const fetchAssetData = (blockchain: any, assetAddress: any, response: any) =>
  sendMessage({ func: 'fetchAssetData', blockchain, assetAddress }, response)

export const addAssetToWallet = (walletId: any, assetData: any, response: any) =>
  sendMessage({ func: 'addAssetToWallet', walletId, assetData }, response)

export const updateWalletName = ($walletId: any, newWalletName: any, response: any) =>
  sendMessage({ func: 'updateWalletName', walletId: $walletId, newWalletName }, response)

export const getWalletData = (walletId: any, response: any) =>
  sendMessage({ func: 'getWalletData', walletId }, response)

export const updateWalletBalances = (walletId: any, response: any) =>
  sendMessage({ func: 'updateWalletBalances', walletId }, response)

export const getAvailableERC721 = (walletId: any, assetId: any, response: any) =>
  sendMessage({ func: 'getAvailableERC721', walletId, assetId }, response)

export const estimateTransactionFee = (
  blockchain: any,
  assetData: any,
  from: any,
  spendData: any,
  feeData: any,
  response: any,
) => sendMessage({ func: 'estimateTransactionFee', blockchain, assetData, from, spendData, feeData }, response)

export const initTransaction = (walletId: any, assetData: any, spendData: any, feeData: any, response: any) =>
  sendMessage({ func: 'initTransaction', walletId, assetData, spendData, feeData }, response)

export const initDappTransaction = (walletId: any, rawData: any, feeData: any, response: any) =>
  sendMessage({ func: 'initDappTransaction', walletId, feeData, rawData }, response)

export const initSignRawMessage = (walletId: any, rawData: any, response: any) =>
  sendMessage({ func: 'initSignRawMessage', walletId, rawData }, response)

// [FIXME] we can not implement this method yet as this will require compilation of a provate key
export const getEncryptionPublicKey = (dappMessage: IMessage, response: any) =>
  sendMessage({ func: 'getEncryptionPublicKey', dappMessage }, response)

// [FIXME] we can not implement this method yet as this will require compilation of a provate key
export const decryptDappMessage = (dappMessage: IMessage, response: any) =>
  sendMessage({ func: 'decryptDappMessage', dappMessage }, response)

export const joinTransactionSession = (walletId: any, sessionId: any, response: any) =>
  sendMessage({ func: 'joinTransactionSession', walletId, sessionId }, response)

export const resolveTransactionSession = (sessionId: any, broadcast = true) =>
  sendMessage({ func: 'resolveTransactionSession', sessionId, broadcast })

export const rejectTransactionSession = (sessionId: any, response: any) =>
  sendMessage({ func: 'rejectTransactionSession', sessionId }, response)

export const closePopup = (requestId?: any) => sendMessage({ func: 'closePopup', id: requestId })

export const openImportWalletsInNewWindow = (response: any) =>
  sendMessage({ func: 'openImportWalletsInNewWindow' }, response)

// export const printLog = (log) => sendMessage( { func: 'printLog', log });
