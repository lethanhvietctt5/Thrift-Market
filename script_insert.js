const User = require("./models/User");
const Category = require("./models/Category");
const { users, categories } = require("./dumbData");
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

  for (let i = 0; i < categories.length; i++) {
    let category = await Category.findOne({ name: categories[i].name });
    if (!category) {
      category = new Category(categories[i]);
      await category.save();
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
