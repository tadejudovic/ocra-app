const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");

router.get("/", /*isLoggedIn,*/(req, res) => {
  res.render("actions", { user: req.session.user });
});

router.post("/new-action", /*isLoggedIn,*/(req, res) => {
  const { action } = req.bodsy;

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

module.exports = router;
