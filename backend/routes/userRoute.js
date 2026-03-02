const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// 🔹 GET CURRENT USER PROFILE
router.get("/me", auth, async (req, res) => {
  try {
    res.json(req.user); // ✅ FIXED
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 UPDATE PROFILE
router.put("/me", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    req.user.name = name;
    req.user.email = email;

    await req.user.save();

    res.json(req.user); // ✅ FIXED
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;