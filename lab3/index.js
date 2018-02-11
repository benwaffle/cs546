const assert = require('assert')
const fileData = require('./fileData')
const fs = require('fs-extra')
const eq = require('deep-eql')

async function assertThrowsAsync(func) {
  try {
    await func()
  } catch (e) {
    return assert.throws(() => {throw e})
  }
  assert.throws(() => {})
}

async function main() {
  try {
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

    // done
    console.log('✓ all tests passed')
  } catch (e) {
    console.error(e)
  }
}

main()
