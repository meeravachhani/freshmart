
// import { useEffect, useState } from "react";
// import API from "../services/api";
// // import "./AdminDashboard.css";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     API.get("/admin/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => setStats(res.data))
//       .catch(() => alert("Unauthorized access"));
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/admin/login");
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* HEADER */}
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <button onClick={logout}>Logout</button>
//       </div>

//       {/* ADMIN INFO */}
//       <div className="admin-info">
//         Welcome,admin
//       </div>

//       {/* STATS CARDS */}
//       <div className="dashboard-cards">
//         <div className="card">
//           📦 Total Products <br />
//           <span>{stats.products || 0}</span>
//         </div>

//         <div className="card">
//           👥 Total Users <br />
//           <span>{stats.users || 0}</span>
//         </div>

//         <div className="card">
//           🛒 Total Orders <br />
//           <span>{stats.orders || 0}</span>
//         </div>

//         <div className="card">
//           💰 Revenue <br />
//           <span>₹{stats.revenue || 0}</span>
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
