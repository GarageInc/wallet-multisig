import { MenuItem, Popover, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { FlexBox } from 'src/app/componentElements'
import { COLORS } from 'src/app/componentElements/Colors'
import { JoinIcon, PlusIcon } from 'src/app/componentElements/icons'
import { AppState } from 'src/serviceWorker/app/store/store'

import {
  DELETE_ACCOUNT_PATH,
  DESTINATIONS_BOOK_PATH,
  EXPORT_SEED_PATH,
  EXPORT_WALLETS_PATH,
  INIT_MULTISIG_SESSION_PATH,
  JOIN_MULTISIG_SESSION_PATH,
  KNOWN_HOSTS_PATH,
  SUBSCRIPTION_PLAN_SELECT_PATH,
} from '../../../constants/paths'
import { openImportWalletsInNewWindow, updateActiveAccountName } from '../../../helpers/backgroundMethods'
import { formatName } from '../../../helpers/formatters'
import styles from './AccountHeader.module.scss'
import { ConnectedBadge } from './ConnectedBadge/ConnectedBadge'
import {
  SAccountCheckIcon,
  SAccountEditIcon,
  SAccountName,
  SAccountNameWrapper,
  SContainer,
  SHeader,
  SIconButton,
  SLabel,
  SLink,
  SLinks,
  SOptionsBtn,
  STab,
  STabsContainer,
  STextField,
} from './styleds'

export enum TABS {
  WALLETS = 'WALLETS',
  ACTIVITY = 'ACTIVITY',
  WEB3 = 'WEB3',
}

const AccountHeader = ({ tab, setTabId }: { tab: TABS; setTabId: (v: TABS) => void }) => {
  const history = useHistory()

  const activeAccountName = useSelector((state: AppState) => state.application.activeAccountData.name || '')

  const [anchorEl, setAnchorEl] = useState(null)
  const optionsOpen = Boolean(anchorEl)
  const optionsId = optionsOpen ? 'simple-popover' : undefined

  const [visibleAccountName, setVisibleAccountName] = useState(activeAccountName)
  const [isAccountNameEdited, setAccountNameEdited] = useState(false)

  const updateAccountName = useCallback(() => {
    updateActiveAccountName(visibleAccountName, () => {
      setAccountNameEdited(false)
    })
  }, [visibleAccountName])

  const onOptionsButtonClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onOptionsClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const openImportWalletsInNewWindowWindow = useCallback(() => {
    openImportWalletsInNewWindow((result: any) => {
      if (result.success) window.close()
    })
  }, [])

  const toNewMultisigPage = useCallback(() => {
    history.push(INIT_MULTISIG_SESSION_PATH)
  }, [history])

  const toJoinMultisigPage = useCallback(() => {
    history.push(JOIN_MULTISIG_SESSION_PATH)
  }, [history])

  return (
    <SContainer className={styles.container}>
      <FlexBox>
        <SHeader>
          {!isAccountNameEdited ? (
            <SAccountNameWrapper>
              <SAccountName>{formatName(activeAccountName, 16)}</SAccountName>
              <SIconButton onClick={() => setAccountNameEdited(true)}>
                <SAccountEditIcon />
              </SIconButton>
            </SAccountNameWrapper>
          ) : (
            <SAccountNameWrapper style={{ padding: 0 }}>
              <STextField
                value={visibleAccountName}
                onChange={(e) => setVisibleAccountName(e.target.value)}
                inputProps={{
                  maxLength: 34,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateAccountName()
                  }
                }}
              />
              <SIconButton onClick={updateAccountName}>
                <SAccountCheckIcon />
              </SIconButton>
            </SAccountNameWrapper>
          )}
        </SHeader>

        <STabsContainer>
          <STab active={tab === TABS.WALLETS} onClick={() => setTabId(TABS.WALLETS)}>
            Wallets
          </STab>
          <STab active={tab === TABS.ACTIVITY} onClick={() => setTabId(TABS.ACTIVITY)}>
            Activity
          </STab>
          <STab active={tab === TABS.WEB3} onClick={() => setTabId(TABS.WEB3)}>
            Web3
            <ConnectedBadge ifConnected />
          </STab>
        </STabsContainer>

        <SLinks>
          <SLink onClick={toNewMultisigPage}>
            <PlusIcon />
            <SLabel>New multisig</SLabel>
          </SLink>
          <SLink onClick={toJoinMultisigPage}>
            <JoinIcon />
            <SLabel>Join multisig</SLabel>
          </SLink>
        </SLinks>
      </FlexBox>

      <div id="main-header">
        <SOptionsBtn>
          <SIconButton onClick={onOptionsButtonClick}>
            <MenuIcon style={{ fontSize: 22, color: COLORS.palette.blue }} />
          </SIconButton>
        </SOptionsBtn>

        <Popover
          id={optionsId}
          container={document.getElementById('main-header')}
          open={optionsOpen}
          anchorEl={anchorEl}
          onClose={onOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ padding: 10 }}>
            <MenuItem onClick={() => history.push(EXPORT_WALLETS_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Export wallets</Typography>
            </MenuItem>

            <MenuItem onClick={() => openImportWalletsInNewWindowWindow()} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Import wallets</Typography>
            </MenuItem>

            <MenuItem onClick={() => history.push(DESTINATIONS_BOOK_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Destination book</Typography>
            </MenuItem>

            <MenuItem onClick={() => history.push(KNOWN_HOSTS_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Known Hosts</Typography>
            </MenuItem>

            <MenuItem onClick={() => history.push(EXPORT_SEED_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Export seed</Typography>
            </MenuItem>

            <MenuItem onClick={() => history.push(SUBSCRIPTION_PLAN_SELECT_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Subscription</Typography>
            </MenuItem>

            <MenuItem onClick={() => history.push(DELETE_ACCOUNT_PATH)} classes={{ gutters: styles.gutters }}>
              <NavigateNextIcon className={styles.icon} />
              <Typography className={styles.optionsItemText}>Delete account</Typography>
            </MenuItem>
          </div>
        </Popover>
      </div>
    </SContainer>
  )
}

export default AccountHeader
