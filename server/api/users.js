const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const { username } = await req.query;
    console.log("username", username);
    if (username) {
      const user = await User.findAll({
        where: {
          username: username,
        },
        attributes: ["id", "username", "email", "isAdmin"],
      });
      res.json(user[0]);
    } else {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "username"],
      });
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: ["username", "email", "isAdmin"],
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username, password, email } = req.body;
    const user = await User.findByPk(userId);
    res.json(await user.update({ username, password, email }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    await user.destroy();
    res.status(500).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
