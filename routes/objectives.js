const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("/objectives-form");
});

module.exports = router;
