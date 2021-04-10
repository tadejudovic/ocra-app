const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");

router.get("/", isLoggedIn, (req, res) => {
  res.render("actions", { user: req.session.user });
});

module.exports = router;
