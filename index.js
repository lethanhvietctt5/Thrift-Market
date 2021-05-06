const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 30,
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
