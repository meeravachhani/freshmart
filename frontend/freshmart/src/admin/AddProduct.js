// import { useState } from "react";
// import API from "../services/api";

// export default function AddProduct() {
//   const [form, setForm] = useState({
//     name: "", price: "", category: "", stock: "", description: ""
//   });
//   const [image, setImage] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(form).forEach(k => data.append(k, form[k]));
//     data.append("image", image);

//     const token = localStorage.getItem("token");

//     await API.post("/admin/products", data, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     alert("Product added");
//   };

//   return (
//     <form className="container mt-4" onSubmit={submit}>
//       <h3>Add Product</h3>
//       <input className="form-control mb-2" placeholder="Name"
//         onChange={e => setForm({...form, name: e.target.value})} />
//       <input className="form-control mb-2" placeholder="Price"
//         onChange={e => setForm({...form, price: e.target.value})} />
//       <input className="form-control mb-2" placeholder="Category"
//         onChange={e => setForm({...form, category: e.target.value})} />
//       <input className="form-control mb-2" placeholder="Stock"
//         onChange={e => setForm({...form, stock: e.target.value})} />
//       <textarea className="form-control mb-2" placeholder="Description"
//         onChange={e => setForm({...form, description: e.target.value})} />
//       <input type="file" className="form-control mb-2"
//         onChange={e => setImage(e.target.files[0])} />
//       <button className="btn btn-success">Add Product</button>
//     </form>
//   );
// }







import { useState } from "react";
import API from "../services/api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    data.append("image", image);

    try {
      await API.post("/admin/products", data);
      alert("Product added successfully ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Add product failed ❌");
    }
  };

  return (
    <form className="container mt-4" onSubmit={submit}>
      <h3>Add Product</h3>

      <input className="form-control mb-2" placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input className="form-control mb-2" placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <input className="form-control mb-2" placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <input className="form-control mb-2" placeholder="quantity"
        onChange={(e) => setForm({ ...form, quantity: e.target.value })} />

      <textarea className="form-control mb-2" placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <input type="file" className="form-control mb-3"
        onChange={(e) => setImage(e.target.files[0])} />

      <button className="btn btn-success w-100">
        Add Product
      </button>
    </form>
  );
}
