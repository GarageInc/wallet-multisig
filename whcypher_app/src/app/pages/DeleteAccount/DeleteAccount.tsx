import { Box, Button, CircularProgress } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Typography } from 'src/app/componentElements'
import { AlertBlock } from 'src/app/components/AlertBlock/AlertBlock'
import { AppState } from 'src/serviceWorker/app/store/store'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import { deleteActiveAccount } from '../../helpers/backgroundMethods'
import styles from './DeleteAccount.module.scss'
import { STextInput } from './styled'

const DeleteAccount = () => {
  const history = useHistory()

  const accountData = useSelector((state: AppState) => state.application.activeAccountData)

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const onDeleteClick = useCallback((pass: string) => {
    setLoading(true)
    deleteActiveAccount(pass, () => {
      setLoading(false)
    })
  }, [])

  return (
    <ContentWrapper title="Delete account" goBack={() => history.goBack()}>
      <div className={styles.container}>
        <Typography className={styles.subTitle} marginBottom="16px">
          You are about to delete account <span className={styles.blueText}>{accountData.name}</span>. If this is really
          what you want, type your wallet password below.
        </Typography>

        <AlertBlock text="You will not be able to restore your account after deleting it." />

        <div className={styles.passwordWrapper}>
          <STextInput label="Password" onInputChanged={(v) => setPassword(v)} type="password" />
        </div>
        <Box mt="16px" mb="16px">
          <Button color="primary" variant="contained" onClick={() => onDeleteClick(password)} fullWidth>
            {loading && <CircularProgress style={{ color: 'white' }} size={16} />}
            {!loading && 'Delete Account'}
          </Button>
        </Box>
      </div>
    </ContentWrapper>
  )
}

export default DeleteAccount
