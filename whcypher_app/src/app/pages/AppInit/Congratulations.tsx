import { Box, Button, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import cx from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAppTabParams } from 'src/app/hooks/useAppTabParams'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { APP_UNLOCK_PATH, REQUEST_PERMISSION, WALLET_HOME_PATH } from '../../constants/paths'
import { WEB_PAGE_REQUEST_TYPES } from '../../constants/requestTypes'
import { appClearState } from '../../helpers/backgroundMethods'
import styles from './Congratulations.module.scss'

const Congratulations = ({ step }: { step: string }) => {
  const history = useHistory()

  const { isPopup: isExtensionIsOpenedInTab } = useAppTabParams()

  const requestsList = useSelector((state: AppState) => state.requests.requestsList)
  const accountsList = useSelector((state: AppState) => state.application.accountsList)

  const [webPageRequestType, setWebPageRequestType] = useState('')

  useEffect(() => {
    const webPageRequests = requestsList.filter((req: any) =>
      Object.keys(WEB_PAGE_REQUEST_TYPES).includes(req.requestName),
    )

    if (webPageRequests.length) {
      webPageRequests.forEach((webPageRequest: any) => {
        setWebPageRequestType(webPageRequest.requestName)
      })
    }
  }, [requestsList])

  const onDone = useCallback(() => {
    appClearState(() => {
      if (step === 'FROM_APP_INIT_PATH') {
        history.push(REQUEST_PERMISSION)
      } else if (webPageRequestType === WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST) {
        history.push(REQUEST_PERMISSION)
      } else if (accountsList.length > 1) {
        history.push(WALLET_HOME_PATH)
      } else {
        if (isExtensionIsOpenedInTab) {
          window.close()
        } else {
          history.push(APP_UNLOCK_PATH)
        }
      }
    })
  }, [history, accountsList, isExtensionIsOpenedInTab, step, webPageRequestType])

  const confirmButtonText = useCallback(() => {
    if (step === 'FROM_APP_INIT_PATH') {
      return 'Back'
    } else if (webPageRequestType === WEB_PAGE_REQUEST_TYPES.LOG_IN_REQUEST) {
      return 'Back'
    } else if (accountsList.length > 1) {
      return 'Home'
    } else {
      if (isExtensionIsOpenedInTab) {
        return 'Close window'
      } else {
        return 'Proceed'
      }
    }
  }, [step, webPageRequestType, accountsList, isExtensionIsOpenedInTab])

  return (
    <ContentWrapper title="Congratulations!" noFooter>
      <Typography className={styles.bodyText}>
        Your new account is ready. Keep your Secret Phrase safe, it's your responsibility! We can't recover it.
      </Typography>

      <Box mt={3} mb={1}>
        <Typography className={styles.textTips}>Tips on storing it safely</Typography>
      </Box>

      <div className={styles.bulletPoints}>
        <div className={styles.listItem}>
          <CheckIcon />
          <Typography className={cx(styles.listItem, styles.itemText)}>Save a backup in multiple places</Typography>
        </div>
        <div className={styles.listItem}>
          <CheckIcon />
          <Typography className={cx(styles.listItem, styles.itemText)}>Never share the phrase with anyone</Typography>
        </div>
        <div className={styles.listItem}>
          <CheckIcon />
          <Typography className={cx(styles.listItem, styles.itemText)}>
            If you need to backup your Secret Phrase again, you can find it in Account Menu - Export Seed
          </Typography>
        </div>
        <div className={styles.listItem}>
          <CheckIcon />
          <Typography className={cx(styles.listItem, styles.itemText)}>
            If you ever have questions or notice something fishy, email us at{' '}
            <a href="mailto:support@totalsig.com">support@totalsig.com</a>
          </Typography>
        </div>
        <div className={styles.listItem}>
          <CheckIcon />
          <Typography className={cx(styles.listItem, styles.itemText)}>
            Be careful of phishing! TotalSig will never ask for your Secret Phrase.
          </Typography>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button variant="contained" color="primary" onClick={onDone} size="medium" fullWidth>
          {confirmButtonText()}
        </Button>
      </div>
    </ContentWrapper>
  )
}

export default Congratulations
