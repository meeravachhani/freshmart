import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
// import "./AdminRegister.css";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/admin/register", form);
      alert("Admin registered successfully ✅");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.message || "Admin registration failed ❌");
    }
  };

  return (
    <div className="admin-register-page login-bg">
      <div className="admin-register-card">
        <h2>Admin Register</h2>

        <form onSubmit={registerAdmin}>
          <label>Admin Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter admin name"
            required
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            required
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
          />

          <label>Admin Secret Key</label>
          <input
            type="password"
            name="secretKey"
            placeholder="Enter admin secret key"
            required
            onChange={handleChange}
          />

          <button className="admin-register-btn">
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}
