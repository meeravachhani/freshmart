const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

// // ==============================================================new file 
// const express = require('express');
// const Product = require('../models/Product');
// const router = express.Router();

// // Get all products
// router.get('/', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Add product (admin only, simplified)
// router.post('/', async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.status(201).json(product);
// });

// module.exports = router;