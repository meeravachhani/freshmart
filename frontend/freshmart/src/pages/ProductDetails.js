// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import API from "../services/api";

// // export default function ProductDetails() {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);

// //   const userId = localStorage.getItem("userId");

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       const res = await API.get(`/products/${id}`);
// //       setProduct(res.data);

// //       // 🔹 Save recently viewed
// //       if (userId) {
// //         let history =
// //           JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

// //         history = history.filter((p) => p._id !== res.data._id);
// //         history.unshift(res.data);
// //         history = history.slice(0, 8);

// //         localStorage.setItem(
// //           `recent_${userId}`,
// //           JSON.stringify(history)
// //         );
// //         window.dispatchEvent(new Event("recentUpdated"));     //  new adedd one line

// //       }
// //     };

// //     fetchProduct();
// //   }, [id, userId]);

// //   if (!product) return <p className="text-center mt-5">Loading...</p>;

// //   return (
// //     <div className="container my-5">
// //       <div className="row align-items-center">
// //         <div className="col-md-5">
// //           <img
// //             src={`http://localhost:5000${product.image}`}
// //             alt={product.name}
// //             className="img-fluid rounded shadow"
// //           />
// //         </div>

// //         <div className="col-md-7">
// //           <h2>{product.name}</h2>
// //           <h4 className="text-success">₹{product.price} / kg</h4>
// //           <p className="mt-3">{product.description}</p>

// //           {product.isOffer && (
// //             <span className="badge bg-danger">OFFER</span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }







// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// // import "./ProductDetails.css"; // 🔴 ADD THIS

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await API.get(`/products/${id}`);
//       setProduct(res.data);

//       // 🔹 Save recently viewed
//       if (userId) {
//         let history =
//           JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

//         history = history.filter((p) => p._id !== res.data._id);
//         history.unshift(res.data);
//         history = history.slice(0, 8);

//         localStorage.setItem(
//           `recent_${userId}`,
//           JSON.stringify(history)
//         );

//         window.dispatchEvent(new Event("recentUpdated"));
//       }
//     };

//     fetchProduct();
//   }, [id, userId]);

//   if (!product)
//     return <p className="text-center mt-5">Loading...</p>;

// // 🛒 Add to cart (UNCHANGED)
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((i) => i._id === product._id);

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
//     alert("Product added to cart");
//   };


  
//   return (
//     <div className="container my-5">
//       <div className="row g-4 align-items-center product-details-card">

//         {/* 🖼 IMAGE */}
//         <div className="col-md-5 text-center">
//           <div className="product-image-box">
//             <img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.name}
//               className="img-fluid"
//             />
//             {product.isOffer && (
//               <span className="offer-badge-details">OFFER</span>
//             )}
//           </div>
//         </div>

//         {/* 📄 DETAILS */}
//         <div className="col-md-7">
//           <h2 className="product-title">{product.name}</h2>

//           <h4 className="product-price">
//             ₹{product.price} <span>/ kg</span>
//           </h4>

//           <p className="product-description">
//             {product.description}
//           </p>

//           <div className="d-flex gap-3 mt-4">
//           <button
//               className="add-btn"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
            
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const userId = localStorage.getItem("userId"); // ✅ user based

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      // ✅ SAVE RECENTLY VIEWED (CORRECT PLACE)
      if (userId) {
        let history =
          JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

        // remove duplicate
        history = history.filter(
          (item) => item._id !== res.data._id
        );

        // add latest on top
        history.unshift(res.data);

        // keep only last 8
        history = history.slice(0, 8);

        localStorage.setItem(
          `recent_${userId}`,
          JSON.stringify(history)
        );

        // 🔴 NOTIFY HOME PAGE
        window.dispatchEvent(new Event("recentUpdated"));
      }
    };

    fetchProduct();
  }, [id, userId]);

  if (!product)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <h4 className="text-success">₹{product.price} / kg</h4>
          <p className="mt-3">{product.description}</p>

          {product.isOffer && (
            <span className="badge bg-danger">OFFER</span>
          )}
        </div>
      </div>
    </div>
  );
}
