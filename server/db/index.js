//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const Product = require('./models/Product')
const Review = require('./models/Review')
const ProductInOrder = require('./models/ProductInOrder')
const Order = require('./models/Order');
const ProductInCart = require('./models/ProductInCart')

//associations could go here!
User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(ProductInCart)
ProductInCart.belongsTo(User)
Product.hasMany(ProductInCart)
ProductInCart.belongsTo(Product)

Order.hasMany(ProductInOrder)
ProductInOrder.belongsTo(Order)
Product.hasMany(ProductInOrder)
ProductInOrder.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Product,
    Review,
    ProductInCart,
    ProductInOrder,
    Order
  },
}
