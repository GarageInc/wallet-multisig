export const APP_INIT_PATH = '/app_init'

export const APP_UNLOCK_PATH = '/app_unlock'
export const FORGOT_PASSWORD_PATH = '/forgot_password'
export const AGREEMENT_PATH = '/agreement'
export const IMPORT_SEED_PATH = '/import_seed'
export const ADD_ACCOUNT_PATH = '/add_account'
export const REQUEST_PERMISSION = '/request_permission'
export const LANDING_PATH = '/landing'
export const CHANGE_ACCOUNT_PATH = '/change_account'
export const SIGNING_IN = '/signing_in'
export const SIGN_DESTINATION_PATH = '/sign_destination'
export const COUNTER_DEAL = '/counter_deal'
export const ACCOUNTS = '/accounts'
export const FAILED_REGISTRATION = '/faild_registration'
export const TERMS_OF_USE_PATH = '/terms_of_use'

export const WALLET_HOME_PATH = '/home'
export const INIT_MULTISIG_SESSION_PATH = `${WALLET_HOME_PATH}/initVaultSession`
export const JOIN_MULTISIG_SESSION_PATH = `${WALLET_HOME_PATH}/joinVaultSession`
export const CHANGE_PATH_PATH = `${WALLET_HOME_PATH}/changePath`
export const WALLET_PAGE_PATH = `${WALLET_HOME_PATH}/wallet`
export const WALLET_SEND_FORM_PATH = `${WALLET_HOME_PATH}/wallet_send_form`
export const WALLET_REQUESTS_PATH = `${WALLET_HOME_PATH}/requests`
export const ADD_ASSET_PATH = `${WALLET_HOME_PATH}/add_asset`
export const WALLET_NFT_PATH = `${WALLET_HOME_PATH}/wallet_nft`
export const SETTINGS_PATH = `${WALLET_HOME_PATH}/settings`
export const DELETE_ACCOUNT_PATH = `${WALLET_HOME_PATH}/delete-account`
export const EXPORT_WALLETS_PATH = `${WALLET_HOME_PATH}/export_wallets`
export const IMPORT_WALLETS_PATH = `/import_wallets`
export const FAILED_IMPORT = '/failed_import'
export const SUCCESS_IMPORT = '/success_import'
export const KNOWN_HOSTS_PATH = `${WALLET_HOME_PATH}/known_hosts`
export const EXPORT_SEED_PATH = `${WALLET_HOME_PATH}/export-seed`
export const EDIT_RPC_URLS = `${WALLET_HOME_PATH}/edit-rpc`
export const DESTINATIONS_BOOK_PATH = `${WALLET_HOME_PATH}/destinations_book`
export const ADD_NEW_ADDRESS_PATH = `${WALLET_HOME_PATH}/add_new_destination`
export const EDIT_DESTINATION_NAME_PATH = `${WALLET_HOME_PATH}/edit_destination_name`
export const WALLET_PARTICIPANTS_PATH = `${WALLET_HOME_PATH}/participation`
export const WALLET_MISSING_BACKUP_PATH = `${WALLET_HOME_PATH}/missing_backup`
export const SUBSCRIPTION_PLAN_SELECT_PATH = `${WALLET_HOME_PATH}/subscription/plan_select`

export enum POPUP_URLS {
  DAPP_CONNECT_PATH = '/dapp_connect',
  DAPP_REQUEST_PERMISSION = '/dapp_request_permissions',
  DAPP_WATCH_ASSET = '/watch-asset',
  REQ_PERMISSION = REQUEST_PERMISSION,
  IMPORT_WALLETS = IMPORT_WALLETS_PATH,
  SIGN_MSG_PATH = '/sign-in',
  TRANSACTIONAL = '/transactional',
  DECRYPT = '/decrypt',
  ENCRYPT = '/public-key-encryption',
  NOT_FOUND_RPC = '/not-found-rpc',
  SWITCH_CHAIN = '/switch-chain',
  APP_INIT = APP_INIT_PATH,
}
