import { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data));
  }, []);

  const del = async (id) => {
    await API.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Manage Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>
                <img src={`http://localhost:5000${p.image}`} width="50" />
              </td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => del(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
