const router = require("express").Router();
const Product = require("../db");
model.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
