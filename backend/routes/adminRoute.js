// const express = require("express");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const Product = require("../models/Product");

// const router = express.Router();

// // Admin dashboard data
// router.get("/dashboard", auth, admin, async (req, res) => {
//   const products = await Product.countDocuments();
//   res.json({ products });
// });

// module.exports = router;



const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const router = express.Router();

router.get("/dashboard", auth, admin, async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments({ role: "user" });
    const orders = await Order.countDocuments();

    // Optional revenue calculation
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({
      products,
      users,
      orders,
      revenue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
