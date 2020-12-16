const express = require('express')
const router = express.Router()

// controller
const registerController = require('../controller/register')

router.route('/register')
    .post(registerController.register)

router.route('/login')
    .post(registerController.login)

module.exports = router