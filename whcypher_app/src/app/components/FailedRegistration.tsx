import { Grid, IconButton, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CancelIcon from '@material-ui/icons/Cancel'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Browser from 'webextension-polyfill'

interface IProps {
  closePopup: (requestId: string) => void
  location: {
    state: {
      requestId: string
    }
  }
}

const FailedRegistration = ({ closePopup, location: { state: { requestId } = {} as any } = {} as any }: IProps) => (
  <div style={{ padding: '50px 24px 30px 24px' }} alignItems="center">
    <>
      <Grid xs={12} style={{}}>
        <CancelIcon style={{ fontSize: 100, color: '#000' }} />
      </Grid>

      <Grid xs={12} style={{ height: '10%', padding: '10px' }}>
        <Typography style={{ color: '#000', fontSize: 20 }}>Waiting time expired.</Typography>
        <Typography style={{ color: '#000', fontSize: 20 }}>Please try again.</Typography>
      </Grid>

      <Grid xs={12} style={{}}>
        <IconButton color="primary" onClick={() => closePopup(requestId)}>
          <ArrowBackIosIcon color="primary" />
          <Typography>Close</Typography>
        </IconButton>
      </Grid>
    </>
  </div>
)

const mapDispatchToProps = () => ({
  closePopup: (requestId: string) => Browser.runtime.sendMessage(undefined, { func: 'closePopup', id: requestId }),
})

const FailedRegistrationContainer = compose(withRouter, connect(null, mapDispatchToProps))(FailedRegistration)
export default FailedRegistrationContainer
