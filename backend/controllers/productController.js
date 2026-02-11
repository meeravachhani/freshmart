const Product = require("../models/Product");

// 👉 ADD PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      image: req.file.filename, // ✅ FIX
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 👉 GET ALL PRODUCTS
exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch(() => {
      res.status(500).json({ message: "Server error" });
    });
};

// 👉 GET PRODUCT BY ID
exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    })
    .catch(() => {
      res.status(400).json({ message: "Invalid product ID" });
    });
};

// 👉 UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

// 👉 DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product deleted successfully" });
    })
    .catch(() => {
      res.status(400).json({ message: "Invalid product ID" });
    });
};
