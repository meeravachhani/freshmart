const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createOrder,
  getMyOrders
} = require("../controllers/orderController");


// place order
router.post("/place", auth, createOrder);


// get user orders
router.get("/my", auth, getMyOrders);


module.exports = router;