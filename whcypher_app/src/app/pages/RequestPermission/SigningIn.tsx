import { Grid, LinearProgress, Typography } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { FlexBox } from 'src/app/componentElements'

import AccountRequestBar from './components/AccountRequestBar'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#1687a7',
    },
  },
})

interface IProps {
  location: {
    state: {
      name: string
      text: string
      host: string
      mainText: string
    }
  }
}

const SigningIn = ({ location: { state: { name, text, host, mainText } = {} as any } = {} as any }: IProps) => {
  return (
    <FlexBox style={{ padding: '50px 24px 30px 24px' }} alignItems="center">
      <AccountRequestBar host={host} text={text} />
      <>
        <Grid xs={12}>
          {<Typography style={{ marginBottom: 5, color: '#000', fontSize: 20 }}>{mainText}</Typography> || (
            <Typography style={{ marginBottom: 5, color: '#000', fontSize: 20 }}>
              Signing in with
              <span style={{ fontWeight: 'bold' }}>{` ${name}`}</span>
            </Typography>
          )}
          <MuiThemeProvider theme={theme}>
            <LinearProgress color="primary" />
          </MuiThemeProvider>
        </Grid>
        <Grid xs={12} style={{ height: '10%', paddingTop: '30px' }}>
          <Typography style={{ color: '#000', fontSize: 20 }}>Please wait...</Typography>
        </Grid>
      </>
    </FlexBox>
  )
}

const SignInContainer = compose(withRouter)(SigningIn)

export default SignInContainer
