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

router.get("/", /*isLoggedIn*,/ (req, res) => {
  res.render("objectives-form", { user: req.session.user });
});

// Push data from form the the profile page (this is where we're gonna show a list of problems, objectives, actions)

router.post("/new-objective", /*isLoggedIn,*/ (req, res) => {
  // console.log(req.body.objectiveEndDate);
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
        // console.log("createObjective:", createObjective);
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

router.get("/delete/:mufasa", isLoggedIn, (req, res) => {
  Objective.findById(req.params.mufasa)
    .populate("user")
    .then((objective) => {
      if (!objective) {
        return res.redirect("/");
      }

      if (objective.user._id.toString() !== req.session.user._id.toString()) {
        return res.redirect("/");
      }

      Action.deleteMany({ _id: { $in: objective.action } }).then(() => {
        Objective.findByIdAndDelete(req.params.mufasa).then(() => {
          res.redirect("/profile");
        });
      });
    });
});

router.get("/edit/:random", isLoggedIn, (req, res) => {
  Objective.findById(req.params.random)
    .then((obj) => {
      // console.log(obj);
      //console.log("YAUUUZA");
      // console.log({ ...obj.toJSON() });
      res.render("edit-objectives", {
        user: req.session.user,
        obj: {
          ...obj.toJSON(),
          objectiveEndDate: obj.objectiveEndDate.toISOString().split("T")[0],
          objectiveId: obj._id,
          currentObjCategory: obj.category,
          categories: [
            "Financial",
            "Career",
            "Relationship",
            "Wellbeing",
            "Passion",
          ].filter((category) => !(category === obj.category)),

          currentStatus: obj.status,
          statusList: ["Not Started", "In-Progress", "Completed"].filter(
            (stat) => !(stat === obj.status)
          ),
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("/profile", {
        errorMessage: "something went really wrong!!",
      });
    });
});

router.post("/edit/:dynamic/update", isLoggedIn, (req, res) => {
  const {
    problem,
    category,
    objectiveInput,
    objectiveEndDate,
    keyResult,
    status,
  } = req.body;
  console.log("LOOOOOOOOK", req.body);
  Objective.findByIdAndUpdate(
    req.params.dynamic,
    { problem, category, objectiveInput, objectiveEndDate, keyResult, status },
    { new: true }
  ).then((newObj) => {
    // console.log("newObj:", newObj);
    res.redirect("/profile");
  });
});

module.exports = router;
