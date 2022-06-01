function filterRange(arr, a, b) {
  let filtered = []

  arr.forEach(element => {
    if (element >= a && element <= b) filtered.push(element)
  });

  return filtered
}
