module.exports = function (req, res, next) {
  if (typeof req.user !== "undefined" && req.user.isAdmin) {
    next();
  } else {
    return res.redirect("/");
  }
};
