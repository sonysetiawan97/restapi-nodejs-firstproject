const { users } = require('../model/index')
const { ValidationError, json } = require('sequelize')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwttoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try {
        req.body.password = encryptPass(req.body.password)
        var user = await users.build(req.body).validate()
        await user.save()
        res.json('user has been recorded')
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.json(err)
        }
        return res.json(err)
    }
}

exports.listUser = async (req, res, next) => {
    await users.findAll()
        .then(user => {
            if (!user) return res.json('users was not found')
            res.json(user)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
}

exports.login = async (req, res, next) => {
    await users.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) return res.json('user was not found')
            req.sessioncookie.user = user
            if (!decryptPass(req.body.password, user.password)) return res.json('invalid password')
            const token = jwt.sign({ email: req.body.email }, jwtConfig.secretKey, { expiresIn: '5m' })
            res.json({token: token})
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
}

const encryptPass = (pass) => {
    return bcrypt.hashSync(pass, 10)
}

const decryptPass = (passInput, passStore) => {
    return bcrypt.compareSync(passInput, passStore)
}