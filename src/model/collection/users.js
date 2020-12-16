module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'email must be unique'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'email cannot be empty'
                },
                isEmail: {
                    args: true,
                    msg: 'email required'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'description cannot be empty'
                }
            }
        }
    })
}