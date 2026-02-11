// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7);
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ FIX HERE
//     req.user = { id: decoded.id || decoded._id };

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
