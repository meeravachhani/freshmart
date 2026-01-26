// import { useEffect, useState } from "react";
// import API from "../services/api";
// // import "./AdminOrders.css";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     API.get("/admin/orders")
//       .then((res) => setOrders(res.data))
//       .catch(() => alert("Failed to load orders"));
//   }, []);

//   return (
//     <div className="container mt-4 admin-orders">
//       <div className="card shadow">
//         <div className="card-header bg-black text-white d-flex justify-content-between align-items-center">
//           <h5 className="mb-0">📦 Order Management</h5>
//           <span className="badge bg-success">
//             Total Orders: {orders.length}
//           </span>
//         </div>

//         <div className="card-body p-0">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>No.</th>
//                 <th>User</th>
//                 <th>Total Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.length > 0 ? (
//                 orders.map((o, index) => (
//                   <tr key={o._id}>
//                     <td>{index + 1}</td>
//                     <td>{o.userId?.name || "Guest"}</td>
//                     <td>₹{o.totalAmount}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           o.status === "Delivered"
//                             ? "bg-success"
//                             : o.status === "Cancelled"
//                             ? "bg-danger"
//                             : "bg-warning text-dark"
//                         }`}
//                       >
//                         {o.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4">
//                     No orders found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // 🔴 get logged-in user
  // const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch {
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔴 ADMIN STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
      fetchOrders();
    } catch {
      alert("Status update failed");
    }
  };

  return (
    <div className="container mt-4 admin-orders">
      <div className="card shadow">
        <div className="card-header bg-black text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📦 Order Management</h5>
          <span className="badge bg-success">
            Total Orders: {orders.length}
          </span>
        </div>

        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>User</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((o, index) => (
                  <tr key={o._id}>
                    <td>{index + 1}</td>
                    <td>{o.userId?.name || "Guest"}</td>
                    <td>₹{o.totalAmount}</td>

                    {/* 🔒 STATUS COLUMN */}
                    {/* <td>
  {user?.role?.toLowerCase() === "admin" ? (
    <select
      className="form-select form-select-sm w-auto"
      value={o.status}
      onChange={(e) => updateStatus(o._id, e.target.value)}
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  ) : (
    <span
      className={`badge ${
        o.status === "Delivered"
          ? "bg-success"
          : o.status === "Cancelled"
          ? "bg-danger"
          : "bg-warning text-dark"
      }`}
    >
      {o.status}
    </span>
  )}
</td> */}
<td>
  <select
    className="form-select form-select-sm w-auto"
    value={o.status}
    onChange={(e) => updateStatus(o._id, e.target.value)}
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
