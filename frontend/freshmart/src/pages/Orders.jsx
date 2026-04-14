import { useEffect, useState } from "react";
import API from "../services/api";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await API.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {/* 🔄 LOADING */}
      {loading && <p className="loading">Loading orders...</p>}

      {/* ❌ NO TOKEN */}
      {!token && !loading && (
        <p className="no-orders">Please login to see your orders.</p>
      )}

      {/* ❌ NO ORDERS */}
      {!loading && token && orders.length === 0 && (
        <p className="no-orders">
          You have not placed any orders yet.
        </p>
      )}

      <div className="orders-wrapper">
        {orders.map((order) =>
          order.products.map((item, index) => {
            const product = item.productId;

            const productTotal =
              (product?.price || 0) * item.quantity;

            return (
              <div
                key={`${order._id}-${index}`}
                className="order-card"
              >
                {/* 🖼️ IMAGE */}
                <div className="order-left">
                  <img
                    src={
                      product?.image
                        ? `http://localhost:5000/${product.image.replace(
                            /^\//,
                            ""
                          )}`
                        : "/no-image.png"
                    }
                    alt={product?.name || "Product"}
                    className="order-img"
                  />
                </div>

                {/* 📦 DETAILS */}
                <div className="order-middle">
                  <h4 className="product-name">
                    {product?.name || "Product"}
                  </h4>

                  <p className="order-price">
                    ₹{product?.price || 0}
                  </p>

                  <p className="order-qty">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* 📊 ORDER INFO */}
                <div className="order-right">
                  <span
                    className={`status ${
                      order.status
                        ? order.status.toLowerCase()
                        : ""
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>

                  <p className="order-date">
                    Ordered on{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </p>

                  <p className="order-total">
                    Total ₹{productTotal}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}