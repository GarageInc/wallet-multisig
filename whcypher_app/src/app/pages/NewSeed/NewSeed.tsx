import { Box, Button, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { APP_INIT_PATH, WALLET_HOME_PATH } from '../../constants/paths'
import { APP_INIT_REQUEST_TYPES } from '../../constants/requestTypes'
import {
  addRequest,
  clearSeed,
  closeSnackBar,
  generateNewSeed,
  removeRequest,
  setSnackBarError,
} from '../../helpers/backgroundMethods'
import styles from './NewSeed.module.scss'
import SeedPad from './NewSeed/SeedPad'

interface IProps {
  step: string
  onNext: () => void
  goBack: () => void
}

const NewSeed = ({ onNext, goBack, step }: IProps) => {
  const history = useHistory()

  const seedWords = useSelector((state: AppState) => state.appInit.seedWords)
  const password = useSelector((state: AppState) => state.appInit.password)
  const requestsList = useSelector((state: AppState) => state.requests.requestsList)
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountPubkey)
  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)

  const [requestId, setRequestId] = useState<string | undefined>()
  const [oldSeed, setOldSeed] = useState<boolean | null>(null)
  const [seedShown, setSeedShown] = useState(false)

  // Snack bar related logic can be moved to a mixin
  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  useEffect(() => {
    const appInitRequests = requestsList.filter((req) => Object.keys(APP_INIT_REQUEST_TYPES).includes(req.requestName))

    if (appInitRequests.length) {
      appInitRequests.forEach((appInitRequest) => {
        if (appInitRequest.requestName === APP_INIT_REQUEST_TYPES.SIGNING_IN) {
          setRequestId(appInitRequest.id)
        }
      })
    }

    setOldSeed(seedWords.length > 0)
    setSeedShown(seedWords.length > 0)
    // No dependencies, as we want to run this only once
  }, [])

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)

      return () => {
        clearTimeout(snackbarTimeout)
      }
    }
  }, [snackbarOpen, snackbarTimeout])

  useEffect(() => {
    if (oldSeed != null) {
      if (oldSeed) return

      generateNewSeed()
    }
  }, [oldSeed])

  const setErrorWithTimeout = useCallback(
    (message = '', duration = 3000) => {
      if (snackbarTimeout) {
        closeSnackBar()
        clearTimeout(snackbarTimeout)
        setTimeout(() => {
          setSnackBarError(message)
          const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
          setSnackbarTimeout(newSnackbarTimeout)
        }, 200)
      } else {
        setSnackBarError(message)
        const newSnackbarTimeout = setTimeout(() => closeSnackBar(), duration)
        setSnackbarTimeout(newSnackbarTimeout)
      }
    },
    [snackbarTimeout],
  )

  const onSeedShow = useCallback(() => {
    setSeedShown(true)
    addRequest({
      requestName: APP_INIT_REQUEST_TYPES.SIGNING_IN,
      requestPath: `${APP_INIT_PATH}`,
      currentStep: 'Secret',
      // When we import user account there should be no active account related things, as this is app wide thing
      accountPubKey: activeAccountPubkey,
    })
  }, [activeAccountPubkey])

  const onNextButton = useCallback(() => {
    if (seedShown) onNext()
    else setErrorWithTimeout('Reveal your secret first')
  }, [onNext, seedShown, setErrorWithTimeout])

  const onBackButton = useCallback(() => {
    setSeedShown(false)
    clearSeed(() => {
      removeRequest({ id: requestId }, () => {
        if (step === 'FROM_APP_INIT_PATH') {
          history.goBack()
        } else if (password) {
          goBack()
        } else {
          history.push(WALLET_HOME_PATH)
        }
      })
    })
  }, [history, goBack, password, requestId, step])

  return (
    <ContentWrapper title="Secret phrase" goBack={onBackButton}>
      <div className={styles.content}>
        <Typography className={styles.subTitle}>
          Your secret seed words makes it easy to backup and restore your account.
        </Typography>

        <AlertBlock text="Do not disclose your seed phrase to anyone. You may loose your crypto forever if you do." />

        <SeedPad words={seedWords} onSeedShown={onSeedShow} showSeed={oldSeed} />

        <Box m={3}>
          <Button variant="contained" color="primary" size="medium" onClick={() => onNextButton()} fullWidth>
            Next
          </Button>
        </Box>
      </div>
    </ContentWrapper>
  )
}

export default NewSeed
