const Sequelize = require('sequelize')
const db = require('../db')

const OrderedProduct = db.define('orderedproduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderedProduct