function getMinMax(str) {
  let separated = str.split(' ')
  let result = {}

  for (let i = 0; i < separated.length; i++) {
    if (isFinite(separated[i])){
      if (!result.min) {
        result.min = Number(separated[i])
        result.max = Number(separated[i])
      }
      else {
        if (result.min > Number(separated[i])) result.min = Number(separated[i])
        if (result.max < Number(separated[i])) result.max = Number(separated[i])
      }
    }
    
  }

  return result
}
