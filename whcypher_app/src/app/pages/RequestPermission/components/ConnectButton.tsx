import { Button, Grid } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'

import { SIGNING_IN } from '../../../constants/paths'
import { addKnownHost, provideMessageHashSignatureOnRequestPermission } from '../../../helpers/backgroundMethods'
import { IWebPageRequest } from '../RequestPermission/types'

interface IProps {
  accountData: IAccountData
  webPageRequest: IWebPageRequest
}

const ConnectButton = ({ webPageRequest, accountData }: IProps) => {
  const history = useHistory()

  const onConnectClick = useCallback(
    ({ webPageRequest, accountData }: IProps) => {
      const { name } = accountData
      const { host } = webPageRequest

      addKnownHost(host, () => {
        provideMessageHashSignatureOnRequestPermission(webPageRequest, () => {
          history.push({
            pathname: SIGNING_IN,
            state: {
              name,
              host,
            },
          })
        })
      })
    },
    [history],
  )

  return (
    <Grid item xs={6}>
      <Button
        className="actionFont"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => onConnectClick({ webPageRequest, accountData })}
      >
        Log in
      </Button>
    </Grid>
  )
}

export default ConnectButton
