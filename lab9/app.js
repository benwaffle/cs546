const express = require('express')

const app = express()

app.use(require('morgan')('dev'))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
