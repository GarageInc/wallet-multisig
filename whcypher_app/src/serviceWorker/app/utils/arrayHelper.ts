export const memoize = (func) => {
  const memo = {}
  return (...args) => {
    const key = JSON.stringify(args)
    if (key in memo) {
      return memo[key]
    }
    memo[key] = func(...args)
    return memo[key]
  }
}

const deepFind = (obj, path) => {
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

const comparer = (array2, keysToCompare: string[] = []) => {
  return (array1Element) => {
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

export const filterObjectArraysByMatchingKeyValues = (
  array1: any[],
  array2: any[],
  keysToCompare: string[],
): Array<any> => {
  return array1.filter(comparer(array2, keysToCompare))
}

export const removeDuplicateObjectFromArray = (array, key) => {
  return array.filter((obj, index, self) => index === self.findIndex((el) => el[key] === obj[key]))
}
