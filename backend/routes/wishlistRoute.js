const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

/* ADD / REMOVE WISHLIST */
router.post("/:productId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const exists = user.wishlist.includes(req.params.productId);

  if (exists) {
    user.wishlist.pull(req.params.productId);
  } else {
    user.wishlist.push(req.params.productId);
  }

  await user.save();
  res.json(user.wishlist);
});

/* GET WISHLIST */
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");
  res.json(user.wishlist);
});

module.exports = router;
