const passport = require("passport");
const bcrypt = require("bcrypt");
const LogcalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

passport.use(
  new LogcalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      const user = await User.findOne({ email: username });

      if (user) {
        if (user.isBanned)
          return done(null, false, {
            message: "Tài khoản của bạn đã bị khóa!",
          });
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Mật khẩu không chính xác!",
          });
        }
      } else {
        return done(null, false, {
          message: "Tên đăng nhập hoặc mật khẩu không đúng !",
        });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ _id: id });
  if (user) done(null, user);
  else done(null, false);
});
