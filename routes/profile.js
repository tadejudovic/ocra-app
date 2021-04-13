const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");

/* GET profile */
router.get("/", /*isLoggedIn*/(req, res, next) => {
  res.render("profile", { user: req.session.user });
});

module.exports = router;
