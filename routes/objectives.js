const router = require("express").Router();

// Require mongoose for database connection 
const mongoose = require("mongoose");


// Require objective model to use the schema

const Objectives = require("../models/Objectives.model");

// Required middleware to make sure user is logged-in 

const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");


// Bring in objective model 




// Render Objectives form 

router.get("/", isLoggedIn, (req, res) => {
  res.render("objectives-form", { user: req.session.user });
});

// Push data from form the the profile page (this is where we're gonna show a list of problems, objectives, actions)

router.post("/new-objective", (req, res) => {
  const { problem, category,objectiveInput,ObjectiveEndDate,keyResult } = req.body;
  console.log(req.body)

  Objectives.create({
    problem

  })

  .then((createObjective) => { 
    return res.redirect("/profile");


  })

  .catch (( error) => {
    return res.render("actions", {
    errorMessage: "something went really wrong!!"
   } )
   console.log(error)

})
})

module.exports = router;