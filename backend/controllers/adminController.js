// // const Order = require("../models/Order");
// // const Product = require("../models/Product");
// // const User = require("../models/User");

// // exports.getDashboard = async (req, res) => {
// //   try {

// //     const products = await Product.countDocuments();
// //     const users = await User.countDocuments();
// //     const orders = await Order.countDocuments();

// //     const revenueData = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: { $month: "$createdAt" },
// //           total: { $sum: "$totalAmount" }
// //         }
// //       }
// //     ]);

// //     let monthlySales = Array(12).fill(0);

// //     revenueData.forEach(item => {
// //       monthlySales[item._id - 1] = item.total;
// //     });

// //     const revenue = monthlySales.reduce((a,b)=>a+b,0);

// //     res.json({
// //       products,
// //       users,
// //       orders,
// //       revenue,
// //       monthlySales
// //     });

// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };






// // const Order = require("../models/Order");
// // const Product = require("../models/Product");
// // const User = require("../models/User");

// // // Existing Dashboard Logic
// // exports.getDashboard = async (req, res) => {
// //   try {
// //     const products = await Product.countDocuments();
// //     const users = await User.countDocuments();
// //     const orders = await Order.countDocuments();

// //     const revenueData = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: { $month: "$createdAt" },
// //           total: { $sum: "$totalAmount" }
// //         }
// //       }
// //     ]);

// //     let monthlySales = Array(12).fill(0);

// //     revenueData.forEach(item => {
// //       // Ensure the ID exists before indexing
// //       if (item._id) {
// //         monthlySales[item._id - 1] = item.total;
// //       }
// //     });

// //     const revenue = monthlySales.reduce((a, b) => a + b, 0);

// //     res.json({
// //       products,
// //       users,
// //       orders,
// //       revenue,
// //       monthlySales
// //     });

// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // --- NEW CODE ADDED BELOW ---

// // /**
// //  * @desc    Get all users for the Admin Table
// //  * @route   GET /api/admin/users
// //  */
// // exports.getAllUsers = async (req, res) => {
// //   try {
// //     // We exclude the password field for security
// //     const users = await User.find().select("-password").sort({ createdAt: -1 });
// //     res.status(200).json(users);
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to fetch users" });
// //   }
// // };

// // /**
// //  * @desc    Delete a user by ID
// //  * @route   DELETE /api/admin/users/:id
// //  */
// // exports.deleteUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     // Optional: Prevent an admin from deleting themselves
// //     if (id === req.user.id) {
// //       return res.status(400).json({ message: "You cannot delete your own admin account." });
// //     }

// //     const deletedUser = await User.findByIdAndDelete(id);

// //     if (!deletedUser) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     res.status(200).json({ message: "User deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };





// const Order = require("../models/Order");
// const Product = require("../models/Product");
// const User = require("../models/User");
// const bcrypt = require("bcryptjs"); // Ensure bcrypt is installed for password hashing

// // Existing Dashboard Logic
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
//       if (item._id) {
//         monthlySales[item._id - 1] = item.total;
//       }
//     });

//     const revenue = monthlySales.reduce((a, b) => a + b, 0);

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

// // --- NEW ADMIN REGISTRATION LOGIC ---

// /**
//  * @desc    Register a new Admin with extra fields
//  * @route   POST /api/auth/admin/register
//  */
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { name, email, password, secretKey, city, mobile, dob } = req.body;

//     // 1. Verify Admin Secret Key (Matches your frontend request)
//     // Replace 'your_admin_secret_key' with your actual secret or process.env variable
//     if (secretKey !== "YOUR_OFFICIAL_SECRET_KEY") {
//       return res.status(401).json({ message: "Invalid Admin Secret Key. Access Denied." });
//     }

//     // 2. Check if admin/user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email." });
//     }

//     // 3. Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 4. Create Admin User with ALL required fields
//     const newAdmin = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "admin", // Explicitly set role
//       city,   // Added as per your requirement
//       mobile, // Added as per your requirement
//       dob     // Added as per your requirement
//     });

//     await newAdmin.save();

//     res.status(201).json({ message: "Admin registered successfully ✅" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // --- USER MANAGEMENT LOGIC ---

// /**
//  * @desc    Get all users for the Admin Table
//  */
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };

// /**
//  * @desc    Delete a user by ID
//  */
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (id === req.user.id) {
//       return res.status(400).json({ message: "You cannot delete your own admin account." });
//     }

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


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
      password, // Assuming you have a pre-save hook for hashing, or hash here
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