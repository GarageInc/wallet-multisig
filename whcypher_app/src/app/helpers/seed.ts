export const toGrid = (arr:string[]) => {
  const grid = []

  for (let i = 0; i < arr.length; i += 3) {
    const row = []

    if (arr[i]) {
      row[0] = arr[i]
    }
    if (arr[i + 1]) {
      row[1] = arr[i + 1]
    }
    if (arr[i + 2]) {
      row[2] = arr[i + 2]
    }

    if (row.length === 1) {
      row[1] = ''
      row[2] = ''
    }

    if (row.length === 2) {
      row[2] = ''
    }

    grid.push(row)
  }

  return grid
}

export const shuffleArray = (inputArray:string[]) => {
  const array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
