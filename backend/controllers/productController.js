// const Product = require("../models/Product");

// // 👉 ADD PRODUCT
// exports.createProduct = async (req, res) => {
//   try {
//     const product = await Product.create({
//       ...req.body,
//       image: req.file.filename, // ✅ FIX
//     });

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // 👉 GET ALL PRODUCTS
// exports.getProducts = (req, res) => {
//   Product.find()
//     .then((products) => {
//       res.json(products);
//     })
//     .catch(() => {
//       res.status(500).json({ message: "Server error" });
//     });
// };

// // 👉 GET PRODUCT BY ID
// exports.getProductById = (req, res) => {
//   Product.findById(req.params.id)
//     .then((product) => {
//       if (!product)
//         return res.status(404).json({ message: "Product not found" });

//       res.json(product);
//     })
//     .catch(() => {
//       res.status(400).json({ message: "Invalid product ID" });
//     });
// };

// // 👉 UPDATE PRODUCT
// exports.updateProduct = (req, res) => {
//   Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   })
//     .then((product) => {
//       if (!product)
//         return res.status(404).json({ message: "Product not found" });

//       res.json(product);
//     })
//     .catch((error) => {
//       res.status(400).json({ message: error.message });
//     });
// };

// // 👉 DELETE PRODUCT
// exports.deleteProduct = (req, res) => {
//   Product.findByIdAndDelete(req.params.id)
//     .then((product) => {
//       if (!product)
//         return res.status(404).json({ message: "Product not found" });

//       res.json({ message: "Product deleted successfully" });
//     })
//     .catch(() => {
//       res.status(400).json({ message: "Invalid product ID" });
//     });
// };


const Product = require("../models/Product");


// 👉 ADD PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      image: req.file ? req.file.path : "", // 🔁 CHANGED (safe check)
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// 👉 GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// 👉 GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};


// 👉 UPDATE PRODUCT (🔥 MOST IMPORTANT FIX)
exports.updateProduct = async (req, res) => {
  try {
    const discount =
      req.body.discountPercent !== undefined &&
      req.body.discountPercent !== "" &&
      !isNaN(req.body.discountPercent)
        ? Number(req.body.discountPercent)
        : null;

    const updatedData = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      quantity: Number(req.body.quantity),
      unit: req.body.unit,
      description: req.body.description,
      isOffer: req.body.isOffer === "true",
      offerTag: req.body.offerTag || "",
      discountPercent: discount,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("UPDATE ERROR 👉", error.message);
    res.status(400).json({ message: error.message });
  }
};


// 👉 DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
