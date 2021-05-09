const User = require("./models/User");
const users = require("./dumbData");
const bcrypt = require("bcrypt");

module.exports = async function () {
  let salt = await bcrypt.genSalt(10);
  for (let i = 0; i < users.length; i++) {
    let user = await User.findOne({ email: users[i].email });
    if (!user) {
      user = new User({ ...users[i], isAdmin: false });
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    }
  }
  let admin = {
    name: "Admin",
    birth: Date.now(),
    phone: "",
    email: "admin",
    password: "22102000",
    isBanned: false,
    gender: "",
    isAdmin: true,
  };
  let user = new User(admin);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
};
