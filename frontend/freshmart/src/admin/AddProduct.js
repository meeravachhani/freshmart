// import { useState } from "react";
// import API from "../services/api";

// export default function AddProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     quantity: "",
//     description: "",
//   });
//   const [image, setImage] = useState(null);

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select an image");
//       return;
//     }

//     const data = new FormData();
//     Object.keys(form).forEach((k) => data.append(k, form[k]));
//     data.append("image", image);

//     try {
//       await API.post("/admin/products", data);
//       alert("Product added successfully ✅");
//     } catch (err) {
//       alert(err.response?.data?.message || "Add product failed ❌");
//     }
//   };

//   return (
//     <form className="container mt-4" onSubmit={submit}>
//       <h3>Add Product</h3>

//       <input className="form-control mb-2" placeholder="Name"
//         onChange={(e) => setForm({ ...form, name: e.target.value })} />

//       <input className="form-control mb-2" placeholder="Price"
//         onChange={(e) => setForm({ ...form, price: e.target.value })} />

//       <input className="form-control mb-2" placeholder="Category"
//         onChange={(e) => setForm({ ...form, category: e.target.value })} />

//       <input className="form-control mb-2" placeholder="quantity"
//         onChange={(e) => setForm({ ...form, quantity: e.target.value })} />

//       <textarea className="form-control mb-2" placeholder="Description"
//         onChange={(e) => setForm({ ...form, description: e.target.value })} />

//       <input type="file" className="form-control mb-3"
//         onChange={(e) => setImage(e.target.files[0])} />

//       <button className="btn btn-success w-100">
//         Add Product
//       </button>
//     </form>
//   );
// }







import { useState } from "react";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    isOffer: false,
    offerTag: "",
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

      // reset form
      setForm({
        name: "",
        price: "",
        category: "",
        quantity: "",
        description: "",
        isOffer: false,
        offerTag: "",
      });
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Add product failed ❌");
    }
  };

  return (
    <form className="container mt-4" onSubmit={submit}>
      <h3 className="mb-3">Add Product</h3>

      <input
        className="form-control mb-2"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Category (Vegetables, Fruits, etc.)"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        required
      />

      <textarea
        className="form-control mb-3"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* 🔥 OFFER CONTROLS */}
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={form.isOffer}
          onChange={(e) =>
            setForm({ ...form, isOffer: e.target.checked })
          }
        />
        <label className="form-check-label">
          Is this an offer product?
        </label>
      </div>

      {form.isOffer && (
        <select
          className="form-select mb-3"
          value={form.offerTag}
          onChange={(e) =>
            setForm({ ...form, offerTag: e.target.value })
          }
          required
        >
          <option value="">Select Offer Type</option>
          <option value="fresh-vegetables">Fresh Vegetables</option>
          <option value="fruits-offer">Fruits Bonanza</option>
          <option value="daily-essentials">Daily Essentials</option>
        </select>
      )}

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <button className="btn btn-success w-100">
        Add Product
      </button>
    </form>
  );
}
