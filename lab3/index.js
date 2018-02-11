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
    assert(await fileData.getFileAsString('test.txt') === 'test\n')
    console.log('✓ all tests passed')
  } catch (e) {
    console.error(e)
  }
}

main()
