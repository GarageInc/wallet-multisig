import { BlockchainNames } from '@whalesheaven/chain-service/src/helpers/supportedBlockchains'
import pluralize from 'pluralize'
import { isNft } from 'src/serviceWorker/app/utils/assetTypes'

export const formatAddress = (address: string, n = 12) =>
  `${address.substring(0, n)}...${address.substring(address.length - n)}`

export function shortenString(parsed: string, maxLength = 24, chars = 4): string {
  if (parsed.length > maxLength) {
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(parsed.length - chars)}`
  }

  return parsed
}

export const formatName = (accountName: string, n = 16) => {
  if (accountName.length >= n) {
    return `${accountName.substring(0, n)}...`
  }
  return accountName
}

export const formatHost = (host: string) => {
  if (host.length > 28) {
    return `${host.substring(0, 6)}...${host.substring(host.length - 6)}`
  }
  return host
}

export const formatCurrency = (currency: string) => {
  return currency.split(':')[0]
}

export const formatPeriod = (periodId: string) => {
  const matches = periodId.match(/^(\d+)([A-Z])$/)

  if (!matches) {
    return 'N/A'
  }

  const num = parseInt(matches[1])
  const unit = matches[2]

  switch (unit) {
    case 'Y':
      return `${num} ${pluralize('year', num)}`
    case 'M':
      return `${num} ${pluralize('month', num)}`
    case 'W':
      return `${num} ${pluralize('week', num)}`
    case 'D':
      return `${num} ${pluralize('day', num)}`
    case 'H':
      return `${num} ${pluralize('hour', num)}`
    default:
      return 'Invalid unit'
  }
}

export const formatAssetType = (blockchain: BlockchainNames, assetType: string) => {
  if (blockchain === BlockchainNames.BinanceSmartChain && assetType === 'ERC20') {
    return 'BEP20'
  } else if (isNft(assetType)) {
    return 'NFT'
  } else {
    return assetType
  }
}

export const formatPlainNumber = (num: number) => {
  return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function (a, b, c, d, e) {
    return e < 0 ? b + '0.' + Array(1 - e - c.length).join(0) + c + d : b + c + d + Array(e - d.length + 1).join(0)
  })
}

export const sigFigs = (n: number, sig: number) => {
  if (n > 0) {
    if (n < Math.pow(10, sig - 1)) {
      const mult = sig - Math.floor(Math.log(n) / Math.LN10) - 1
      if (mult > 0) return parseFloat(n.toFixed(mult))
      else return n
    } else {
      return Math.round(n)
    }
  } else {
    return 0
  }
}

export const sigFigsLimitedCents = (n: number) => {
  if (n == 0) {
    return 0
  } else if (n < 0.001) {
    return '>0.001'
  } else {
    if (n < 10) {
      return sigFigs(n, 4)
    } else {
      return Math.round(n * 1000) / 1000
    }
  }
}

export const sigFigsLimitedSpace = (n: number) => {
  if (n == 0) {
    return 0
  } else if (n < 0.001) {
    return '>0.001'
  } else if (n > 1000) {
    return toHumanString(n)
  } else {
    return sigFigs(n, 3)
  }
}

function getExponent(n: number) {
  if (n === 0) {
    return 0
  }
  return Math.floor(Math.log10(Math.abs(n)))
}

function precise(n: number) {
  return Number.parseFloat(n.toPrecision(3))
}

function toHumanString(sn: string | number) {
  const prefixes: any = {
    24: 'Y',
    21: 'Z',
    18: 'E',
    15: 'P',
    12: 'T',
    9: 'G',
    6: 'M',
    3: 'k',
    0: '',
    '-3': 'm',
    '-6': 'µ',
    '-9': 'n',
    '-12': 'p',
    '-15': 'f',
    '-18': 'a',
    '-21': 'z',
    '-24': 'y',
  }

  const n = precise(Number.parseFloat(sn))
  const e = Math.max(Math.min(3 * Math.floor(getExponent(n) / 3), 24), -24)
  return precise(n / Math.pow(10, e)).toString() + prefixes[e]
}
