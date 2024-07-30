import { useEffect, useState } from 'react'

export const useCloseFromParent = ({ open }: { open: boolean }) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (open) setIsClosing(false)
  }, [open])

  return {
    isClosing,
    setIsClosing,
  }
}
