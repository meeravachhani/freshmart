
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);

//   // 🔹 Load wishlist (memoized)
//   const loadWishlist = useCallback(() => {
//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setItems(list);
//   }, [userId]);

//   useEffect(() => {
//     loadWishlist();
//     window.addEventListener("wishlistUpdated", loadWishlist);

//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlist);
//   }, [loadWishlist]); // ✅ FIXED

//   // 🛒 Add to cart
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existing = cart.find(
//       (item) => item._id === product._id
//     );

//     if (existing) {
//       existing.qty += 1;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//     alert("Product added to cart");
//   };

//   if (!items.length) {
//     return (
//       <h4 className="text-center mt-5">
//         ❤️ Your wishlist is empty
//       </h4>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h3 className="mb-4">My Wishlist</h3>

//       <div className="row">
//         {items.map((item) => (
//           <div className="col-md-3 mb-4" key={item._id}>
//             <div className="card shadow-sm h-100 border-0">
//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 className="card-img-top"
//                 alt={item.name}
//               />

//               <div className="card-body text-center">
//                 <h6 className="fw-semibold text-truncate">
//                   {item.name}
//                 </h6>

//                 <p className="text-success fw-bold">
//                   ₹{item.price}
//                 </p>

//                 <div className="d-flex justify-content-center gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-success"
//                     onClick={() =>
//                       navigate(`/product/${item._id}`)
//                     }
//                   >
//                     View
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-success"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);

//   // 🔹 Load wishlist
//   const loadWishlist = useCallback(() => {
//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setItems(list);
//   }, [userId]);

//   useEffect(() => {
//     loadWishlist();
//     window.addEventListener("wishlistUpdated", loadWishlist);

//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlist);
//   }, [loadWishlist]);

//   // ❌ Remove from wishlist
//   const removeFromWishlist = (productId) => {
//     let list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

//     list = list.filter((item) => item._id !== productId);

//     localStorage.setItem(
//       `wishlist_${userId}`,
//       JSON.stringify(list)
//     );

//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   // 🛒 Add to cart
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existing = cart.find(
//       (item) => item._id === product._id
//     );

//     if (existing) {
//       existing.qty += 1;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//     alert("Product added to cart");
//   };

//   // 🟢 Empty wishlist
//   if (!items.length) {
//     return (
//       <h4 className="text-center mt-5">
//         ❤️ Your wishlist is empty
//       </h4>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h3 className="mb-4">My Wishlist</h3>

//       <div className="row">
//         {items.map((item) => (
//           <div className="col-md-3 mb-4" key={item._id}>
//             <div className="card shadow-sm h-100 border-0 position-relative">

//               {/* ❌ Remove button (Meesho style) */}
//               <button
//                 className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
//                 onClick={() => removeFromWishlist(item._id)}
//               >
//                 ✕
//               </button>

//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 className="card-img-top"
//                 alt={item.name}
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   navigate(`/product/${item._id}`)
//                 }
//               />

//               <div className="card-body text-center">
//                 <h6 className="fw-semibold text-truncate">
//                   {item.name}
//                 </h6>

//                 <p className="text-success fw-bold">
//                   ₹{item.price}
//                 </p>

//                 <div className="d-flex justify-content-center gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-success"
//                     onClick={() =>
//                       navigate(`/product/${item._id}`)
//                     }
//                   >
//                     View
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-success"
//                     onClick={() => addToCart(item)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // 🔄 Load wishlist
  const loadWishlist = useCallback(() => {
    if (!userId) return;

    const list =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
    setItems(list);
  }, [userId]);

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", loadWishlist);
  }, [loadWishlist]);

  // ❌ Remove from wishlist
  const removeFromWishlist = (id) => {
    let list =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

    list = list.filter((item) => item._id !== id);

    localStorage.setItem(
      `wishlist_${userId}`,
      JSON.stringify(list)
    );

    setItems(list);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // 🛒 Add to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart");
  };

  // ❤️ Empty wishlist
  if (!items.length) {
    return (
      <h4 className="text-center mt-5">
        ❤️ Your wishlist is empty
      </h4>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4">My Wishlist</h3>

      <div className="row">
        {items.map((item) => (
          <div className="col-md-3 mb-4" key={item._id}>
            <div className="card shadow-sm h-100 border-0 position-relative">
              
              {/* ❤️ Remove Heart */}
              <span
                onClick={() => removeFromWishlist(item._id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                title="Remove from wishlist"
              >
                <FaHeart color="#e63946" />
              </span>

              <img
                src={`http://localhost:5000${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6 className="fw-semibold text-truncate">
                  {item.name}
                </h6>

                <p className="text-success fw-bold">
                  ₹{item.price}
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
