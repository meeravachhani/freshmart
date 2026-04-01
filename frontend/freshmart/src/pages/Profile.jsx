// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Profile() {
//   // 🔹 State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [edit, setEdit] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // 🔑 Token
//   const token = localStorage.getItem("token");

//   // ==============================
//   // 🔹 LOAD USER FROM MONGODB
//   // ==============================
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/users/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // 🔴 SET DATA FROM DB
//         setName(res.data.name);
//         setEmail(res.data.email);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   // ==============================
//   // 🔹 SAVE PROFILE TO MONGODB
//   // ==============================
//   const saveProfile = async () => {
//     try {
//       await API.put(
//         "/users/me",
//         { name, email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("✅ Profile updated successfully");
//       setEdit(false);

//       // 🔔 Update navbar name instantly
//       localStorage.setItem("userName", name);
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">

//           <div className="card shadow-sm border-0 rounded-4">
//             <div className="card-body p-4">

//               {/* HEADER */}
//               <div className="text-center mb-4">
//                 <div
//                   className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
//                   style={{ width: 80, height: 80, fontSize: 32 }}
//                 >
//                   {name.charAt(0).toUpperCase()}
//                 </div>
//                 <h4 className="fw-bold">{name}</h4>
//                 <p className="text-muted">{email}</p>
//               </div>

//               <hr />

//               {/* NAME */}
//               <div className="mb-3">
//                 <label className="fw-semibold">Name</label>
//                 <input
//                   className="form-control"
//                   value={name}
//                   disabled={!edit}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               {/* EMAIL */}
//               <div className="mb-3">
//                 <label className="fw-semibold">Email</label>
//                 <input
//                   className="form-control"
//                   value={email}
//                   disabled={!edit}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               {/* BUTTONS */}
//               {edit ? (
//                 <button className="btn btn-success w-100" onClick={saveProfile}>
//                   Save Profile
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-outline-success w-100"
//                   onClick={() => setEdit(true)}
//                 >
//                   Edit Profile
//                 </button>
//               )}
//  <button
//               className="btn btn-success w-100"
//               onClick={() => window.location.href = "/address"}
//             >
//               Manage Address
//             </button>
//             </div>
           
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  // 🔹 State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔑 Token
  const token = localStorage.getItem("token");

  // ==============================
  // 🔹 LOAD USER FROM MONGODB
  // ==============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 🔴 SET DATA FROM DB
        setName(res.data.name);
        setEmail(res.data.email);
        setMobile(res.data.mobile || "");
        setCity(res.data.city || "");
        
        // Format date to YYYY-MM-DD for the input type="date"
        if (res.data.dob) {
          setDob(new Date(res.data.dob).toISOString().split("T")[0]);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // ==============================
  // 🔹 SAVE PROFILE TO MONGODB
  // ==============================
  const saveProfile = async () => {
    try {
      await API.put(
        "/users/me",
        { name, email, mobile, city, dob }, // 🔥 Added new fields
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Profile updated successfully");
      setEdit(false);
      localStorage.setItem("userName", name);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              
              {/* HEADER */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: 80, height: 80, fontSize: 32 }}
                >
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
                <h4 className="fw-bold">{name}</h4>
                <p className="text-muted">{email}</p>
              </div>

              <hr />

              {/* NAME */}
              <div className="mb-3">
                <label className="fw-semibold">Name</label>
                <input
                  className="form-control"
                  value={name}
                  disabled={!edit}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="fw-semibold">Email</label>
                <input
                  className="form-control"
                  value={email}
                  disabled={!edit}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* MOBILE */}
              <div className="mb-3">
                <label className="fw-semibold">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  disabled={!edit}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  maxLength="10"
                />
              </div>

              {/* CITY */}
              <div className="mb-3">
                <label className="fw-semibold">City</label>
                <input
                  className="form-control"
                  value={city}
                  disabled={!edit}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* DOB */}
              <div className="mb-4">
                <label className="fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  disabled={!edit}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

        
               {edit ? (
                 <button className="btn btn-success w-100" onClick={saveProfile}>
                   Save Profile
                 </button>
               ) : (
                 <button
                   className="btn btn-outline-success w-100"
                   onClick={() => setEdit(true)}
                 >
                   Edit Profile
                 </button>
               )}
  <button
               className="btn btn-success w-100"
               onClick={() => window.location.href = "/address"}
             >
               Manage Address
             </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}