const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const user = await User.create({ name, password, email });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { name, password, email } = req.body;
    const user = await User.findByPk(userId);
    res.json(await user.update({ name, password, email }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
