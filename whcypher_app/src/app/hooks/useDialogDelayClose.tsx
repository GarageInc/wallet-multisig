
// Need to delay for closing dialog, because sometimes need to wait ending of animations
import { useCallback, useEffect, useState } from 'react'

export const useDialogDelayClose = ({ onClose, delay = 150 }: { onClose: () => void; delay?: number }) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
  }, [])

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, delay)

      return () => {
        clearTimeout(timeoutId)
      }
    }

    return
  }, [isClosing, delay, onClose])

  return { isClosing, setIsClosing, handleClose }
}
