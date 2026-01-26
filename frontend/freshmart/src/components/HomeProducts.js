// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function HomeProducts() {
//   const [products, setProducts] = useState([]);

//   // 🔹 Fetch only first 3–4 products
//   useEffect(() => {
//     const fetchHomeProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data.slice(0, 4));
//       } catch (err) {
//         console.error("Error fetching products", err);
//       }
//     };

//     fetchHomeProducts();
//   }, []);

//   // 🔹 Add to cart
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existing = cart.find((item) => item._id === product._id);

//     if (existing) {
//       existing.qty += 1;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${product.name} added to cart`);
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">Our Fresh Picks</h2>

//       <div className="row row-cols-1 row-cols-md-3 g-4">
//         {products.map((product) => (
//           <div className="col" key={product._id}>
//             <div className="card h-100 shadow-sm">
//               {/* ✅ IMAGE FIX */}
//               <img
//                 src={`http://localhost:5000/${product.image.replace(
//                   /^\/?/,
//                   ""
//                 )}`}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ height: "200px", objectFit: "cover" }}
//                 onError={(e) => {
//                   e.target.src = "/no-image.png";
//                 }}
//               />

//               <div className="card-body text-center">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="fw-bold text-success">₹{product.price}</p>
//               </div>

//               <div className="card-footer bg-white border-0 text-center">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         {products.length === 0 && (
//           <p className="text-center">No products found</p>
//         )}
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function HomeProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // 🔹 Categories (FROM public/images)
//   const categories = [
//     { name: "Vegetables", img: "/images/vegetabless.jpg" },
//     { name: "Fruits", img: "/images/fruitss.jpg" },
//     { name: "Masala", img: "/images/masala.jpg" },
//     { name: "Atta", img: "/images/atta.jpg" },
//     { name: "Rice", img: "/images/rice.jpg" },
//     { name: "Dry Fruits", img: "/images/dryfruits.jpg" },
//     { name: "Oils & Ghee", img: "/images/oil&ghee.jpg" },
//     { name: "Dairy & Bakery", img: "/images/dairy&bakery.jpg" },
//     { name: "Beverages", img: "/images/beverages.jpg" },
//     { name: "Snacks & Packaged Food", img: "/images/snack.jpg" },
//     { name: "Chocolates & Confectionery", img: "/images/chocolate.jpg" },   
//     { name: "Household & Personal Care", img: "/images/dryfruits.jpg" },


//   ];

//   // 🔹 Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data.slice(0, 4)); // show only 4
//       } catch (err) {
//         console.error("Error fetching products", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // 🔹 Add to cart
//   const addToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((item) => item._id === product._id);

//     if (existing) {
//       existing.qty += 1;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${product.name} added to cart`);
//   };

//   return (
//     <div className="container my-5">

//       {/* 🔥 CATEGORY SECTION */}
//       <h2 className="text-center mb-4">Shop by Category</h2>

//       <div className="row text-center mb-5">
//         {categories.map((cat) => (
//           <div
//             key={cat.name}
//             className="col-4 col-md-2 mb-3"
//             style={{ cursor: "pointer" }}
//             onClick={() =>
//               navigate(`/products?category=${cat.name}`)
//             }
//           >
//             <div className="p-3 shadow-sm rounded bg-white h-100">
//               <img
//                 src={cat.img}
//                 alt={cat.name}
//                 style={{
//                   width: "160px",
//                   height: "160px",
//                   objectFit: "contain",
//                 }}
//               />
//               <p className="mt-2 fw-semibold">{cat.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 PRODUCTS SECTION */}
//       <h2 className="text-center mb-4">Our Fresh Picks</h2>

//       <div className="row row-cols-1 row-cols-md-4 g-4">
//         {products.map((product) => (
//           <div className="col" key={product._id}>
//             <div className="card h-100 shadow-sm">
//               <img
//                 src={`http://localhost:5000${product.image}`}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ height: "180px", objectFit: "cover" }}
//                 onError={(e) => (e.target.src = "/images/no-image.png")}
//               />

//               <div className="card-body text-center">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="fw-bold text-success">₹{product.price}</p>
//               </div>

//               <div className="card-footer bg-white border-0">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Categories (FROM public/images)
  const categories = [
    { name: "Vegetables", img: "/images/vegetabless.jpg" },
    { name: "Fruits", img: "/images/fruitss.jpg" },
    { name: "Masala", img: "/images/masala.jpg" },
    { name: "Atta", img: "/images/atta.jpg" },
    { name: "Rice", img: "/images/rice.jpg" },
    { name: "Dry Fruits", img: "/images/dryfruits.jpg" },
    { name: "Oils & Ghee", img: "/images/oil&ghee.jpg" },
    { name: "Dairy & Bakery", img: "/images/dairy&bakery.jpg" },
    { name: "Beverages", img: "/images/beverages.jpg" },
    { name: "Snacks & Packaged Food", img: "/images/snack.jpg" },
    { name: "Chocolates & Confectionery", img: "/images/chocolate.jpg" },
    { name: "Household & Personal Care", img: "/images/household.jpg" },
  ];

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.slice(0, 4)); // show only 4 products
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Add to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

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
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="container my-5">

      {/* 🔥 CATEGORY SECTION */}
      <h2 className="text-center mb-4">Shop by Category</h2>

      <div className="row text-center mb-5 g-3 justify-content-center">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="col-6 col-sm-4 col-md-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products?category=${cat.name}`)}
          >
            <div className="p-3 shadow-sm rounded bg-white h-100">
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  margin: "0 auto",
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="img-fluid"
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <p className="mt-2 fw-semibold">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 PRODUCTS SECTION */}
      <h2 className="text-center mb-4">Our Fresh Picks</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000${product.image}`}
                className="card-img-top p-3"
                alt={product.name}
                style={{ height: "150px", objectFit: "contain" }}
                onError={(e) => (e.target.src = "/images/no-image.png")}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="fw-bold text-success">₹{product.price}</p>
              </div>

              <div className="card-footer bg-white border-0">
                <button
                  className="btn btn-success w-100"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
