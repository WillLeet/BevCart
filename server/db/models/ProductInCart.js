const Sequelize = require('sequelize')
const db = require('../db')

const ProductInCart = db.define('productincart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = ProductInCart