const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../auth");

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("login");
});

module.exports = router;
