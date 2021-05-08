const express = require("express");
const config = require("./config");
const app = express();
const insert = require("./script_insert");
const loginRoute = require("./routes/login");
config(app);
insert();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
