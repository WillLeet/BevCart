const router = require("express").Router();
const {
  models: { ProductInOrder, Order },
} = require("../db");


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
      res.json(await ProductInCart.create({ userId, productId, quantity }));
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

router.put("/:userId/:productId/", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const product = await ProductInCart.findOne({
      where: { orderId: orderId, productId: productId },
    });
    res.json(await product.update({ quantity }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
