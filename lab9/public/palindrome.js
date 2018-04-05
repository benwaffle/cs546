document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const text = e.target.phrase.value
    if (text.length == 0) {
      alert('no text provided')
      return
    }

    const clean = text.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
    const result = (clean === clean.split('').reverse().join(''))

    const attempt = document.createElement('li')
    attempt.className = result ? 'is-palindrome' : 'not-palindrome'
    attempt.textContent = text

    document.getElementById('attempts').appendChild(attempt)
  })
})