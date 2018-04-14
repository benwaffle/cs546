const express = require('express')
const app = express()

app.set('view engine', 'hbs')

app.use(require('morgan')('dev'))
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(require('express-session')({
    name: 'AuthCookie',
    secret: 'nicki minaj',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    if (req.session.loggedin)
        res.redirect('/private')
    else
        res.render('login')
})

app.post('/login', (req, res) => {
    
})

app.listen(3000, () => {
    console.log('http://localhost:3000')

    if (process && process.send) process.send({ done: true })
})