import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Rating from "../components/Rating";
import WishlistButton from "../components/WishlistButton";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  /* ================= FETCH PRODUCT DETAILS ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);

        // ✅ RECENT VIEW HISTORY
        if (userId) {
          let history = JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];
          history = history.filter((item) => item._id !== res.data._id);
          history.unshift(res.data);
          history = history.slice(0, 8);
          localStorage.setItem(`recent_${userId}`, JSON.stringify(history));
          window.dispatchEvent(new Event("recentUpdated"));
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, userId]);

  /* ================= FETCH RECOMMENDED ================= */
  useEffect(() => {
    if (!product?.category) return;

    const fetchRecommended = async () => {
      try {
        const res = await API.get("/products");
        const sameCategory = res.data.filter(
          (item) => item.category === product.category && item._id !== product._id
        );
        setRecommended(sameCategory.slice(0, 6));
      } catch (err) {
        console.error("Error fetching recommended:", err);
      }
    };
    fetchRecommended();
  }, [product]);

  /* ================= RATE PRODUCT ================= */
  const rateProduct = async (value) => {
    if (!token) {
      alert("Please login to rate this product");
      navigate("/login");
      return;
    }
    try {
      await API.post(
        `/products/${id}/rate`,
        { rating: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      alert("Rating failed");
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (product) => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    if (!userId) return;

    let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const existing = cart.find((item) => item._id === product._id);
    const finalPrice = product.isOffer ? product.discountPrice || product.price : product.price;

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

    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("🛒 Product added to cart");
  };

  /* ================= RENDER HELPERS ================= */
  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (!product) return <p className="text-center mt-5">Product not found</p>;

  const ratingCount = product.ratings?.length || 0;
  const avgRating = product.averageRating ? product.averageRating.toFixed(1) : 0;

  return (
    <div className="container my-5">
      <div className="row g-5 align-items-center">
        {/* IMAGE */}
        <div className="col-md-5 text-center position-relative">
          <div className="product-image-wrapper">
            <img
              src={product.image ? `http://localhost:5000${product.image}` : "/no-image.png"}
              alt={product.name}
              className="product-image-fixed img-fluid"
            />
          </div>
          {/* ❤️ WISHLIST ICON OVERLAY */}
          <div className="position-absolute top-0 end-0 p-3">
            <WishlistButton product={product} />
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          <h2 className="fw-bold">{product.name}</h2>

          {/* ⭐ RATING */}
          <div className="my-2 d-flex align-items-center gap-2">
            <Rating value={product.averageRating || 0} onRate={rateProduct} />
            <span className="text-muted small">
              ({avgRating} ⭐ | {ratingCount} ratings)
            </span>
          </div>

          {/* OFFER BADGE */}
          {product.isOffer && (
            <span className="badge bg-danger px-3 py-2 mb-2">🔥 Special Offer</span>
          )}

          {/* PRICE */}
          <div className="mt-3">
            {product.isOffer ? (
              <h3 className="d-flex align-items-center gap-2">
                <span className="text-muted text-decoration-line-through small">
                  ₹{product.price}
                </span>
                <span className="fw-bold text-success">₹{product.discountPrice}</span>
                <span className="text-danger small ms-2">{product.discountPercent}% OFF</span>
              </h3>
            ) : (
              <h3 className="fw-bold text-success">₹{product.price}</h3>
            )}
            <span className="badge bg-success mt-1">🚚 Free Delivery</span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-muted mt-3">{product.description}</p>

          {/* ACTION BUTTONS */}
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-success px-4" onClick={() => addToCart(product)}>
              🛒 Add to Cart
            </button>
             <button
               className="btn btn-success px-4"
               onClick={() => {
                 addToCart(product);
                 navigate("/cart");
               }}
             >
               ⚡ Order Now
             </button>
          </div>
        </div>
      </div>

      {/* RECOMMENDED SECTION */}
      {recommended.length > 0 && (
        <div className="mt-5">
          <hr className="my-5" />
          <h4 className="fw-bold mb-4">Recommended for you</h4>
          <div className="row g-4">
            {recommended.map((item) => {
              const count = item.ratings?.length || 0;
              const avg = item.averageRating ? item.averageRating.toFixed(1) : 0;

              return (
                <div className="col-6 col-md-3" key={item._id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <img
                      src={item.image ? `http://localhost:5000${item.image}` : "/no-image.png"}
                      className="card-img-top p-2"
                      alt={item.name}
                      style={{ cursor: "pointer", height: "180px", objectFit: "contain" }}
                      onClick={() => navigate(`/product/${item._id}`)}
                    />
                    <div className="card-body text-center">
                      <h6 className="fw-semibold text-truncate">{item.name}</h6>
                      <p className="small text-muted mb-1">
                        ({avg} ⭐ | {count})
                      </p>
                      <p className="text-success fw-bold mb-0">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}