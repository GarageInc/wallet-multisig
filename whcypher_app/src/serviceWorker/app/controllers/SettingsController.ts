import { updateSettings } from '../store/reducers/settingsReducer'
import { getStore } from '../store/store'
import { waitForSync } from '../utils/dbHelper'

class SettingsController {
  async updateSettings(newSettings: any) {
    const store = await getStore()
    await store.dispatch(updateSettings(newSettings))
    await waitForSync()
  }
}

export default SettingsController
