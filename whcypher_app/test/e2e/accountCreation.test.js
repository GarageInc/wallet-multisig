import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { getStore } from '../../src/serviceWorker/app/store/store'

const mockSendMessage = jest.fn((options, cb) => {
  return {
    success: true,
  }
})

global.chrome = {
  runtime: {
    sendMessage: mockSendMessage,
    id: 'tab-id',
  },
  tabs: {
    query: jest.fn((options, cb) =>
      cb([
        {
          url: 'chrome-extension://not-tab-id',
        },
      ]),
    ),
  },
  action: {
    setBadgeText: jest.fn(),
  },
}

import App from '../../src/app/App'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test', route)

  return render(ui, { wrapper: BrowserRouter })
}

describe('Account creation', () => {
  let store

  beforeEach(async () => {
    store = await getStore()
  })

  afterEach(async () => {
    await store.dispatch({ type: 'RESET' })
  })

  test('should succeed', async () => {
    const { debug, container, getByText } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: '/app_init' },
    )

    const getStartedButton = await screen.getByText(/Get Started/i)
    expect(getStartedButton).toBeInTheDocument()

    Simulate.click(getStartedButton)

    const state = store.getState()
    expect(state.appInit.currentStep).not.toBe('WELCOME')

    // Create phase
    const importButton = await screen.getByText('Import', {
      exact: true,
    })
    expect(importButton).toBeInTheDocument()

    Simulate.click(importButton)

    // Password phase
    const [passwordInput, confirmPasswordInput] = container.querySelectorAll(
      'div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth > div > input',
    )
    const checkbox = container.querySelector('div > span > span.MuiIconButton-label > input')
    const agreeButton = container.querySelector('div > button')

    Simulate.change(checkbox, { target: { checked: true } })
    Simulate.change(passwordInput, { target: { value: 'Test12345' } })
    Simulate.change(confirmPasswordInput, { target: { value: 'Test12345' } })
    Simulate.click(agreeButton)

    // Import phase
    const vaultSeedInput = container.querySelector('textarea')
    const importSeedButton = container.querySelector('div > button')

    Simulate.change(vaultSeedInput, {
      target: { value: 'east decorate sunset hood armor plastic dune tiny duty ice season brick never frozen view' },
    })
    Simulate.click(importSeedButton)

    expect(mockSendMessage).toHaveBeenCalled()
    expect(getByText('Congratulations')).not.toBe(null)
    expect(store.getState().appInit.currentStep).toBe('CONGRATULATIONS')
  })
})
