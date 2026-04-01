// import { useState, useEffect } from "react";
// // import "./Address.css";

// export default function Address() {
//   const userId = localStorage.getItem("userId");

//   const [addresses, setAddresses] = useState([]);
//   const [form, setForm] = useState({
//     fullAddress: "",
//     city: "",
//     pincode: "",
//   });

//   const [editIndex, setEditIndex] = useState(null);

//   // 🔹 LOAD ADDRESSES
//   useEffect(() => {
//     const saved =
//       JSON.parse(localStorage.getItem(`address_${userId}`)) || [];
//     setAddresses(saved);
//   }, [userId]);

//   // 🔹 SAVE TO LOCALSTORAGE
//   const saveToStorage = (data) => {
//     localStorage.setItem(
//       `address_${userId}`,
//       JSON.stringify(data)
//     );
//   };

//   // 🔹 ADD / UPDATE ADDRESS
//   const submitAddress = () => {
//     if (!form.fullAddress || !form.city || !form.pincode) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (form.pincode.length !== 6) {
//       alert("Pincode must be 6 digits");
//       return;
//     }

//     let updated;

//     if (editIndex !== null) {
//       // ✅ UPDATE
//       updated = addresses.map((a, i) =>
//         i === editIndex ? form : a
//       );
//     } else {
//       // ✅ ADD
//       updated = [...addresses, form];
//     }

//     setAddresses(updated);
//     saveToStorage(updated);

//     setForm({ fullAddress: "", city: "", pincode: "" });
//     setEditIndex(null);
//   };

//   // 🔹 EDIT ADDRESS
//   const editAddress = (addr, index) => {
//     setForm(addr);
//     setEditIndex(index);
//   };

//   // 🔹 DELETE ADDRESS
//   const deleteAddress = (index) => {
//     if (!window.confirm("Delete this address?")) return;

//     const updated = addresses.filter((_, i) => i !== index);
//     setAddresses(updated);
//     saveToStorage(updated);
//   };

//   return (
//     <div className="address-wrapper">
//       <div className="address-card">

//         <h3 className="text-center fw-bold mb-4">
//           📍 Manage Address
//         </h3>

//         {/* FORM */}
//         <div className="card p-3 shadow-sm mb-4">
//           <label className="fw-semibold">Full Address</label>
//           <textarea
//             className="form-control mb-3"
//             rows="3"
//             placeholder="House no, Area, Street, Landmark"
//             value={form.fullAddress}
//             onChange={(e) =>
//               setForm({ ...form, fullAddress: e.target.value })
//             }
//           />

//           <label className="fw-semibold">City</label>
//           <input
//             className="form-control mb-3"
//             value={form.city}
//             onChange={(e) =>
//               setForm({ ...form, city: e.target.value })
//             }
//           />

//           <label className="fw-semibold">Pincode</label>
//           <input
//             className="form-control mb-3"
//             maxLength="6"
//             value={form.pincode}
//             onChange={(e) => {
//               const val = e.target.value.replace(/\D/g, "");
//               setForm({ ...form, pincode: val });
//             }}
//           />

//           <button
//             className="btn btn-success w-100"
//             onClick={submitAddress}
//           >
//             {editIndex !== null ? "Update Address" : "Add Address"}
//           </button>

//           {editIndex !== null && (
//             <button
//               className="btn btn-outline-secondary w-100 mt-2"
//               onClick={() => {
//                 setForm({ fullAddress: "", city: "", pincode: "" });
//                 setEditIndex(null);
//               }}
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>

//         {/* SAVED ADDRESSES */}
//         <h5 className="fw-bold mb-2">Saved Addresses</h5>

//         {addresses.length === 0 && (
//           <p className="text-muted">No address added yet</p>
//         )}

//         {addresses.map((a, i) => (
//           <div key={i} className="saved-address">
//             <p className="mb-1 fw-semibold">
//               {a.fullAddress}
//             </p>
//             <small>
//               {a.city} - {a.pincode}
//             </small>

//             <div className="mt-2 d-flex gap-2">
//               <button
//                 className="btn btn-sm btn-outline-success"
//                 onClick={() => editAddress(a, i)}
//               >
//                 Edit
//               </button>

//               <button
//                 className="btn btn-sm btn-outline-danger"
//                 onClick={() => deleteAddress(i)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
// import "./Address.css";

export default function Address() {
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullAddress: "",
    city: "",
    pincode: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // 🔹 LOAD ADDRESSES
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`address_${userId}`)) || [];
    setAddresses(saved);
  }, [userId]);

  // 🔹 SAVE TO LOCALSTORAGE
  const saveToStorage = (data) => {
    localStorage.setItem(
      `address_${userId}`,
      JSON.stringify(data)
    );
  };

  // 🔹 ADD / UPDATE ADDRESS
  const submitAddress = () => {
    if (!form.fullAddress || !form.city || !form.pincode) {
      alert("Please fill all fields");
      return;
    }

    if (form.pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    let updated;

    if (editIndex !== null) {
      // ✅ UPDATE
      updated = addresses.map((a, i) =>
        i === editIndex ? form : a
      );
    } else {
      // ✅ ADD
      updated = [...addresses, form];
    }

    setAddresses(updated);
    saveToStorage(updated);

    setForm({ fullAddress: "", city: "", pincode: "" });
    setEditIndex(null);
  };

  // 🔹 EDIT ADDRESS
  const editAddress = (addr, index) => {
    setForm(addr);
    setEditIndex(index);
  };

  // 🔹 DELETE ADDRESS
  const deleteAddress = (index) => {
    if (!window.confirm("Delete this address?")) return;

    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    saveToStorage(updated);
  };

  return (
    <div className="address-wrapper">
      <div className="address-card">

        <h3 className="text-center fw-bold mb-4">
          📍 Manage Address
        </h3>

        {/* FORM */}
        <div className="card p-3 shadow-sm mb-4">
          <label className="fw-semibold">Full Address</label>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="House no, Area, Street, Landmark"
            value={form.fullAddress}
            onChange={(e) =>
              setForm({ ...form, fullAddress: e.target.value })
            }
          />

          <label className="fw-semibold">City</label>
          <input
            className="form-control mb-3"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <label className="fw-semibold">Pincode</label>
          <input
            className="form-control mb-3"
            maxLength="6"
            value={form.pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setForm({ ...form, pincode: val });
            }}
          />

          <button
            className="btn btn-success w-100"
            onClick={submitAddress}
          >
            {editIndex !== null ? "Update Address" : "Add Address"}
          </button>

          {editIndex !== null && (
            <button
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => {
                setForm({ fullAddress: "", city: "", pincode: "" });
                setEditIndex(null);
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* SAVED ADDRESSES */}
        <h5 className="fw-bold mb-2">Saved Addresses</h5>

        {addresses.length === 0 && (
          <p className="text-muted">No address added yet</p>
        )}

        {addresses.map((a, i) => (
          <div key={i} className="saved-address">
            <p className="mb-1 fw-semibold">
              {a.fullAddress}
            </p>
            <small>
              {a.city} - {a.pincode}
            </small>

            <div className="mt-2 d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => editAddress(a, i)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteAddress(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}