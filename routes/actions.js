const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const Objective = require("../models/Objectives.model");

router.post("/new-action", isLoggedIn, (req, res) => {
  // Objective.findById(req.params.mufasa).then((event) => {
  //   if (!event) {
  //     return res.redirect("/");
  //   }
  //   if (!event.user.includes(req.session._id)) {
  //     return res.redirect("/");
  //   }

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
});

router.get("/:random", isLoggedIn, (req, res) => {
  res.render("actions", { user: req.session.user });
});

module.exports = router;
