const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* GET ALL ORDERS (ADMIN) */
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.put("/:id/status", auth, admin, async (req, res) => {
//   try {
//     const { status } = req.body;

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Status update failed" });
//   }
// });

// routes/adminOrderRoute.js
router.put("/:id/status", auth, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
});


module.exports = router;

