import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import WishlistButton from "../components/WishlistButton";

export default function Products() {

  // ===============================
  // 🔹 STATE
  // ===============================
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ===============================
  // 🔹 QUERY PARAMS
  // ===============================
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const search = query.get("search");
  const offer = query.get("offer");

  // ===============================
  // 🔹 FETCH PRODUCTS
  // ===============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        let data = res.data;

        console.log("ALL PRODUCTS:", data);

        // ✅ CATEGORY FILTER (FIXED)
        if (category) {
          data = data.filter((item) =>
            item.category
              ?.toLowerCase()
              .includes(category.toLowerCase())
          );
        }

        // ✅ SEARCH FILTER
        if (search) {
          data = data.filter((item) =>
            item.name
              ?.toLowerCase()
              .includes(search.toLowerCase())
          );
        }

        // ✅ OFFER FILTER
        if (offer) {
          data = data.filter(
            (item) => item.isOffer && item.offerTag === offer
          );
        }

        // ✅ SORT
        if (sort === "low") {
          data.sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
          data.sort((a, b) => b.price - a.price);
        }

        console.log("FILTERED PRODUCTS:", data);

        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category, search, offer, sort]);

  // ===============================
  // 🛒 ADD TO CART
  // ===============================
  const addToCart = (product) => {
    if (!token) {
      alert("Please login to add product");
      navigate("/login");
      return;
    }

    let cart =
      JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    const existing = cart.find((i) => i._id === product._id);

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

    window.dispatchEvent(new Event("cartUpdated"));
    alert("🛒 Added to cart");
  };

  // ===============================
  // 👁 RECENT VIEW
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

      {/* ✅ SORT DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      <div className="products-grid">

        {products.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h3>😢 No Products Found</h3>
            <p>Try different category or search</p>
          </div>
        ) : (
          products.map((product) => {

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

                {/* 🔥 OFFER */}
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

                {/* 📦 QTY */}
                <p className="product-qty">
                  {product.quantity} {product.unit}
                </p>

                {/* 🚚 DELIVERY */}
                <div className="free-delivery">
                  🚚 Free Delivery
                </div>

                {/* 🛒 BUTTON */}
                <button
                  className="add-btn"
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}