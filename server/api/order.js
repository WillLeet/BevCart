const router = require("express").Router();
const {
  models: {Order},
} = require("../db");
const ProductInOrder = require("../db/models/ProductInOrder");
const Product = require("../db/models/Product");

//No "/" get should be necessary - don't think we'll ever need to get everybody's carts

router.get("/:userId/", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const order = await Order.findOne({where: { userId: userId, isCurrent: true},   
        include: {model: ProductInOrder, as: "orderedproducts", include: {model: Product, as: "product"}}
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/history", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.findAll({where: { userId: userId, isCurrent: false},   
        include: {model: ProductInOrder, as: "orderedproducts", include: {model: Product, as: "product"}}
    });
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:userId/:orderId", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orderId = req.params.orderId
      const order = await Order.findOne({where: { userId: userId, orderId: orderId},   
          include: {model: ProductInOrder, as: "ordered", include: {model: Product, as: "product"}}
      });
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

router.post("/:userId/", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const order = await Order.findOne({where: { userId: userId, isCurrent: true} });
    await order.update({isCurrent: false, datePlaced: Date.now()})
    await Order.create({userId})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
