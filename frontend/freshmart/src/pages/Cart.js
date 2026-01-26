import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
// import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [loading, setLoading] = useState(false);
  const [orderMsg, setOrderMsg] = useState("");

  // 🔄 Sync cart with localStorage + notify Navbar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  // ➕ Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // 💰 Total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 📦 Place order
  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.qty,
      }));

      await API.post(
        "/orders/place",
        { items, totalAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrderMsg("✅ Order placed successfully! Thank you for shopping at FreshMart 🥬");

      setCart([]);
      localStorage.removeItem("cart");

      setTimeout(() => {
        setOrderMsg("");
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        <h2>Your Cart</h2>

        {orderMsg && <div className="order-msg">{orderMsg}</div>}

        {cart.length === 0 && <p className="empty">Your cart is empty</p>}

        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.name}
            />

            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>

            <div className="cart-item-actions">
              <button onClick={() => decreaseQty(item._id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item._id)}>+</button>
            </div>

            <strong>₹{item.price * item.qty}</strong>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h3 className="total">Total: ₹{totalAmount}</h3>

            <button
              className="order-btn"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Order Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}




