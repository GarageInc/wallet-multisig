import { Button, CircularProgress, Link, TextField } from '@material-ui/core'
import cx from 'classnames'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import { AppState } from 'src/serviceWorker/app/store/store'

import { FORGOT_PASSWORD_PATH } from '../../constants/paths'
import {
  cleanupExpiredGroupTransactionRequests,
  executeAutoApprovalRequests,
  getWalletsBalances,
  monitorGroupTransactionRequests,
  pingRemoteIAmOnline,
  syncActiveAccountData,
  unlockApp,
} from '../../helpers/backgroundMethods'
import styles from './AppUnlock.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const AppUnlock = ({ redirectUrl }: { redirectUrl: string }) => {
  const history = useHistory()

  const appUnlocked = useSelector<AppState>((state) => state.application.unlocked)

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onUnlockClicked = useCallback(() => {
    setLoading(true)
    unlockApp(password, (response: any) => {
      if (!response || !response.success) {
        setLoading(false)
      } else {
        syncActiveAccountData(noop)
        // syncActivitiesWithServer();
        monitorGroupTransactionRequests()
        executeAutoApprovalRequests()
        cleanupExpiredGroupTransactionRequests()
        pingRemoteIAmOnline()
        getWalletsBalances({ fullFetch: true }, noop)
      }
    })
    setPassword('')
  }, [setLoading, password])

  const toForgotPasswordPage = useCallback(() => {
    history.push(FORGOT_PASSWORD_PATH)
  }, [history])

  if (appUnlocked) {
    return <Redirect to={redirectUrl} />
  }

  return (
    <div className="hasNestedComps elLogin">
      <div className={styles.appUnlock}>
        <div className={styles.layoutFlow}>
          <div className={styles.elRectangleWrapper}>
            <div className={styles.elRectangle} />
          </div>

          <div className={styles.elText2Wrapper}>
            <img alt="avatar" src="../../../static/image/logo-without-text.svg" />
            <div className={cx('font-helveticaNeueBold', styles.elText2)}>
              <div>Welcome Back</div>
            </div>
          </div>

          <div className={styles.elFieldWrapper}>
            <div className={cx('font-helveticaNeue', styles.elText3)}>
              <div>Password</div>
            </div>
            <TextField
              className={cx('baseFont', styles.elField)}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUnlockClicked()
                }
              }}
            />
          </div>

          <div className={styles.elButtonWrapper}>
            <Button
              size="medium"
              className={cx('actionFont', styles.elButton)}
              color="default"
              disabled={loading}
              onClick={onUnlockClicked}
              fullWidth
            >
              {loading ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Log In'}
            </Button>
            <Link component="button" className={styles.forgotPassword} onClick={toForgotPasswordPage}>
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppUnlock
