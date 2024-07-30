import { Link, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/serviceWorker/app/store/store'

import styles from './NoWallets.module.scss'

const NoWallets = () => {
  const activeAccountPubkey = useSelector((state: AppState) => state.application.activeAccountData.pubKey)
  const backupSyncInProgress: any = useSelector((state: AppState) => state.backupStatus.backupSyncInProgress)
  const currentBackupsCounter: any = useSelector((state: AppState) => state.backupStatus.currentBackupsCounter)
  const failedBackupsCounter: any = useSelector((state: AppState) => state.backupStatus.failedBackupsCounter)
  const duplicatedBackupsCounter: any = useSelector((state: AppState) => state.backupStatus.duplicatedBackupsCounter)
  const totalBackupsCount: any = useSelector((state: AppState) => state.backupStatus.totalBackupsCount)

  return (
    <>
      {backupSyncInProgress[activeAccountPubkey] && (
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <Typography className={styles.header}>Backup sync in progress</Typography>
          </div>
          <Typography className={styles.note}>
            Recovered {currentBackupsCounter[activeAccountPubkey]} out of {totalBackupsCount[activeAccountPubkey]}{' '}
            backups.{' '}
            {failedBackupsCounter[activeAccountPubkey] > 0 && <>{failedBackupsCounter[activeAccountPubkey]} failed.</>}{' '}
            {duplicatedBackupsCounter[activeAccountPubkey] > 0 && (
              <>{duplicatedBackupsCounter[activeAccountPubkey]} duplicated.</>
            )}
          </Typography>
        </div>
      )}

      {!backupSyncInProgress[activeAccountPubkey] && (
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <Typography className={styles.header}>Welcome to TotalSig</Typography>
          </div>
          <Typography className={styles.note}>
            Your account is active, but has no wallets yet. To learn how to create a multisig wallet{' '}
            <Link underline="always" target="_blank" href="https://www.totalsig.com/info/getting-started">
              check out this guide.
            </Link>
          </Typography>
        </div>
      )}
    </>
  )
}

export default NoWallets
