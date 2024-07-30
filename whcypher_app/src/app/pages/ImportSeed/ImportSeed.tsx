import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import * as bip39 from 'bip39'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ContentWrapper from 'src/app/components/ContentWrapper/ContentWrapper'
import { IAppRequest } from 'src/serviceWorker/app/store/reducers/requestsReducer'
import { AppState } from 'src/serviceWorker/app/store/store'

import TextInput from '../../components/Form/TextInput/TextInput'
import { APP_INIT_PATH, WALLET_HOME_PATH } from '../../constants/paths'
import { APP_INIT_REQUEST_TYPES } from '../../constants/requestTypes'
import { closeSnackBar, setSnackBarError } from '../../helpers/backgroundMethods'
import {
  addRequest,
  importSeed,
  removeRequest,
  setEnteredSeedWords,
  syncAccountDataOnImport,
} from '../../helpers/backgroundMethods'
import { BodyText } from '../Login/common'
import styles from './ImportSeed.module.scss'

interface IProps {
  onNext: () => void
  goBack: () => void
  step: string
}

const ImportSeed = ({ onNext, goBack, step }: IProps) => {
  const history = useHistory()

  const appInitPassword = useSelector((state: AppState) => state.appInit.password)
  const enteredSeedWords = useSelector((state: AppState) => state.appInit.enteredSeedWords)
  const applicationPassword = useSelector((state: AppState) => state.application.password)
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountData.pubKey)
  const backupSyncInProgress = useSelector((state: AppState) => state.backupStatus.backupSyncInProgress)
  const currentBackupsCounter = useSelector((state: AppState) => state.backupStatus.currentBackupsCounter)
  const failedBackupsCounter = useSelector((state: AppState) => state.backupStatus.failedBackupsCounter)
  const duplicatedBackupsCounter = useSelector((state: AppState) => state.backupStatus.duplicatedBackupsCounter)
  const totalBackupsCount = useSelector((state: AppState) => state.backupStatus.totalBackupsCount)
  const requestsList = useSelector((state: AppState) => state.requests.requestsList)

  const [importingAccountPubKey, setImportingAccountPubKey] = useState<string>('')
  const [requestId, setRequestId] = useState<string | undefined>()
  const [requestData, setRequestData] = useState<IAppRequest>({} as IAppRequest)
  const [formData, setFormData] = useState({ seed: enteredSeedWords ? enteredSeedWords.join(' ') : ''.trim() })
  const [loading, setLoading] = useState(false)
  const [goBackDisabled, setGoBackDisabled] = useState(false)

  // Snack bar related logic can be moved to a mixin
  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)
  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  useEffect(() => {
    const appInitRequests = requestsList.filter((req) => Object.keys(APP_INIT_REQUEST_TYPES).includes(req.requestName))

    if (appInitRequests.length) {
      appInitRequests.forEach((appInitRequest) => {
        if (appInitRequest.requestName === APP_INIT_REQUEST_TYPES.SIGNING_IN) {
          setRequestId(appInitRequest.id)
          setRequestData(appInitRequest)
          setLoading(true)
        }
      })
    }
  }, [requestsList])

  useEffect(() => {
    if (requestData.accountPubKey && activeAccountPubkey === requestData.accountPubKey) {
      if (requestData.status === 'backupPending') {
        setLoading(true)
        setImportingAccountPubKey(activeAccountPubkey)
        if (appInitPassword) setGoBackDisabled(true)
      } else if (requestData.status === 'backupReady') {
        setLoading(false)
        onNext()
      }
    }
  }, [activeAccountPubkey, appInitPassword, onNext, requestData.accountPubKey, requestData.status])

  useEffect(() => {
    if (requestData.accountPubKey) {
      setImportingAccountPubKey(requestData.accountPubKey)
    }
  }, [requestData.accountPubKey])

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)
    }

    return clearTimeout(snackbarTimeout)
  }, [snackbarOpen, snackbarTimeout])

  const verifyMnemonic = useCallback(() => {
    const { seed } = formData
    const seedTrimmed = seed.trim()

    if (seedTrimmed.split(/\s+/g).length !== 15) {
      return false
    }

    return bip39.validateMnemonic(seedTrimmed)
  }, [formData])

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

  const onNextButton = useCallback(() => {
    setLoading(true)

    const { seed } = formData
    const seedTrimmed = seed.trim()

    if (seedTrimmed.length > 0) {
      if (verifyMnemonic()) {
        const password = appInitPassword || applicationPassword
        const seedWordsArray = seed.split(/(\s+)/).filter((e) => e.trim().length > 0)
        setEnteredSeedWords(seedWordsArray)
        if (appInitPassword) setGoBackDisabled(true)

        if (!password) {
          setLoading(false)
          return
        }
        importSeed(seedTrimmed, password, (response: any) => {
          if (response && response.success) {
            setImportingAccountPubKey(response.accountPubKey)

            addRequest({
              requestName: APP_INIT_REQUEST_TYPES.SIGNING_IN,
              requestPath: `${APP_INIT_PATH}`,
              sessionId: `import:${response.accountPubKey}`,
              currentStep: 'Import',
              status: 'backupPending',
              accountPubKey: response.accountPubKey,
            })

            syncAccountDataOnImport(response.accountIndex, password, () => {
              // Just wait till this finished
            })
          } else {
            // Error bar is set in background
          }
        })
      } else {
        setErrorWithTimeout('Entered seed phrase seems to be invalid')
        setLoading(false)
        if (appInitPassword) setGoBackDisabled(true)
      }
    } else {
      setErrorWithTimeout("Seed phrase can't be blank")
      setLoading(false)
    }
  }, [appInitPassword, applicationPassword, formData, setErrorWithTimeout, verifyMnemonic])

  const onBackButton = useCallback(() => {
    removeRequest({ id: requestId }, () => {
      if (step === 'FROM_APP_INIT_PATH') {
        // not sure there is this coming from. Perhaps not used
        history.goBack()
      } else if (appInitPassword) {
        // Application is initializing
        goBack()
      } else {
        // Wallet is initiated and we are importing a yet another account
        setEnteredSeedWords([])
        history.push(WALLET_HOME_PATH)
      }
    })
  }, [appInitPassword, goBack, history, requestId, step])

  return (
    <ContentWrapper
      title="Import an Account with Seed Phrase"
      goBack={() => onBackButton()}
      goBackDisabled={goBackDisabled}
    >
      <div className={styles.content}>
        <BodyText text="Enter your secret seed words here to restore your account" />

        <TextInput
          placeholder="Account 15 word seed"
          value={formData.seed}
          disabled={loading}
          onInputChanged={(v) => setFormData({ ...formData, seed: v })}
          textArea
          rows={3}
        />

        <Box mt="16px" mb="16px">
          <Button fullWidth variant="contained" color="primary" onClick={() => onNextButton()} disabled={loading}>
            {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Import'}
          </Button>
        </Box>

        {backupSyncInProgress[importingAccountPubKey] && (
          <div className={styles.buttonHint}>
            <Typography style={{ fontSize: 12, textAlign: 'center' }} className={styles.fieldText}>
              Recovered {currentBackupsCounter[importingAccountPubKey]} out of{' '}
              {totalBackupsCount[importingAccountPubKey]} backups.{' '}
              {failedBackupsCounter[importingAccountPubKey] > 0 && (
                <>{failedBackupsCounter[importingAccountPubKey]} failed.</>
              )}{' '}
              {duplicatedBackupsCounter[importingAccountPubKey] > 0 && (
                <>{duplicatedBackupsCounter[importingAccountPubKey]} duplicated.</>
              )}
            </Typography>
          </div>
        )}
      </div>
    </ContentWrapper>
  )
}

export default ImportSeed
