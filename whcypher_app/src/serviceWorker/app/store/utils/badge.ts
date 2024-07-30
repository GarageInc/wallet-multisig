import Browser from 'webextension-polyfill'

export const updateBadgeCounter = (newCounter: number) => {
  if (newCounter > 0) {
    Browser.action.setBadgeText({ text: newCounter.toString() })
  } else {
    Browser.action.setBadgeText({ text: '' })
  }
}
