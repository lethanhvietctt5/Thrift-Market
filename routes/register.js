const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, name, birth, phone, gender, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.redirect("/register");
  }
  user = new User({
    name: name,
    birth: birth,
    phone: phone,
    email: email,
    password: password,
    isBanned: false,
    gender: gender,
  });
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  return res.redirect("/login")
});

router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;
