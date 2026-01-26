// const express = require("express");
// const Product = require("../models/Product");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const upload = require("../middleware/upload");

// const router = express.Router();

// /* ADD PRODUCT */
// router.post("/", auth, admin, upload.single("image"), async (req, res) => {
//   try {
//     const product = await Product.create({
//       ...req.body,
//       image: `/uploads/${req.file.filename}`,
//     });
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* VIEW ALL PRODUCTS */
// router.get("/", auth, admin, async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   res.json(products);
// });

// /* UPDATE PRODUCT */
// router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
//   const data = req.body;
//   if (req.file) data.image = `/uploads/${req.file.filename}`;

//   const product = await Product.findByIdAndUpdate(req.params.id, data, {
//     new: true,
//   });
//   res.json(product);
// });

// /* DELETE PRODUCT */
// router.delete("/:id", auth, admin, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

// module.exports = router;



// new=======================================================

// const express = require("express");
// const Product = require("../models/Product");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// const router = express.Router();

// // GET ALL PRODUCTS (ADMIN)
// router.get("/products", auth, admin, async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // DELETE PRODUCT
// router.delete("/products/:id", auth, admin, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

// module.exports = router;

// end============================================================

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
