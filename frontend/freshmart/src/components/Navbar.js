
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css";

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false); // Products dropdown state
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//     }
//   };

//   const logout = () => {
//     // localStorage.clear();
//     localStorage.removeItem("token");
// localStorage.removeItem("userId");

//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navcolor shadow-sm">
//       <div className="container-fluid">
//         {/* BRAND */}
//         <Link className="navbar-brand fw-bold text-success" to="/">
//           FreshMart 🛒
//         </Link>

//         {/* MOBILE TOGGLE */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#freshmartNavbar"
//           aria-controls="freshmartNavbar"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* NAV ITEMS */}
//         <div className="collapse navbar-collapse" id="freshmartNavbar">
//           {/* LEFT MENU */}
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             {/* PRODUCTS DROPDOWN */}
//             <li className="nav-item dropdown">
//               <button
//                 className="nav-link btn btn-link dropdown-toggle"
//                 type="button"
//                 onClick={() => setOpen(!open)}
//                 style={{ textDecoration: "none" }}
//               >
//                 Products
//               </button>
//               {open && (
//                 <ul className="dropdown-menu show">
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/products"
//                       onClick={() => setOpen(false)}
//                     >
//                       All Products
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/products?category=Vegetables"
//                       onClick={() => setOpen(false)}
//                     >
//                       Vegetables
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/products?category=Fruits"
//                       onClick={() => setOpen(false)}
//                     >
//                       Fruits
//                     </Link>
//                   </li>
//                    <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/products?category=Fruits"
//                       onClick={() => setOpen(false)}
//                     >
//                       dryfruits
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">Cart</Link>
//             </li>

//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/orders">My Orders</Link>
//               </li>
//             )}

//             {role === "admin" && (
//               <li className="nav-item">
//                 <Link className="nav-link fw-bold text-danger" to="/admin/dashboard">
//                   Admin
//                 </Link>
//               </li>
//             )}
//           </ul>

//           {/* SEARCH FORM */}
//           <form className="d-flex me-2 my-2 my-lg-0" onSubmit={handleSearch}>
//             <input
//               className="form-control me-2 w-auto"
//               type="search"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </form>

//           {/* AUTH BUTTONS */}
//           {!token ? (
//             <Link to="/login" className="btn btn-success">Login</Link>
//           ) : (
//             <button onClick={logout} className="btn btn-outline-danger">Logout</button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // ❤️ Wishlist count
  useEffect(() => {
    const loadWishlistCount = () => {
      if (!userId) {
        setWishlistCount(0);
        return;
      }
      const list =
        JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
      setWishlistCount(list.length);
    };

    loadWishlistCount();
    window.addEventListener("wishlistUpdated", loadWishlistCount);

    return () =>
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlistCount
      );
  }, [userId]);

  // 🛒 Cart count
  useEffect(() => {
    const loadCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const totalQty = cart.reduce(
        (sum, item) => sum + item.qty,
        0
      );

      setCartCount(totalQty);
    };

    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);

    return () =>
      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navcolor shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to="/">
          FreshMart 🛒
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#freshmartNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="freshmartNavbar">
          <ul className="navbar-nav me-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item dropdown">
              <button
                className="nav-link btn btn-link dropdown-toggle"
                onClick={() => setOpen(!open)}
                style={{ textDecoration: "none" }}
              >
                Products
              </button>
              {open && (
                <ul className="dropdown-menu show">
                  <li><Link className="dropdown-item" to="/products">All Products</Link></li>
                  <li><Link className="dropdown-item" to="/products?category=Vegetables">Vegetables</Link></li>
                  <li><Link className="dropdown-item" to="/products?category=Fruits">Fruits</Link></li>
                  <li><Link className="dropdown-item" to="/products?category=DryFruits">Dry Fruits</Link></li>
                </ul>
              )}
            </li>

            {/* 🛒 CART */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                Cart
                {cartCount > 0 && (
                  <span className="nav-badge">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* ❤️ WISHLIST */}
            {token && (
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="nav-badge wishlist-badge">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">My Orders</Link>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold text-danger"
                  to="/admin/dashboard"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* SEARCH */}
          <form className="d-flex me-2" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {!token ? (
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          ) : (
            <button onClick={logout} className="btn btn-outline-danger">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}


// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css";

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("userId");

//   // 🔁 Load wishlist count
//   useEffect(() => {
//     const loadWishlistCount = () => {
//       if (!userId) {
//         setWishlistCount(0);
//         return;
//       }
//       const list =
//         JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//       setWishlistCount(list.length);
//     };

//     loadWishlistCount();
//     window.addEventListener("wishlistUpdated", loadWishlistCount);

//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlistCount);
//   }, [userId]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//     }
//   };

//   const logout = () => {
//     // ❗ DO NOT clear wishlist
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");

//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navcolor shadow-sm">
//       <div className="container-fluid">
//         {/* BRAND */}
//         <Link className="navbar-brand fw-bold text-success" to="/">
//           FreshMart 🛒
//         </Link>

//         {/* TOGGLER */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#freshmartNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* NAV */}
//         <div className="collapse navbar-collapse" id="freshmartNavbar">
//           <ul className="navbar-nav me-auto align-items-lg-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             {/* PRODUCTS */}
//             <li className="nav-item dropdown">
//               <button
//                 className="nav-link btn btn-link dropdown-toggle"
//                 onClick={() => setOpen(!open)}
//                 style={{ textDecoration: "none" }}
//               >
//                 Products
//               </button>
//               {open && (
//                 <ul className="dropdown-menu show">
//                   <li><Link className="dropdown-item" to="/products">All Products</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Vegetables">Vegetables</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Fruits">Fruits</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=DryFruits">Dry Fruits</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">Cart</Link>
//             </li>

//             {/* ❤️ WISHLIST */}
//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/wishlist">
//                   Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
//                 </Link>
//               </li>
//             )}

//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/orders">My Orders</Link>
//               </li>
//             )}

//             {role === "admin" && (
//               <li className="nav-item">
//                 <Link
//                   className="nav-link fw-bold text-danger"
//                   to="/admin/dashboard"
//                 >
//                   Admin
//                 </Link>
//               </li>
//             )}
//           </ul>

//           {/* SEARCH */}
//           <form className="d-flex me-2" onSubmit={handleSearch}>
//             <input
//               className="form-control"
//               type="search"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </form>

//           {/* AUTH */}
//           {!token ? (
//             <Link to="/login" className="btn btn-success">
//               Login
//             </Link>
//           ) : (
//             <button onClick={logout} className="btn btn-outline-danger">
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }





// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css";

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("userId");

//   // 🔄 Update wishlist count
//   useEffect(() => {
//     const updateWishlist = () => {
//       if (!userId) return setWishlistCount(0);
//       const list =
//         JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//       setWishlistCount(list.length);
//     };

//     updateWishlist();
//     window.addEventListener("wishlistUpdated", updateWishlist);

//     return () =>
//       window.removeEventListener("wishlistUpdated", updateWishlist);
//   }, [userId]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navcolor shadow-sm">
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold text-success" to="/">
//           FreshMart 🛒
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#freshmartNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="freshmartNavbar">
//           <ul className="navbar-nav me-auto align-items-lg-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             {/* Products */}
//             <li className="nav-item dropdown">
//               <button
//                 className="nav-link btn btn-link dropdown-toggle"
//                 onClick={() => setOpen(!open)}
//               >
//                 Products
//               </button>
//               {open && (
//                 <ul className="dropdown-menu show">
//                   <li><Link className="dropdown-item" to="/products">All</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Vegetables">Vegetables</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Fruits">Fruits</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=DryFruits">Dry Fruits</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">Cart</Link>
//             </li>

//             {token && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/wishlist">
//                     Wishlist ({wishlistCount})
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link className="nav-link" to="/orders">My Orders</Link>
//                 </li>
//               </>
//             )}

//             {role === "admin" && (
//               <li className="nav-item">
//                 <Link className="nav-link text-danger fw-bold" to="/admin/dashboard">
//                   Admin
//                 </Link>
//               </li>
//             )}
//           </ul>

//           <form className="d-flex me-2" onSubmit={handleSearch}>
//             <input
//               className="form-control"
//               type="search"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </form>

//           {!token ? (
//             <Link to="/login" className="btn btn-success">Login</Link>
//           ) : (
//             <button onClick={logout} className="btn btn-outline-danger">
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }






// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Navbar.css";

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("userId");

//   // 🔄 Load wishlist count for logged-in user
//   const loadWishlistCount = () => {
//     if (!userId) return;
//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//     setWishlistCount(list.length);
//   };

//   useEffect(() => {
//     loadWishlistCount();

//     // listen wishlist update
//     window.addEventListener("wishlistUpdated", loadWishlistCount);
//     return () =>
//       window.removeEventListener("wishlistUpdated", loadWishlistCount);
//   }, [userId]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navcolor shadow-sm">
//       <div className="container-fluid">
//         {/* BRAND */}
//         <Link className="navbar-brand fw-bold text-success" to="/">
//           FreshMart 🛒
//         </Link>

//         {/* TOGGLE */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#freshmartNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="freshmartNavbar">
//           {/* LEFT */}
//           <ul className="navbar-nav me-auto align-items-lg-center">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             {/* PRODUCTS */}
//             <li className="nav-item dropdown">
//               <button
//                 className="nav-link btn btn-link dropdown-toggle"
//                 onClick={() => setOpen(!open)}
//               >
//                 Products
//               </button>
//               {open && (
//                 <ul className="dropdown-menu show">
//                   <li><Link className="dropdown-item" to="/products">All</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Vegetables">Vegetables</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=Fruits">Fruits</Link></li>
//                   <li><Link className="dropdown-item" to="/products?category=DryFruits">Dry Fruits</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">Cart</Link>
//             </li>

//             {/* ❤️ WISHLIST (TEXT ONLY) */}
//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/wishlist">
//                   Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
//                 </Link>
//               </li>
//             )}

//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/orders">My Orders</Link>
//               </li>
//             )}

//             {role === "admin" && (
//               <li className="nav-item">
//                 <Link className="nav-link text-danger fw-bold" to="/admin/dashboard">
//                   Admin
//                 </Link>
//               </li>
//             )}
//           </ul>

//           {/* SEARCH */}
//           <form className="d-flex me-2" onSubmit={handleSearch}>
//             <input
//               className="form-control"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </form>

//           {/* AUTH */}
//           {!token ? (
//             <Link to="/login" className="btn btn-success">Login</Link>
//           ) : (
//             <button onClick={logout} className="btn btn-outline-danger">
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
