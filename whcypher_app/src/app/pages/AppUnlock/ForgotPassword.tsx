/* eslint-disable no-undef */
import { Button, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Typography } from 'src/app/componentElements'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import TextInput from '../../components/Form/TextInput/TextInput'
import { nukeAppData, setSnackBarError, setSnackBarSuccess } from '../../helpers/backgroundMethods'
import styles from './ForgotPassword.module.scss'

const CONFIRMATION_TEXT = 'Yes, nuke my TotalSig'

const ForgotPassword = () => {
  const history = useHistory()

  const [confirmation, setConfirmation] = useState('')
  const [requestInProcess, setRequestInProcess] = useState(false)

  const onNukeWalletData = () => {
    setConfirmation('')
    if (confirmation === CONFIRMATION_TEXT) {
      setRequestInProcess(true)
      nukeAppData((response: any) => {
        if (response.success) {
          setSnackBarSuccess('Wallet data nuked')
        } else {
          setRequestInProcess(false)
        }
      })
    } else {
      setSnackBarError('Incorrect confirmation text is provided')
    }
  }

  return (
    <ContentWrapper title="Forgot Password" goBack={() => history.goBack()} noFooter>
      <div className={styles.content}>
        <Typography className={styles.section} style={{ marginBottom: 20 }}>
          TotalSig is non custodial wallet and we don&apos;t have access to any user data. This also means we can not
          recover your password in case it is lost.
        </Typography>

        <AlertBlock
          text={
            <>
              The only way to recover your account is to reinstaniate your wallet with your seed phrase(s). This will{' '}
              <b>DESTROY ALL TOTALSIG DATA INCLUDING ALL ACCOUNTS</b> and then you can import your seed phrase.
            </>
          }
        />

        <div className={styles.confirmationWrapper}>
          <TextInput
            label="Confirmation"
            type="text"
            value={confirmation}
            onInputChanged={(v) => setConfirmation(v)}
            extraStyles={{ marginBottom: 5 }}
          />
          <div>
            Type &nbsp;
            <b style={{ color: 'red' }}>{CONFIRMATION_TEXT}</b>
            &nbsp; to proceed.
          </div>
        </div>

        <div className={styles.inline}>
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <Button
              variant="contained"
              classes={{ root: styles.confirmationButton }}
              fullWidth
              onClick={() => onNukeWalletData()}
            >
              {requestInProcess ? <CircularProgress style={{ color: 'white' }} size={16} /> : 'Nuke TotalSig'}
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default ForgotPassword
