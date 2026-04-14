import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "", // Required for admin verification
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

    // 🔑 Secret Key check
    if (!form.secretKey) {
      alert("Admin Secret Key is required");
      return false;
    }

    return true;
  };

  // ===============================
  // 🔹 REGISTER ADMIN
  // ===============================
  const registerAdmin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validate()) return;

    try {
      await API.post("/auth/admin/register", form);
      alert("Admin registered successfully ✅");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.message || "Admin registration failed ❌");
    }
  };

  return (
    <div className="container login-bg d-flex justify-content-center align-items-center py-5">
      <div className="admin-register-card card p-5 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fw-bold">
            Admin Registration
          </h2>
          <p className="text-center text-muted mb-4">
            Enter your details to access the admin dashboard
          </p>

          <form onSubmit={registerAdmin}>
            {/* FULL NAME */}
            <div className="mb-3">
              <label className="form-label fw-bold">Admin Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter admin name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* MOBILE */}
            <div className="mb-3">
              <label className="form-label fw-bold">Mobile Number</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="10 digit mobile number"
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
            <div className="mb-3">
              <label className="form-label fw-bold">City</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            {/* DOB */}
            <div className="mb-3">
              <label className="form-label fw-bold">Birth Date</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Create password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* SECRET KEY */}
            <div className="mb-4">
              <label className="form-label fw-bold text-danger">Admin Secret Key</label>
              <input
                type="password"
                className="form-control form-control-lg border-danger"
                placeholder="Enter system secret key"
                value={form.secretKey}
                onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
                required
              />
            </div>

            {/* BUTTONS */}
           <button className="admin-register-btn">
             Register Admin
           </button>

           
          </form>
        </div>
      </div>
    </div>
  );
}