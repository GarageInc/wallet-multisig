import logger from './appLogger'

export const makeShortString = (org: string, start = 5, end = 3): string => {
  if (!org) {
    logger.debug({ msg: 'strHShortAddress: argument passed', org })
    return ''
  }
  if (org.length <= start + end) {
    return org
  }
  return `${org.substr(0, start)}...${org.substr(org.length - end, end)}`
}

export const capitalizeString = (org: string): string => {
  return org?.charAt(0).toUpperCase() + org?.slice(1)
}

/**
 * Will return:
 * False for: for all strings with chars
 * True for: false, null, undefined, 0, 0.0, "", " ".
 *
 * @param str
 * @returns {boolean}
 */
export const isBlank = (str: string | undefined) => {
  return !str || /^\s*$/.test(str)
}

export const stripTrailingSlash = (str: string) =>
  str.charAt(str.length - 1) == '/' ? str.substr(0, str.length - 1) : str
