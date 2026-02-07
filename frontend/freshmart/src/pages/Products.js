// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../services/api";
// // import "./Products.css";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const category = query.get("category");
//   const search = query.get("search");
//   const offer = query.get("offer");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         let data = res.data;

//         if (offer) {
//           data = data.filter(
//             (item) => item.isOffer && item.offerTag === offer
//           );
//         }

//         if (category) {
//           data = data.filter(
//             (item) =>
//               item.category.toLowerCase() === category.toLowerCase()
//           );
//         }

//         if (search) {
//           data = data.filter(
//             (item) =>
//               item.name.toLowerCase().includes(search.toLowerCase()) ||
//               item.category.toLowerCase().includes(search.toLowerCase())
//           );
//         }

//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products", err);
//       }
//     };

//     fetchProducts();
//   }, [category, search, offer]);

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
//     <div className="products-page">
//       <h2 className="products-title">
//         {offer
//           ? "🔥 Offer Products"
//           : search
//           ? `Search results for "${search}"`
//           : category
//           ? category
//           : "All Products"}
//       </h2>

//       <div className="products-grid">
//         {products.length === 0 && <p>No products found</p>}

//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             {product.isOffer && <span className="offer-badge">OFFER</span>}

//             <img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.name}
//               className="product-image"
//             />

//             <h4 className="product-name">{product.name}</h4>
//             <p className="product-price">₹{product.price} / kg</p>

//             <button
//               className="add-btn"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // 🔴 CHANGED: added useNavigate
import API from "../services/api";
// import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // 🔴 CHANGED: navigation hook
const userId = localStorage.getItem("userId");

  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const search = query.get("search");
  const offer = query.get("offer");

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        let data = res.data;

        if (offer) {
          data = data.filter(
            (item) => item.isOffer && item.offerTag === offer
          );
        }

        if (category) {
          data = data.filter(
            (item) =>
              item.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (search) {
          data = data.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.category.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, [category, search, offer]);

  // 🛒 Add to cart (UNCHANGED)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i._id === product._id);

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
    alert("Product added to cart");
  };


  // ✅ SAVE RECENTLY VIEWED PRODUCT
const saveRecentlyViewed = (product) => {
  if (!userId) return;

  let recent =
    JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

  // remove duplicate
  recent = recent.filter((item) => item._id !== product._id);

  // add newest on top
  recent.unshift(product);

  // keep only last 8 items
  recent = recent.slice(0, 8);

  localStorage.setItem(
    `recent_${userId}`,
    JSON.stringify(recent)
  );
};



  return (
    <div className="products-page">
      <h2 className="products-title">
        {offer
          ? "🔥 Offer Products"
          : search
          ? `Search results for "${search}"`
          : category
          ? category
          : "All Products"}
      </h2>

      <div className="products-grid">
        {products.length === 0 && <p>No products found</p>}

        {products.map((product) => (
          <div key={product._id} className="product-card">

            {/* 🔥 Offer badge */}
            {product.isOffer && (
              <span className="offer-badge">OFFER</span>
            )}

            {/* 🔴 CHANGED: Image click opens ProductDetails */}
            {/* <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="product-image"
              style={{ cursor: "pointer" }} // 🔴 CHANGED: UX improvement
              onClick={() =>
                navigate(`/product/${product._id}`)
              }
            /> */}


<img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  className="product-image"
  onClick={() => {
    saveRecentlyViewed(product);
    navigate(`/product/${product._id}`);
  }}
/>




            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">₹{product.price} / kg</p>

            <button
              className="add-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import API from "../services/api";
// // import "./Products.css";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState(
//     JSON.parse(localStorage.getItem("wishlist")) || []
//   );

//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const category = query.get("category");
//   const search = query.get("search");
//   const offer = query.get("offer");

//   // 🔹 Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         let data = res.data;

//         if (offer) {
//           data = data.filter(
//             (item) => item.isOffer && item.offerTag === offer
//           );
//         }

//         if (category) {
//           data = data.filter(
//             (item) =>
//               item.category.toLowerCase() === category.toLowerCase()
//           );
//         }

//         if (search) {
//           data = data.filter(
//             (item) =>
//               item.name.toLowerCase().includes(search.toLowerCase()) ||
//               item.category.toLowerCase().includes(search.toLowerCase())
//           );
//         }

//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products", err);
//       }
//     };

//     fetchProducts();
//   }, [category, search, offer]);

//   // ❤️ Wishlist functions
//   const toggleWishlist = (product) => {
//     let updatedWishlist;

//     if (wishlist.find((item) => item._id === product._id)) {
//       updatedWishlist = wishlist.filter(
//         (item) => item._id !== product._id
//       );
//     } else {
//       updatedWishlist = [...wishlist, product];
//     }

//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   const isWishlisted = (id) =>
//     wishlist.some((item) => item._id === id);

//   // 🛒 Add to cart
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
//     <div className="products-page">
//       <h2 className="products-title">
//         {offer
//           ? "🔥 Offer Products"
//           : search
//           ? `Search results for "${search}"`
//           : category
//           ? category
//           : "All Products"}
//       </h2>

//       <div className="products-grid">
//         {products.length === 0 && <p>No products found</p>}

//         {products.map((product) => (
//           <div key={product._id} className="product-card">

//             {/* ❤️ Wishlist */}
//             <span
//               className="wishlist-icon"
//               onClick={() => toggleWishlist(product)}
//             >
//               {isWishlisted(product._id) ? (
//                 <FaHeart color="red" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </span>

//             {/* 🔥 Offer badge */}
//             {product.isOffer && (
//               <span className="offer-badge">OFFER</span>
//             )}

//             <img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.name}
//               className="product-image"
//             />

//             <h4 className="product-name">{product.name}</h4>
//             <p className="product-price">₹{product.price} / kg</p>

//             <button
//               className="add-btn"
//               onClick={() => addToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




