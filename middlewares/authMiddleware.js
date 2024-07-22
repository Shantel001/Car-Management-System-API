const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  console.log(req.body);
  console.log(req.header("Authorization"));
  const token = req.header("Authorization").split(" ")[1];
  console.log(token, !token);
  //   if (!token) {
  //     return res.status(401).json({ message: "Access Denied" });
  //   }
  try {
    // if (!token) {
    //   console.log(token);
    //   return res.status(401).json({ message: "Access Denied" });
    // }

    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
