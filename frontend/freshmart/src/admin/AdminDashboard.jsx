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