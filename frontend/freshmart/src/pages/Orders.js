import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="cart-page">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} className="cart-item">
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <small>{new Date(order.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
