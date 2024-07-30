import { useMemo } from 'react'
import { POPUP_URLS, WALLET_HOME_PATH } from 'src/app/constants/paths'

// Is app opened in tab for dapp/etc requests?
// It returns
// - isPopup: is it opened in tab?
// - redirectUrl: base url for returning user after all actions on popup (home page or any other dapp page?)
export const useAppTabParams = () => {
  const currentPopupUrl = useMemo(
    () => Object.values(POPUP_URLS).find((url) => window.location.href.indexOf(url) !== -1),
    [],
  )

  return useMemo(() => {
    const redirectUrl = window.location.hash.slice(1)
    return {
      isPopup: !!currentPopupUrl,
      redirectUrl: redirectUrl && redirectUrl !== '/' ? redirectUrl : WALLET_HOME_PATH,
    }
  }, [currentPopupUrl])
}
