/**
 * Checks is domain is blacklisted
 *
 * @returns {boolean} {@code true} if the current domain is blocked
 */
export function blacklistedDomainCheck() {
  const blockedDomains: string[] = [
    // from MetaMask
    'uscourts.gov',
    'dropbox.com',
    'webbyawards.com',
    'gravityforms.com',
    'adyen.com',
    'cdn.shopify.com/s/javascripts/tricorder/xtld-read-only-frame.html',
    'ani.gamer.com.tw',
    'harbourair.com',
    'blueskybooking.com',
    'sharefile.com',
    // our list
    'atlassian.net',
    'google.com',
  ]
  const currentUrl = window.location.href
  let currentRegex
  for (let i = 0; i < blockedDomains.length; i++) {
    const blockedDomain = blockedDomains[i].replace('.', '\\.')
    currentRegex = new RegExp(`(?:https?:\\/\\/)(?:(?!${blockedDomain}).)*$`, 'u')
    if (!currentRegex.test(currentUrl)) {
      return true
    }
  }
  return false
}
