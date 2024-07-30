import pluralize from 'pluralize'
import React, { useEffect, useState } from 'react'

interface IProps {
  expiresTimestamp: number
}

const SecondsCountDown = ({ expiresTimestamp }: IProps) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const counter = setInterval(() => {
      const currentTimestamp = +Date.now()
      const secondsLeft = parseInt((expiresTimestamp - currentTimestamp) / 1000)
      setSeconds(secondsLeft)
    }, 1000)

    if (seconds < 0) {
      clearInterval(counter)
    }

    return () => {
      clearInterval(counter)
    }
  }, [expiresTimestamp])

  return (
    <>
      <span>
        {seconds >= 0 && seconds}
        {seconds < 0 && 0}
      </span>{' '}
      {pluralize('second', seconds)}
    </>
  )
}

export default SecondsCountDown
