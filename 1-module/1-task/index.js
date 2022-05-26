function factorial(n) {
  if (n==0 || n ==1) return (+1)
  let num = n
  for (let index = 1; index < n; index++) {
    num = num * (n - index)
  }
  return num
}
