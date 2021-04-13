const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
  Objective.find({
    user: { $in: req.session.user._id },
  }).then((obj) => {
    console.log("obj:", obj);
    res.render("profile", {
      user: req.session.user,
      obj,
    });
  });
});

module.exports = router;
