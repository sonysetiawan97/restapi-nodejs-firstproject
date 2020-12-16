const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwttoken')

exports.authToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (token == null) return res.json(token)

    jwt.verify(token, jwtConfig.secretKey, (err) => {
        if (err) return res.json(err)
        next()
    })
}