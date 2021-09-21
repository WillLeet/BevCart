const Sequelize = require('sequelize')
const db = require('../db')


const SALT_ROUNDS = 5;

const Product = db.define('product', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        }
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
        }
    },
    description: {
      type: Sequelize.STRING
    }
  })

module.exports = Product

/*



*/