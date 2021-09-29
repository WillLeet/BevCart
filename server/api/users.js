const auth= async(req, res, next)=>{
  try {
    const token = req.headers.auth;
    const query = await req.query;
    const token2 = query.token;
    const user = await User.findByToken(token);
    const user2 = (token2 ? await User.findByToken(token2) : null);
    if (user.isAdmin) {
      console.log("User is an admin, authentication complete");
      next();
    } else if (user.id === user2.id) {
      console.log("User accessing their own info, this is fine");
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
      const user = await User.findOne({
        where: {
          username: username,
        },
        attributes: ["id", "username", "email", "isAdmin"],
      });
      res.json(user);
    } else {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "email", "username", "isAdmin"],
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
    const { username, password, email, isAdmin } = req.body;
    const user = await User.findByPk(userId);
    res.json(await user.update({ username, password, email, isAdmin }));
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
