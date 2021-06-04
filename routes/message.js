const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

router.get("/", async (req, res) => {
  let sender = await Message.find({ id_sender: req.user._id });
  let reciever = await Message.find({ id_receiver: req.user._id });
  let list_contact = sender.map((item) => item.id_receiver);
  list_contact = list_contact.concat(reciever.map((item) => item.id_sender));
  list_contact = [...new Set(list_contact)];
  let user_contact = [];
  for (let i = 0; i < list_contact.length; i++) {
    const user = await User.findOne({ _id: list_contact[i] });
    user_contact.push({ _id: user._id, name: user.name });
  }
  list_contact = [...new Set(user_contact)];
  let first = list_contact[0];
  return res.render("message", { list_contact, first });
});

router.get("/getMessages/:id", async (req, res) => {
  let slectedUser = req.params.id;
  let send = await Message.find({ id_sender: req.user._id });
  let recieve = await Message.find({ id_receiver: req.user._id });
  send = send
    .filter((item) => item.id_receiver == slectedUser)
    .map((item) => ({ content: item.content, isSend: true, date: item.date }));
  recieve = recieve
    .filter((item) => item.id_sender == slectedUser)
    .map((item) => ({
      content: item.content,
      isRecieve: true,
      date: item.date,
    }));

  let result = send.concat(recieve);
  result = result.sort((item1, item2) => item1.date - item2.date);
  return res.json({ result: result });
});

router.get("/:id", async (req, res) => {
  let sender = await Message.find({ id_sender: req.user._id });
  let reciever = await Message.find({ id_receiver: req.user._id });
  let checkSend = sender.filter((msg) => msg.id_receiver == req.params.id);
  let checkRecv = reciever.filter((msg) => msg.id_sender == req.params.id);
  if (checkRecv.length == 0 && checkSend.length == 0) {
    let message = new Message({
      id_sender: req.user._id.toString(),
      id_receiver: req.params.id,
      content: "Xin chào !",
      date: Date.now(),
    });

    await message.save();
    sender = await Message.find({ id_sender: req.user._id });
    reciever = await Message.find({ id_receiver: req.user._id });
  }

  let list_contact = sender.map((item) => item.id_receiver);
  list_contact = list_contact.concat(reciever.map((item) => item.id_sender));
  list_contact = [...new Set(list_contact)];
  let user_contact = [];
  for (let i = 0; i < list_contact.length; i++) {
    const user = await User.findOne({ _id: list_contact[i] });
    user_contact.push({ _id: user._id, name: user.name });
  }
  let first = await User.findOne({ _id: req.params.id });
  first = { _id: first._id, name: first.name };
  list_contact = [first, ...user_contact];
  list_contact = [...new Set(user_contact)];
  return res.render("message", { list_contact, first });
});

module.exports = router;
