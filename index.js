const express = require("express");
const config = require("./config");

const app = express();
config(app);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
