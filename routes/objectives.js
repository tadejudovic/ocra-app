const router = require("express")

router.get("/objectives", (req, res) => {
  res.render(`/objectives-form`);
});