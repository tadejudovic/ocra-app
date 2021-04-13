const router = require("express").Router();

// Require mongoose for database connection
// const mongoose = require("mongoose");

// Require objective model to use the schema

const User = require("../models/Objectives.model");
const Objective = require("../models/Objectives.model");
const Action = require("../models/Actions.model");

// Required middleware to make sure user is logged-in

const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

// Render Objectives form

router.get("/", isLoggedIn, (req, res) => {
  res.render("objectives-form", { user: req.session.user });
});

// Push data from form the the profile page (this is where we're gonna show a list of problems, objectives, actions)

// router.post("/new-objective", (req, res) => {
//   const {
//     problem,
//     category,
//     objectiveInput,
//     ObjectiveEndDate,
//     keyResult,
//   } = req.body;
//   console.log(req.body);

//   return Objective.create({
//     problem,
//   })
//     .then((createObjective) => {
//       console.log(createObjective);
//       return res.redirect("/profile");
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.render("actions", {
//         errorMessage: "something went really wrong!!",
//       });
//     });
// });

router.post("/new-objective", isLoggedIn, (req, res) => {
  const {
    problem,
    category,
    objectiveInput,
    objectiveEndDate,
    keyResult,
  } = req.body;

  console.log(req.body);
  if (
    !problem ||
    !category ||
    !objectiveInput ||
    !objectiveEndDate ||
    !keyResult
  ) {
    return res.render("objectives-form", {
      errorMessage: "You need to write a description",
    });
  }

  Objective.findOne({ problem }).then((found) => {
    if (found) {
      return res.render("objectives-form", {
        errorMessage: "You have already add this objective",
      });
    }
    Objective.create({
      problem,
      category,
      objectiveInput,
      objectiveEndDate,
      keyResult,
      user: req.session.user._id,
    })
      .then((createObjective) => {
        console.log("createObjective:", createObjective);
        return res.redirect("/profile");
      })
      .catch((err) => {
        console.log(err);
        return res.render("objectives-form", {
          errorMessage: "something went really wrong!!",
        });
      });
  });
});

module.exports = router;
