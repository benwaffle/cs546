const assert = require('assert')
const geometry = require('./geometry')
const utilities = require('./utilities')

function floatEq(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') throw 'invalid args'

    return Math.abs(a-b) < 0.001
}

assert(geometry.volumeOfRectangularPrism(3, 3, 3) === 3*3*3)
assert(geometry.volumeOfRectangularPrism(1, 1, 1) === 1)
assert(geometry.volumeOfRectangularPrism(3.1, 3.2, 3.3) === 3.1 * 3.2 * 3.3)
assert.throws(() => geometry.volumeOfRectangularPrism(3, -1, 3))
assert.throws(() => geometry.volumeOfRectangularPrism(3))
assert.throws(() => geometry.volumeOfRectangularPrism())

assert(geometry.surfaceAreaOfRectangularPrism(3, 3, 3) === 3*3*6)
assert(geometry.surfaceAreaOfRectangularPrism(1, 1, 1) === 1*1*6)
assert(geometry.surfaceAreaOfRectangularPrism(3.1, 3.2, 3.3) === 3.1*3.2*2 + 3.2*3.3*2 + 3.1*3.3*2)
assert.throws(() => geometry.surfaceAreaOfRectangularPrism(3, -1, 3))
assert.throws(() => geometry.surfaceAreaOfRectangularPrism(3))
assert.throws(() => geometry.surfaceAreaOfRectangularPrism())

assert(floatEq(geometry.volumeOfSphere(5), 523.599))
assert(floatEq(geometry.volumeOfSphere(1), 4.188))
assert(floatEq(geometry.volumeOfSphere(0), 0))
assert.throws(() => geometry.volumeOfSphere(-1))
assert.throws(() => geometry.volumeOfSphere())

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
assert.throws(() => utilities.deepEquality())

// TODO deepEquality for numbers

assert.throws(() => utilities.uniqueElements([], []))
assert.throws(() => utilities.uniqueElements())
assert(utilities.uniqueElements([1,1,2,3,4]) == 4)
assert(utilities.uniqueElements([1,2,3,4]) == 4)
assert(utilities.uniqueElements([1,1,1,1]) == 1)

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
