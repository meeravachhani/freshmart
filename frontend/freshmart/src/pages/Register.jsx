import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    mobile: "",
    dob: "",
  });

  const navigate = useNavigate();

  // ===============================
  // ✅ VALIDATION FUNCTION
  // ===============================
  const validate = () => {
    // 📱 Mobile: 10 digits only
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(form.mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return false;
    }

    // 🎂 DOB check
    if (!form.dob) {
      alert("Please select your birth date");
      return false;
    }

    // 🔒 Password min length
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // ===============================
  // 🔹 REGISTER USER
  // ===============================
  const registerUser = async () => {
    if (!validate()) return;

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container login-bg d-flex justify-content-center align-items-center">
      <div className="register-card-unique card p-5 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-success fw-bold">
            Join FreshMart
          </h2>
          <p className="text-center text-muted mb-4">
            Create your account and start shopping fresh!
          </p>

          <form>
            {/* NAME */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success">
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg input-3d w-100"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg input-3d w-100"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            {/* MOBILE */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control form-control-lg input-3d w-100"
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value.replace(/\D/g, ""), // only numbers
                  })
                }
                required
              />
            </div>

            {/* CITY */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success w-100">
                City
              </label>
              <input
                type="text"
                className="form-control form-control-lg input-3d w-100"
                placeholder="Enter your city"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                required
              />
            </div>

            {/* DOB */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success">
                Birth Date
              </label>
              <input
                type="date"
                className="form-control form-control-lg input-3d w-100"
                value={form.dob}
                onChange={(e) =>
                  setForm({ ...form, dob: e.target.value })
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4 w-100">
              <label className="form-label fw-bold text-success">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg input-3d w-100"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            {/* REGISTER */}
            <button
              type="button"
              className="btn btn-primary btn-lg w-100 mb-3 register-btn-unique pulse-btn"
              onClick={registerUser}
            >
              Register Now
            </button>

            {/* LOGIN */}
            <button
              type="button"
              className="btn btn-outline-success btn-lg w-100"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}