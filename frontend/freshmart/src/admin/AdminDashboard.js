
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
    adminName: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    API.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setStats(res.data))
      .catch(() => {
        alert("Unauthorized access");
        navigate("/admin/login");
      });
  }, [navigate]);

  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/admin/login");
  // };

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        {/* <button onClick={logout}>Logout</button> */}
      </div>

      {/* ADMIN INFO */}
      <div className="admin-info">
        Welcome, <strong>{stats.adminName || "Admin"}</strong> 👋
      </div>

      {/* STATS */}
      <div className="dashboard-cards">
        <div className="card">
          📦 Total Products <br />
          <span>{stats.products}</span>
        </div>

        <div className="card">
          👥 Total Users <br />
          <span>{stats.users}</span>
        </div>

        <div className="card">
          🛒 Total Orders <br />
          <span>{stats.orders}</span>
        </div>

        <div className="card">
          💰 Revenue <br />
          <span>₹{stats.revenue}</span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button onClick={() => navigate("/admin/products")}>
          Manage Products
        </button>
        <button onClick={() => navigate("/admin/orders")}>
          View Orders
        </button>
        <button onClick={() => navigate("/admin/users")}>
          Manage Users
        </button>
      </div>
    </div>
  );
}



// const express = require("express");
// const router = express.Router();

// const User = require("../models/User");
// const Order = require("../models/Order");
// const Product = require("../models/Product");

// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");

// router.get("/", auth, admin, async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalOrders = await Order.countDocuments();
//     const totalProducts = await Product.countDocuments();

//     // 💰 Total Revenue
//     const revenueData = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     const totalRevenue =
//       revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

//     // 📊 Monthly Sales
//     const monthlySales = await Order.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           total: { $sum: "$totalAmount" }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     res.json({
//       products: totalProducts,
//       users: totalUsers,
//       orders: totalOrders,
//       revenue: totalRevenue,
//       monthlySales,
//       adminName: req.user.name
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Dashboard error" });
//   }
// });

// module.exports = router;


// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     products: 0,
//     users: 0,
//     orders: 0,
//     revenue: 0,
//     monthlySales: [],
//     adminName: ""
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }

//     API.get("/admin/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => setStats(res.data))
//       .catch(() => {
//         alert("Unauthorized access");
//         navigate("/admin/login");
//       });

//   }, [navigate]);

//   // 📊 Chart Data
//  const chartData = {
//   labels: (stats.monthlySales || []).map(
//     (m) => `Month ${m._id}`
//   ),
//   datasets: [
//     {
//       label: "Monthly Revenue",
//       data: (stats.monthlySales || []).map(
//         (m) => m.total
//       ),
//       backgroundColor: "#198754"
//     }
//   ]
// };

//   return (
//     <div className="admin-dashboard p-4">

//       {/* HEADER */}
//       <div className="dashboard-header d-flex justify-content-between align-items-center">
//         <h2>📊 Admin Dashboard</h2>
//       </div>

//       {/* ADMIN INFO */}
//       <div className="admin-info mt-2">
//         Welcome, <strong>{stats.adminName || "Admin"}</strong> 👋
//       </div>

//       {/* STATS CARDS */}
//       <div className="row mt-4">

//         <div className="col-md-3">
//           <div className="card shadow p-3 text-center">
//             <h6>📦 Total Products</h6>
//             <h3>{stats.products}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow p-3 text-center">
//             <h6>👥 Total Users</h6>
//             <h3>{stats.users}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow p-3 text-center">
//             <h6>🛒 Total Orders</h6>
//             <h3>{stats.orders}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow p-3 text-center">
//             <h6>💰 Total Revenue</h6>
//             <h3>₹{stats.revenue}</h3>
//           </div>
//         </div>

//       </div>

//       {/* MONTHLY GRAPH */}
//       <div className="card mt-5 p-4 shadow">
//         <h5>📈 Monthly Revenue</h5>

//         {/* {stats.monthlySales.length > 0 ? ( */}
//         {stats.monthlySales && stats.monthlySales.length > 0 ? (
//           <Bar data={chartData} />
//         ) : (
//           <p className="text-muted">
//             No sales data available
//           </p>
//         )}
//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="mt-4 d-flex gap-3 flex-wrap">
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/admin/products")}
//         >
//           Manage Products
//         </button>

//         <button
//           className="btn btn-warning"
//           onClick={() => navigate("/admin/orders")}
//         >
//           View Orders
//         </button>

//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/admin/users")}
//         >
//           Manage Users
//         </button>
//       </div>

//     </div>
//   );
// }