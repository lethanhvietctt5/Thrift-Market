const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
  title: String,
  author: String,
  content: String,
  created: Date,
  images: Array,
  price: Number,
  categories: Array,
  state: Boolean
});

module.exports = mongoose.model("Post", post);
