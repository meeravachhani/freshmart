// import { useState } from "react";
// import "./HomeProducts.css";

// const products = [
//   { id: 1, name: "Tomato", price: "₹50/kg", image: "/images/products/tomato.jpg" },
//   { id: 2, name: "Apple", price: "₹120/kg", image: "/images/products/apple.jpg" },
//   { id: 3, name: "Potato", price: "₹250/pack", image: "/images/products/potato.jpg" },
//   { id: 4, name: "Onion", price: "₹60/kg", image: "/images/products/onion.jpg" },
//   { id: 5, name: "Bananas", price: "₹40/dozen", image: "/images/products/bananas.jpg" },
//   { id: 6, name: "Eggs", price: "₹120/12pcs", image: "/images/products/eggs.jpg" },
//   { id: 7, name: "Tomatoes", price: "₹30/kg", image: "/images/products/tomatoes.jpg" },
//   { id: 8, name: "Milk", price: "₹45/litre", image: "/images/products/milk.jpg" },
//   { id: 9, name: "Wheat Flour", price: "₹35/kg", image: "/images/products/wheat.jpg" },
// ];

// function HomeProducts() {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="home-products">
//       <h2>Our Fresh Picks</h2>
//       <div className="products-grid">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <div className="product-image">
//               <img src={product.image} alt={product.name} />
//             </div>
//             <h4>{product.name}</h4>
//             <p className="price">{product.price}</p>
//             <button onClick={() => addToCart(product)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomeProducts;

import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./HomeProducts.css";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products from backend (LIMIT 4)
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.slice(0, 4)); // show only 4 products
      } catch (err) {
        console.error("Error fetching home products", err);
      }
    };

    fetchHomeProducts();
  }, []);

  // 🔹 Add to Cart (SAME STRUCTURE AS CART PAGE)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price, // number
        image: product.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="home-products">
      <h2>Our Fresh Picks</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
              />
            </div>

            <h4>{product.name}</h4>
            <p className="price">₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
