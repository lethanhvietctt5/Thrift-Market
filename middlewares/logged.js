module.exports = function (req, res, next) {
  if (typeof req.user !== "undefined") {
    next();
  } else {
    return res.redirect("/login")
  }
};