// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     quantity: "",
//     unit:"",
//     description: "",
//   });

//   // 🔹 Load product
//   useEffect(() => {
//     API.get(`/admin/products/${id}`)
//       .then((res) => setForm(res.data))
//       .catch(() => alert("Failed to load product"));
//   }, [id]);

//   // 🔹 Update product
//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/admin/products/${id}`, form);
//       alert("Product updated");
//       navigate("/admin/products");
//     } catch {
//       alert("Update failed");
//     }
//   };

//   return (
//     <form className="container mt-4" onSubmit={submit}>
//       <h3>Edit Product</h3>

//       <input className="form-control mb-2"
//         value={form.name}
//         onChange={e => setForm({...form, name: e.target.value})}
//         placeholder="Name" />

//       <input className="form-control mb-2"
//         value={form.price}
//         onChange={e => setForm({...form, price: e.target.value})}
//         placeholder="Price" />

//       <input className="form-control mb-2"
//         value={form.category}
//         onChange={e => setForm({...form, category: e.target.value})}
//         placeholder="Category" />

//       <input className="form-control mb-2"
//         value={form.quantity}
//         onChange={e => setForm({...form, quantity: e.target.value})}
//         placeholder="quantity" />

//         <input className="form-control mb-2"
//         value={form.unit}
//         onChange={e => setForm({...form, unit: e.target.value})}
//         placeholder="unit" />

//       <textarea className="form-control mb-2"
//         value={form.description}
//         onChange={e => setForm({...form, description: e.target.value})}
//         placeholder="Description" />

//       <button className="btn btn-primary w-100">Update Product</button>
//     </form>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    unit: "",
    description: "",
    isOffer: false,
    offerTag: "",
    discountPercent: "",
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");



  // 🔹 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
      setOldImage(res.data.image);
    };
    fetchProduct();
  }, [id]);

  // 🔹 Submit update
  const submit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // Object.keys(form).forEach((key) => {
    //   data.append(key, form[key]);
    // });


const data = new FormData();

Object.keys(form).forEach((key) => {
  if (key === "discountPercent" && !form.isOffer) return;
  if (key === "offerTag" && !form.isOffer) return;

  data.append(key, form[key]);
});


    if (image) {
      data.append("image", image);
    }

    await API.put(`/products/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product updated successfully ✅");
    navigate("/admin/products");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>

      <form onSubmit={submit}>
        {/* Name */}
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Price */}
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        {/* Category */}
        {/* <input
          className="form-control mb-2"
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        /> */}


<select
            // className="form-select mb-3"
            className="form-control"
            value={form.category}            
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
            
          >
            <option value="">Select category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Masala">Masala</option>
            <option value="Atta">Atta</option>
            <option value="Rice">Rice</option>
            <option value="Dry Fruits">Dry Fruits</option>
            <option value="Oils Ghee">Oils & Ghee</option>
            <option value="Dairy Bakery">Dairy & Bakery</option>
            <option value="Beverages">Beverages</option>           
            <option value="Snacks">Snacks</option>
            <option value="household cleaning">household & cleaning</option>
            <option value="personal care">personal care</option>
           
          </select>

        {/* Quantity */}
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        {/* Unit */}
        <select
          className="form-control"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          required
        >
          <option value="">Select Unit</option>
          <option value="kg">Kg</option>
          <option value="gram">Gram</option>
          <option value="liter">Liter</option>
          <option value="ml">ML</option>
          <option value="piece">Piece</option>
        </select>

        {/* Description */}
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Old Image Preview */}
        {oldImage && (
          <div className="mb-2">
            <p>Current Image:</p>
            <img
              src={`http://localhost:5000/${oldImage}`}
              alt="product"
              width="120"
            />
          </div>
        )}

        {/* New Image */}
        <input
          className="form-control mb-2"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Offer Checkbox */}
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={form.isOffer}
            onChange={(e) =>
              setForm({ ...form, isOffer: e.target.checked })
            }
          />
          <label className="form-check-label">Is Offer</label>
        </div>

        {/* Offer Fields */}
        {form.isOffer && (
          <>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Offer Tag (ex: SALE)"
              value={form.offerTag}
              onChange={(e) =>
                setForm({ ...form, offerTag: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              type="number"
              placeholder="Discount %"
              value={form.discountPercent}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountPercent: e.target.value,
                })
              }
            />
          </>
        )}

        <button className="btn btn-primary w-100">
          Update Product
        </button>
      </form>
    </div>
  );
}
