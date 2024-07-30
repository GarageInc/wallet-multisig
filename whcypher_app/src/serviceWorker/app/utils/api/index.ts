import assert from 'assert'

import { DELETE, GET, POST } from './actions'
import { call_api } from './fetch'

// const ENV = 'PRODUCTION'

const endPoints = {
  PRODUCTION: 'https://signer.whalesheaven.com/v1',
  DEV: 'http://localhost:3001/v1',
}

export const getEndpoint = () => {
  return process.env.REACT_APP_DEV_API === 'true' ? endPoints.DEV : endPoints.PRODUCTION
}

export const initVaultSessionApi = async (body: any, authHeaders: any) => {
  const ret = await call_api('vaults', body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const joinVaultSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`vaults/${sessionId}/join`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const confirmVaultSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`vaults/${sessionId}/confirm`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const rejectVaultSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`vaults/${sessionId}/reject`, body, DELETE, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const getVaultSessionApi = async (sessionId: any) => {
  const ret = await call_api(`vaults/${sessionId}`, null, GET, null, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const updateVaultSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`vaults/${sessionId}`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const initTransactionSignatureApi = async (body: any, authHeaders: any) => {
  const ret = await call_api('signatures', body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const joinSignatureSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`signatures/${sessionId}/join`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const confirmSignatureSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`signatures/${sessionId}/confirm`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const rejectSignatureSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`signatures/${sessionId}/reject`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const getSignatureSessionsApi = async (body: any, authHeaders: any) => {
  const ret = await call_api('signatures/search', body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const getSignatureSessionDataApi = async (signatureSessionId: any) => {
  const ret = await call_api(`signatures/${signatureSessionId}/`, null, GET, null, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const updateSignatureSessionApi = async (sessionId: any, body: any, authHeaders: any) => {
  const ret = await call_api(`signatures/${sessionId}`, body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const getRatesApi = async () => {
  const ret = await call_api('api_v1/current_rates', null, GET, null, 'https://www.whalesheaven.com/')
  assert(ret.body)
  return ret.body
}

// [FIXME] Migrate this API to POST method
export const getBackupWalletIdsRawApi = async (accountPubKey: string) => {
  return call_api(`vaults/backups?accountPubKey=${accountPubKey}`, null, GET, null, getEndpoint())
}

// [FIXME] Migrate this API to POST method
export const getBackupWalletByIdRawApi = async ({ hashedVaultId, accountPubKey }: any) => {
  return call_api(`vaults/backups/${accountPubKey}?hashedVaultId=${hashedVaultId}`, null, GET, null, getEndpoint())
}

export const sendEncryptedVaultBackupApi = async (body: any, authHeaders: any) => {
  const ret = await call_api('vaults/backups', body, POST, authHeaders, getEndpoint())
  assert(ret.body)
  return ret.body
}

export const updateEncryptedVaultBackupApi = async (
  { accountPubKey, hashedVaultId }: any,
  body: any,
  authHeaders: any,
) => {
  const ret = await call_api(
    `vaults/backups/${accountPubKey}?hashedVaultId=${hashedVaultId}`,
    body,
    POST,
    authHeaders,
    getEndpoint(),
  )
  assert(ret.body)
  return ret.body
}

export const getActivitiesApi = async (accountPubKey: any) => {
  return call_api(`activities?accountPubKey=${accountPubKey}`, null, GET, null, getEndpoint())
}

export const sendActivityApi = async (body: any, authHeaders: any) => {
  return call_api('activities', body, POST, authHeaders, getEndpoint())
}

export const getSubscriptionApi = async (authHeaders: any) => {
  return call_api('subscriptions/get_subscription', '', POST, authHeaders, getEndpoint())
}

export const getSubscriptionPaymentPlansApi = async () => {
  return call_api('subscription_payments/get_plans', null, GET, null, getEndpoint())
}

export const getSubscriptionPaymentPeriodsApi = async (body: any, authHeaders: any) => {
  return call_api('subscription_payments/get_periods', body, POST, authHeaders, getEndpoint())
}

export const getSubscriptionPaymentMethodsApi = async (body: any, authHeaders: any) => {
  return call_api('subscription_payments/get_methods', body, POST, authHeaders, getEndpoint())
}

export const initSubscriptionPaymentApi = async (body: any, authHeaders: any) => {
  return call_api('subscription_payments/create', body, POST, authHeaders, getEndpoint())
}

export const getSubscriptionPaymentApi = async (body: any, authHeaders: any) => {
  return call_api('subscription_payments/get_one', body, POST, authHeaders, getEndpoint())
}

export const getSubscriptionPaymentsApi = async (body: any, authHeaders: any) => {
  return call_api('subscription_payments/get_all', body, POST, authHeaders, getEndpoint())
}

export const sendIAmOnlineApi = async (body: any, authHeaders: any, knownHostEndPoint: any) => {
  let knownHostEndPointWithProtocol

  if (knownHostEndPoint.indexOf('http://') == 0 || knownHostEndPoint.indexOf('https://') == 0) {
    knownHostEndPointWithProtocol = new URL(knownHostEndPoint)
  } else {
    knownHostEndPointWithProtocol = new URL('https://' + knownHostEndPoint)
  }

  if (knownHostEndPointWithProtocol.hostname == 'localhost') {
    knownHostEndPointWithProtocol.protocol = 'http'
  } else {
    knownHostEndPointWithProtocol.protocol = 'https'
  }

  return await call_api('i-am-online', body, POST, authHeaders, knownHostEndPointWithProtocol.toString())
}
