const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: String,
  birth: Date,
  phone: String,
  email: String,
  password: String,
  isBanned: Boolean,
  gender: String,
});

module.exports = mongoose.model("User", user);
