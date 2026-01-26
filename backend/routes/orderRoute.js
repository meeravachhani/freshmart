const express = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

// Place order
router.post("/place", auth, createOrder);

// Get my orders
router.get("/my", auth, getMyOrders);

module.exports = router;

// // =========================================================== new file 

// const express = require('express');
// const Order = require('../models/Order');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Create order
// router.post('/', auth, async (req, res) => {
//   const order = new Order(req.body);
//   await order.save();
//   res.status(201).json(order);
// });

// module.exports = router;