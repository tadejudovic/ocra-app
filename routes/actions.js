const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const Objective = require("../models/Objectives.model");

router.get("/new-action/:pleaseworks", isLoggedIn, (req, res) => {
  //console.log(" ajhahhaha:", req.params.pleaseworks);
  Objective.findById(req.params.pleaseworks).then((obj) => {
    res.render("actions", {
      user: req.session.user,
      objectiveId: obj._id,
    });
  });
});

router.post("/new-action/:objectiveId", isLoggedIn, (req, res) => {
  const { action, actionEndDate } = req.body;
  const objId = req.params.objectiveId;
  //console.log("ObjectiveId", objId);

  //console.log(req.body);
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
      objectives: objId,
    })
      .then((createdAction) => {
        //console.log("actioncreated:", createdAction);
        //console.log("updated Obj:", createdAction.objective);

        return Objective.findByIdAndUpdate(
          createdAction.objectives,
          {
            $push: { action: createdAction._id },
          },
          { new: true }
        );
      })
      .then(() => {
        //console.log("createAction:", objUpdated);
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
