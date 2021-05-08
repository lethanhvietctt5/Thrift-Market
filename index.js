const express = require("express");
const config = require("./config");
const app = express();
const insert = require("./script_insert");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
config(app);
insert();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/register", registerRoute);

app.use("/login", loginRoute);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
