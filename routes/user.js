const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const author_id = req.user._id;
  const posts = await Post.find({ author: author_id });
  var favPosts = [];
  for (i = 0; i < req.user.favPosts.length; i++) {
    favPosts.push(await Post.findById(req.user.favPosts[i]));
  }
  favPosts = favPosts.map((post) => ({
    _id: post._id,
    title: post.title,
    price: post.price,
    created: post.created,
    id_user: req.user._id,
  }));
  return res.render("users/index", { posts, favPosts });
});

router.get("/edit_profile", (req, res) => {
  return res.render("users/edit_profile");
});

router.get("/addFav/:id", async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.favPosts.includes(req.params.id)) {
    res.json({
      status: false,
      message: "Đã lưu bài viết từ trước!",
    });
  } else {
    user.favPosts.push(req.params.id);
    user.save();
    res.json({
      status: true,
      message: "Lưu bài viết thành công!",
    });
  }
});

router.get("/removeFav/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (user.favPosts) {
    user.favPosts = user.favPosts.filter((post) => post != req.params.id);
    await user.save();
  }
  return res.redirect(`/${req.user._id}`);
});

router.get("/deletePost/:id", async (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.redirect(`/${req.user._id}`);
  });
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
