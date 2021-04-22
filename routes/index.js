const isLoggedIn = require("../middlewares/isLoggedIn");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");

const router = require("express").Router();

/* GET home page */
// router.get("/", (req, res, next) => {
//   if (!req.session.user) {
//     return res.render("index");
//   }

//   Objective.find({
//     user: { $in: req.session.user._id },
//   }).then((objective) => {
//     //console.log("obj:", obj);
//     Action.find(objective._id)
//       .populate("objectives")
//       .then((view) => {
//         console.log("baaaa:", view);
//         res.render("profile", {
//           user: req.session.user,
//           view,
//           objective,
//         });
//       });
//   });
// });

router.get("/", isLoggedIn, (req, res, next) => {
  if (!req.session.user) {
    return res.render("index");
  }

  Objective.find({
    user: { $in: req.session.user._id },
  })
    .populate("action")
    .then((obj) => {
      const objProperties = obj.map((el) => {
        const actionArr = el.action;

        const statusArr = actionArr.map(function (ele) {
          return ele.status;
        });

        let progress = statusArr.filter((ele) => ele === "Completed").length;

        const percentage =
          Math.floor((progress / statusArr.length) * 100) + "%";

        return {
          ...el.toJSON(),
          percentage,
          objectiveEndDate: el.objectiveEndDate.toISOString().split("T")[0],
          objectiveId: el._id,
          currentObjCategory: el.category,
          categories: [
            "Financial",
            "Career",
            "Relationship",
            "Wellbeing",
            "Passion",
          ].filter((category) => !(category === el.category)),
          currentStatus: el.status,
          statusList: ["Not Started", "In-Progress", "Completed"].filter(
            (stat) => !(stat === el.status)
          ),
        };
      });

      res.render("profile", {
        user: req.session.user,
        objProperties,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("/profile", {
        errorMessage: "something went really wrong!!",
      });
    });
});

module.exports = router;
