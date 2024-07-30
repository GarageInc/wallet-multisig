import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import TermsOfUse from '../../../src/app/pages/TermsOfUse/TermsOfUse'
import { getStore } from '../../../src/serviceWorker/app/store/store'

describe('Your test', () => {
  let store

  beforeEach(async () => {
    store = await getStore()
  })

  afterEach(async () => {
    await store.dispatch({ type: 'RESET' })
  })

  test('renders Terms of Condition header', () => {
    render(
      <Provider store={store}>
        <TermsOfUse />
      </Provider>,
    )
    const titleElement = screen.getByText('Terms of Use')
    expect(titleElement).toBeInTheDocument()
  })
})
