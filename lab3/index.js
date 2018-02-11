const assert = require('assert')
const fileData = require('./fileData')
const fs = require('fs-extra')

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
    await assertThrowsAsync(() => fileData.getFileAsString())
    await assertThrowsAsync(() => fileData.getFileAsJSON())
    await assertThrowsAsync(() => fileData.saveStringToFile())
    await assertThrowsAsync(() => fileData.saveStringToFile('asdf'))
    await assertThrowsAsync(() => fileData.saveJSONToFile())
    await assertThrowsAsync(() => fileData.saveJSONToFile('asdf'))

    const testData = '1234567890'
    await fileData.saveStringToFile('test.txt', testData)
    assert(await fileData.getFileAsString('test.txt') === testData)
    await fs.unlink('test.txt')

    const testJson = {a:1, b:{c:2, d:3}}
    await fileData.saveJSONToFile('test.json', testJson)
    assert(await fileData.getFileAsString('test.json') === JSON.stringify(testJson))
    const readJson = await fileData.getFileAsJSON('test.json')
    assert(readJson.a === 1)
    assert(readJson.b.c === 2)
    assert(readJson.b.d === 3)
    await fs.unlink('test.json')

    console.log('✓ all tests passed')
  } catch (e) {
    console.error(e)
  }
}

main()
