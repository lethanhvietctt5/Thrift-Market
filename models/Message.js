const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
  id_sender: String,
  id_reciever: String,
  content: String,
  date: Date
});

module.exports = mongoose.model("Message", message);
