const express = require("express");
const config = require("./config");
const app = express();

// Insert data function
const insert = require("./script_insert");

// Import routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const adminRoute = require("./routes/admin");

// Import middlewares
const mdwCheckLogin = require("./middlewares/checkLogin");
const mdwCheckAdmin = require("./middlewares/checkAdmin");

config(app);
//insert();

const PORT = process.env.PORT || 3000;

app.use(mdwCheckLogin);

app.get("/", mdwCheckLogin, (req, res) => {
  res.render("index");
});

app.use("/admin", mdwCheckAdmin, adminRoute);

app.use("/register", mdwCheckLogin, registerRoute);

app.use("/login", mdwCheckLogin, loginRoute);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.user = undefined;
  req.session.destroy();
  res.redirect("/login");
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
