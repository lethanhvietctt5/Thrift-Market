const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/users", async (req, res) => {
  let users = await User.find();
  users = await Promise.all(
    users
      .filter((user) => user.email !== "admin")
      .map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        isBanned: user.isBanned,
      }))
      .map(async (user) => {
        const count_post = await Post.find({ author: user.id });
        return { ...user, numberOfPost: count_post.length };
      })
  );
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
  const posts = await Post.find({ author: req.params.id });
  const list = posts.map((post) => ({
    id: post._id,
    title: post.title,
    price: post.price.toLocaleString(),
    created: post.created,
    state: post.state,
  }));
  return res.render("admin/user", { user, list });
});

router.get("/posts/approve/:id", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  post.state = true;
  await post.save();
  return res.redirect("/admin/posts");
});

router.get("/posts/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.redirect("/admin/posts");
  });
});

router.get("/posts/hide/:id", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  post.hide = true;
  await post.save();
  return res.redirect("/admin/posts");
});

router.get("/posts/unhide/:id", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  post.hide = false;
  await post.save();
  return res.redirect("/admin/posts");
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  let list_posts = await Promise.all(
    posts.map(async (post) => {
      const author = await User.findOne({ _id: post.author });
      return {
        id: post._id,
        title: post.title,
        author: author.name,
        author_id: author._id,
        price: post.price.toLocaleString(),
        created: post.created,
        category: post.categories[0],
        state: post.state,
        hide: post.hide,
      };
    })
  );
  return res.render("admin/posts", { list_posts });
});

module.exports = router;
