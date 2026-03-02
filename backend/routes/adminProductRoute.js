const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const router = express.Router();

/* TEST ROUTE */
router.get("/test", (req, res) => {
  res.send("Admin Product Route Working ✅");
});

/* ADD PRODUCT */
router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  const product = await Product.create({
    ...req.body,
    image: `/uploads/${req.file.filename}`,
  });
  res.json(product);
});

/* GET ALL PRODUCTS */
router.get("/", auth, admin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
/* delete record */
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", auth, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// UPDATE PRODUCT
router.put("/:id", auth, admin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
