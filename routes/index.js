const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (!req.session.user) {
    return res.render("index");
  }

  Objective.find({
    user: { $in: req.session.user._id },
  }).then((objective) => {
    //console.log("obj:", obj);
    Action.find(objective._id)
      .populate("objectives")
      .then((view) => {
        console.log("wazzza:", view);
        res.render("profile", {
          user: req.session.user,
          view,
          objective,
        });
      });
  });
});

module.exports = router;
