import { useEffect, useState } from 'react'
import { diffToNow } from 'src/app/helpers/date'
import { IMessage } from 'src/shared/interfaces/interfaces'

/**
 * Ext header logic
 */
const useHeader = (message: IMessage) => {
  const url = message?.origin?.tab?.url || 'http://localhost'
  const domain = new URL(url).hostname
  const logo = message?.origin?.tab?.favIconUrl || ''
  const title = message?.origin?.tab?.title || ''

  const [timeStamp, setTimeStamp] = useState(diffToNow(new Date(message.time)))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStamp(diffToNow(new Date(message.time)))
    }, 1000)

    return () => clearInterval(interval)
  }, [message.time])

  return {
    timeStamp,
    url,
    domain,
    logo,
    title,
  }
}

export default useHeader
