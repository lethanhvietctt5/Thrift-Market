const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var post = new Schema({
  title: String,
  author: String,
  content: String,
  created: Date,
  images: Array,
  price: Number,
  categories: Array,
  state: Boolean,
  hide: Boolean,
});

post.index({ title: "text" });

module.exports = mongoose.model("Post", post);
