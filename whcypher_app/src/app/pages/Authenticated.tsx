import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppState } from 'src/serviceWorker/app/store/store'

import { APP_INIT_PATH, APP_UNLOCK_PATH, IMPORT_WALLETS_PATH, REQUEST_PERMISSION } from '../constants/paths'
import { APP_INIT_REQUEST_TYPES, USER_REQUEST_TYPES, WEB_PAGE_REQUEST_TYPES } from '../constants/requestTypes'
import { filterRequestsByTypeAndPubKey } from '../helpers/requestUtils'

function Authenticated({
  isExtensionIsOpenedInTab,
  redirectUrl,
}: {
  isExtensionIsOpenedInTab: boolean
  redirectUrl: string
}) {
  const application = useSelector((state: AppState) => state.application)
  const requestsList = useSelector((state: AppState) => state.requests.requestsList)

  if (application.appInitialized) {
    const appInitRequests = filterRequestsByTypeAndPubKey(requestsList, APP_INIT_REQUEST_TYPES)

    if (!appInitRequests.length) {
      if (application.unlocked) {
        if (requestsList.length > 0) {
          const webPageRequests = filterRequestsByTypeAndPubKey(
            requestsList,
            WEB_PAGE_REQUEST_TYPES,
            application.activeAccountPubkey,
          )

          if (webPageRequests.length && isExtensionIsOpenedInTab) {
            const [webPageRequest = {}] = webPageRequests

            return <Redirect to={{ pathname: REQUEST_PERMISSION, state: { ...webPageRequest } }} />
          }

          const userRequests = filterRequestsByTypeAndPubKey(
            requestsList,
            USER_REQUEST_TYPES,
            application.activeAccountPubkey,
          )

          if (userRequests.length) {
            const [userRequest] = userRequests
            if (
              userRequest &&
              userRequest.requestPath &&
              (!isExtensionIsOpenedInTab || userRequest.requestPath !== IMPORT_WALLETS_PATH)
            ) {
              return <Redirect to={{ pathname: userRequest.requestPath, state: { ...userRequest } }} />
            }
          }
        }
        return <Redirect to={redirectUrl} />
      }

      return <Redirect to={{ pathname: APP_UNLOCK_PATH }} />
    } else {
      const [appInitRequest] = appInitRequests

      if (
        appInitRequest &&
        appInitRequest.requestPath &&
        (!isExtensionIsOpenedInTab || appInitRequest.requestPath !== IMPORT_WALLETS_PATH)
      ) {
        return <Redirect to={{ pathname: appInitRequest.requestPath, state: { ...appInitRequest } }} />
      } else {
        return <Redirect to={{ pathname: APP_INIT_PATH }} />
      }
    }
  }

  return <Redirect to={{ pathname: APP_INIT_PATH }} />
}

export default Authenticated
