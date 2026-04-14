const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

/* ⭐ RATE PRODUCT */

router.post("/:id/rate", auth, async (req, res) => {

    try {

        const { rating } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        /* check existing rating */

        const existing = product.ratings.find(
            r => r.userId.toString() === userId
        );

        if (existing) {

            existing.value = rating;

        } else {

            product.ratings.push({
                userId,
                value: rating
            });

        }

        /* calculate average rating */

        const total = product.ratings.reduce(
            (sum, r) => sum + r.value,
            0
        );

        product.averageRating = Number(
            (total / product.ratings.length).toFixed(1)
        );

        await product.save();

        res.json(product);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: "Rating failed" });

    }

});


/* CRUD CONTROLLERS */

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;