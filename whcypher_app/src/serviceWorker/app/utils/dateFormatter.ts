const getNumberEnding = (number: number) => {
  const stringNumber = String(number)
  const numberEndings = ['st', 'nd', 'rd', 'th']
  const lastChar = stringNumber.charAt(stringNumber.length - 1)
  return Number(lastChar) > 3 || Number(lastChar) === 0 || (Number(number) >= 10 && Number(number) <= 20)
    ? numberEndings[3]
    : numberEndings[Number(lastChar) - 1]
}

const doubleNumber = (number = 0) => (number < 10 ? `0${number}` : number)

const getFormattedDate = (date = new Date()) => {
  const dateFormat = new Date(date)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `at ${doubleNumber(dateFormat.getHours())}:${doubleNumber(
    dateFormat.getMinutes(),
  )} on ${dateFormat.getDate()}${getNumberEnding(dateFormat.getDate())} ${months[dateFormat.getMonth()]}`
}

export default getFormattedDate
