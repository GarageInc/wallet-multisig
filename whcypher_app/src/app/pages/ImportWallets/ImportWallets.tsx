/* eslint-disable no-undef */
import { Box, Button, CircularProgress, IconButton, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../componentElements/Icon/Icon'
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { USER_REQUEST_TYPES } from '../../constants/requestTypes'
import { closeSnackBar, importWalletsData, removeRequest, setSnackBarError } from '../../helpers/backgroundMethods'
import styles from './ImportWallets.module.scss'
import ImportStatus from './ImportWallets/ImportStatus'

const ImportWallets = () => {
  const requestsList = useSelector((state: AppState) => state.requests.requestsList)

  const importBtnRef = useRef<any>(null)

  const [loading, setLoading] = useState(false)
  const [requestId, setRequestId] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState(null)
  const [selectedFileRaw, setSelectedFileRaw] = useState(null)
  const [step, setStep] = useState('upload')

  const [validWalletsNames, setValidWalletsNames] = useState([])
  const [invalidWalletsNames, setInvalidWalletsNames] = useState([])

  // Snack bar related logic can be moved to a mixin
  const snackbarOpen = useSelector((state: AppState) => state.snackbar.open)
  const [snackbarTimeout, setSnackbarTimeout] = useState<any>(null)

  useEffect(() => {
    const userRequests = requestsList.filter((req: any) => Object.keys(USER_REQUEST_TYPES).includes(req.requestName))

    if (userRequests.length) {
      userRequests.forEach((userRequest: any) => {
        if (userRequest.requestName === USER_REQUEST_TYPES.WALLETS_IMPORT) {
          setRequestId(userRequest.id)
        }
      })
    }
  }, [requestsList])

  useEffect(() => {
    if (!snackbarOpen && snackbarTimeout) {
      clearTimeout(snackbarTimeout)
      setSnackbarTimeout(null)
    }
  }, [snackbarOpen, snackbarTimeout])

  const handleClickImport = useCallback(() => {
    importBtnRef.current?.click()
  }, [importBtnRef])

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

  const onFileUploaded = useCallback((file: any) => {
    const fileName = file.name
    setSelectedFileName(fileName)

    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = (event: any) => {
      const fileAsText = event.target.result
      setSelectedFileRaw(fileAsText)
    }
  }, [])

  const onRemoveFile = useCallback(() => {
    setSelectedFileName(null)
    setSelectedFileRaw(null)
  }, [])

  const proceedButton = useCallback(() => {
    setLoading(true)

    if (selectedFileRaw) {
      importWalletsData(selectedFileRaw, (response: any) => {
        if (!response.error) {
          const { walletsImportResults } = response
          setValidWalletsNames(walletsImportResults[0])
          setInvalidWalletsNames(walletsImportResults[1])
          setStep('results')
        }
        setLoading(false)
      })
    } else {
      setErrorWithTimeout('Select backup file first')
      setLoading(false)
    }
  }, [selectedFileRaw, setErrorWithTimeout])

  const onBackButton = useCallback(() => {
    removeRequest({ id: requestId }, () => {
      window.close()
    })
  }, [requestId])

  return (
    <>
      {step === 'upload' && (
        <ContentWrapper title="Import Wallets" goBack={() => onBackButton()}>
          <div className={styles.container}>
            <Typography className={styles.subTitle}>Upload your exported wallets file</Typography>

            <div className={styles.importArea} style={{ border: `2px dashed #CFCFCF`, background: 'transparent' }}>
              <Icon icon="import-file" size={27} color="#BFBFBF" />
              <p className={styles.importAreaDragText}>Select backup file</p>
              <label htmlFor="import-btn">
                <input
                  ref={importBtnRef}
                  style={{ display: 'none' }}
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={(e: any) => onFileUploaded(e.target?.files?.[0])}
                />
                <Button
                  id="import-btn"
                  onClick={handleClickImport}
                  classes={{ root: styles.chooseFileBtn }}
                  variant="contained"
                >
                  Choose File
                </Button>
              </label>
              <p className={styles.maxFileInfo}>Maximum size 5MB</p>
            </div>

            {selectedFileName && (
              <div className={styles.file}>
                <Icon className="fileIcon" icon="file" size={15} color="#B9B9B9" />
                {selectedFileName}

                <IconButton style={{ padding: 6 }} onClick={() => onRemoveFile()}>
                  <Icon className="deleteIcon" icon="close" size={11} color="#F44336" />
                </IconButton>
              </div>
            )}

            <Box mx={2} mt={3}>
              <Button variant="contained" color="primary" disabled={loading} onClick={() => proceedButton()} fullWidth>
                {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Import'}
              </Button>
            </Box>
          </div>
        </ContentWrapper>
      )}

      {step === 'results' && (
        <ImportStatus
          validWalletsNames={validWalletsNames}
          invalidWalletsNames={invalidWalletsNames}
          goBack={() => onBackButton()}
        />
      )}
    </>
  )
}

export default ImportWallets
