import { Button, Link as MaterialLink, List, ListItem, ListItemText, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'src/serviceWorker/app/store/store'

import Icon from '../../../../componentElements/Icon/Icon'
import ContentWrapper from '../../../../components/ContentWrapper/ContentWrapper'
import * as appInitSteps from '../../../../constants/appInitSteps'
import { APP_INIT_PATH } from '../../../../constants/paths'
import { setCurrentStep, switchToAccount } from '../../../../helpers/backgroundMethods'
import { formatAddress, formatName } from '../../../../helpers/formatters'
import { createAvatarSvg } from '../../../../helpers/publicKeyImageCreator'
import styles from './ChangeAccount.module.scss'

const ChangeAccount = () => {
  const history = useHistory()

  const accountsList = useSelector((state: AppState) => state.application.accountsList)

  const onBack = useCallback(() => {
    history.goBack()
  }, [history])

  const onSwitchAccount = useCallback(
    (accountIndex: number) => {
      switchToAccount(accountIndex, (result: any) => {
        if (result && result.success) {
          history.goBack()
        }
      })
    },
    [history],
  )

  const onCreateNewAccountClick = useCallback(() => {
    setCurrentStep(appInitSteps.NEW_SEED_WORDS, () => {
      history.push({
        pathname: APP_INIT_PATH,
        state: { step: 'FROM_APP_INIT_PATH' },
      })
    })
  }, [history])

  const onImportAccountClick = useCallback(() => {
    setCurrentStep(appInitSteps.IMPORT_SEED_WORDS, () => {
      history.push({
        pathname: APP_INIT_PATH,
        state: { step: 'FROM_APP_INIT_PATH' },
      })
    })
  }, [history])

  return (
    <ContentWrapper title="Available Accounts" goBack={() => onBack()}>
      <div className={styles.actions}>
        <MaterialLink onClick={onCreateNewAccountClick} classes={{ root: styles.link }}>
          <Icon icon="create" size={11} />
          Create new account
        </MaterialLink>
        <MaterialLink onClick={onImportAccountClick} classes={{ root: styles.link }}>
          <Icon icon="import" size={11} />
          Import new account
        </MaterialLink>
      </div>

      <div>
        <List dense>
          {accountsList.length ? (
            accountsList.map((account) => (
              <ListItem key={account.pubKey} disableGutters>
                <ListItemText
                  primary={
                    <div
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      {account.pubKey && (
                        <img
                          alt="avatar"
                          className={styles.avatar}
                          src={`data:image/svg+xml;utf8,${encodeURIComponent(createAvatarSvg(account.pubKey))}`}
                        />
                      )}
                      <div className={styles.accountWrapper}>
                        <Typography className={styles.accountName}>{formatName(account.name)}</Typography>
                        <div className={styles.accountPubKeyWrapper}>
                          <Typography className={styles.accountPubKey}>{formatAddress(account.pubKey, 6)}</Typography>
                        </div>
                      </div>
                    </div>
                  }
                />
                {!account.active && (
                  <Button color="primary" variant="contained" onClick={() => onSwitchAccount(account.index)}>
                    Select
                  </Button>
                )}
                {account.active && (
                  <Button disabled variant="contained">
                    Active
                  </Button>
                )}
              </ListItem>
            ))
          ) : (
            <CircularProgress />
          )}
        </List>
      </div>
    </ContentWrapper>
  )
}

export default ChangeAccount
