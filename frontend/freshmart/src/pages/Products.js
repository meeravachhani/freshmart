// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API from "../services/api";
// import WishlistButton from "../components/WishlistButton";
// // CSS remains SAME (no change)

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");

//   const query = new URLSearchParams(location.search);
//   const category = query.get("category");
//   const search = query.get("search");
//   const offer = query.get("offer");

//   // 🔹 Fetch products (UNCHANGED LOGIC)
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

//   // 🛒 Add to cart (UNCHANGED)
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((i) => i._id === product._id);

//     if (existing) existing.qty += 1;
//     else {
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

//   // 👁 Recently viewed (UNCHANGED)
//   const saveRecentlyViewed = (product) => {
//     if (!userId) return;

//     let recent =
//       JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

//     recent = recent.filter((i) => i._id !== product._id);
//     recent.unshift(product);
//     recent = recent.slice(0, 8);

//     localStorage.setItem(
//       `recent_${userId}`,
//       JSON.stringify(recent)
//     );
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

//             {/* ❤️ Wishlist (DESIGN SAME, LOGIC NEW) */}
//             <span className="wishlist-icon">
//               <WishlistButton product={product} />
//             </span>

//             {/* 🔥 Offer badge */}
//             {product.isOffer && (
//               <span className="offer-badge">OFFER</span>
//             )}

//             <img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.name}
//               className="product-image"
//               onClick={() => {
//                 saveRecentlyViewed(product);
//                 navigate(`/product/${product._id}`);
//               }}
//             />

//             <h4 className="product-name">{product.name}</h4>
//             <p className="product-price">
//               ₹{product.price} / kg
//             </p>

//             <button
//               className="add-btn"
//               onClick={() => addToCart(product)}
//             >
//              🛒 Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import WishlistButton from "../components/WishlistButton";
// CSS remains SAME

export default function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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

  // 🛒 Add to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i._id === product._id);

    const finalPrice = product.isOffer
      ? product.discountPrice || product.price
      : product.price;

    if (existing) existing.qty += 1;
    else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: finalPrice,
        image: product.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  // 👁 Recently viewed
  const saveRecentlyViewed = (product) => {
    if (!userId) return;

    let recent =
      JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];

    recent = recent.filter((i) => i._id !== product._id);
    recent.unshift(product);
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

        {products.map((product) => {
          // 💡 PRICE LOGIC (Meesho style)
          const originalPrice = product.price;

          const offerPrice =
            product.discountPrice ||
            (product.discountPercent
              ? Math.round(
                  originalPrice -
                    (originalPrice * product.discountPercent) / 100
                )
              : originalPrice);

          const percentOff = product.discountPercent
            ? product.discountPercent
            : product.isOffer
            ? Math.round(
                ((originalPrice - offerPrice) / originalPrice) * 100
              )
            : 0;

          return (
            <div key={product._id} className="product-card">

              {/* ❤️ Wishlist */}
              <span className="wishlist-icon">
                <WishlistButton product={product} />
              </span>

              {/* 🔥 % OFF badge */}
              {product.isOffer && (
                <span className="offer-badge">
                  {percentOff}% OFF
                </span>
              )}

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

              {/* 💰 PRICE DISPLAY (Meesho style) */}
              {product.isOffer ? (
                <p className="product-price">
                  <span className="new-price">
                    ₹{offerPrice}
                  </span>{" "}
                  <span className="old-price">
                    ₹{originalPrice}
                  </span>
                </p>
              ) : (
                <p className="product-price">
                  ₹{originalPrice}
                </p>
              )}

              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                🛒 Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
