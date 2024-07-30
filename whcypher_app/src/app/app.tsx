import './../app/static/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { getStore } from '../serviceWorker/app/store/store'
import App from './MainApp'
;(async () => {
  const store = await getStore()

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
})()
