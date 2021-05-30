const express = require("express");
require("express-async-errors");
const config = require("./config");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

// Insert data function
const insert = require("./script_insert");

// Import routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const messageRoute = require("./routes/message");

// Import middlewares
const mdwCheckLogin = require("./middlewares/checkLogin");
const mdwCheckAdmin = require("./middlewares/checkAdmin");
const mdwLogged = require("./middlewares/logged");

// Import Schema
const Category = require("./models/Category");
const User = require("./models/User");
const Message = require("./models/Message");
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

app.use("/message", mdwLogged, messageRoute);

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

io.on("connection", (socket) => {
  socket.on("changeID", (id) => {
    socket.id = id;
  });
  socket.on("send", async ({ id, msg }) => {
    let mess = new Message({
      id_sender: socket.id,
      id_receiver: id,
      content: msg,
      date: Date.now(),
    });
    await mess.save();
    io.emit("recieve", { id, msg });
  });
});

server.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
