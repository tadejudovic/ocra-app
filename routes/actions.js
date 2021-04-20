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
    Action.findById(req.params.dynamic)
      .then((action) => {
        console.log("wazzaa:", action);
        return res.render("edit-actions", {
          user: req.session.user,
          action: {
            ...action.toJSON(),
            actionEndDate: action.actionEndDate.toISOString().split("T")[0],
            actionId: action._id,
            currentStatus: action.status,
            statusList: ["Not Started", "In-Progress", "Completed"].filter(
              (status) => !(status === action.status)
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
  }
);
<<<<<<< HEAD

router.post("/edit/:dynamic", /*isLoggedIn,*/ (req,res)=> {
  const {action,actionEndDate}=req.body;
  Action.findByIdAndUpdate(
    req.params.dynamic,
    {action,actionEndDate},
    {new:true}
  )
.then((newAction)=>
res.redirect("/profile")
)
})


module.exports = router;
=======
>>>>>>> dev

router.post("/edit/:dynamic/update", isLoggedIn, (req, res) => {
  const { action, actionEndDate, status } = req.body;
  console.log("LOOOOOOOOK", req.body);
  Action.findByIdAndUpdate(
    req.params.dynamic,
    { action, actionEndDate, status },
    { new: true }
  ).then((newObj) => {
    // console.log("newObj:", newObj);
    res.redirect("/profile");
  });
});

module.exports = router;
