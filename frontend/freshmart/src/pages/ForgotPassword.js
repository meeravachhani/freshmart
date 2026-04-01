// import { useState } from "react";
// import API from "../services/api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleReset = async () => {
//     try {
//       await API.post("/auth/forgot-password", { email });
//       alert("Reset link sent to your email!");
//     } catch (err) {
//       alert("User not found");
//     }
//   };

//   return (
//     <div className="container vh-100 d-flex justify-content-center align-items-center">
//       <div className="card p-4">
//         <h3>Reset Password</h3>
//         <input 
//           type="email" 
//           className="form-control my-3" 
//           placeholder="Enter registered email" 
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleReset}>Send Reset Link</button>
//       </div>
//     </div>
//   );
// }