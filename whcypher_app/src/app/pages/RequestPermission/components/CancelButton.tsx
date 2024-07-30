import { Button, Grid } from '@material-ui/core'
import React from 'react'

import { provideErrorOnRequestPermission } from '../../../helpers/backgroundMethods'

interface IProps {
  webPageRequest: any
}

const CancelButton = ({ webPageRequest }: IProps) => {
  const onClick = (pageRequest: any) => {
    provideErrorOnRequestPermission(pageRequest, 'User cancelled the request')
  }

  return (
    <Grid item xs={6}>
      <Button
        fullWidth
        style={{ color: 'white' }}
        variant="contained"
        color="secondary"
        onClick={() => onClick(webPageRequest)}
      >
        Cancel
      </Button>
    </Grid>
  )
}

export default CancelButton
