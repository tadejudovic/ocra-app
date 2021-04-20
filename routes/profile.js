const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Action = require("../models/Actions.model");
const User = require("../models/User.model");
const Objective = require("../models/Objectives.model");
const parser = require("../config/cloudinary");

/* GET profile */
router.get("/", isLoggedIn, (req, res, next) => {
  Objective.find({
    user: { $in: req.session.user._id },
  })
    .populate("action")
    .then((objective) => {
      console.log("wazzzaaaa:", objective);
      res.render("profile", {
        user: req.session.user,
        objective,
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

// router.post("/edit", isLoggedIn, parser.single("profilePic"), (req, res) => {
//   const profilePicture = req.file.path;
//   const { name, locations, email, surname } = req.body;
//   console.log("edit user:", req.body);
//   console.log("picture:", profilePicture);
//   if (!profilePicture) {
//     User.findByIdAndUpdate(
//       req.session.user._id, // id of the user that was logged in
//       { name, surname, locations, email },
//       { new: true }
//     ).then((newUser) => {
//       // console.log("newUser:", newUser);
//       req.session.user = newUser;
//       res.redirect("/profile");
//     });
//   }
//   if (profilePicture) {
//     User.findByIdAndUpdate(
//       req.session.user._id, // id of the user that was logged in
//       { name, surname, locations, email, profilePic: profilePicture },
//       { new: true }
//     ).then((newUser) => {
//       // console.log("newUser:", newUser);
//       req.session.user = newUser;
//       res.redirect("/profile");
//     });
//   }
// });

router.post("/edit", isLoggedIn, parser.single("profilePic"), (req, res) => {
  const profilePicture = req.file.path;
  const { name, locations, email, surname } = req.body;
  console.log("edit user:", req.body);
  console.log("picture:", profilePicture);
  User.findByIdAndUpdate(
    req.session.user._id, // id of the user that was logged in
    { name, surname, locations, email, profilePic: profilePicture },
    { new: true }
  ).then((newUser) => {
    // console.log("newUser:", newUser);
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

module.exports = router;
