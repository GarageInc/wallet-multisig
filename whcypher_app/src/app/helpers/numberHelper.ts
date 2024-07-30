import BigNumber from 'bignumber.js'
import shuffle from 'lodash/shuffle'

const si = [
  { value: 1e18, symbol: 'E' },
  { value: 1e15, symbol: 'P' },
  { value: 1e12, symbol: 'T' },
  { value: 1e9, symbol: 'B' },
  { value: 1e6, symbol: 'M' },
  { value: 1e3, symbol: 'K' },
]

/**
 * Format to string with a maximum of decimals digits
 * and with B(billions),M(millions) and other prefix
 * @param num a number we want to format
 * @param digits precisions
 * @returns string
 */
export const nFormatter = (num: number | string | BigNumber, digits: number): string => {
  const temp = new BigNumber(num)
  for (let i = 0; i < si.length; i += 1) {
    if (si[i].symbol === 'K') {
      if (temp.gte(si[i].value * 1e2)) {
        const res =
          temp
            .div(si[i].value)
            .toFixed(digits)
            .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol

        return res.replace(/(\.0*|(?<=(\..*))0*)$/, '')
      }

      return Number.parseFloat(temp.toFixed(digits))
        .toLocaleString(navigator.language, {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        })
        .replace(/\.0+$|0+$|,0+$/, '')
        .replace(/(\.0*|(?<=(\..*))0*)$/, '')
    }
    if (temp.gte(si[i].value)) {
      const res2 =
        temp
          .div(si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol

      return res2.replace(/(\.0*|(?<=(\..*))0*)$/, '')
    }
  }

  return temp.toFixed(digits).replace(/(\.0*|(?<=(\..*))0*)$/, '')
}

export const randomNumbers = (selCount: number, totalCount: number) => {
  const orgArray = Array.from({ length: totalCount }, (_, i) => i + 1)
  const newArray = shuffle(orgArray)
    .slice(0, selCount)
    .sort((a, b) => a - b)
  return newArray
}

export const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1].length || 0
}

export const parseNumber = (value: string) => {
  const example = Intl.NumberFormat(navigator.language).format(1.1)
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, 'g')
  const cleaned = value.replace(cleanPattern, '')
  const normalized = cleaned.replace(example.charAt(1), '.')

  return parseFloat(normalized)
}
