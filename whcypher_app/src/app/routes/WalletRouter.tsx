import React from 'react'
import { Route } from 'react-router-dom'

import {
  ADD_ASSET_PATH,
  ADD_NEW_ADDRESS_PATH,
  DELETE_ACCOUNT_PATH,
  DESTINATIONS_BOOK_PATH,
  EDIT_DESTINATION_NAME_PATH,
  EDIT_RPC_URLS,
  EXPORT_SEED_PATH,
  EXPORT_WALLETS_PATH,
  INIT_MULTISIG_SESSION_PATH,
  JOIN_MULTISIG_SESSION_PATH,
  KNOWN_HOSTS_PATH,
  SETTINGS_PATH,
  SUBSCRIPTION_PLAN_SELECT_PATH,
  WALLET_HOME_PATH,
  WALLET_MISSING_BACKUP_PATH,
  WALLET_NFT_PATH,
  WALLET_PAGE_PATH,
  WALLET_PARTICIPANTS_PATH,
  WALLET_REQUESTS_PATH,
  WALLET_SEND_FORM_PATH,
} from '../constants/paths'
import DeleteAccount from '../pages/DeleteAccount/DeleteAccount'
import AddNewDestination from '../pages/DestinationsBook/AddNewDestination'
import DestinationsBook from '../pages/DestinationsBook/DestinationsBook'
import EditDestinationName from '../pages/DestinationsBook/EditDestinationName'
import EditRpcUrls from '../pages/EditRpcUrls/EditRpcUrls'
import ExportSeed from '../pages/ExportSeed/ExportSeed'
import ExportWallets from '../pages/ExportWallets/ExportWallets'
import Home from '../pages/Home/Home'
import InitMultisigSession from '../pages/InitMultisigSession/InitMultisigSession'
import JoinMultisigSession from '../pages/JoinMultisigSession/JoinMultisigSession'
import KnownHosts from '../pages/KnownHosts/KnownHosts'
import Settings from '../pages/Settings/Settings'
import SubscriptionPlanSelect from '../pages/Subscription/Subscription'
import AddAsset from '../pages/WalletPage/AddAsset/AddAsset'
import MissingBackup from '../pages/WalletPage/MissingBackup/MissingBackup'
import WalletParticipants from '../pages/WalletPage/Participants/WalletParticipants'
import SendForm from '../pages/WalletPage/SendForm/SendForm'
import WalletNfts from '../pages/WalletPage/WalletNfts/WalletNfts'
import WalletPage from '../pages/WalletPage/WalletPage'
import WalletRequests from '../pages/WalletRequests/WalletRequests'

const WalletRouter = () => (
  <>
    <Route exact path={WALLET_HOME_PATH} component={Home} />

    <Route path={INIT_MULTISIG_SESSION_PATH} component={InitMultisigSession} />
    <Route path={JOIN_MULTISIG_SESSION_PATH} component={JoinMultisigSession} />

    <Route path={WALLET_PAGE_PATH} component={WalletPage} />
    <Route path={WALLET_SEND_FORM_PATH} component={SendForm} />

    <Route path={WALLET_REQUESTS_PATH} component={WalletRequests} />

    <Route path={ADD_ASSET_PATH} component={AddAsset} />
    <Route path={WALLET_PARTICIPANTS_PATH} component={WalletParticipants} />

    <Route path={WALLET_MISSING_BACKUP_PATH} component={MissingBackup} />
    <Route path={WALLET_NFT_PATH} component={WalletNfts} />

    <Route path={SETTINGS_PATH} component={Settings} />

    <Route path={EXPORT_WALLETS_PATH} component={ExportWallets} />
    <Route path={KNOWN_HOSTS_PATH} component={KnownHosts} />
    <Route path={DESTINATIONS_BOOK_PATH} component={DestinationsBook} />
    <Route path={EDIT_RPC_URLS} component={EditRpcUrls} />
    <Route path={ADD_NEW_ADDRESS_PATH} component={AddNewDestination} />
    <Route path={EDIT_DESTINATION_NAME_PATH} component={EditDestinationName} />
    <Route path={EXPORT_SEED_PATH} component={ExportSeed} />
    <Route path={DELETE_ACCOUNT_PATH} component={DeleteAccount} />
    <Route path={SUBSCRIPTION_PLAN_SELECT_PATH} component={SubscriptionPlanSelect} />
  </>
)

export default WalletRouter
