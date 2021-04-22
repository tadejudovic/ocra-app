const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");
const parser = require("../config/cloudinary");
const { listeners } = require("../models/Actions.model");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
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

        const percentage = (progress / statusArr.length) * 100 + "%";

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

router.get("/edit", isLoggedIn, (req, res) => {
  console.log("ahbhabahbhjab", req.session.user);
  res.render("edit-profile", { user: req.session.user });
});

router.post("/edit", isLoggedIn, parser.single("profilePic"), (req, res) => {
  const profilePicture = req.file?.path;
  console.log("wewewe:", profilePicture);
  const { name, locations, email, surname } = req.body;
  const newUser = {
    name,
    locations,
    email,
    surname,
    profilePic: profilePicture,
  };
  const updateUser = Object.fromEntries(
    Object.entries(newUser).filter((el) => el[1])
  );
  console.log("test:", updateUser);
  // console.log("edit user:", req.body);
  // console.log("picture:", profilePicture);
  User.findByIdAndUpdate(
    req.session.user._id, // id of the user that was logged in
    updateUser,
    { new: true }
  ).then((newUser) => {
    // console.log("newUser:", newUser);
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

module.exports = router;
