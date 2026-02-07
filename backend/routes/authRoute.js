// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// /* ================= ADMIN REGISTER ================= */
// router.post("/admin/register", async (req, res) => {
//   const { name, email, password, adminKey } = req.body;

//   if (adminKey !== process.env.ADMIN_SECRET_KEY) {
//     return res.status(401).json({ message: "Invalid admin key" });
//   }

//   const exist = await User.findOne({ email });
//   if (exist) {
//     return res.status(400).json({ message: "Admin already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role: "admin",
//   });

//   res.json({ message: "Admin registered successfully" });
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.json({
//     token,
//     role: user.role,
//     name: user.name,
//   });
// });

// module.exports = router;




const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ================= ADMIN REGISTER ================= */
router.post("/admin/register", async (req, res) => {
  const { name, email, password, adminKey } = req.body;

  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: "Invalid admin key" });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  res.json({ message: "Admin registered successfully" });
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ CHANGED: return userId so frontend can store it
  res.json({
    token,
    user: {
      _id: user._id,        // 🔥 IMPORTANT
      name: user.name,
      role: user.role,
      email: user.email,
    },
  });
});

module.exports = router;
