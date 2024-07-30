import { Button, Grid } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { IAccountData } from 'src/serviceWorker/app/store/reducers/applicationReducer'

import { SIGNING_IN } from '../../../constants/paths'
import { provideDestinationsSignaturesOnRequestPermission } from '../../../helpers/backgroundMethods'
import { IWebPageRequest } from '../RequestPermission/types'

interface IProps {
  webPageRequest: IWebPageRequest
  accountData: IAccountData
}

const SignDestinationsButton = ({ webPageRequest, accountData }: IProps) => {
  const history = useHistory()

  const REQUEST_DESTINATION_BAR_MASSAGE = 'Preparing signature and sending it to client:'

  const onSignClick = useCallback(
    ({ webPageRequest, accountData }: IProps) => {
      provideDestinationsSignaturesOnRequestPermission(webPageRequest, accountData, (response: any) => {
        if (!response.error) {
          history.push({
            pathname: SIGNING_IN,
            state: {
              host: webPageRequest.host,
              requestId: webPageRequest.id,
              mainText: REQUEST_DESTINATION_BAR_MASSAGE,
            },
          })
        }
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
        onClick={() => onSignClick({ webPageRequest, accountData })}
      >
        Sign
      </Button>
    </Grid>
  )
}

export default SignDestinationsButton
