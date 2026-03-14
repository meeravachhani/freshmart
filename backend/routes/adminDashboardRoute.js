// const express = require("express");
// const router = express.Router();

// const User = require("../models/User");
// const Order = require("../models/Order");
// const Product = require("../models/Product");

// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// router.get("/", auth, admin, async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalOrders = await Order.countDocuments();
//     const totalProducts = await Product.countDocuments();

//     const revenueData = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     const totalRevenue =
//       revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

//     res.json({
//       products: totalProducts,
//       users: totalUsers,
//       orders: totalOrders,
//       revenue: totalRevenue,
//       adminName: req.user.name
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Dashboard error" });
//   }
// });
// const monthlySales = await Order.aggregate([
//   {
//     $group: {
//       _id: { $month: "$createdAt" },
//       total: { $sum: "$totalAmount" }
//     }
//   },
//   { $sort: { "_id": 1 } }
// ]);

// res.json({
//   products: totalProducts,
//   users: totalUsers,
//   orders: totalOrders,
//   revenue: totalRevenue,
//   monthlySales,   // ✅ VERY IMPORTANT
//   adminName: req.user.name
// });
// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const User = require("../models/User");
// const Order = require("../models/Order");
// const Product = require("../models/Product");

// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// router.get("/", auth, admin, async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalOrders = await Order.countDocuments();
//     const totalProducts = await Product.countDocuments();

//     // 💰 Total Revenue
//     const revenueData = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     const totalRevenue =
//       revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

//     // 📊 Monthly Sales
//     const monthlySales = await Order.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           total: { $sum: "$totalAmount" }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     res.json({
//       products: totalProducts,
//       users: totalUsers,
//       orders: totalOrders,
//       revenue: totalRevenue,
//       monthlySales,
//       adminName: req.user.name
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Dashboard error" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const User = require("../models/User");
// const Order = require("../models/Order");
// const Product = require("../models/Product");

// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// router.get("/", auth, admin, async (req, res) => {
//   try {
//     // ===== TOTAL COUNTS =====
//     const totalUsers = await User.countDocuments();
//     const totalOrders = await Order.countDocuments();
//     const totalProducts = await Product.countDocuments();

//     // ===== TOTAL REVENUE =====
//     const revenueData = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     const totalRevenue =
//       revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

//     // ===== MONTHLY SALES =====
//     const monthlySales = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $exists: true }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           total: { $sum: "$totalAmount" }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     res.json({
//       products: totalProducts,
//       users: totalUsers,
//       orders: totalOrders,
//       revenue: totalRevenue,
//       monthlySales,
//       adminName: req.user.name
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Dashboard error" });
//   }
// });

// module.exports = router;