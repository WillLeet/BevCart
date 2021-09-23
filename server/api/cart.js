const router = require("express").Router();
const {
  models: {ProductInCart},
} = require("../db");

//No "/" get should be necessary - don't think we'll ever need to get everybody's carts

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cart = await ProductInCart.findAll({where: { userId: userId} });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
    const {quantity} = req.body;
    const product = await ProductInCart.findOne({where: { userId: userId, productId: productId} });
    if(product){
        res.json(await product.update({quantity: product.quantity + quantity}));
    } else {
        res.json(await ProductInCart.create({userId,productId,quantity}))
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/:productId/", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
    const product = await ProductInCart.findOne({where: { userId: userId, productId: productId} });
    await product.destroy();
    res.status(203).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/:productId/", async (req, res, next) => {
    try {
      const {quantity} = req.body
      const userId = req.params.userId;
      const productId = req.params.productId;
      const product = await ProductInCart.findOne({where: { userId: userId, productId: productId} });
      res.json(await product.update({quantity}));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
