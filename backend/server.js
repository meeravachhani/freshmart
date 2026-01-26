const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/admin/products", require("./routes/adminProductRoute"));
app.use("/api/admin/orders", require("./routes/adminOrderRoute"));
app.use("/api/admin/users", require("./routes/adminUserRoute"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
