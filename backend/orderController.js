const Order = require("../models/Order");

// Place a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
