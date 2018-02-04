function deepEquality(obj1, obj2) {
  if (arguments.length !== 2) throw 'wrong number of arguments'
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') throw 'both arguments not objects'
  if (obj1 === obj2) return true
  if (obj1 === null || obj2 === null) return false

  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return false

  for (const key of Object.keys(obj1)) {
    if (!(key in obj2))
      return false
    if (obj1[key] === obj2[key])
      continue;
    if (typeof obj1[key] !== 'object' || typeof obj2[key] !== 'object')
      return false
    if (!deepEquality(obj1[key], obj2[key]))
      return false
  }

  return true
}


module.exports = {
  deepEquality,

  uniqueElements(arr) {
    if (arguments.length != 1) throw 'wrong number of arguments'
    if (!Array.isArray(arr)) throw 'argument is not an array'

    return new Set(arr).size
  },

  countOfEachCharacterInString(str) {
    if (arguments.length != 1) throw 'wrong number of arguments'
    if (typeof str !== 'string') throw 'argument is not a string'

    return str.split('').sort().reduce((a, c) => {
      a[c] = (a[c] || 0) + 1
      return a
    }, {})
  }
}
