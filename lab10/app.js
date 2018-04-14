const express = require('express')
const app = express()

const users = require('./users')

const bcrypt = require('bcrypt')

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
    if (req.session.user)
        res.redirect('/private')
    else
        res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (typeof username === 'undefined' ||
        typeof password === 'undefined') {
            return;
        }

    if (username in users && await bcrypt.compare(password, users[username].hashedPassword)) {
        req.session.user = username
        res.redirect('/private')
    } else {
        res.render('login', {
            failed: true
        })
    }
})

function loggedIn(req, res, next) {
    const { user } = req.session
    if (user)
        next()
    else
        res.status(403).render('notloggedin')
}

app.get('/private', loggedIn, (req, res) => {
    res.render('userinfo', {
        ...users[req.session.user],
        username: req.session.user,
    })
})

app.get('/logout', (req, res) => {
    req.session.cookie.maxAge = -1000*1000
    delete req.session.user

    res.send(`
<!doctype html>
<html>
    <head>
        <title>Logged out</title>
    </head>
    <body>
        You have been logged out
        <a href="/">Go home</a>
    </body>
</html>
`)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')

    if (process && process.send) process.send({ done: true })
})