// Generate unique ID for dapp message to track responses
const genPayloadId = function () {
  const date = new Date().getTime() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

export { genPayloadId }
