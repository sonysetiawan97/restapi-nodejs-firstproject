const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwttoken')

exports.authToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwtConfig.secretKey, (err) => {
        if (err) return res.json(err)
        next()
    })
}