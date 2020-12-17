const { books, users } = require('../model/index')
const { ValidationError } = require('sequelize');

exports.bookList = async (req, res, next) => {
    await books.findAll(
    )
        .then(books => {
            if (books.length == 0) res.json('books was not found')
            else res.json({entries: books, user: req.sessioncookie.user})
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
}

exports.bookInsert = async (req, res, next) => {
    try {
        var bookSaved = await books.build(req.body).validate()
        await bookSaved.save()
        res.json('book has been recorded')
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.json(err)
        }
        return res.json(err)
    }
}

exports.bookRead = async (req, res, next) => {
    await books.findByPk(req.params.id)
        .then(book => {
            if (book === null) return res.json('book was not found')
            else res.json({entries: books, user: req.sessioncookie.user})
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
}

exports.bookUpdate = async (req, res, next) => {
    await books.findByPk(req.params.id)
        .then(book => {
            if (book === null) return res.json('book was not found for update')
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
    await books.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(res.json('book was updated'))
        .catch((err) => {
            if (err instanceof ValidationError) {
                return res.json(err)
            }
            return res.json(err)
        })
}

exports.bookDelete = async (req, res, next) => {
    await books.findByPk(req.params.id)
        .then(book => {
            if (book === null) return res.json('book was not found for delete')
        })
    await books.destroy({
        where: {
            id: req.params.id
        }
    }).catch((err) => {
        if (err instanceof ValidationError) {
            return res.json(err)
        }
        return res.json(err)
    })
}