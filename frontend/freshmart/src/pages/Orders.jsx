// import { useEffect, useState } from "react";
// import API from "../services/api";
// // import "./Orders.css"; // create this CSS file for styles

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await API.get("/orders/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   return (
//     <div className="container py-5">
//   <div className="orders-container p-4 rounded shadow-sm">

//     <div className="orders-container">
//       <h2 className="orders-title">My Orders</h2>

//       {orders.length === 0 && (
//         <p className="no-orders">You have not placed any orders yet.</p>
//       )}

//       <div className="orders-list">
//         {orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <div className="order-header">
//               <h5>Order ID: <span className="order-id">{order._id}</span></h5>
//               <span className={`status ${order.status.toLowerCase()}`}>
//                 {order.status}
//               </span>
//             </div>

//             <p className="order-total">Total: <strong>₹{order.totalAmount}</strong></p>

//             <ul className="order-products">
//               {order.products.map((item, i) => (
//                 <li key={i}>
//                   {item.productId?.name || "Product"} × {item.quantity}
//                 </li>
//               ))}
//             </ul>

//             <small className="order-date">
//               Ordered on {new Date(order.createdAt).toLocaleDateString()}
//             </small>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//      </div>
//   );
// }



// import { useEffect, useState } from "react";
// import API from "../services/api";
// import "./Orders.css";

// export default function Orders() {

//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {

//     const fetchOrders = async () => {
//       try {

//         const res = await API.get("/orders/my", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setOrders(res.data);

//       } catch (err) {
//         console.error("Order fetch error:", err);
//       }
//     };

//     fetchOrders();

//   }, [token]);



//   return (

// <div className="orders-page">

// <h2 className="orders-title">My Orders</h2>

// {orders.length === 0 && (
// <p className="no-orders">You have not placed any orders yet.</p>
// )}

// <div className="orders-wrapper">

// {orders.map((order) => (

// order.products.map((item, index) => {

// const product = item.productId;

// return (

// <div key={`${order._id}-${index}`} className="order-card">

// {/* PRODUCT IMAGE */}
// <div className="order-left">

// <img
// src={product?.image || "/no-image.png"}
// alt={product?.name || "Product"}
// className="order-img"
// />

// </div>


// {/* PRODUCT DETAILS */}
// <div className="order-middle">

// <h4 className="product-name">
// {product?.name || "Product"}
// </h4>

// <p className="order-price">
// ₹{product?.price || 0}
// </p>

// <p className="order-qty">
// Qty: {item.quantity}
// </p>

// </div>


// {/* ORDER STATUS */}
// <div className="order-right">

// <span className={`order-status ${order.status?.toLowerCase()}`}>
// {order.status}
// </span>

// <p className="order-date">
// Ordered on {new Date(order.createdAt).toLocaleDateString()}
// </p>

// <p className="order-total">
// Total ₹{order.totalAmount}
// </p>

// </div>

// </div>

// );

// })

// ))}

// </div>

// </div>

//   );
// }




// import { useEffect, useState } from "react";
// import API from "../services/api";
// import "./Orders.css";

// export default function Orders() {

//   const [orders, setOrders] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {

//     const fetchOrders = async () => {

//       try {

//         const res = await API.get("/orders/my", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setOrders(res.data);

//       } catch (err) {

//         console.error("Error fetching orders:", err);

//       }

//     };

//     fetchOrders();

//   }, [token]);


//   return (

//     <div className="orders-page">

//       <h2 className="orders-title">My Orders</h2>

//       {orders.length === 0 && (
//         <p className="no-orders">
//           You have not placed any orders yet.
//         </p>
//       )}

//       <div className="orders-wrapper">

//         {orders.map((order) => (

//           order.products.map((item, index) => {

//             const product = item.productId;

//             const productTotal =
//               (product?.price || 0) * item.quantity;

//             return (

//               <div
//                 key={`${order._id}-${index}`}
//                 className="order-card"
//               >

//                 {/* PRODUCT IMAGE */}

//                 <div className="order-left">
// {/* 
//                   <img
//                     src={product?.image || "/no-image.png"}
//                     alt={product?.name || "Product"}
//                     className="order-img"
//                   /> */}

//                   <img
//   src={
//     product?.image
//       ? `http://localhost:5000/${product.image.replace(/^\//,"")}`
//       : "/no-image.png"
//   }
//   alt={product?.name || "Product"}
//   className="order-img"
// />

//                 </div>


//                 {/* PRODUCT DETAILS */}

//                 <div className="order-middle">

//                   <h4 className="product-name">
//                     {product?.name || "Product"}
//                   </h4>

//                   <p className="order-price">
//                     ₹{product?.price || 0}
//                   </p>

//                   <p className="order-qty">
//                     Quantity: {item.quantity}
//                   </p>

//                 </div>


//                 {/* ORDER INFO */}

//                 <div className="order-right">

//                   <span
//                     className={`status ${order.status?.toLowerCase()}`}
//                   >
//                     {order.status}
//                   </span>

//                   <p className="order-date">
//                     Ordered on{" "}
//                     {new Date(order.createdAt)
//                       .toLocaleDateString()}
//                   </p>

//                   <p className="order-total">
//                     Total ₹{productTotal}
//                   </p>
     
//                 </div>

//               </div>

//             );

//           })

//         ))}

//       </div>

//     </div>

//   );

// }

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