const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const productRoutes = require("./routes/productRoute");

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
const path = require("path");

app.use("/uploads", express.static("uploads"));

const orderRoutes = require("./routes/orderRoute");
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("FreshMart API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
