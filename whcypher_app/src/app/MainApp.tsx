import './static/styles/App.scss'
// Async load for scripts, allows to load before all other scripts on web-pages
import 'setimmediate'

import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { HashRouter as BrowserRouter } from 'react-router-dom'

import AppHeader from './components/AppHeader/AppHeader'
import BottomSnackbar from './components/BottomSnackBar'
import ApplicationMainRouter from './routes/ApplicationMainRouter'
import { theme } from './theme'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="AppWrapper">
        <div className="App">
          <div className="AppInner">
            <BrowserRouter>
              <AppHeader />
              <ApplicationMainRouter />
            </BrowserRouter>

            <BottomSnackbar />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default App
