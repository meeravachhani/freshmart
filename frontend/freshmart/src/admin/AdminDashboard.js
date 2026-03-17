
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     products: 0,
//     users: 0,
//     orders: 0,
//     revenue: 0,
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

//   // const logout = () => {
//   //   localStorage.clear();
//   //   navigate("/admin/login");
//   // };

//   return (
//     <div className="admin-dashboard">
//       {/* HEADER */}
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         {/* <button onClick={logout}>Logout</button> */}
//       </div>

//       {/* ADMIN INFO */}
//       <div className="admin-info">
//         Welcome, <strong>{stats.adminName || "Admin"}</strong> 👋
//       </div>

//       {/* STATS */}
//       <div className="dashboard-cards">
//         <div className="card">
//           📦 Total Products <br />
//           <span>{stats.products}</span>
//         </div>

//         <div className="card">
//           👥 Total Users <br />
//           <span>{stats.users}</span>
//         </div>

//         <div className="card">
//           🛒 Total Orders <br />
//           <span>{stats.orders}</span>
//         </div>

//         <div className="card">
//           💰 Revenue <br />
//           <span>₹{stats.revenue}</span>
//         </div>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="quick-actions">
//         <button onClick={() => navigate("/admin/products")}>
//           Manage Products
//         </button>
//         <button onClick={() => navigate("/admin/orders")}>
//           View Orders
//         </button>
//         <button onClick={() => navigate("/admin/users")}>
//           Manage Users
//         </button>
//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import "./AdminDashboard.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     products: 0,
//     users: 0,
//     orders: 0,
//     revenue: 0,
//     monthlySales: [],
//     adminName: "",
//   });

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

//   /* GRAPH DATA */

//   const chartData = {
//     labels: [
//       "Jan","Feb","Mar","Apr","May","Jun",
//       "Jul","Aug","Sep","Oct","Nov","Dec"
//     ],
//     datasets: [
//       {
//         label: "Monthly Revenue",
//         data: stats.monthlySales || [],
//         backgroundColor: "#4f46e5",
//       },
//     ],
//   };

//   return (
//     <div className="admin-layout">

//       {/* SIDEBAR */}

//       <div className="sidebar">
//         <h3>FreshMart Admin</h3>

//         <ul>
//           <li onClick={() => navigate("/admin/dashboard")}>
//             Dashboard
//           </li>

//           <li onClick={() => navigate("/admin/products")}>
//             Products
//           </li>

//           <li onClick={() => navigate("/admin/orders")}>
//             Orders
//           </li>

//           <li onClick={() => navigate("/admin/users")}>
//             Users
//           </li>
//         </ul>
//       </div>

//       {/* MAIN AREA */}

//       <div className="main-content">

//         <div className="topbar">
//           Welcome, <strong>{stats.adminName || "Admin"}</strong>
//         </div>

//         {/* STATS */}

//         <div className="stats-grid">

//           <div className="stat-box">
//             <h4>Products</h4>
//             <p>{stats.products}</p>
//           </div>

//           <div className="stat-box">
//             <h4>Users</h4>
//             <p>{stats.users}</p>
//           </div>

//           <div className="stat-box">
//             <h4>Orders</h4>
//             <p>{stats.orders}</p>
//           </div>

//           <div className="stat-box">
//             <h4>Revenue</h4>
//             <p>₹{stats.revenue}</p>
//           </div>

//         </div>

//         {/* GRAPH */}

//         <div className="chart-card">
//           <h3>Monthly Revenue</h3>
//           <Bar data={chartData} />
//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
    monthlySales: [],
    adminName: "",
  });

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

  const chartData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: stats.monthlySales?.length ? stats.monthlySales : Array(12).fill(0),
        backgroundColor: "#27ae60",
      },
    ],
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <div className="sidebar">
        <h3>FreshMart Admin</h3>

        <ul>
          <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/admin/products")}>Products</li>
          <li onClick={() => navigate("/admin/orders")}>Orders</li>
          <li onClick={() => navigate("/admin/users")}>Users</li>
        </ul>
      </div>

      {/* MAIN */}

      <div className="main-content">

        <div className="topbar">
          Welcome, <strong>{stats.adminName || "Admin"}</strong>
        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-box">
            <h4>Total Products</h4>
            <p>{stats.products}</p>
          </div>

          <div className="stat-box">
            <h4>Total Users</h4>
            <p>{stats.users}</p>
          </div>

          <div className="stat-box">
            <h4>Total Orders</h4>
            <p>{stats.orders}</p>
          </div>

          <div className="stat-box">
            <h4>Total Revenue</h4>
            <p>₹{stats.revenue}</p>
          </div>

        </div>

        {/* GRAPH */}

        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <Bar data={chartData} height={120}/>
        </div>

      </div>

    </div>
  );
}