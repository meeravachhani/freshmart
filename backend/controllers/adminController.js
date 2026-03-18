// const Order = require("../models/Order");
// const Product = require("../models/Product");
// const User = require("../models/User");

// exports.getDashboard = async (req, res) => {
//   try {

//     const products = await Product.countDocuments();
//     const users = await User.countDocuments();
//     const orders = await Order.countDocuments();

//     const revenueData = await Order.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           total: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     let monthlySales = Array(12).fill(0);

//     revenueData.forEach(item => {
//       monthlySales[item._id - 1] = item.total;
//     });

//     const revenue = monthlySales.reduce((a,b)=>a+b,0);

//     res.json({
//       products,
//       users,
//       orders,
//       revenue,
//       monthlySales
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

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
      // Ensure the ID exists before indexing
      if (item._id) {
        monthlySales[item._id - 1] = item.total;
      }
    });

    const revenue = monthlySales.reduce((a, b) => a + b, 0);

    res.json({
      products,
      users,
      orders,
      revenue,
      monthlySales
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NEW CODE ADDED BELOW ---

/**
 * @desc    Get all users for the Admin Table
 * @route   GET /api/admin/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    // We exclude the password field for security
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/admin/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Prevent an admin from deleting themselves
    if (id === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own admin account." });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};