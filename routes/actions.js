const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { events } = require("../models/Actions.model");
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

router.post("/new-action/:pleaseworks", isLoggedIn, (req, res) => {
  const { action, actionEndDate } = req.body;
  let objId = req.params.pleaseworks;
  console.log("ObjectiveId", objId);

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
      .then((updateObj) => {
        //console.log("updated Obj:", updateObj._id);
        Objective.findByIdAndUpdate(
          updateObj.objectives,
          {
            $push: { action: objId },
          },
          { new: true }
        );
      })
      .then((createAction) => {
        //console.log("createAction:", createAction);
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

// Find and delete a particular Actions

router.get(
  "/delete/:dynamic",
  /*isLoggedIn,*/ (req, res) => {
    Action.findById(req.params.dynamic).then((event) => {
      if (!event) {
        return res.redirect("/");
      }
      if (!event.user.includes(req.session._id)) {
        return res.redirect("/");
      }
    });
    Action.findByIdAndDelete(req.params.dynamic).then(() => {
      return res.redirect("/profile");
    });
  }
);

// Edit a particular action

// Get values from the form 

router.get(
  "/edit/:dynamic",
  /*isLoggedIn*/ (req, res) => {
    Action.findById(req.params.dynamic).then((action) => {
      res
        .render("edit-actions", {
          user: req.session.user,
          action: {
            action: "random",
          },
        })

        .catch((err) => {
          console.log(err);
          return res.render("/profile", {
            errorMessage: "something went really wrong!!",
          });
        });
    });
  }
);
module.exports = router;
