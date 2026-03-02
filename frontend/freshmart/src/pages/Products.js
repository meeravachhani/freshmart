import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import WishlistButton from "../components/WishlistButton";
// ⚠️ CSS FILE REMAINS SAME (NO CHANGE)

export default function Products() {
  // ===============================
  // 🔹 STATE & HOOKS
  // ===============================
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 USER DATA
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // ✅ LOGIN CHECK KEY

  // ===============================
  // 🔹 QUERY PARAMS (category, search, offer)
  // ===============================
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const search = query.get("search");
  const offer = query.get("offer");

  // ===============================
  // 🔹 FETCH PRODUCTS FROM BACKEND
  // ===============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        let data = res.data;

        // 🔥 FILTER: OFFER PRODUCTS
        if (offer) {
          data = data.filter(
            (item) => item.isOffer && item.offerTag === offer
          );
        }

        // 🥦 FILTER: CATEGORY
        if (category) {
          data = data.filter(
            (item) =>
              item.category.toLowerCase() === category.toLowerCase()
          );
        }

        // 🔍 FILTER: SEARCH
        if (search) {
          data = data.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.category.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products", err);
      }
    };

    fetchProducts();
  }, [category, search, offer]);

  // ===============================
  // 🛒 ADD TO CART (LOGIN REQUIRED)
  // ===============================
  const addToCart = (product) => {
    // 🔐 LOGIN CHECK (IMPORTANT)
    if (!token) {
      alert("Please login to add product to cart");
      navigate("/login");
      return;
    }
    if (!userId) return;
    let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const existing = cart.find((i) => i._id === product._id);

    // 💰 FINAL PRICE (OFFER SUPPORT)
    const finalPrice = product.isOffer
      ? product.discountPrice || product.price
      : product.price;

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: finalPrice,
        image: product.image,
        qty: 1,
      });
    }

   localStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(cart)
    );

    // 🔔 UPDATE NAVBAR CART COUNT
    window.dispatchEvent(new Event("cartUpdated"));

    alert("🛒 Product added to cart");
  };

  // ===============================
  // 👁 SAVE RECENTLY VIEWED (USER BASED)
  // ===============================
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

  // ===============================
  // 🔹 UI
  // ===============================
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
          // 💡 PRICE LOGIC (MEESHO STYLE)
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
              {/* ❤️ WISHLIST */}
              <span className="wishlist-icon">
                <WishlistButton product={product} />
              </span>

              {/* 🔥 OFFER BADGE */}
              {product.isOffer && (
                <span className="offer-badge">
                  {percentOff}% OFF
                </span>
              )}

              {/* 🖼 IMAGE */}
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="product-image"
                onClick={() => {
                  saveRecentlyViewed(product);
                  navigate(`/product/${product._id}`);
                }}
              />

              {/* 📛 NAME */}
              <h4 className="product-name">{product.name}</h4>

              {/* 💰 PRICE */}
              {product.isOffer ? (
                <p className="product-price">
                  <span className="new-price">₹{offerPrice}</span>{" "}
                  <span className="old-price">₹{originalPrice}</span>
                </p>
              ) : (
                <p className="product-price">₹{originalPrice}</p>
              )}

              {/* 📦 QUANTITY */}
              <p className="product-qty">
                {product.quantity} {product.unit}
              </p>

              {/* 🛒 ADD TO CART */}
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


