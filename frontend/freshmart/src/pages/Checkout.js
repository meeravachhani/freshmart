import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to place an order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      // Prepare items for backend
      const items = cart.map((i) => ({
        productId: i._id,
        quantity: i.qty,
      }));

      await API.post(
        "/orders/place",
        { items, totalAmount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      localStorage.removeItem("cart"); // clear cart
      navigate("/orders"); // redirect to Orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Checkout</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <p key={item._id}>
          {item.name} × {item.qty}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <button className="order-btn" onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}


// import Cart from '../components/Cart';

// function Checkout() {
//   return <Cart />;
// }

// export default Checkout;