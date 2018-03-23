const express = require('express')
const app = express()

app.use(require('morgan')('dev'))
app.use(require('body-parser').urlencoded({ extended: false }))
app.set('view engine', 'hbs')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/result', (req, res) => {
    const str = req.body['text-to-test']
    if (typeof str === undefined || str === '') {
        return res.status(400).render('error')
    }
    const clean = str.replace(/[^\w]/g, '').toLowerCase()
    const result = (clean === clean.split('').reverse().join(''))

    res.render('result', {
        text: str,
        className: result ? 'success' : 'failure',
        info: `The string is ${result ? '' : 'not '}a palindrome`
    })
})

app.listen(3000, () => console.log('http://localhost:3000'))
