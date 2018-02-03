const assert = require('assert')
const geometry = require('./geometry')
const utilities = require('./utilities')

assert(geometry.volumeOfRectangularPrism(3, 3, 3) === 3*3*3)
assert(geometry.volumeOfRectangularPrism(1, 1, 1) === 1)
assert(geometry.volumeOfRectangularPrism(3.1, 3.2, 3.3) === 3.1 * 3.2 * 3.3)
assert.throws(() => geometry.volumeOfRectangularPrism(3, -1, 3))
assert.throws(() => geometry.volumeOfRectangularPrism(3))
assert.throws(() => geometry.volumeOfRectangularPrism())

assert(utilities.deepEquality({a:2, b:3}, {a:2, b:4}) === false)
assert(utilities.deepEquality({a:2, b:3}, {a:2, b:3}) === true)
assert(utilities.deepEquality({a:2}, {a:2, b:3}) === false)
assert(utilities.deepEquality({a:2, b:3}, {a:2}) === false)
assert(utilities.deepEquality({a:2, b:{c:3}}, {a:2, b:{c:3}}) === true)
assert(utilities.deepEquality({a:2, b:{c:3}}, {a:2, b:{c:{c:3}}}) === false)
assert(utilities.deepEquality({}, null) === false)
assert(utilities.deepEquality(null, {}) === false)
assert(utilities.deepEquality({}, {}) === true)
assert(utilities.deepEquality(null, null) === true)
assert(utilities.deepEquality([1,2,3], [1,2,3]) === true)
assert(utilities.deepEquality([1,2,3], []) === false)

// TODO deepEquality for numbers

assert(utilities.deepEquality(utilities.countOfEachCharacterInString(''), {}))
assert(utilities.deepEquality(
  utilities.countOfEachCharacterInString('Hello, the pie is in the oven'),
  {
    ' ': 6,
    ',': 1,
    'H': 1,
    'e': 5,
    'h': 2,
    'i': 3,
    'l': 2,
    'n': 2,
    'o': 2,
    'p': 1,
    's': 1,
    't': 2,
    'v': 1
  }
))

console.log('✓ all tests passed')
