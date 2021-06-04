const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Post = require("../models/Post");

String.prototype.trunc = function (n) {
  return this.substr(0, n - 1) + (this.length > n ? " ..." : "");
};

router.get("/", async (req, res) => {
  const categories = await Category.find();
  let newPosts = await Post.find();
  newPosts = newPosts.sort((a, b) => a.created - b.created);
  newPosts = newPosts
    .map((post) => ({
      id: post._id,
      title: post.title.trunc(30),
      price: post.price.toLocaleString(),
      img: post.images[0]?.path,
      state: post.state,
      hide: post.hide,
    }))
    .filter((post) => post.state && !post.hide);
  res.render("index", { categories, newPosts });
});

module.exports = router;
