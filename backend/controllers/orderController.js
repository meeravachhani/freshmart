const Order = require("../models/Order");

/* PLACE ORDER */

exports.createOrder = async (req, res) => {

  try {

    const { products, totalAmount } = req.body;

    const order = new Order({
      userId: req.user.id,
      products,
      totalAmount,
    });

    await order.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



/* GET MY ORDERS */

exports.getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({ userId: req.user.id })

      .populate("products.productId", "name price image")

      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};