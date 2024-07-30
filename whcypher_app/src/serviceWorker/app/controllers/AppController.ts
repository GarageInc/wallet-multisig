import { generateMnemonic } from 'bip39'

import { APP_INIT_REQUEST_TYPES } from '../../../app/constants/requestTypes'
import SeedsDB from '../../db/SeedsDB'
import Account from '../models/Account'
import * as appInitReducer from '../store/reducers/appInitReducer'
import * as applicationReducer from '../store/reducers/applicationReducer'
import * as backupStatusReducer from '../store/reducers/backupStatusReducer'
import * as badgeReducer from '../store/reducers/badgeReducer'
import * as requestsReducer from '../store/reducers/requestsReducer'
import * as snackbarReducer from '../store/reducers/snackbarReducer'
import { AppState, getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'
import { hasDuplicates } from '../utils/seed'

class AppController {
  async clearState() {
    const store = await getStore()

    const { requests }: AppState = await store.getState()

    const initRequestsToClean = requests.requestsList.filter((request) =>
      Object.values(APP_INIT_REQUEST_TYPES).includes(request.requestName),
    )
    await initRequestsToClean.forEach(async (request) => {
      await store.dispatch(requestsReducer.removeRequest(request))
      await store.dispatch(badgeReducer.updateBadge(-1))
      await waitForSync()
    })

    await store.dispatch(applicationReducer.appInitialized())
    await store.dispatch(appInitReducer.nullifyState())
    await waitForSync()

    await store.dispatch(backupStatusReducer.nullifyState())
    await waitForSync()

    return true
  }

  async setAppInitPath(path: string) {
    const store = await getStore()

    await store.dispatch(appInitReducer.setAppInitPath(path))
    await waitForSync()

    return true
  }

  // Nuke all data and return wallet back to original state
  async nukeAppData() {
    await Account.cleanUp()

    const store = await getStore()
    await store.dispatch({ type: 'RESET' })

    await SeedsDB.nukeAppData()
  }

  async setCurrentStep(step: string) {
    const store = await getStore()

    await store.dispatch(appInitReducer.setCurrentStep(step))
    await waitForSync()

    return true
  }

  async setPrevSteps(steps: string[]) {
    const store = await getStore()

    await store.dispatch(appInitReducer.setPrevSteps(steps))
    await waitForSync()

    return true
  }

  async setPassword(password: string) {
    const store = await getStore()

    await store.dispatch(appInitReducer.setPassword(password))
    await waitForSync()

    return true
  }

  async nullifyAppInitState() {
    const store = await getStore()

    await store.dispatch(appInitReducer.nullifyState())
    await waitForSync()

    await store.dispatch(backupStatusReducer.nullifyState())
    await waitForSync()

    return true
  }

  async clearSeed() {
    const store = await getStore()

    await store.dispatch(appInitReducer.setSeedWords([]))
    await waitForSync()

    return true
  }

  async generateNewSeed() {
    const store = await getStore()

    let newSeed
    do {
      newSeed = generateMnemonic(160).split(' ')
    } while (hasDuplicates(newSeed))

    await store.dispatch(appInitReducer.setSeedWords(newSeed))
    await waitForSync()

    return newSeed
  }

  async setEnteredSeedWords(seedWords: string[]) {
    const store = await getStore()

    await store.dispatch(appInitReducer.setEnteredSeedWords(seedWords))
    await waitForSync()

    return true
  }

  async setBetaWarning() {
    const store = await getStore()

    await store.dispatch(snackbarReducer.setBetaWarning())
    await waitForSync()

    return true
  }

  async setSnackBarMessage(messageType: string, message: string) {
    const store = await getStore()

    switch (messageType) {
      case 'warning':
        await store.dispatch(snackbarReducer.setWarning(message))
        break
      case 'error':
        await store.dispatch(snackbarReducer.setError(message))
        break
      case 'success':
        await store.dispatch(snackbarReducer.setSuccess(message))
        break
    }
    await waitForSync()

    return true
  }

  async closeSnackBar() {
    const store = await getStore()

    await store.dispatch(snackbarReducer.closeSnackBar())
    await waitForSync()

    return true
  }
}

export default AppController
