const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
  Objective.findById(
   req.session.user._id 
  ).then((obj) => {
    console.log("obj:", obj);
    res.render("profile", {
      user: req.session.user,
      obj,
      action  
    
    });
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