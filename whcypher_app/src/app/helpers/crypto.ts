// Need comments here
export function extractDecryptEIP1024Params(dataInput: any) {
  if (typeof dataInput === 'object') {
    return dataInput
  }

  const data = dataInput ? dataInput.slice(2) : dataInput

  const buffer = Buffer.from(data, 'hex')
  const jsonStr = buffer.toString('utf8')

  return JSON.parse(jsonStr)
}
