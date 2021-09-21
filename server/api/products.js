const router = require("express").Router();
const Product = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, price, description } = req.body;
    const product = await Product.findByPk(productId);
    res.json(await product.update({ name, price, description }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
