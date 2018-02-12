const assert = require('assert')
const fs = require('fs-extra')
const eq = require('deep-eql')
const fileData = require('./fileData')
const textMetrics = require('./textMetrics')

async function assertThrowsAsync(func) {
  try {
    await func()
  } catch (e) {
    return assert.throws(() => {throw e})
  }
  assert.throws(() => {})
}

;(async () => {
  try {
    /// file data

    // invalid args
    await assertThrowsAsync(() => fileData.getFileAsString())
    await assertThrowsAsync(() => fileData.getFileAsJSON())
    await assertThrowsAsync(() => fileData.saveStringToFile())
    await assertThrowsAsync(() => fileData.saveStringToFile('asdf'))
    await assertThrowsAsync(() => fileData.saveJSONToFile())
    await assertThrowsAsync(() => fileData.saveJSONToFile('asdf'))

    // read/write text
    const testData = '1234567890'
    await fileData.saveStringToFile('test.txt', testData)
    assert(await fileData.getFileAsString('test.txt') === testData)
    await fs.unlink('test.txt')

    // read/write JSON
    const testJson = {a:1, b:{c:2, d:3}}
    await fileData.saveJSONToFile('test.json', testJson)
    assert(await fileData.getFileAsString('test.json') === JSON.stringify(testJson))
    assert(eq(await fileData.getFileAsJSON('test.json'), testJson))
    await fs.unlink('test.json')

    /// metrics

    // invalid args
    assert.throws(() => textMetrics.simplify())
    assert.throws(() => textMetrics.createMetrics())

    assert(textMetrics.simplify('A1+"b  cd  ') === 'ab cd')

    assert(eq(
      textMetrics.createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23"),
      {
        totalLetters: 40,
        totalWords: 11,
        uniqueWords: 9,
        longWords: 3,
        averageWordLength: 3.6363636363636362,
        wordOccurrences: {
          a: 1,
          day: 1,
          great: 1,
          helllo: 3,
          is: 1,
          my: 1,
          say: 1,
          this: 1,
          to: 1
        }
      }
    ))

    // done
    console.log('✓ all tests passed')
  } catch (e) {
    console.error(e)
  }
})()
