// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// // import "./Checkout.css";

// export default function Checkout() {
//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId");
//   const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
//   const token = localStorage.getItem("token");

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [loading, setLoading] = useState(false);

//   const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

//   // 🔹 LOAD ADDRESSES
//   useEffect(() => {
//     const saved =
//       JSON.parse(localStorage.getItem(`address_${userId}`)) || [];
//     setAddresses(saved);
//   }, [userId]);

//   // 🔹 PLACE ORDER
//   const placeOrder = async () => {
//     if (!token) {
//       alert("Please login");
//       navigate("/login");
//       return;
//     }

//     if (!selectedAddress) {
//       alert("Please select delivery address");
//       return;
//     }

//     try {
//       setLoading(true);

//       const products = cart.map((i) => ({
//         productId: i._id,
//         quantity: i.qty,
//       }));

//       await API.post("/orders/place", {
//         // items,
//         products,
//         totalAmount: total,
//         address: selectedAddress,
//         paymentMethod,
//       });

//       alert("🎉 Order placed successfully!");
//       // localStorage.removeItem("cart");
// localStorage.removeItem(`cart_${userId}`);
// // window.dispatchEvent(new Event("cartUpdated"));

//       navigate("/orders");
//     } catch (err) {
//       alert("Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 FAKE ONLINE PAY
//   const fakeOnlinePay = () => {
//     alert("💳 Payment successful (Fake Razorpay)");
//     placeOrder();
//   };

//   return (
//     <div className="checkout-wrapper">
//       <div className="checkout-card">

//         <h2 className="checkout-title">Checkout</h2>

//         {/* TOTAL */}
//         <div className="checkout-total">
//           <span>Total Amount</span>
//           <strong>₹{total}</strong>
//         </div>

//         {/* ADDRESS */}
//         <h5 className="section-title">Delivery Address</h5>

//         {addresses.length === 0 && (
//           <p className="text-danger small">
//             No address found. Add address in profile.
//           </p>
//         )}

//         {addresses.map((addr, i) => (
//           <label
//             key={i}
//             className={`address-box ${
//               selectedAddress === addr ? "active" : ""
//             }`}
//           >
//             <input
//               type="radio"
//               name="address"
//               onChange={() => setSelectedAddress(addr)}
//             />
//             <div>
//               <strong>{addr.fullAddress}</strong>
//               <p className="mb-0">
//                 {addr.city} - {addr.pincode}
//               </p>
//             </div>
//           </label>
//         ))}

//         {/* PAYMENT */}
//         <h5 className="section-title mt-4">Payment Method</h5>

//         <label
//           className={`payment-box ${
//             paymentMethod === "COD" ? "active" : ""
//           }`}
//         >
//           <input
//             type="radio"
//             checked={paymentMethod === "COD"}
//             onChange={() => setPaymentMethod("COD")}
//           />
//           <span>💵 Cash on Delivery</span>
//         </label>

//         <label
//           className={`payment-box ${
//             paymentMethod === "ONLINE" ? "active" : ""
//           }`}
//         >
//           <input
//             type="radio"
//             onChange={() => setPaymentMethod("ONLINE")}
//           />
//           <span>💳 Online Payment</span>
//         </label>

//         {/* ONLINE PAY */}
//         {paymentMethod === "ONLINE" && (
//           <button
//             className="btn btn-success w-100 mt-3"
//             onClick={fakeOnlinePay}
//           >
//             Pay ₹{total}
//           </button>
//         )}

//         {/* CONFIRM */}
//         <button
//           className="confirm-btn"
//           disabled={loading}
//           onClick={() => paymentMethod === "COD" && placeOrder()}
//         >
//           {loading ? "Placing Order..." : "Confirm Order"}
//         </button>

//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

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

  // ===============================
  // 🔔 NOTIFICATION (NEW)
  // ===============================
  const addNotification = (message, type = "user") => {
    const key = type === "admin" ? "admin_notifications" : `noti_${userId}`;
    const old = JSON.parse(localStorage.getItem(key)) || [];

    old.unshift({
      message,
      time: new Date().toLocaleString(),
    });

    localStorage.setItem(key, JSON.stringify(old));
  };

  // 🔹 PLACE ORDER
  const placeOrder = async (paymentStatus = "SUCCESS") => {
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

      const products = cart.map((i) => ({
        productId: i._id,
        quantity: i.qty,
      }));

      const res = await API.post("/orders/place", {
        products,
        totalAmount: total,
        address: selectedAddress,
        paymentMethod,
        paymentStatus, // ✅ NEW
        orderStatus: "Processing", // ✅ TRACKING
      });
const orderId=res.data._id;
localStorage.setItem("lastOrderId",orderId);
      // ===============================
      // 🔔 NOTIFICATIONS (NEW)
      // ===============================
      addNotification("🎉 Your order placed successfully!");
      addNotification(
        `🛒 New order received ₹${total}`,
        "admin"
      );

      localStorage.removeItem(`cart_${userId}`);

      // ===============================
      // 🔁 REDIRECT BASED ON PAYMENT
      // ===============================
      if (paymentStatus === "SUCCESS") {
        navigate("/payment-success");
      } else {
        navigate("/payment-failed");
      }

    } catch (err) {
      alert("Order failed");
      navigate("/payment-failed"); // ✅ NEW
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 💳 ONLINE PAYMENT (UPDATED)
  // ===============================
  const fakeOnlinePay = () => {
    const success = Math.random() > 0.2; // 80% success

    if (success) {
      alert("💳 Payment Successful");
      placeOrder("SUCCESS");
    } else {
      alert("❌ Payment Failed");
      placeOrder("FAILED");
    }
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
          onClick={() =>
            paymentMethod === "COD" && placeOrder("SUCCESS")
          }
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>

      </div>
    </div>
  );
}