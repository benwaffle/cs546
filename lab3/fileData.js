const fs = require('fs-extra')

const e = module.exports = {
  getFileAsString: async (path) => {
    if (typeof path !== 'string') throw new Error('no path provided')
    return await fs.readFile(path, 'utf-8')
  },
  getFileAsJSON: async (path) => JSON.parse(await e.getFileAsString(path)),
  saveStringToFile: async (path, txt) => {
    if (typeof path !== 'string') throw new Error('no path provided')
    if (typeof txt !== 'string') throw new Error('no txt provided')
    return await fs.writeFile(path, txt)
  },
  saveJSONToFile: async (path, obj) => await e.saveStringToFile(path, JSON.stringify(obj))
}
