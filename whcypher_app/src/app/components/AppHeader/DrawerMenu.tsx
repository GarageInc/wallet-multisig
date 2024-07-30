import { Divider, MenuItem, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import GavelIcon from '@material-ui/icons/Gavel'
import InputIcon from '@material-ui/icons/Input'
import LockIcon from '@material-ui/icons/Lock'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import cx from 'classnames'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../componentElements/Icon/Icon'
import * as steps from '../../constants/appInitSteps'
import {
  APP_INIT_PATH,
  APP_UNLOCK_PATH,
  SETTINGS_PATH,
  TERMS_OF_USE_PATH,
  WALLET_HOME_PATH,
} from '../../constants/paths'
import { lockApp, setCurrentStep, switchToAccount, syncActiveAccountData } from '../../helpers/backgroundMethods'
import { formatName } from '../../helpers/formatters'
import { createAvatarSvg } from '../../helpers/publicKeyImageCreator'
import styles from './DrawerMenu.module.scss'

const DrawerMenu = ({ onClose, closeDrawer }: { onClose: (v: boolean) => void; closeDrawer: () => void }) => {
  const history = useHistory()

  const accountsList = useSelector((state: AppState) => state.application.accountsList)

  const [loading, setLoading] = useState(false)

  const navigate = useCallback(
    (path: string, step?: string) => {
      onClose(false)
      if (step) {
        setCurrentStep(step, () => {
          history.push({ pathname: path, state: { step } })
        })
      } else {
        history.push({ pathname: path, state: { step } })
      }
    },
    [history, onClose],
  )

  const onSwitchAccount = useCallback(
    (accountIndex: number) => {
      setLoading(true)

      switchToAccount(accountIndex, (result: any) => {
        setLoading(false)
        if (result?.success) {
          syncActiveAccountData()
          navigate(WALLET_HOME_PATH)
        }
      })
    },
    [navigate],
  )

  const logoutAccount = useCallback(() => {
    lockApp((response: any) => {
      if (response.lock) {
        closeDrawer()
        history.push(APP_UNLOCK_PATH)
      }
    })
  }, [history, closeDrawer])

  return (
    <div className={styles.container}>
      <div key="Main Menu" className={styles.titleWrapper}>
        <Typography variant="h2" style={{ fontSize: 20, fontWeight: 500 }}>
          Wallet Menu
        </Typography>
      </div>
      <Divider />
      <div>
        <div style={{ width: '100%' }}>
          {accountsList.map((account) => (
            <MenuItem
              onClick={() => onSwitchAccount(account.index)}
              key={account.pubKey}
              className={cx(styles.accountWrapper, {
                [styles.accountActiveWrapper]: account.active,
              })}
              disabled={loading}
            >
              <img
                alt="avatar"
                className={styles.avatarImage}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(account.pubKey))}`}
              />
              <div className={styles.accountNameWrapper}>
                <Typography>{formatName(account.name, 12)}</Typography>
              </div>
              {account.active && <Icon className={styles.check} icon="check" size={12} color="#455CC2" />}
            </MenuItem>
          ))}
        </div>
      </div>
      <Divider light />
      <MenuItem key="Secret" onClick={() => navigate(APP_INIT_PATH, steps.NEW_SEED_WORDS)}>
        <AddBoxIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Create new account</Typography>
      </MenuItem>
      <MenuItem key="Import" onClick={() => navigate(APP_INIT_PATH, steps.IMPORT_SEED_WORDS)}>
        <InputIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Import new account</Typography>
      </MenuItem>
      <MenuItem key="Settings" onClick={() => navigate(SETTINGS_PATH)}>
        <SettingsIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Settings</Typography>
      </MenuItem>
      <MenuItem key="TermsOfUse" onClick={() => navigate(TERMS_OF_USE_PATH)}>
        <GavelIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Terms of Use</Typography>
      </MenuItem>
      <MenuItem key="ContactUs" onClick={() => window.open('https://www.totalsig.com/contact', '_blank')}>
        <MailOutlineIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Contact us</Typography>
      </MenuItem>
      <MenuItem
        key="LogOut"
        onClick={() => {
          logoutAccount()
        }}
      >
        <LockIcon classes={{ root: styles.icon }} />
        <Typography className={styles.textMenuTitle}>Log out</Typography>
      </MenuItem>
    </div>
  )
}

export default DrawerMenu
