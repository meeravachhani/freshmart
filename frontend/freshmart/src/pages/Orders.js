// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await API.get("/orders/my", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   return (
//     <div className="container mt-4">
//       <h2>My Orders</h2>

//       {orders.length === 0 && <p>No orders found</p>}

//       {orders.map((order) => (
//         <div key={order._id} className="card mb-3">
//           <div className="card-body">
//             <h5>Order ID: {order._id}</h5>
//             <p>Status: <strong>{order.status}</strong></p>
//             <p>Total: ₹{order.totalAmount}</p>

//             <ul>
//               {order.products.map((item, i) => (
//                 <li key={i}>
//                   {item.productId?.name} × {item.quantity}
//                 </li>
//               ))}
//             </ul>

//             <small className="text-muted">
//               Ordered on {new Date(order.createdAt).toLocaleDateString()}
//             </small>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import API from "../services/api";
// import "./Orders.css"; // create this CSS file for styles

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="container py-5">
  <div className="orders-container p-4 rounded shadow-sm">

    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 && (
        <p className="no-orders">You have not placed any orders yet.</p>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h5>Order ID: <span className="order-id">{order._id}</span></h5>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p className="order-total">Total: <strong>₹{order.totalAmount}</strong></p>

            <ul className="order-products">
              {order.products.map((item, i) => (
                <li key={i}>
                  {item.productId?.name || "Product"} × {item.quantity}
                </li>
              ))}
            </ul>

            <small className="order-date">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
    </div>
     </div>
  );
}
