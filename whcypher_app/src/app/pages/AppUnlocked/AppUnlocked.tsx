import CssBaseline from '@material-ui/core/CssBaseline'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import { APP_UNLOCK_PATH } from '../../constants/paths'
import WalletRouter from '../../routes/WalletRouter'
import styles from './AppUnlocked.module.scss'

function AppUnlocked() {
  const history = useHistory()

  const application = useSelector((state: AppState) => state.application)

  useEffect(() => {
    if (!application.unlocked && application.appInitialized) {
      history.push(APP_UNLOCK_PATH)
    }
  }, [application, history])

  return (
    <div className={styles.root}>
      <CssBaseline />

      <main className={styles.content}>
        <div className={styles.toolbar} />
        <WalletRouter />
      </main>
    </div>
  )
}

export default AppUnlocked
