const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  return res.render("users/index");
});

router.get("/edit_profile", (req, res) => {
  return res.render("users/edit_profile");
});

router.post("/edit_profile", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  else {
    let user = await User.findOne({ _id: req.user._id });
    const { name, birth, phone, gender } = req.body;
    user.name = name;
    user.birth = birth;
    user.phone = phone;
    user.gender = gender;
    await user.save();
    req.logIn(user, (err) => {
      console.log(err);
    });
    res.end();
    return res.redirect(`/${req.user._id}`);
  }
});

module.exports = router;
