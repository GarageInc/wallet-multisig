export const memoize = (func: any) => {
  const memo: any = {}
  return (...args: any) => {
    const key = JSON.stringify(args)
    if (key in memo) {
      return memo[key]
    }
    memo[key] = func(...args)
    return memo[key]
  }
}

const deepFind = (obj: any, path: string) => {
  const paths = path.split('.')
  let current = obj,
    i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  return current
}

const comparer = (array2: any[], keysToCompare: string[] = []) => {
  return (array1Element: any) => {
    const array2Filtered = array2.filter((array2Element) => {
      const comparisonResultRaw = keysToCompare.map((keyToCompare) => {
        return deepFind(array2Element, keyToCompare) == deepFind(array1Element, keyToCompare)
      })
      const comparisonResult = comparisonResultRaw.filter((result) => !result)

      return !comparisonResult.length
    })

    return array2Filtered.length == 0
  }
}

export const onlyInFirstArr = (array1: any[], array2: any[], keysToCompare: string[]) => {
  return array1.filter(comparer(array2, keysToCompare))
}
