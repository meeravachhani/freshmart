// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";

// // export default function Register() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const navigate = useNavigate();

// //   const registerUser = async () => {
// //     try {
// //       await API.post("/auth/register", form);
// //       alert("Registered successfully. Please login.");
// //       navigate("/login"); // 👈 BACK TO LOGIN
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Registration failed");
// //     }
// //   };

// //   return (
// //     <div className="form">
// //       <h2>Register</h2>

// //       <input
// //         placeholder="Name"
// //         onChange={(e) => setForm({ ...form, name: e.target.value })}
// //       />
// //       <input
// //         placeholder="Email"
// //         onChange={(e) => setForm({ ...form, email: e.target.value })}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         onChange={(e) => setForm({ ...form, password: e.target.value })}
// //       />

// //       <button onClick={registerUser}>Register</button>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const registerUser = async () => {
//     try {
//       await API.post("/auth/register", form);
//       alert("Registered successfully. Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="form">
//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Email"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={registerUser}>Register</button>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";  // Ensure this exists

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="register-card-unique card p-5 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-success fw-bold">Join FreshMart</h2>
          <p className="text-center text-muted mb-4">Create your account and start shopping fresh!</p>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-bold text-success">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg input-3d"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold text-success">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg input-3d"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold text-success">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg input-3d"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
           
            <button
              type="button"
              className="btn btn-primary btn-lg w-100 mb-3 register-btn-unique pulse-btn"
              onClick={registerUser}
            >
              Register Now
            </button>
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