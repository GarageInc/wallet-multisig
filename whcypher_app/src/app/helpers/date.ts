import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import locale from 'date-fns/locale/en-US'

export const formatDate = (date: number) => {
  const d = new Date(date),
    year = d.getFullYear()
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  if (hours.length < 2) hours = '0' + hours
  if (minutes.length < 2) minutes = '0' + minutes

  const parsedDate = [year, month, day].join('/')
  return `${parsedDate} ${hours}:${minutes}`
}

export const formatExpireDate = (date: Date | number, roundMethodName = 'floor') => {
  // Make a fuzzy time
  const delta = Math.round(date - new Date())

  const minute = 60 * 1000,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    year = day * 365

  let fuzzy

  const roundMethod = (valueToRound: number) => {
    if (roundMethodName === 'floor') {
      return Math.floor(valueToRound)
    } else if (roundMethodName === 'ceil') {
      return Math.ceil(valueToRound)
    }
  }

  if (delta < 0) {
    fuzzy = 'past'
  } else if (delta < 30) {
    fuzzy = 'about now'
  } else if (delta < minute) {
    const second = delta
    fuzzy = `${second} ${pluralize('second', second)}`
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute'
  } else if (delta < hour) {
    const minutes = roundMethod(delta / minute)
    fuzzy = `${minutes} ${pluralize('minute', minutes)}`
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = 'an hour'
  } else if (delta < day) {
    const hours = roundMethod(delta / hour)
    fuzzy = `${hours} ${pluralize('hour', hours)}`
  } else {
    const expireDate = new Date(+date)
    const day = expireDate.getDate()
    const month = expireDate.toLocaleString('default', { month: 'short' })
    const year = expireDate.getFullYear()

    let daySuffix = 'th'
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st'
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd'
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd'
    }

    fuzzy = `${day}${daySuffix} ${month} ${year}`
  }

  // else if (delta < day * 2) {
  //   fuzzy = 'a day'
  //   // } else if (delta < week) {
  // } else if (delta < year) {
  //   // const days = roundMethod(delta / day)
  //   // fuzzy = `${days} ${pluralize('day', days)}`
  //   // } else if (delta < week * 2) {
  //   //   fuzzy = 'a week';
  //   // } else if (delta < year) {
  //   //   const weeks = roundMethod(delta / weeks);
  //   //   fuzzy = `${weeks} ${pluralize('week', weeks)}`;
  // } else if (delta > year) {
  //   fuzzy = 'more than a year'
  // }

  return fuzzy
}

const formatDistanceLocale: {
  [key: string]: { one: string; other: string } | string
} = {
  lessThanXSeconds: {
    one: 'less than a sec',
    other: 'less than {{count}} secs',
  },

  xSeconds: {
    one: '1 sec',
    other: '{{count}} secs',
  },

  halfAMinute: '30 secs',

  lessThanXMinutes: {
    one: 'less than a min',
    other: 'less than {{count}} mins',
  },

  xMinutes: {
    one: '1 min',
    other: '{{count}} mins',
  },

  aboutXHours: {
    one: 'about 1 hr',
    other: 'about {{count}} hrs',
  },

  xHours: {
    one: '1 hr',
    other: '{{count}} hrs',
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days',
  },

  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks',
  },

  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks',
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months',
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months',
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years',
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years',
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years',
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years',
  },
}

const formatDistance = (token: string, count: number, options: any = {}): string => {
  let result

  const tokenValue = formatDistanceLocale[token]
  if (typeof tokenValue === 'string') {
    result = tokenValue
  } else if (count === 1) {
    result = tokenValue.one
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString())
  }

  if (options?.addSuffix) {
    return result + ' ago'
  }

  return result
}

export const diffToNow = (date: Date) =>
  formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
