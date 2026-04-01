import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // ===== STATES =====
  const [search, setSearch] = useState("");
  const [productOpen, setProductOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ===== REFS =====
  const productRef = useRef(null);
  const profileRef = useRef(null);

  // ===== USER =====
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  // const userName = localStorage.getItem("userName");

  // ===== CLOSE DROPDOWN ON OUTSIDE CLICK =====
  useEffect(() => {
    const handler = (e) => {
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // =========================
  // 🛒 CART COUNT (USER-WISE)
  // =========================
  useEffect(() => {
    const loadCart = () => {
      if (!userId) {
        setCartCount(0);
        return;
      }

      const cart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

      const totalQty = cart.reduce(
        (sum, item) => sum + item.qty,
        0
      );

      setCartCount(totalQty);
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  // =========================
  // ❤️ WISHLIST COUNT (USER-WISE)
  // =========================
  useEffect(() => {
    const loadWishlist = () => {
      if (!userId) {
        setWishlistCount(0);
        return;
      }

      const list =
        JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

      setWishlistCount(list.length);
    };

    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);
    return () =>
      window.removeEventListener("wishlistUpdated", loadWishlist);
  }, [userId]);

  // ===== SEARCH =====
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  // ===== NAV HELPER =====
  const go = (path) => {
    setProductOpen(false);
    setProfileOpen(false);
    navigate(path);
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    go("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navcolor shadow-sm">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-success" to="/">
          FreshMart 🛒
        </Link>

        <div className="collapse navbar-collapse show">

          {/* ================= LEFT SIDE ================= */}
          <ul className="navbar-nav me-auto align-items-lg-center">

            <li className="nav-item">
              <button className="nav-link btn" onClick={() => go("/")}>
                Home
              </button>
            </li>

            {/* PRODUCTS DROPDOWN */}
            <li
              ref={productRef}
              className="nav-item dropdown position-relative"
            >
              <button
                className="nav-link btn dropdown-toggle"
                onClick={() => setProductOpen(!productOpen)}
              >
                Products
              </button>

              {productOpen && (
                <ul className="dropdown-menu show">
                  <li><button className="dropdown-item" onClick={() => go("/products")}>All Products</button></li>
                  <li><button className="dropdown-item" onClick={() => go("/products?category=Vegetables")}>Vegetables</button></li>
                  <li><button className="dropdown-item" onClick={() => go("/products?category=Fruits")}>Fruits</button></li>
                  <li><button className="dropdown-item" onClick={() => go("/products?category=DryFruits")}>Dry Fruits</button></li>
                </ul>
              )}
            </li>

            {/* 🛒 CART */}
            {token && (
              <li className="nav-item position-relative">
                <button
                  className="nav-link btn position-relative"
                  onClick={() => go("/cart")}
                >
                  <i className="fas fa-shopping-cart fs-5"></i>

                  {cartCount > 0 && (
                    <span className="nav-badge">
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            )}

            {/* ❤️ WISHLIST */}
            {token && (
              <li className="nav-item position-relative">
                <button
                  className="nav-link btn position-relative"
                  onClick={() => go("/wishlist")}
                >
                  <i className="fas fa-heart fs-5 text-danger"></i>

                  {wishlistCount > 0 && (
                    <span className="nav-badge wishlist-badge">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => go("/orders")}>
                  My Orders
                </button>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <button
                  className="nav-link btn text-danger fw-bold"
                  onClick={() => go("/admin/dashboard")}
                >
                  Admin
                </button>
              </li>
            )}
          </ul>

          {/* ================= RIGHT SIDE ================= */}

          {/* SEARCH */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>


          {/* PROFILE ICON */}
          {token ? (
            <div ref={profileRef} className="position-relative">
              <button
                className="profile-circle-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                👤
              </button>

              {profileOpen && (
                <div className="custom-dropdown">
                  {role !== "admin" && (
                    <button onClick={() => go("/profile")}>
                      View Profile
                    </button>
                  )}
                  <button
                    className="text-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}





// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ IMPORTANT
// import "./Navbar.css";

// export default function Navbar() {
//   const navigate = useNavigate();

//   // ===== STATES =====
//   const [search, setSearch] = useState("");
//   const [productOpen, setProductOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   // ===== REFS =====
//   const productRef = useRef(null);
//   const profileRef = useRef(null);

//   // ===== USER =====
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("userId");
//   const userName = localStorage.getItem("userName");

//   // ===== CLOSE DROPDOWN =====
//   useEffect(() => {
//     const handler = (e) => {
//       if (productRef.current && !productRef.current.contains(e.target)) {
//         setProductOpen(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ===== CART =====
//   useEffect(() => {
//     const loadCart = () => {
//       if (!userId) return setCartCount(0);

//       const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
//       const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
//       setCartCount(totalQty);
//     };

//     loadCart();
//     window.addEventListener("cartUpdated", loadCart);
//     return () => window.removeEventListener("cartUpdated", loadCart);
//   }, [userId]);

//   // ===== WISHLIST =====
//   useEffect(() => {
//     const loadWishlist = () => {
//       if (!userId) return setWishlistCount(0);

//       const list = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
//       setWishlistCount(list.length);
//     };

//     loadWishlist();
//     window.addEventListener("wishlistUpdated", loadWishlist);
//     return () => window.removeEventListener("wishlistUpdated", loadWishlist);
//   }, [userId]);

//   // ===== SEARCH =====
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//     }
//   };

//   const go = (path) => {
//     setProductOpen(false);
//     setProfileOpen(false);
//     navigate(path);
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navcolor shadow-sm">
//       <div className="container-fluid">

//         {/* LOGO */}
//         <Link className="navbar-brand fw-bold text-success" to="/">
//           FreshMart 🛒
//         </Link>

//         {/* ✅ MOBILE TOGGLE */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* ✅ COLLAPSE */}
//         <div className="collapse navbar-collapse" id="navbarContent">

//           {/* LEFT */}
//           <ul className="navbar-nav me-auto align-items-lg-center">

//             <li className="nav-item">
//               <button className="nav-link btn" onClick={() => go("/")}>
//                 Home
//               </button>
//             </li>

//             {/* PRODUCTS */}
//             <li ref={productRef} className="nav-item position-relative">
//               <button
//                 className="nav-link btn"
//                 onClick={() => setProductOpen(!productOpen)}
//               >
//                 Products ▾
//               </button>

//               {productOpen && (
//                 <ul className="dropdown-menu show">
//                   <li><button className="dropdown-item" onClick={() => go("/products")}>All</button></li>
//                   <li><button className="dropdown-item" onClick={() => go("/products?category=Vegetables")}>Vegetables</button></li>
//                   <li><button className="dropdown-item" onClick={() => go("/products?category=Fruits")}>Fruits</button></li>
//                   <li><button className="dropdown-item" onClick={() => go("/products?category=DryFruits")}>Dry Fruits</button></li>
//                 </ul>
//               )}
//             </li>

//             {/* CART */}
//             {token && (
//               <li className="nav-item position-relative">
//                 <button className="nav-link btn" onClick={() => go("/cart")}>
//                   🛒
//                   {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
//                 </button>
//               </li>
//             )}

//             {/* WISHLIST */}
//             {token && (
//               <li className="nav-item position-relative">
//                 <button className="nav-link btn" onClick={() => go("/wishlist")}>
//                   ❤️
//                   {wishlistCount > 0 && (
//                     <span className="nav-badge wishlist-badge">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>
//               </li>
//             )}

//             {token && (
//               <li className="nav-item">
//                 <button className="nav-link btn" onClick={() => go("/orders")}>
//                   My Orders
//                 </button>
//               </li>
//             )}

//             {role === "admin" && (
//               <li className="nav-item">
//                 <button
//                   className="nav-link btn text-danger fw-bold"
//                   onClick={() => go("/admin/dashboard")}
//                 >
//                   Admin
//                 </button>
//               </li>
//             )}
//           </ul>

//           {/* RIGHT */}
//           <form className="d-flex me-3" onSubmit={handleSearch}>
//             <input
//               className="form-control"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </form>

//           {/* PROFILE */}
//           {token ? (
//             <div ref={profileRef} className="position-relative">
//               <button
//                 className="profile-circle-btn"
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 {userName ? userName.charAt(0).toUpperCase() : "👤"}
//               </button>

//               {profileOpen && (
//                 <div className="custom-dropdown">
//                   {role !== "admin" && (
//                     <button onClick={() => go("/profile")}>
//                       View Profile
//                     </button>
//                   )}
//                   <button className="text-danger" onClick={logout}>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className="btn btn-success">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


