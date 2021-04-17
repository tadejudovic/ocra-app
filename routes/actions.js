const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const Objective = require("../models/Objectives.model");

router.get("/new-action/:dynamic", isLoggedIn, (req, res) => {
  res.render("actions", { user: req.session.user });
});

router.post("/new-action/:dynamic", isLoggedIn, (req, res) => {
  const { action, actionEndDate } = req.body;
  let objId = req.params.dynamic;

  console.log(req.body);
  if (!action || !actionEndDate) {
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
      .then((updateObj) => {
        console.log("updated Obj:", updateObj);
        Objective.findByIdAndUpdate(
          objId,
          {
            $push: { action: "hahah" },
          },
          { new: true }
        );
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
