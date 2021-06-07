const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("profile", { loggedIn: req.session.loggedIn });
    } else {
      res.render("login", { loggedIn: req.session.loggedIn });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    res.render("profile", { loggedIn: req.session.loggedIn });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/expense", async (req, res) => {
  try {
    res.render("expense", { loggedIn: req.session.loggedIn });
  } catch {
    res.status(500).json(err);
  }
});

router.get("/view", async (req, res) => {
  try {
    res.render("view", { loggedIn: req.session.loggedIn });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
