const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
  Objective.find({
    user: { $in: req.session.user._id },
  })
    .populate("action")
    .then((objective) => {
      console.log("wazzzaaaa:", objective);
      res.render("profile", {
        user: req.session.user,
        objective,
      });
    });
});

router.get("/edit", isLoggedIn, (req, res) => {
  res.render("edit-profile", { user: req.session.user });
});

router.post("/edit", isLoggedIn, (req, res) => {
  const { name, locations, email, surname } = req.body;
  console.log("edit user:", req.body);
  User.findByIdAndUpdate(
    req.session.user._id, // id of the user that was logged in
    { name, surname, locations, email },
    { new: true }
  ).then((newUser) => {
    // console.log("newUser:", newUser);
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

module.exports = router;
