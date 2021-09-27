const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  datePlaced: {
    type: Sequelize.DATE,
  },
  isCurrent: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
  }
})

module.exports = Order