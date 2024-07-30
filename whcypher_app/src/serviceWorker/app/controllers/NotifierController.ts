import Browser from 'webextension-polyfill'

import { getStore } from '../store/store'

const notificationUrl = 'static/image/icons/favicon-96x96.png'

class NotifierController {
  static async create(title: string, message: string) {
    const store = await getStore()
    const { pushNotificationsEnabled } = store.getState().settings
    if (pushNotificationsEnabled) {
      Browser.notifications.create({
        type: 'basic',
        iconUrl: notificationUrl,
        title,
        message,
        // eventTime: Date.now(),
        // contextMessage: getFormattedDate(),
      })
    }
  }
}

export default NotifierController
