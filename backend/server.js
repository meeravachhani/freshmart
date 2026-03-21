// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const userRoute=require("./routes/userRoute")
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/users",userRoute);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// app.use("/api/auth", require("./routes/authRoute"));
// // app.use("/auth", require("./routes/authRoute"));
// app.use("/api/products", require("./routes/productRoute"));
// app.use("/api/orders", require("./routes/orderRoute"));
// app.use("/uploads", express.static("uploads"));
// app.use("/api/admin", require("./routes/adminRoute"));
// app.use("/api/admin/products", require("./routes/adminProductRoute"));
// app.use("/api/admin/orders", require("./routes/adminOrderRoute"));
// app.use("/api/admin/users", require("./routes/adminUserRoute"));

// // app.use("/api/admin/dashboard", require("./routes/adminDashboardRoute"));

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 MIDDLEWARE FIRST
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// 🔥 ROUTES IN CORRECT ORDER (authRoute BEFORE userRoute)
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/admin/products", require("./routes/adminProductRoute"));
app.use("/api/admin/orders", require("./routes/adminOrderRoute"));
app.use("/api/admin/users", require("./routes/adminUserRoute"));

// 🔥 DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});