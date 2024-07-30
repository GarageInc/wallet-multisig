import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseAssetIconRes {
  icon: string | null
  handleImageError: () => void
}

/**
 * Asset Icon logic
 */
export const useAssetIcon = (icons?: (string | null)[]): UseAssetIconRes => {
  const getNextAvailableIndex = useCallback(
    (index: number) => {
      if (!icons) {
        return 0
      }
      let result = index + 1
      while (result < icons.length && !icons[result]) {
        result = result + 1
      }
      return result
    },
    [icons],
  )

  const [iconIndex, setIconIndex] = useState(0)

  useEffect(() => {
    setIconIndex(getNextAvailableIndex(-1))
  }, [getNextAvailableIndex])

  const icon = useMemo(() => {
    return (icons && icons[iconIndex]) || null
  }, [iconIndex, icons])

  const handleImageError = useCallback(() => {
    setIconIndex(getNextAvailableIndex(iconIndex))
  }, [getNextAvailableIndex, iconIndex])

  return {
    icon,
    handleImageError,
  }
}
