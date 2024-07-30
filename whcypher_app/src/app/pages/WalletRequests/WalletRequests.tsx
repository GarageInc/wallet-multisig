import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../../static/styles/carousel.css'

import { Box, IconButton, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import { useHistory } from 'react-router'
import NeedHelp from 'src/app/components/NeedHelp/NeedHelp'
import PageHeader from 'src/app/components/PageHeader/PageHeader'
import { GROUP_TRANSACTION_STATES, GROUP_TRANSACTION_STATUSES } from 'src/app/constants/groupTransactionRequests'
import { IWalletRequest } from 'src/serviceWorker/app/store/reducers/walletRequestsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import { WALLET_HOME_PATH, WALLET_PAGE_PATH } from '../../constants/paths'
import { WALLET_REQUEST_TYPES } from '../../constants/requestTypes'
import { removeWalletRequest } from '../../helpers/backgroundMethods'
import GroupTransactionFailed from './GroupTransactionFailed/GroupTransactionFailed'
import GroupTransactionReady from './GroupTransactionReady/GroupTransactionReady'
import GroupTransactionRequest from './GroupTransactionRequest/GroupTransactionRequest'
import GroupTransactionSession from './GroupTransactionSession/GroupTransactionSession'
import GroupTransactionUnsupported from './GroupTransactionUnsupported/GroupTransactionUnsupported'
import styles from './WalletRequests.module.scss'

const WalletRequests = () => {
  const history = useHistory<any>()

  const requestsList = useSelector((state: AppState) => state.walletRequests.requestsList)

  const [activeIndex, setActiveIndex] = useState(0)
  const [walletId, setWalletId] = useState<string | undefined>()
  const [walletRequestsInitiated, setWalletRequestsInitiated] = useState(false)
  const [walletRequests, setWalletRequests] = useState<IWalletRequest[]>([])

  useEffect(() => {
    if (history.location.state) {
      const providedVault = history.location.state.walletData
      setWalletId(providedVault.walletId)
    } else {
      const params = new URLSearchParams(history.location.search)
      const walletIdFromParams = params.get('walletId')
      if (walletIdFromParams) setWalletId(walletIdFromParams)
    }
  }, [history])

  useEffect(() => {
    if (walletId) {
      const matchedRequests = requestsList.filter((request) => request.walletId === walletId)
      setWalletRequests(matchedRequests)
      setWalletRequestsInitiated(true)
    }
  }, [walletId, requestsList])

  useEffect(() => {
    if (walletRequestsInitiated && !walletRequests.length) {
      history.push(WALLET_HOME_PATH)
    }

    if (walletRequestsInitiated) {
      const params = new URLSearchParams(history.location.search)
      const sessionIdFromParams = params.get('sessionId')
      if (sessionIdFromParams) {
        const sessionIndexTab = walletRequests.findIndex((request) => request.sessionId === sessionIdFromParams)
        if (sessionIndexTab >= 0) setActiveIndex(sessionIndexTab)
      }
    }
  }, [walletRequestsInitiated, walletRequests, history])

  const onChangeRequestClick = useCallback(
    (i: number) => {
      let newActiveIndex = activeIndex + i
      if (newActiveIndex < 0) newActiveIndex = 0
      setActiveIndex(newActiveIndex)
    },
    [setActiveIndex, activeIndex],
  )

  const goBack = useCallback(
    (walletRequest: IWalletRequest) => {
      removeWalletRequest({ sessionId: walletRequest.sessionId }, () => {
        onChangeRequestClick(-1)
        if (walletRequests.length == 0) {
          history.push({
            pathname: WALLET_PAGE_PATH,
            search: `?walletId=${walletRequest.walletId}`,
          })
        }
      })
    },
    [history, onChangeRequestClick, walletRequests.length],
  )

  return (
    <>
      <Box px={3} py={2}>
        <PageHeader title="Requests" goBack={() => history.goBack()} />
      </Box>
      <div className={styles.wrapper}>
        {walletRequests.length > 1 ? (
          <div className={styles.slider}>
            <IconButton
              style={{ padding: 6, margin: '0 20px' }}
              onClick={() => activeIndex !== 0 && onChangeRequestClick(-1)}
              disabled={!walletRequests[activeIndex - 1]}
            >
              <div
                className={cx(styles.iconBtn, {
                  [styles.iconBtnDisabled]: !walletRequests[activeIndex - 1],
                })}
              >
                <ArrowBackIosIcon style={{ color: '#fff', fontSize: 12, marginRight: -4 }} />
              </div>
            </IconButton>

            <Typography style={{ fontWeight: 500 }}>
              Trans request {activeIndex + 1}/{walletRequests.length}
            </Typography>

            <IconButton
              style={{ padding: 0, margin: '0 20px' }}
              onClick={() => activeIndex <= walletRequests.length - 1 && onChangeRequestClick(1)}
              disabled={!walletRequests[activeIndex + 1]}
            >
              <div
                className={cx(styles.iconBtn, {
                  [styles.iconBtnDisabled]: !walletRequests[activeIndex + 1],
                })}
              >
                <ArrowForwardIosIcon style={{ color: '#fff', fontSize: 12 }} />
              </div>
            </IconButton>
          </div>
        ) : null}

        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={() => null}
          renderArrowNext={() => null}
          selectedItem={activeIndex}
        >
          {walletRequests.map(
            (walletRequest): any =>
              walletRequest.requestName === WALLET_REQUEST_TYPES.GROUP_TRANSACTION_SESSION && (
                <div className={styles.sliderWrapper} key={walletRequest.id}>
                  {walletRequest.state === GROUP_TRANSACTION_STATES.REQUEST && (
                    <GroupTransactionRequest walletRequest={walletRequest} goBack={goBack} />
                  )}

                  {walletRequest.state === GROUP_TRANSACTION_STATES.SESSION && (
                    <>
                      {walletRequest.status === GROUP_TRANSACTION_STATUSES.PENDING && (
                        <GroupTransactionSession walletRequest={walletRequest} />
                      )}

                      {(walletRequest.status === GROUP_TRANSACTION_STATUSES.FAILED ||
                        walletRequest.status === GROUP_TRANSACTION_STATUSES.REJECTED ||
                        walletRequest.status === GROUP_TRANSACTION_STATUSES.EXPIRED) && (
                        <GroupTransactionFailed
                          walletRequest={walletRequest}
                          goBack={goBack}
                          singleRequest={walletRequests.length == 1}
                        />
                      )}

                      {walletRequest.status === GROUP_TRANSACTION_STATUSES.READY && (
                        <GroupTransactionReady
                          walletRequest={walletRequest}
                          goBack={goBack}
                          singleRequest={walletRequests.length == 1}
                        />
                      )}

                      {walletRequest.status === GROUP_TRANSACTION_STATUSES.UNSUPPORTED && (
                        <GroupTransactionUnsupported
                          walletRequest={walletRequest}
                          goBack={goBack}
                          singleRequest={walletRequests.length == 1}
                        />
                      )}
                    </>
                  )}
                </div>
              ),
          )}
        </Carousel>
        <NeedHelp />
      </div>
    </>
  )
}

export default WalletRequests
