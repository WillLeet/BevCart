const router = require("express").Router();
const {
  models: { Review },
} = require("../db");

router.get("/:productId", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({where: {productId: req.params.productId}});
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/:productId/:userId", async (req, res, next) => {
  try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);
      const { rating,content } = req.body;
      const review = await Review.create({rating,content,productId,userId});
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId/:userId/", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
    const review = await Review.findOne({where: { userId: userId, productId: productId} });
    await review.destroy();
    res.status(500).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:productId/:userId/", async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);
      const {rating, content} = req.body
      const product = await Review.findOne({where: { userId: userId, productId: productId} });
      res.json(await product.update({rating, content}));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
