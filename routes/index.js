const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const Objective = require("../models/Objectives.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (!req.session.user) {
    return res.render("index");
  }

  Objective.find({
    user: { $in: req.session.user._id },
  }).then((obj) => {
    console.log("obj:", obj);
    return res.render("profile", {
      user: req.session.user,
      obj: { problem: obj.problem, category: obj.category },
    });
  });
});

module.exports = router;
