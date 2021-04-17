const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const Objective = require("../models/Objectives.model");

router.get("/new-action/:dynamic", isLoggedIn, (req, res) => {
  res.render("actions", { user: req.session.user });
});

router.post("/new-action/:dynamic", isLoggedIn, (req, res) => {


//TODO:
// CREATE THE ACTION
// THEN YOU UPDATE THE OBJECTIVE WITH THE ACTION'S ID
// THEN REDIRECT USER TO PROFILE (OR ANOTHER PAGE OF YOUR CHOICE)



  const { action, actionEndDate } = req.body;

  console.log(req.body);
  if (!action) {
    return res.render("actions", {
      errorMessage: "You need to write a description",
    });
  }

  Action.findOne({ action }).then((found) => {
    if (found) {
      return res.render("actions", {
        errorMessage: "You have already add this action",
      });
    }
    Action.create({
      action,
      actionEndDate,
      user: req.session.user._id,

    })
      .then((createAction) => {
        console.log("createAction:", createAction);
        return res.redirect("/profile");
      })
      .catch((err) => {
        console.log(err);
        return res.render("actions", {
          errorMessage: "something went really wrong!!",
        });
      });
  });

  Objective.findByIdAndUpdate(req.params.dynamic, {action:action},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated objectives", docs);
    }
});
  

});

module.exports = router;


