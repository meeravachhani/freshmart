import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔴 DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/admin/products/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Products</h2>

        {/* ✅ ADD PRODUCT BUTTON */}
        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th width="150">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No products found
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={`http://localhost:5000${p.image}`}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover" }}
                  alt={p.name}
                />
              </td>

              <td>{p.name}</td>
              <td>₹{p.price}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(`/admin/products/edit/${p._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p._id)}
                >
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
