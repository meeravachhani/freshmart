// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token" });

    // Remove "Bearer " if present
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length).trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should have { id: user._id }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
