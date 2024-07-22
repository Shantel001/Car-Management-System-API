exports.verifyAdmin = (req, res, next) => {
  console.log(req.body);

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

exports.verifyUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
