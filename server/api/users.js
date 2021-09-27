async function auth(req, res, next) {
  try {
    let token = req.headers.auth;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      console.log("User is an admin, authentication complete");
      next();
    } else {
      console.log("not admin, access denied");
    }
  } catch (err) {
    console.log("not authenticated");
    next(err);
  }
}
const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", auth, async (req, res, next) => {
  try {
    const { username } = await req.query;
    const { token } = await req.query;
    if (token) {
      const user = await User.findByToken(token);
      res.json(user);
      return;
    }
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
        attributes: ["id", "email", "username"],
      });
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", auth, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "isAdmin"],
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

router.put("/:userId", auth, async (req, res, next) => {
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
    res.status(203).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
