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


// /* ================= USER REGISTER ================= */
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exist = await User.findOne({ email });
//     if (exist) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user",   // normal user
//     });

//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: "Wrong password" });
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   // ✅ CHANGED: return userId so frontend can store it
//   res.json({
//     token,
//     user: {
//       _id: user._id,        // 🔥 IMPORTANT
//       name: user.name,
//       role: user.role,
//       email: user.email,
//     },
//   });
// });

// module.exports = router;



const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

/* ================= GOOGLE LOGIN ================= */
router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const hashedPassword = await bcrypt.hash(crypto.randomBytes(16).toString("hex"), 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });
    }

    // Generate JWT
    const appToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: appToken,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(400).json({ message: "Google authentication failed" });
  }
});

/* ================= FORGOT PASSWORD ================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Email setup
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "FreshMart Password Reset",
      text: `Click to reset: ${resetUrl}\n\nToken expires in 1 hour.`,
      html: `<h2>FreshMart Password Reset</h2><p>Click <a href="${resetUrl}">here</a> to reset your password. Expires in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset email sent" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Error sending email" });
  }
});

/* ================= RESET PASSWORD ================= */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    // 🔥 FIXED: Clear the fields properly
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;  // 🔥 WAS MISSING
    user.resetPasswordExpires = undefined; // 🔥 WAS WRONG

    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ================= USER REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",   // normal user
    });

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;