const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (!req.session.user) {
    return res.render("index");
  }
  res.render("profile", { user: req.session.user });
});

module.exports = router;
