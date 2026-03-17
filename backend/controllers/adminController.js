const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

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
      monthlySales[item._id - 1] = item.total;
    });

    const revenue = monthlySales.reduce((a,b)=>a+b,0);

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