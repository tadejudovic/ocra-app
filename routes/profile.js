const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
  Objective.findById(req.session.user._id).then((obj) => {
    console.log("obj:", obj);
    res.render("profile", {
      user: req.session.user,
      obj,
      action,
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

/*
{
    action: [],
    buddy: [],
    status: 'Not Started',
    _id: 607877c4135e401726ad287b,
    problem: 'Run a marathon',
    category: 'Wellbeing',
    objectiveInput: 'speed',
    objectiveEndDate: 2021-04-20T00:00:00.000Z,
    keyResult: '42km',
    user: 607162fccedb7aaba30a33e4,
    __v: 0
  }

*/
