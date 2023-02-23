module.exports.auth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({
    message: "Unauthorized",
  });
};