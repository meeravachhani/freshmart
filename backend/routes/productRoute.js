// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const auth = require("../middleware/auth");

// /* RATE PRODUCT */
// router.post("/:id/rate", auth, async (req, res) => {
//   const { rating } = req.body;
//   const userId = req.user.id;

//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   // 🔁 Check if user already rated
//   const existing = product.ratings.find(
//     (r) => r.userId.toString() === userId
//   );

//   if (existing) {
//     existing.value = rating; // update rating
//   } else {
//     product.ratings.push({ userId, value: rating });
//   }

//   // ⭐ Calculate average
//   const total = product.ratings.reduce((sum, r) => sum + r.value, 0);
//   product.averageRating = (total / product.ratings.length).toFixed(1);

//   await product.save();
//   // res.json(product);
//   // new line add 2 
//   const products = await Product.find().lean();
// res.status(200).json(products);

// });
// const {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// router.post("/", createProduct);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);



// module.exports = router;




const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); // 🔁 CHANGED: multer add

/* ⭐ RATE PRODUCT */
router.post("/:id/rate", auth, async (req, res) => {
  const { rating } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existing = product.ratings.find(
    (r) => r.userId.toString() === userId
  );

  if (existing) {
    existing.value = rating;
  } else {
    product.ratings.push({ userId, value: rating });
  }

  const total = product.ratings.reduce((sum, r) => sum + r.value, 0);
  product.averageRating = Number(
    (total / product.ratings.length).toFixed(1)
  ); // 🔁 CHANGED: string → number

  await product.save();

  // 🔁 CHANGED: ONLY updated product return (NOT all products)
  res.status(200).json(product);
});

/* 🔥 PRODUCT CRUD */
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", upload.single("image"), createProduct); // 🔁 CHANGED
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct); // 🔁 CHANGED
router.delete("/:id", deleteProduct);

module.exports = router;
