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
    const clean = str.replace(/[^\w]/g, '').toLowerCase()

    res.render('result', {
        text: str,
        className:
            (clean === clean.split('').reverse().join(''))
            ? 'success'
            : 'failure'
    })
})

app.listen(3000, () => console.log('http://localhost:3000'))
