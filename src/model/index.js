const Sequelize = require('sequelize')
const database = require('../../config/database')

// MySQL
const sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.dialect
})

const booksModel = require('./collection/books')
const usersModel = require('./collection/users')

const books = booksModel(sequelize, Sequelize)
const users = usersModel(sequelize, Sequelize)

sequelize.sync().then(() => {
    console.log('database created')
}).catch((err) => {
    console.error(err)
})

module.exports = {
    books,
    users
}