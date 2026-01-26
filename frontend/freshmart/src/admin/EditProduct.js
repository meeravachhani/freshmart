import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  // 🔹 Load product
  useEffect(() => {
    API.get(`/admin/products/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load product"));
  }, [id]);

  // 🔹 Update product
  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/products/${id}`, form);
      alert("Product updated");
      navigate("/admin/products");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <form className="container mt-4" onSubmit={submit}>
      <h3>Edit Product</h3>

      <input className="form-control mb-2"
        value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
        placeholder="Name" />

      <input className="form-control mb-2"
        value={form.price}
        onChange={e => setForm({...form, price: e.target.value})}
        placeholder="Price" />

      <input className="form-control mb-2"
        value={form.category}
        onChange={e => setForm({...form, category: e.target.value})}
        placeholder="Category" />

      <input className="form-control mb-2"
        value={form.stock}
        onChange={e => setForm({...form, stock: e.target.value})}
        placeholder="Stock" />

      <textarea className="form-control mb-2"
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
        placeholder="Description" />

      <button className="btn btn-primary w-100">Update Product</button>
    </form>
  );
}
