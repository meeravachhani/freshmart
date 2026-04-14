const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Existing Dashboard Logic
exports.getDashboard = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    let monthlySales = Array(12).fill(0);
    revenueData.forEach(item => {
      if (item._id) monthlySales[item._id - 1] = item.total;
    });

    const revenue = monthlySales.reduce((a, b) => a + b, 0);

    res.json({ products, users, orders, revenue, monthlySales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ FIXED ADMIN REGISTRATION
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey, city, mobile, dob } = req.body;

    // Verify Admin Secret Key
    if (secretKey !== "YOUR_OFFICIAL_SECRET_KEY") {
      return res.status(401).json({ message: "Invalid Admin Secret Key." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    // Create Admin with ALL required fields
    const newAdmin = new User({
      name,
      email,
      password, 
      role: "admin",
      city,
      mobile,
      dob
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) return res.status(400).json({ message: "Cannot delete self." });
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};