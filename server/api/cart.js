const router = require("express").Router();
const {
  models: { ProductInOrder},
} = require("../db");
const Product = require("../db/models/Product");


router.post("/:orderId/:productId", async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    const product = await ProductInOrder.findOne({
      where: { orderId,productId },
    });
    if (product) {
      res.json(await product.update({ quantity: product.quantity + quantity }));
    } else {
      res.json(await ProductInOrder.create({ userId, productId, quantity }));
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId/:productId/", async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const productId = parseInt(req.params.productId);
    const product = await ProductInOrder.findOne({
      where: { orderId: orderId, productId: productId },
    });
    await product.destroy();
    res.status(203).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/:productId/", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const product = await ProductInOrder.findOne({
      where: { orderId: orderId, productId: productId },
    });
    res.json(await product.update({ quantity }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
