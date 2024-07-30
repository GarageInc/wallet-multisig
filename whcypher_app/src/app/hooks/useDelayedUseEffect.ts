import { useEffect, useRef } from 'react'

// Add delay for useEffect hook from react library
export const useDelayedUseEffect = (effect: () => void, changingStateVars: any[], delay = 1000) => {
  const mutable = useRef<NodeJS.Timeout>()

  const delayedEffect = () => {
    mutable.current = setTimeout(effect, delay)
    return () => {
      clearTimeout(mutable.current)
    }
  }

  useEffect(delayedEffect, changingStateVars)
}
