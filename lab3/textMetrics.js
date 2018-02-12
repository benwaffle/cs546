module.exports = {
  simplify(text) {
    if (typeof text !== 'string') throw new Error('missing text')
    return text
      .toLowerCase()
      .split('')
      .filter(c => /[a-z]|\s/.test(c))
      .map(c => /\s/.test(c) ? ' ' : c)
      .reduce((str, chr) => {
        if (chr == ' ' && str.endsWith(' '))
          return str
        return str + chr
      })
      .trim()
  },

  createMetrics(text) {
    text = module.exports.simplify(text)
    const words = text.split(' ')

    return {
      totalLetters: text.replace(/ /g, '').length,
      totalWords: words.length,
      uniqueWords: new Set(words).size,
      longWords: words.filter(x => x.length >= 6).length,
      averageWordLength: words.map(x => x.length).reduce((a, b) => a+b) / words.length,
      wordOccurrences: words.reduce((dict, word) => {
        dict[word] = (dict[word] || 0) + 1
        return dict
      }, {})
    }
  }
}
