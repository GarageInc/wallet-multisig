import { Store } from '@reduxjs/toolkit'
import { dispatchToServiceWorker } from 'src/app/helpers/channels'

import { isInServiceWorker } from './isInServiceWorker'

// [TODO] Add comment why does it happens this way? There is a bug that should be mentioned
export const dispatchWrapper = (store: Store, data: { payload: any; type: string }) => {
  if (isInServiceWorker) {
    store.dispatch(data)
  } else {
    dispatchToServiceWorker(data)
  }
}
