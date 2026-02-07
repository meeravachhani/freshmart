// import { useEffect, useState } from "react";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId");
//   const [wishlist, setWishlist] = useState([]);

//   // 🔹 Load wishlist for logged-in user
//   useEffect(() => {
//     if (!userId) return;

//     const data = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setWishlist(data);
//   }, [userId]);

//   // ❌ Remove item
//   const removeItem = (id) => {
//     const updated = wishlist.filter(item => item._id !== id);
//     setWishlist(updated);

//     localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updated));
//     window.dispatchEvent(new Event("wishlistUpdated")); // 🔔 notify navbar
//   };

//   if (!userId) {
//     return (
//       <div className="container my-5 text-center">
//         <h4>Please login to view your wishlist ❤️</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">My Wishlist</h2>

//       {wishlist.length === 0 && <p className="text-center">No wishlist items</p>}

//       <div className="row g-4">
//         {wishlist.map(item => (
//           <div key={item._id} className="col-md-3">
//             <div className="card h-100 text-center shadow-sm">
//               <img src={`http://localhost:5000${item.image}`} alt={item.name} className="card-img-top p-3" style={{ height: "150px", objectFit: "contain" }} />
//               <div className="card-body">
//                 <h6>{item.name}</h6>
//                 <p className="fw-bold text-success">₹{item.price}</p>
//               </div>
//               <div className="card-footer bg-white border-0">
//                 <button className="btn btn-outline-danger w-100" onClick={() => removeItem(item._id)}>Remove</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId"); // get current user if needed
//   const [wishlist, setWishlist] = useState([]);

//   // 🔹 Load wishlist on component mount
//   useEffect(() => {
//     // If you are using global "wishlist" from your Products.js
//     const data = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(data);

//     // If you want per-user, use:
//     // const data = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//   }, [userId]);

//   // ❌ Remove item from wishlist
//   const removeItem = (id) => {
//     const updated = wishlist.filter(item => item._id !== id);
//     setWishlist(updated);

//     // Save back to localStorage
//     localStorage.setItem("wishlist", JSON.stringify(updated));
//     // If using per-user:
//     // localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updated));
//   };

//   // 🚫 Show message if no wishlist items
//   if (wishlist.length === 0) {
//     return (
//       <div className="container my-5 text-center">
//         <h4>No items in your wishlist ❤️</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">My Wishlist</h2>

//       <div className="row g-4">
//         {wishlist.map(item => (
//           <div key={item._id} className="col-md-3">
//             <div className="card h-100 text-center shadow-sm">
//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 alt={item.name}
//                 className="card-img-top p-3"
//                 style={{ height: "150px", objectFit: "contain" }}
//               />

//               <div className="card-body">
//                 <h6>{item.name}</h6>
//                 <p className="fw-bold text-success">₹{item.price}</p>
//               </div>

//               <div className="card-footer bg-white border-0">
//                 <button
//                   className="btn btn-outline-danger w-100"
//                   onClick={() => removeItem(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








import { useEffect, useState } from "react";

export default function Wishlist() {
  const userId = localStorage.getItem("userId"); // ✅ current user
  const [wishlist, setWishlist] = useState([]);

  // 🔹 Load wishlist on mount
  useEffect(() => {
    if (!userId) return;
    const data = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
    setWishlist(data);
  }, [userId]);

  // ❌ Remove item
  const removeItem = (id) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);

    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updated));

    // 🔔 Update navbar wishlist count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // 🚫 If no items
  if (!userId) {
    return (
      <div className="container my-5 text-center">
        <h4>Please login to view your wishlist ❤️</h4>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>No items in your wishlist ❤️</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Wishlist</h2>

      <div className="row g-4">
        {wishlist.map(item => (
          <div key={item._id} className="col-md-3">
            <div className="card h-100 text-center shadow-sm">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="card-img-top p-3"
                style={{ height: "150px", objectFit: "contain" }}
              />

              <div className="card-body">
                <h6>{item.name}</h6>
                <p className="fw-bold text-success">₹{item.price}</p>
              </div>

              <div className="card-footer bg-white border-0">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
