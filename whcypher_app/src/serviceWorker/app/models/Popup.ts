import { debounce } from 'lodash'
import logger from 'src/app/helpers/appLogger'
import { Windows } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

interface IPopupControllerOptions {
  page?: string
  popupHeight?: number
  popupWidth?: number
}

// [TODO] Unify with popup opening in requests (not critical)
export default class Popup {
  POPUP_HEIGHT = 600

  POPUP_WIDTH = 350

  popupId: number | undefined = undefined

  isDebug = false

  htmlPage = ''

  constructor(opts: IPopupControllerOptions) {
    if (opts.popupHeight) this.POPUP_HEIGHT = opts.popupHeight
    if (opts.popupWidth) this.POPUP_WIDTH = opts.popupWidth
    this.htmlPage = opts.page || ''
  }

  showPopup = debounce(async (path?: string) => {
    const popup = await this.getPopup()
    if (popup && popup.id) {
      logger.info('/// showPopup: Popup found ', popup)
      await browser.windows.update(popup.id, { focused: true })
      logger.info('/// showPopup: Popup focused ', popup.id)
    } else {
      logger.info('/// showPopup: Popup not found, opening a new one ')
      // open new popup

      const popupWindow = await browser.windows.create({
        url: this.htmlPage + (path || ''),
        type: 'popup',
        width: this.POPUP_WIDTH,
        height: this.POPUP_HEIGHT,
        focused: true,
      })
      // this.popupId = popupWindow.tabs?.[0].id
      this.popupId = popupWindow.id
    }
  }, 500)

  async getPopup() {
    logger.info('/// getPopup: popupId ', this.popupId)
    const windows: Windows.Window[] = await browser.windows.getAll()

    if (windows) {
      logger.info('/// getPopup: windows ', windows)
      return windows.find((w) => {
        // return w && w.type === 'popup' && w.tabs?.[0].id === this.popupId
        return w && w.type === 'popup' && w.id === this.popupId
      })
    }
    return undefined
  }
}
