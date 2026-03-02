import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  // ✅ GET USER ID
  const userId = localStorage.getItem("userId");

  // ✅ LOAD USER-WISE CART
  const [cart, setCart] = useState(() => {
    if (!userId) return [];
    return JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  });

  // 🔄 Sync cart + navbar update
  useEffect(() => {
    if (!userId) return;

    localStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(cart)
    );

    // 🔥 Update Navbar Count
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart, userId]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        <h2>🛒 Your Cart</h2>

        {cart.length === 0 && (
          <p className="empty">Your cart is empty</p>
        )}

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
              <button onClick={() => decreaseQty(item._id)}>
                −
              </button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item._id)}>
                +
              </button>
            </div>

            <strong>₹{item.price * item.qty}</strong>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h3 className="total">
              Total: ₹{totalAmount}
            </h3>

            <button
              className="order-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}