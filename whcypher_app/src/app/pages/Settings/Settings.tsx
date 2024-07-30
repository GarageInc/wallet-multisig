import './Switch.scss'

import { Box, Typography } from '@material-ui/core'
import cx from 'classnames'
import Switch from 'rc-switch'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { WarningBlock } from 'src/app/components/WarningBlock/WarningBlock'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import NumberInput from '../../components/Form/NumberInput/NumberInput'
import {
  setSnackBarWarning,
  syncActivitiesWithServer,
  syncCurrencyRates,
  syncWalletBackupsWithRemote,
  updateSettings,
} from '../../helpers/backgroundMethods'
import styles from './Settings.module.scss'

interface IProps {
  classes?: any
  children: any
}

const Title = ({ classes, children }: IProps) => (
  <Box mb={1} mt={4}>
    <Typography classes={{ root: classes }} style={{ fontWeight: 500, fontSize: 18 }} variant="h3">
      {children}
    </Typography>
  </Box>
)

const SubTitle = ({ classes, children }: IProps) => (
  <Typography classes={{ root: classes }} style={{ fontWeight: 300, fontSize: 16 }} variant="h4">
    {children}
  </Typography>
)

const Content = ({ classes, children }: IProps) => (
  <Box mb={1}>
    <Typography classes={{ root: classes }} style={{ fontWeight: 300, fontSize: 12 }} variant="h4">
      {children}
    </Typography>
  </Box>
)

const Settings = () => {
  const history = useHistory()

  const settings = useSelector((state: AppState) => state.settings)
  const {
    walletBackupsEnabled,
    currencyRatesEnabled,
    pushNotificationsEnabled,
    syncActivitiesWithServerEnabled,
    autoApproveEnabled,
    autoApproveLimitUSD,
  } = settings

  const knownHostsList = useSelector((state: AppState) => state.knownHosts.list)

  const handleWalletBackupsChanged = useCallback((value: any) => {
    updateSettings({ walletBackupsEnabled: value }, (result: any) => {
      if (result.success && value) {
        syncWalletBackupsWithRemote()
      }
    })
  }, [])

  const disableAutoApprove = useCallback(() => {
    updateSettings({ autoApproveEnabled: false }, (result: any) => {
      setSnackBarWarning('Auto trading was disabled since it relies on up-to-date currency rate info')
    })
  }, [])

  const enableCurrencyRates = useCallback(() => {
    updateSettings({ currencyRatesEnabled: true }, (result: any) => {
      setSnackBarWarning('Currency rates was enabled since auto trading relies on up-to-date currency rate info')
    })
  }, [])

  const handleCurrencyRatesChanged = useCallback(
    (value: boolean) => {
      updateSettings({ currencyRatesEnabled: value }, (result: any) => {
        syncCurrencyRates()

        if (result.success && autoApproveEnabled && value === false) {
          disableAutoApprove()
        }
      })
    },
    [autoApproveEnabled, disableAutoApprove],
  )

  const handleAutoApprovalChanged = useCallback(
    (value: boolean) => {
      if (!knownHostsList.length) return

      updateSettings({ autoApproveEnabled: value }, (result: any) => {
        if (result.success && value === true && !currencyRatesEnabled) {
          enableCurrencyRates()
        }
      })
    },
    [currencyRatesEnabled, enableCurrencyRates],
  )

  const handleNotificationsChanged = useCallback((value: any) => {
    updateSettings({ pushNotificationsEnabled: value })
  }, [])

  const handleSyncActivitiesChanged = useCallback((value: any) => {
    updateSettings({ syncActivitiesWithServerEnabled: value }, () => {
      syncActivitiesWithServer()
    })
  }, [])

  const handleAutoApproveLimitChanged = useCallback((amountInUsd: any) => {
    updateSettings({ autoApproveLimitUSD: amountInUsd })
  }, [])

  const goBack = useCallback(() => history.goBack(), [history])

  return (
    <ContentWrapper title="Settings" goBack={goBack}>
      <div className={styles.content}>
        <div>
          <Title>Wallet backups</Title>
          <div className={styles.inline}>
            <SubTitle>Remote backups</SubTitle>
            <Switch checked={walletBackupsEnabled} onChange={handleWalletBackupsChanged} />
          </div>
          <Content>
            Enable automatic wallet backup that will be saved on our server. Wallet backups are encrypted with your seed
            phrase and no one, including us, can decrypt them. You can always export all your wallets manually.
          </Content>

          <Title>Notifications</Title>
          <div className={styles.inline}>
            <SubTitle>Push notifications</SubTitle>
            <Switch checked={pushNotificationsEnabled} onChange={handleNotificationsChanged} />
          </div>
          <div className={styles.inline}>
            <Content>Notify me about ongoing activity via system notification channels.</Content>
          </div>

          <Title>Activities</Title>
          <div className={styles.inline}>
            <SubTitle>Push wallet activities to server</SubTitle>
            <Switch checked={syncActivitiesWithServerEnabled} onChange={handleSyncActivitiesChanged} />
          </div>
          <Content>
            Enabling this setting will push TotalSig activities to our server. This will let you see your history on
            other devices, which have access to this account. Wallet activities are encrypted with your seed phrase and
            no one, including us, can decrypt them.
          </Content>

          <Title>Currency rates</Title>
          <div className={styles.inline}>
            <SubTitle>Enable currency rates</SubTitle>
            <Switch checked={currencyRatesEnabled} onChange={handleCurrencyRatesChanged} />
          </div>
          <div className={styles.inline}>
            <Content>
              When this setting is enables, currency rates will be provided from known assets. Currency rates are pulled
              from our server.
            </Content>
          </div>

          <Title>Auto trading policy</Title>
          {knownHostsList.length === 0 && (
            <WarningBlock text="Auto trading is disabled until you will connect to the first site supporting such feature"></WarningBlock>
          )}
          <div className={cx(styles.inline, knownHostsList.length ? '' : styles.disabled)}>
            <SubTitle>Enable auto trading</SubTitle>
            <Switch checked={autoApproveEnabled && !!knownHostsList.length} onChange={handleAutoApprovalChanged} />
          </div>
          <Content classes={knownHostsList.length ? '' : styles.disabled}>
            TotalSig will make automatic approval on trading transaction. Trading transaction&apos;s destination should
            be signed by you or and there should be counter party transaction. TotalSig will automatically validate many
            details to ensure safety of your funds. Automatic trading only work when your wallet is online.
          </Content>

          <SubTitle classes={autoApproveEnabled && knownHostsList.length ? '' : styles.disabled}>
            Auto trade limit
          </SubTitle>
          <div
            className={cx(styles.inline, autoApproveEnabled && knownHostsList.length ? '' : styles.disabled)}
            style={{ marginBottom: 0 }}
          >
            <div style={{ width: '100%' }}>
              <NumberInput
                value={autoApproveLimitUSD}
                disabled={!(autoApproveEnabled && knownHostsList.length)}
                onInputChanged={(v: number) => (v >= 0 ? handleAutoApproveLimitChanged(v) : 0)}
                extraStyles={{ marginBottom: 0 }}
              />
            </div>
            <Typography className={styles.currency}>USD</Typography>
          </div>
          <Content classes={autoApproveEnabled && knownHostsList.length ? '' : styles.disabled}>
            TotalSig will only auto approve trades that are less that the amount specified above.
          </Content>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Settings
