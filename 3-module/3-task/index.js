function camelize(str) {
  let separated = str.split("-")

  for (let i = 1; i < separated.length; i++) {
    separated[i] = separated[i][0].toUpperCase() + separated[i].slice(1) 
  }

  return separated.join('')
}
