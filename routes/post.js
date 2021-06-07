const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const fs = require("fs");
const mkdirp = require("mkdirp");
const { title } = require("process");

router.get("/", async function (req, res) {
  res.redirect("/");
});

router.get("/info/:id", async function (req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) res.redirect("/");
  const author = await User.findById(post.author);
  const cat = post.categories[0];
  let same = await Post.find();
  same = same
    .filter(
      (post) =>
        post.categories[0] == cat &&
        post.state &&
        !post.hide &&
        post._id != req.params.id
    )
    .map((post) => ({
      id: post._id,
      title: post.title,
      price: post.price,
      img: post.images[0].path,
    }));
  res.render("post/info", { post, author_name: author.name, same });
});

router.get("/create", async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    res.render("post/create", { categories });
  } else res.redirect("/");
});

router.get("/byCategory/:name", async (req, res) => {
  const result = await Post.find({
    categories: req.params.name,
  });
  res.render("post/category", {
    result: result,
    category: req.params.name,
  });
});

router.post("/search", async function (req, res) {
  let result = await Post.find({
    $text: {
      $search: req.body.keyword,
    },
    state: true,
    hide: false,
  });

  const categories = await Category.find();
  res.render("post/search", {
    result: result,
    categories: categories,
    keyword: req.body.keyword,
  });
});

router.post("/add", async (req, res) => {
  const random_key = Math.floor(Math.random() * 999999) + 100000;

  let new_post = new Post({
    title: random_key,
    author: "",
    content: "",
    created: new Date(),
    images: [],
    price: 0.0,
    categories: [],
    state: false,
  });
  await new_post.save();

  let post = await Post.findOne({ title: random_key });
  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      if (file.fieldname == "images") {
        if (file.mimetype.includes("image/")) {
          //Lưu image
          post.images.push({
            path: `/images/post/${post._id.toString()}/${file.originalname}`,
          });
          const path = `./public/images/post/${post._id.toString()}`;
          if (!fs.existsSync(path)) {
            await mkdirp(path);
            cb(null, path);
          } else cb(null, path);
        }
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage }).array("images", 10);
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
    } else {
      post.title = req.body.title;
      post.author = req.session.user._id.toString();
      post.content = req.body.content;
      post.price = req.body.money;
      post.categories =
        typeof post.categories == typeof []
          ? req.body.category
          : [req.body.category];
      await post.save();
      res.redirect(req.session.referer != null ? req.session.referer : "/");
    }
  });
});

router.get("/edit/:id", async (req, res) => {
  const post = await Post.find({ _id: req.params.id, author: req.user._id });
  if (!post) res.redirect("/");
  res.render("post/edit", { post: post[0] });
});

router.post("/update/:id", async (req, res) => {
  let post = await Post.findById(req.params.id);
  post.images = [];
  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      if (file.fieldname == "images") {
        if (file.mimetype.includes("image/")) {
          //Lưu image
          post.images.push({
            path: `/images/post/${post._id.toString()}/${file.originalname}`,
          });
          const path = `./public/images/post/${post._id.toString()}`;
          if (!fs.existsSync(path)) {
            await mkdirp(path);
            cb(null, path);
          } else cb(null, path);
        }
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage }).array("images", 10);
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
    } else {
      post.title = req.body.title;
      post.content = req.body.content;
      post.price = req.body.money;
      await post.save();
      res.redirect(req.session.referer != null ? req.session.referer : "/");
    }
  });
});

module.exports = router;
