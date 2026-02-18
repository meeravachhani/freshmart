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




// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   const userId = localStorage.getItem("userId"); // ✅ user based

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await API.get(`/products/${id}`);
//       setProduct(res.data);

//       // ✅ SAVE RECENTLY VIEWED (CORRECT PLACE)
//       if (userId) {
//         let history =
//           JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

//         // remove duplicate
//         history = history.filter(
//           (item) => item._id !== res.data._id
//         );

//         // add latest on top
//         history.unshift(res.data);

//         // keep only last 8
//         history = history.slice(0, 8);

//         localStorage.setItem(
//           `recent_${userId}`,
//           JSON.stringify(history)
//         );

//         // 🔴 NOTIFY HOME PAGE
//         window.dispatchEvent(new Event("recentUpdated"));
//       }
//     };

//     fetchProduct();
//   }, [id, userId]);

//   if (!product)
//     return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="container my-5">
//       <div className="row align-items-center">
//         <div className="col-md-5">
//           <img
//             src={`http://localhost:5000${product.image}`}
//             alt={product.name}
//             className="img-fluid rounded shadow"
//           />
//         </div>

//         <div className="col-md-7">
//           <h2>{product.name}</h2>
//           <h4 className="text-success">₹{product.price} / kg</h4>
//           <p className="mt-3">{product.description}</p>

//           {product.isOffer && (
//             <span className="badge bg-danger">OFFER</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Rating from "../components/Rating";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     API.get(`/products/${id}`).then((res) => setProduct(res.data));
//   }, [id]);

//   // ⭐ USER FILLS RATING
//   const rateProduct = async (value) => {
//     try {
//       await API.post(
//         `/products/${id}/rate`,
//         { rating: value },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // refresh product
//       const res = await API.get(`/products/${id}`);
//       setProduct(res.data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Login required");
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-5">
//           <img
//             src={`http://localhost:5000${product.image}`}
//             className="img-fluid rounded shadow"
//             alt={product.name}
//           />
//         </div>

//         <div className="col-md-7">
//           <h2>{product.name}</h2>
//           <h4 className="text-success">₹{product.price}</h4>
//           <p>{product.description}</p>

//           {/* ⭐ USER FILL RATING */}
//           <h6 className="mt-3">Rate this product</h6>
//           <Rating value={product.rating || 0} onRate={rateProduct} />
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Rating from "../components/Rating";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await API.get(`/products/${id}`);
//       setProduct(res.data);
//     };
//     fetchProduct();
//   }, [id]);

//   // ⭐ USER RATE PRODUCT
//   const rateProduct = async (value) => {
//     if (!token) {
//       alert("Please login to rate this product");
//       return;
//     }

//     try {
//       await API.post(
//         `/products/${id}/rate`,
//         { rating: value },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // 🔁 Refresh product after rating
//       const res = await API.get(`/products/${id}`);
//       setProduct(res.data);
//     } catch (err) {
//       alert("Rating failed");
//     }
//   };

//   if (!product) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="container mt-5">
//       <div className="row align-items-center">
//         <div className="col-md-5">
//           <img
//             src={`http://localhost:5000${product.image}`}
//             className="img-fluid rounded shadow"
//             alt={product.name}
//           />
//         </div>

//         <div className="col-md-7">
//           <h2>{product.name}</h2>

//           {/* ⭐ AVERAGE RATING DISPLAY + USER CLICK */}
//           <Rating
//             value={product.averageRating || 0}
//             onRate={rateProduct}
//           />

//           <h4 className="text-success mt-2">
//             ₹{product.price}
//           </h4>

//           <p className="mt-3">{product.description}</p>

//           {product.isOffer && (
//             <span className="badge bg-danger">OFFER</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Rating from "../components/Rating";

export default function ProductDetails() {
  // 🔹 Get product id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 State
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  // 🔹 Auth + user
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // =========================================================
  // 🔹 FETCH PRODUCT DETAILS
  // =========================================================
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      // 🔹 SAVE RECENTLY VIEWED (user-based)
      if (userId) {
        let history =
          JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

        // remove duplicate product
        history = history.filter(
          (item) => item._id !== res.data._id
        );

        // add latest on top
        history.unshift(res.data);

        // keep only last 8 products
        history = history.slice(0, 8);

        localStorage.setItem(
          `recent_${userId}`,
          JSON.stringify(history)
        );

        // notify home / recent section
        window.dispatchEvent(new Event("recentUpdated"));
      }
    };

    fetchProduct();
  }, [id, userId]);

  // =========================================================
  // 🔹 FETCH RECOMMENDED PRODUCTS (SAME CATEGORY)
  // =========================================================
  useEffect(() => {
    if (!product?.category) return;

    const fetchRecommended = async () => {
      const res = await API.get("/products");

      const sameCategory = res.data.filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id
      );

      setRecommended(sameCategory.slice(0, 6)); // max 6
    };

    fetchRecommended();
  }, [product]);

  // =========================================================
  // ⭐ RATE PRODUCT (ONLY STARS)
  // =========================================================
  const rateProduct = async (value) => {
    if (!token) {
      alert("Please login to rate this product");
      return;
    }

    try {
      await API.post(
        `/products/${id}/rate`,
        { rating: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refresh product after rating
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      alert("Rating failed");
    }
  };

  // =========================================================
  // 🛒 ADD TO CART
  // =========================================================
  const addToCart = () => {
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

    // notify navbar/cart icon
    window.dispatchEvent(new Event("cartUpdated"));

    // ✅ message (as requested)
    alert("Product added to cart");
  };

  // =========================================================
  // 🔹 LOADING STATE
  // =========================================================
  if (!product)
    return <p className="text-center mt-5">Loading...</p>;

  // =========================================================
  // 🔹 UI
  // =========================================================
  return (
    <div className="container my-5">
      {/* ================= PRODUCT DETAILS ================= */}
      <div className="row g-5 align-items-center">
        {/* IMAGE
        <div className="col-md-5 text-center">
          <img
            src={`http://localhost:5000${product.image}`}
            className="img-fluid rounded-4 shadow-lg"
            alt={product.name}
          />
        </div> */}
        {/* IMAGE */}
<div className="col-md-5 text-center">
  <div className="product-image-wrapper">
    <img
      src={`http://localhost:5000${product.image}`}
      alt={product.name}
      className="product-image-fixed"
    />
  </div>
</div>


        {/* DETAILS */}
        <div className="col-md-7">
          <h2 className="fw-bold">{product.name}</h2>

          {/* ⭐ ONLY STAR RATING */}
          <div className="my-2">
            <Rating
              value={product.averageRating || 0}
              onRate={rateProduct}
            />
          </div>

          {/* PRICE */}
          <h3 className="text-success fw-bold mt-3">
            {/* ₹{product.price} */}
            {product.isOffer ? (
  <>
    <span className="text-muted text-decoration-line-through me-2">
      ₹{product.price}
    </span>
    <span className="fw-bold text-success">
      ₹{product.discountPrice}
    </span>
    <span className="text-danger ms-2">
      {product.discountPercent}% OFF
    </span>
  </>
) : (
  <span className="fw-bold">₹{product.price}</span>
)}

          </h3>

        
          {/* DESCRIPTION */}
          <p className="text-muted mt-3">
            {product.description}
          </p>

          {/* OFFER */}
          {product.isOffer && (
            <span className="badge bg-danger px-3 py-2">
              🔥 Special Offer
            </span>
          )}
            {/* ACTION BUTTONS */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-success px-4"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="btn btn-success px-4"
              onClick={() => {
                addToCart();
                navigate("/cart");
              }}
            >
              ⚡ Order Now
            </button>
          </div>

        </div>
      </div>

      {/* ================= RECOMMENDED PRODUCTS ================= */}
      {recommended.length > 0 && (
        <>
          <hr className="my-5" />
          <h4 className="fw-bold mb-4">
            Recommended for you
          </h4>

          <div className="row g-4">
            {recommended.map((item) => (
              <div className="col-6 col-md-3" key={item._id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    className="recommended-image"
                    alt={item.name}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                  />

                  <div className="card-body text-center">
                    <h6 className="fw-semibold text-truncate">
                      {item.name}
                    </h6>

                    <Rating
                      value={item.averageRating || 0}
                      readonly
                    />

                    <p className="text-success fw-bold mt-1 mb-0">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

