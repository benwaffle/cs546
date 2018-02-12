const fileData = require('./fileData')
const textMetrics = require('./textMetrics')
const fs = require('fs-extra')
const eql = require('deep-eql')

;(async () => {
  for (const i of [1,2,3]) {
    if (await fs.exists(`chapter${i}.result.json`)) {
      console.log(await fileData.getFileAsJSON(`chapter${i}.result.json`))
    } else {
      const contents = await fileData.getFileAsString(`chapter${i}.txt`)
      await fileData.saveStringToFile(`chapter${i}.debug.txt`, textMetrics.simplify(contents))
      const metrics = textMetrics.createMetrics(contents)
      await fileData.saveJSONToFile(`chapter${i}.result.json`, metrics)
      console.log(metrics)
    }
  }
})()
