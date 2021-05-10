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
