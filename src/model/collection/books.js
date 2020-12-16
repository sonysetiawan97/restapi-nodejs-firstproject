module.exports = (sequelize, DataTypes) => {
    return sequelize.define('books', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'title must be unique'
            },
            validate:{
                notNull: {
                    args: true,
                    msg: 'title cannot be empty'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    args: true,
                    msg: 'description cannot be empty'
                }
            }
        }
    })
}