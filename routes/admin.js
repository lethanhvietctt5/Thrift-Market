const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  let users = await User.find();
  users = users.filter((user) => user.email !== "admin");
  return res.render("admin/users", { users });
});

router.get("/users/ban/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  user.isBanned = true;
  await user.save();
  return res.redirect("/admin/users");
});

router.get("/users/unban/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  user.isBanned = false;
  await user.save();
  return res.redirect("/admin/users");
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  return res.render("admin/user", { user });
});

module.exports = router;
