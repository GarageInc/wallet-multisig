import '../static/styles/UI.css'

import { Button, Container, Grid, Typography } from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'

interface IProps {
  anchorEl: any
  open: boolean
  value: string
  onClose: () => void
}

export default class QRCodePopup extends Component {
  // This component doesn't use any properties
  constructor(props: IProps) {
    super(props)

    this.state = {}
  }

  onExitClicked() {}

  render() {
    const style_text12 = (color: string, props: IProps) => ({
      float: 'left',
      'font-family': 'Helvetica Neue',
      'font-size': '12px',
      'line-height': '16px',
      color,
      ...props,
    })

    const style_text16 = (color: string, props: IProps) => ({
      'font-family': 'Helvetica Neue',
      'font-size': '16px',
      'line-height': '28px',
      color,
      ...props,
    })

    return (
      <Popover
        id="qr-code-popover"
        anchorEl={this.props.anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        open={this.props.open}
        onClose={this.props.onClose}
        style={{
          left: '20%',
          top: '25%',
          width: '80%',
          height: '50%',
        }}
      >
        <Container style={{ float: 'left', padding: '10px' }}>
          <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid item style={{ padding: '5px' }}>
              <Typography style={style_text16('#4F4F4F')}>Scan with you wallet app</Typography>
            </Grid>
            <Grid item style={{ padding: '5px' }}>
              <QRCode value={this.props.value} />
            </Grid>
            <Grid item style={{ padding: '5px' }}>
              <Button onClick={this.props.onClose} style={{ backgroundColor: '#2690c3' }}>
                <Typography style={style_text12('#FFFFFF')}>DONE</Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Popover>
    )
  }
}
