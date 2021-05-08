const express = require("express");
const path = require("path");
const session = require("express-session");
const hbs = require("express-handlebars");
const hbs_section = require("express-handlebars-sections");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const flash = require("req-flash");

module.exports = function config(app) {
  // Connect to database
  mongoose.connect(
    "mongodb+srv://lethanhviet:22102000@cluster0.pkyue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  mongoose.set("useCreateIndex", true);

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
      store: MongoStore.create({
        mongoUrl:
          "mongodb+srv://lethanhviet:22102000@cluster0.pkyue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      }),
    })
  );

  // Init for passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Flash
  app.use(flash());

  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });

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
      helpers: {
        section: hbs_section(),
      },
    })
  );

  app.use(express.static(__dirname + "/public"));
};
