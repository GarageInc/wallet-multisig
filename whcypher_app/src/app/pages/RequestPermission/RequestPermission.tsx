import CircularProgress from '@material-ui/core/CircularProgress'
import { AppState } from 'src/serviceWorker/app/store/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { WEB_PAGE_REQUEST_TYPES } from '../../constants/requestTypes'
import { WALLET_HOME_PATH } from '../../constants/paths'
import JoinMultisigSessionRequest from './RequestPermission/JoinMultisigSessionRequest'
import LoginRequest from './RequestPermission/LoginRequest'
import SignAddressRequest from './RequestPermission/SignAddressRequest'

const RequestPermission = () => {
  const history = useHistory()

  const accountData = useSelector((state: AppState) => state.application.activeAccountData)
  const requestsList = useSelector((state: AppState) => state.requests.requestsList)

  const [webPageRequest, setWebPageRequest] = useState<any>({})

  useEffect(() => {
    const [siteReq = {}] = requestsList.filter((req: any) => Object.keys(WEB_PAGE_REQUEST_TYPES).includes(req.requestName))
    setWebPageRequest(siteReq)
    if (!Object.keys(siteReq).length) {
      history.push(WALLET_HOME_PATH)
    }
  }, [requestsList, history])

  return accountData.pubKey && Object.keys(webPageRequest).length ? (
    <>
      {webPageRequest.requestName === WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST && (
        <LoginRequest webPageRequest={webPageRequest} accountData={accountData} />
      )}
      {webPageRequest.requestName === WEB_PAGE_REQUEST_TYPES.SIGN_ADDRESS_REQUEST && (
        <SignAddressRequest webPageRequest={webPageRequest} accountData={accountData} />
      )}
      {webPageRequest.requestName === WEB_PAGE_REQUEST_TYPES.JOIN_MULTISIG_SESSION_REQUEST && (
        <JoinMultisigSessionRequest webPageRequest={webPageRequest} accountData={accountData} />
      )}
    </>
  ) : (
    <CircularProgress />
  )
}

export default RequestPermission
