import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FailedRegistration from '../components/FailedRegistration'
import {
  APP_INIT_PATH,
  APP_UNLOCK_PATH,
  CHANGE_ACCOUNT_PATH,
  FAILED_REGISTRATION,
  FORGOT_PASSWORD_PATH,
  POPUP_URLS,
  SIGN_DESTINATION_PATH,
  SIGNING_IN,
  TERMS_OF_USE_PATH,
  WALLET_HOME_PATH,
} from '../constants/paths'
import { useAppTabParams } from '../hooks/useAppTabParams'
import ApppInit from '../pages/AppInit/AppInit'
import AppUnlock from '../pages/AppUnlock/AppUnlock'
import ForgotPassword from '../pages/AppUnlock/ForgotPassword'
import AppUnlocked from '../pages/AppUnlocked/AppUnlocked'
import Authenticated from '../pages/Authenticated'
import CustomToken from '../pages/CustomToken/CustomToken'
import DAppConnect from '../pages/DappConnect/DappConnect'
import DappRequestPermissionsPage from '../pages/DappRequestPermissionsPage/DappRequestPermissionsPage'
import DAppTransaction from '../pages/DappTransaction/DappTransaction'
import SignDestination from '../pages/DestinationsBook/SignDestination'
import EvmDecrypt from '../pages/EvmDecrypt/EthDecrypt'
import ImportWallets from '../pages/ImportWallets/ImportWallets'
import NotSupportedRpcMethod from '../pages/NotSupportedRpcMethod/NotSupportedRpcMethod'
import PublicKeyEncryption from '../pages/PublicKeyEncryption/PublicKeyEncryption'
import RequestPermission from '../pages/RequestPermission/RequestPermission'
import ChangeAccount from '../pages/RequestPermission/RequestPermission/LoginRequest/ChangeAccount'
import SigningIn from '../pages/RequestPermission/SigningIn'
import SignatureRequested from '../pages/SignatureRequested/SignatureRequested'
import SwitchChain from '../pages/SwitchChain/SwitchChain'
import TermsOfUse from '../pages/TermsOfUse/TermsOfUse'

const ApplicationMainRouter = () => {
  const { isPopup: isExtensionIsOpenedInTab, redirectUrl } = useAppTabParams()
  return (
    <>
      <Switch>
        <Route path={APP_UNLOCK_PATH} component={() => <AppUnlock redirectUrl={redirectUrl} />} />
        <Route path={FORGOT_PASSWORD_PATH} component={ForgotPassword} />
        <Route path={APP_INIT_PATH} component={ApppInit} />

        <Route path={WALLET_HOME_PATH} component={AppUnlocked} />

        <Route path={CHANGE_ACCOUNT_PATH} component={ChangeAccount} />
        <Route path={SIGNING_IN} component={SigningIn} />
        <Route path={FAILED_REGISTRATION} component={FailedRegistration} />
        <Route path={SIGN_DESTINATION_PATH} component={SignDestination} />
        <Route path={TERMS_OF_USE_PATH} component={TermsOfUse} />

        <Route path={POPUP_URLS.REQ_PERMISSION} component={RequestPermission} />
        <Route path={POPUP_URLS.IMPORT_WALLETS} component={ImportWallets} />

        <Route path={POPUP_URLS.DAPP_CONNECT_PATH} component={DAppConnect} />
        <Route path={POPUP_URLS.DAPP_REQUEST_PERMISSION} component={DappRequestPermissionsPage} />
        <Route path={POPUP_URLS.DAPP_WATCH_ASSET} component={CustomToken} />

        <Route path={POPUP_URLS.SIGN_MSG_PATH} component={SignatureRequested} />
        <Route path={POPUP_URLS.TRANSACTIONAL} component={DAppTransaction} />

        <Route path={POPUP_URLS.ENCRYPT} component={PublicKeyEncryption} />
        <Route path={POPUP_URLS.DECRYPT} component={EvmDecrypt} />

        <Route path={POPUP_URLS.SWITCH_CHAIN} component={SwitchChain} />

        <Route path={POPUP_URLS.NOT_FOUND_RPC} component={NotSupportedRpcMethod} />

        <Route path="/" component={AppUnlocked} />
      </Switch>

      <Authenticated isExtensionIsOpenedInTab={isExtensionIsOpenedInTab} redirectUrl={redirectUrl} />
    </>
  )
}

export default ApplicationMainRouter
