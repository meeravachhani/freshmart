import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";  // Ensure this file exists (e.g., axios setup)

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id); // 🔥 REQUIRED
      localStorage.setItem("userName",res.data.user.name);
      localStorage.setItem("userEmail",res.data.user.email);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("User not found, redirecting to register");
      navigate("/register");
    }
  };

  return (
    <div className="container login-bg d-flex justify-content-center align-items-center vh-100">
      
      <div className="login-card card p-4 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-success">Login to FreshMart</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-success btn-lg w-100 mb-3 login-btn"
              onClick={loginUser}
            >
              Login
            </button>
            {/* Test Button */}
            <button
              type="button"
              className="btn btn-outline-success btn-lg w-100"
              onClick={() => navigate("/register")}
            >
              Go to Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

