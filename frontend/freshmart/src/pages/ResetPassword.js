import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams(); // Gets the token from the URL
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      alert("Token expired or invalid.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">New Password</h3>
        <form onSubmit={handleReset}>
          <input 
            type="password" 
            className="form-control mb-3" 
            placeholder="Enter new password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="btn btn-primary w-100">Update Password</button>
        </form>
      </div>
    </div>
  );
}