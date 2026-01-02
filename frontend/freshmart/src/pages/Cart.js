// // import { useState } from "react";

// // export default function Cart() {
// //   const [cart, setCart] = useState(
// //     JSON.parse(localStorage.getItem("cart")) || []
// //   );

// //   const increaseQty = (id) => {
// //     const updated = cart.map((item) =>
// //       item._id === id ? { ...item, qty: item.qty + 1 } : item
// //     );
// //     setCart(updated);
// //     localStorage.setItem("cart", JSON.stringify(updated));
// //   };

// //   const decreaseQty = (id) => {
// //     const updated = cart
// //       .map((item) =>
// //         item._id === id ? { ...item, qty: item.qty - 1 } : item
// //       )
// //       .filter((item) => item.qty > 0);

// //     setCart(updated);
// //     localStorage.setItem("cart", JSON.stringify(updated));
// //   };

// //   const totalAmount = cart.reduce(
// //     (sum, item) => sum + item.price * item.qty,
// //     0
// //   );

// //   return (
// //     <div>
// //       <h2>Your Cart</h2>

// //       {cart.length === 0 && <p>Cart is empty</p>}

// //       {cart.map((item) => (
// //         <div
// //           key={item._id}
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "15px",
// //             borderBottom: "1px solid #ccc",
// //             padding: "10px",
// //           }}
// //         >
// //           {/* ✅ FIXED IMAGE */}
// //           <img
// //             src={`http://localhost:5000${item.image}`}
// //             width="60"
// //             alt={item.name}
// //           />

// //           <div>
// //             <h4>{item.name}</h4>
// //             <p>₹{item.price}</p>
// //             <p>Qty: {item.qty}</p>
// //           </div>

// //           <button onClick={() => increaseQty(item._id)}>+</button>
// //           <button onClick={() => decreaseQty(item._id)}>-</button>

// //           <strong>₹{item.price * item.qty}</strong>
// //         </div>
// //       ))}

// //       <h3>Total: ₹{totalAmount}</h3>
// //     </div>
// //   );
// // }




// import { useState, useEffect } from "react";

// export default function Cart() {
//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("cart")) || []
//   );
//   const [orderMsg, setOrderMsg] = useState("");

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // 🔼 Increase quantity
//   const increaseQty = (id) => {
//     setCart(
//       cart.map((item) =>
//         item._id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   // 🔽 Decrease quantity
//   const decreaseQty = (id) => {
//     setCart(
//       cart
//         .map((item) =>
//           item._id === id ? { ...item, qty: item.qty - 1 } : item
//         )
//         .filter((item) => item.qty > 0)
//     );
//   };

//   // 💰 Total price
//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   // 🛒 Place Order
//   const placeOrder = () => {
//      const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login to place order");
//     return;
//   }
//     if (cart.length === 0) return;

//     setOrderMsg("✅ Order placed successfully! Thank you for shopping at FreshMart 🥬");

//     setCart([]);
//     localStorage.removeItem("cart");

//     setTimeout(() => setOrderMsg(""), 3000);
//   };

//   return (
//     <div className="cart-wrapper">
//       <div className="cart-page">
//         <h2>Your Cart</h2>

//         {orderMsg && <div className="order-msg">{orderMsg}</div>}

//         {cart.length === 0 && <p className="empty">Your cart is empty</p>}

//         {cart.map((item) => (
//           <div key={item._id} className="cart-item">
//             <img
//               src={`http://localhost:5000${item.image}`}
//               alt={item.name}
//             />

//             <div className="cart-item-details">
//               <h4>{item.name}</h4>
//               <p>₹{item.price}</p>
//             </div>

//             <div className="cart-item-actions">
//               <button onClick={() => decreaseQty(item._id)}>-</button>
//               <span>{item.qty}</span>
//               <button onClick={() => increaseQty(item._id)}>+</button>
//             </div>

//             <strong>₹{item.price * item.qty}</strong>
//           </div>
//         ))}

//         {cart.length > 0 && (
//           <>
//             <h3 className="total">Total: ₹{totalAmount}</h3>

//             <button className="order-btn" onClick={placeOrder}>
//               Order Now
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [loading, setLoading] = useState(false);
  const [orderMsg, setOrderMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔼 Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // 🔽 Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // 💰 Total price
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🛒 Place Order
  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to place an order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const items = cart.map((i) => ({
        productId: i._id,
        quantity: i.qty,
      }));

      await API.post(
        "/orders/place",
        { items, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderMsg("✅ Order placed successfully! Thank you for shopping at FreshMart 🥬");
      setCart([]);
      localStorage.removeItem("cart");

      setTimeout(() => setOrderMsg(""), 3000);

      navigate("/orders"); // redirect to Orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
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
            <img src={`http://localhost:5000${item.image}`} alt={item.name} />

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
            <button className="order-btn" onClick={placeOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Order Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
