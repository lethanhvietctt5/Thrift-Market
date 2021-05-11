const express = require("express");
require('express-async-errors');
const config = require("./config");
const app = express();

// Insert data function
const insert = require("./script_insert");

// Import routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

// Import middlewares
const mdwCheckLogin = require("./middlewares/checkLogin");
const mdwCheckAdmin = require("./middlewares/checkAdmin");
const mdwLogged = require("./middlewares/logged");

// Import Schema
const Category = require("./models/Category");
const User = require('./models/User');
const Message = require('./models/Message');
const { users } = require("./dumbData");
const { lock } = require("./routes/login");

config(app);
//insert();

const PORT = process.env.PORT || 3000;

app.use(mdwCheckLogin);

app.get("/", mdwCheckLogin, async (req, res) => {
  const categories = await Category.find();
  res.render("index", { categories });
});

app.get("/message", mdwCheckLogin, async(req, res) => {
  res.render("message");
});

app.get("/message/:id", mdwCheckLogin, async(req, res) => {
  const selectedUser = await User.findById(req.params.id);
  res.render("message", { selectedUser: selectedUser } );
});

app.post("/sendMessage", async (req, res) => {
  receiver = await User.findById(req.body.id_receiver);
  if (receiver == null) {
    res.send(false);
  } else {
    message = new Message({
      id_sender: req.body.id_sender,
      id_receiver: req.body.id_receiver,
      content: req.body.content,
      date: req.body.date
    });
    await message.save();
    res.send(true);
  }
});

app.get("/getUsersChatted", async (req, res) => {
  messages = await Message.find({ $or:[{id_sender: req.user._id}, {id_receiver: req.user._id}]}).sort({date: -1}).lean();
  map = new Map();
  for (i = 0; i < messages.length; i++) {
    if (messages[i].id_sender == req.user._id) {
      if (!map.has(messages[i].id_receiver)) {
        map.set(messages[i].id_receiver, messages[i].date);
      }
    } else {
      if (!map.has(messages[i].id_sender)) {
        map.set(messages[i].id_sender, messages[i].date);
      }
    }
  }
  result = [];
  waithere = new Promise((resolve, reject) => {
    count = 0;
    map.forEach(async (date, id) => {
      if (id != undefined) {
        temp = await User.findById(id).lean();
        temp.lastMessage = date;
        result.push(temp);
      }
      count++;
      if (count == map.size) resolve();
    });
  });
  waithere.then(() => res.send(result));
});

app.get("/loadChatbox/:id_receiver", async (req, res) => {
  messages = await Message.find({$or: [
      {$and: [ {id_receiver: req.params.id_receiver}, {id_sender: req.user._id} ] }, 
      {$and: [ {id_receiver: req.user._id}, {id_sender: req.params.id_receiver} ] } 
  ]});
  res.send(messages);
})

app.use("/admin", mdwCheckAdmin, adminRoute);

app.use("/register", mdwCheckLogin, registerRoute);

app.use("/login", mdwCheckLogin, loginRoute);

app.use("/post", postRoute);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.user = undefined;
  req.session.destroy();
  res.redirect("/login");
});

app.use("/:user_id", mdwLogged, userRoute);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
