const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.pinimg.com/originals/cf/c2/ab/cfc2ab6fda2324467f69f1d059db3d4e.png",
  },
});

module.exports = Product;

/*



*/
