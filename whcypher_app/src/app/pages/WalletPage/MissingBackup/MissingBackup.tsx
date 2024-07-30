/* eslint-disable no-undef */
import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useDappActiveWallet } from 'src/app/hooks/useDappActiveWallet'

import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import { EXPORT_WALLETS_PATH } from '../../../constants/paths'
import { backupWalletDataOnRemote, setSnackBarSuccess } from '../../../helpers/backgroundMethods'
import styles from './MissingBackup.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const MissingBackup = () => {
  const history = useHistory<any>()
  const { walletId } = history.location.state

  const [requestInProcess, setRequestInProcess] = useState(false)

  const walletData = useDappActiveWallet(walletId)

  useEffect(() => {
    if (walletData?.isBackup) {
      history.goBack()
    }
  }, [walletData, history])

  const onBackupWalletData = () => {
    setRequestInProcess(true)

    backupWalletDataOnRemote(walletId, (result: any) => {
      setRequestInProcess(false)
      if (result && result.success) {
        setSnackBarSuccess('Wallet backup was successfully sent to remote server.', noop)
        history.goBack()
      }
    })
  }

  const onNavigateToExport = useCallback(() => {
    history.push(EXPORT_WALLETS_PATH)
  }, [history])

  return (
    <ContentWrapper title="Missing backup" goBack={() => history.goBack()}>
      <div className={styles.content}>
        <Typography className={styles.section} style={{ marginBottom: 25 }}>
          Backup for wallet <b>{walletData?.name}</b> is missing.
        </Typography>
        <Typography className={styles.section} style={{ marginBottom: 25 }}>
          To make a backup either click <b>Send to server</b> to backup encrypted wallet data to our server or click{' '}
          <b>Export as file</b> to export encrypted wallet data via Export wallets menu.
        </Typography>

        <div className={styles.inline} style={{ paddingTop: 15 }}>
          <div style={{ width: '100%', paddingRight: 10 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ color: '#fff' }}
              onClick={() => onBackupWalletData()}
            >
              {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Send to server'}
            </Button>
          </div>
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <Button variant="contained" color="primary" fullWidth onClick={() => onNavigateToExport()}>
              {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Export as file'}
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default MissingBackup
