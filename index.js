const express = require("express");
const config = require("./config");
const app = express();
const insert = require("./script_insert");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const mdwCheckLogin = require("./middlewares/checkLogin");

config(app);
insert();

const PORT = process.env.PORT || 3000;

app.use(mdwCheckLogin);

app.get("/", mdwCheckLogin, (req, res) => {
  res.render("index");
});

app.use("/register", mdwCheckLogin, registerRoute);

app.use("/login", mdwCheckLogin, loginRoute);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.user = undefined;
  req.session.destroy();
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
