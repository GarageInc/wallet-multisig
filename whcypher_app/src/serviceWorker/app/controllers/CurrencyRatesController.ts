import * as currencyRatesReducer from '../store/reducers/currencyRatesReducer'
import { getStore } from '../store/store'
import { getRatesApi } from '../utils/api'
import { waitForSync } from '../utils/dbHelper'

class CurrencyRatesController {
  async updateRates() {
    const store = await getStore()
    const { settings } = store.getState()
    const { currencyRatesEnabled } = settings

    if (currencyRatesEnabled) {
      const currentRates = await getRatesApi()

      await store.dispatch(currencyRatesReducer.setRates(currentRates))
      await waitForSync()
    }
  }

  async syncRates() {
    const store = await getStore()
    const { settings } = store.getState()
    const { currencyRatesEnabled } = settings

    if (currencyRatesEnabled) {
      await this.updateRates()
    } else {
      await store.dispatch(currencyRatesReducer.setRates({}))
      await waitForSync()
    }
  }
}

export default CurrencyRatesController
