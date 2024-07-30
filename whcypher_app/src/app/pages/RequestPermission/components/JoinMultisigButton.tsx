import { Button, Grid } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'

import { SIGNING_IN } from '../../../constants/paths'
import { joinMultisigSessionAndProvideSignedAddress } from '../../../helpers/backgroundMethods'
import { IWebPageRequest } from '../RequestPermission/types'

const JOIN_MULTISIG_SESSION_SESSION_TEXT = 'Generating a new multisig...';

interface IProps {
  webPageRequest: IWebPageRequest
  accountData: IAccountData
  path?: string
}

const JoinMultisigButton = ({ webPageRequest, accountData, path }: IProps) => {
  const history = useHistory()

  const onJoinClick = useCallback(({ webPageRequest, accountData, path }: IProps) => {
    joinMultisigSessionAndProvideSignedAddress(webPageRequest, accountData, path)
    history.push({
      pathname: SIGNING_IN,
      state: {
        host: webPageRequest.host,
        requestId: webPageRequest.id,
        mainText: JOIN_MULTISIG_SESSION_SESSION_TEXT,
      },
    })
  }, [history])

  return (
    <Grid item xs={6}>
      <Button
        className="actionFont"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => onJoinClick({ webPageRequest, accountData, path })}
      >
        Join
      </Button>
    </Grid>
  )
}

export default JoinMultisigButton
