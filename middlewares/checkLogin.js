module.exports = function (req, res, next) {
  if (typeof req.user !== "undefined") {
    req.session.user = req.user;
  }
  next();
};
