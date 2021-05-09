const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema({
  name: String,
  img: String,
});

module.exports = mongoose.model("Category", category);
