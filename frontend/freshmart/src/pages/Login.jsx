import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // 🔥 GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      if (!credentialResponse?.credential) {
        alert("Google token not received");
        setLoading(false); // ✅ FIX
        return;
      }

      const res = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      // ✅ Save user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);

      alert("✅ Google Login Successful");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(
        "Google Login Failed: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE ERROR
  const handleGoogleError = () => {
    alert("Google Sign-In was unsuccessful. Try again");
  };

  // 🔥 NORMAL LOGIN
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: email.trim(), // ✅ FIX
        password,
      });

      // ✅ Save user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);

      alert("✅ Login Successful");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(
        "Login failed: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-bg d-flex justify-content-center align-items-center vh-100">
      
      <div className="login-card card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">

          <h2 className="card-title text-center mb-4 text-success">
            Login to FreshMart
          </h2>

          {/* 🔥 GOOGLE LOGIN */}
          <div className="d-flex justify-content-center mb-3">
            {!loading && (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            )}
          </div>

          <div className="text-center mb-2 text-muted">OR</div>

          {/* 🔥 LOGIN FORM */}
          <form onSubmit={loginUser}>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🔹 REGISTER */}
          <button
            type="button"
            className="btn btn-outline-success btn-lg w-100"
            onClick={() => navigate("/register")}
          >
            Go To Register
          </button>

        </div>
      </div>
    </div>
  );
}