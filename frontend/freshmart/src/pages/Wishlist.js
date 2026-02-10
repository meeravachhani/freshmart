// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId");
//   const [items, setItems] = useState([]);

//   const loadWishlist = () => {
//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setItems(list);
//   };

//   useEffect(() => {
//     loadWishlist();
//     window.addEventListener("wishlistUpdated", loadWishlist);

//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlist);
//   }, []);

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
//             <div className="card shadow-sm h-100">
//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 className="card-img-top"
//                 alt={item.name}
//               />

//               <div className="card-body text-center">
//                 <h6>{item.name}</h6>
//                 <p className="text-success">₹{item.price}</p>

//                 <Link
//                   to={`/product/${item._id}`}
//                   className="btn btn-sm btn-outline-success"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Wishlist() {
//   const userId = localStorage.getItem("userId");
//   const [items, setItems] = useState([]);

//   // 🔹 Load wishlist from localStorage
//   const loadWishlist = () => {
//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setItems(list);
//   };

//   useEffect(() => {
//     loadWishlist();

//     // listen for wishlist updates
//     window.addEventListener("wishlistUpdated", loadWishlist);

//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlist);
//   }, []);

//   // =====================================================
//   // 🛒 ADD TO CART FROM WISHLIST
//   // =====================================================
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

//     // notify navbar/cart badge
//     window.dispatchEvent(new Event("cartUpdated"));

//     // ✅ message
//     alert("Product added to cart");
//   };

//   // =====================================================
//   // EMPTY WISHLIST
//   // =====================================================
//   if (!items.length) {
//     return (
//       <h4 className="text-center mt-5">
//         ❤️ Your wishlist is empty
//       </h4>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================
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
//                 style={{ cursor: "pointer" }}
//               />

//               <div className="card-body text-center">
//                 <h6 className="fw-semibold text-truncate">
//                   {item.name}
//                 </h6>

//                 <p className="text-success fw-bold mb-2">
//                   ₹{item.price}
//                 </p>

//                 <div className="d-flex justify-content-center gap-2">
//                   <Link
//                     to={`/product/${item._id}`}
//                     className="btn btn-sm btn-outline-success"
//                   >
//                     View
//                   </Link>

//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => addToCart(item)}
//                   >
//                     🛒 Add To Cart
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

export default function Wishlist() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // 🔹 Load wishlist (memoized)
  const loadWishlist = useCallback(() => {
    const list =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
    setItems(list);
  }, [userId]);

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", loadWishlist);
  }, [loadWishlist]); // ✅ FIXED

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
            <div className="card shadow-sm h-100 border-0">
              <img
                src={`http://localhost:5000${item.image}`}
                className="card-img-top"
                alt={item.name}
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
