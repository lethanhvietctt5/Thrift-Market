const express = require("express");
const path = require("path");
const session = require("express-session");
const hbs = require("express-handlebars");

module.exports = function config(app) {
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

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "views"));
  app.engine(
    "hbs",
    hbs({
      extname: ".hbs",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
      layoutsDir: path.join(__dirname, "views/layouts"),
      defaultLayout: "main.hbs",
    })
  );

  app.use(express.static(__dirname + "/public"));
};
