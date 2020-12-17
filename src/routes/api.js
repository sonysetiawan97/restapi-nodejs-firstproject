const express = require('express')
const router = express.Router()

//controller
const bookController = require('../controller/books')

// auth
const jwtAuth = require('../auth/jwt')

// no auth
router.get('/test', (req, res, next) => {
    res.json('apakah akan ketahan')
})

// router dibawah middleware jwt untuk auth
router.use('/book', jwtAuth.authToken)

router.route('/book')
    .get(bookController.bookList)
    .post(bookController.bookInsert)

router.route('/book/:id')
    .get(bookController.bookRead)
    .put(bookController.bookUpdate)
    .delete()

module.exports = router