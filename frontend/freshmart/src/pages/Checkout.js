import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
// import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  const token = localStorage.getItem("token");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // 🔹 LOAD ADDRESSES
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`address_${userId}`)) || [];
    setAddresses(saved);
  }, [userId]);

  // 🔹 PLACE ORDER
  const placeOrder = async () => {
    if (!token) {
      alert("Please login");
      navigate("/login");
      return;
    }

    if (!selectedAddress) {
      alert("Please select delivery address");
      return;
    }

    try {
      setLoading(true);

      const items = cart.map((i) => ({
        productId: i._id,
        quantity: i.qty,
      }));

      await API.post("/orders/place", {
        items,
        totalAmount: total,
        address: selectedAddress,
        paymentMethod,
      });

      alert("🎉 Order placed successfully!");
      // localStorage.removeItem("cart");
localStorage.removeItem(`cart_${userId}`);
// window.dispatchEvent(new Event("cartUpdated"));

      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 FAKE ONLINE PAY
  const fakeOnlinePay = () => {
    alert("💳 Payment successful (Fake Razorpay)");
    placeOrder();
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-card">

        <h2 className="checkout-title">Checkout</h2>

        {/* TOTAL */}
        <div className="checkout-total">
          <span>Total Amount</span>
          <strong>₹{total}</strong>
        </div>

        {/* ADDRESS */}
        <h5 className="section-title">Delivery Address</h5>

        {addresses.length === 0 && (
          <p className="text-danger small">
            No address found. Add address in profile.
          </p>
        )}

        {addresses.map((addr, i) => (
          <label
            key={i}
            className={`address-box ${
              selectedAddress === addr ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="address"
              onChange={() => setSelectedAddress(addr)}
            />
            <div>
              <strong>{addr.fullAddress}</strong>
              <p className="mb-0">
                {addr.city} - {addr.pincode}
              </p>
            </div>
          </label>
        ))}

        {/* PAYMENT */}
        <h5 className="section-title mt-4">Payment Method</h5>

        <label
          className={`payment-box ${
            paymentMethod === "COD" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <span>💵 Cash on Delivery</span>
        </label>

        <label
          className={`payment-box ${
            paymentMethod === "ONLINE" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            onChange={() => setPaymentMethod("ONLINE")}
          />
          <span>💳 Online Payment</span>
        </label>

        {/* ONLINE PAY */}
        {paymentMethod === "ONLINE" && (
          <button
            className="btn btn-success w-100 mt-3"
            onClick={fakeOnlinePay}
          >
            Pay ₹{total}
          </button>
        )}

        {/* CONFIRM */}
        <button
          className="confirm-btn"
          disabled={loading}
          onClick={() => paymentMethod === "COD" && placeOrder()}
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>

      </div>
    </div>
  );
}