const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/posts");
});

module.exports = router;
