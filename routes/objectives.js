const router = require("express").Router();

router.get("/objectives", (req, res) => {
  res.render(`/objectives-form`);
});

module.exports = router;
