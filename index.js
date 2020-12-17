const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const config = require('./config')()
const session = require('client-sessions')

// route
const api = require('./src/routes/api')
const register = require('./src/routes/register')

const app = express()
const upload = multer()

// session cookie
app.use(session({
    cookieName: 'sessioncookie',
    secret: 'my_secret',
    duration: 1 * 1 * 1 * 5 * 60,
    activeDuration: 1 * 1 * 1 * 5 * 60
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload.array())

app.use('/api/v1', api)
app.use('/api/user/v1', register)

app.listen(config, () => {
    console.log(`Listening on localhost:${config.port}`)
})

module.exports = app