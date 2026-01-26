import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // 🔹 Get query params from URL
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const search = query.get("search");

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        let data = res.data;

        // 🔹 Filter by category
        if (category) {
          data = data.filter(
            (item) =>
              item.category.toLowerCase() === category.toLowerCase()
          );
        }

        // 🔹 Filter by search text (name or category)
        if (search) {
          data = data.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.category.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, [category, search]); // ✅ BOTH DEPENDENCIES

  // 🔹 Add to Cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((i) => i._id === product._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {search
          ? `Search results for "${search}"`
          : category
          ? category
          : "All Products"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length === 0 && <p>No products found</p>}

        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              style={{ width: "120px", height: "120px" }}
            />

            <h4>{product.name}</h4>
            <p>₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


// import ProductList from '../components/ProductList';

// function Products() {
//   return <ProductList />;
// }

// export default Products;