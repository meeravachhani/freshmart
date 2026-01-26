
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // Products dropdown state
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navcolor shadow-sm">
      <div className="container-fluid">
        {/* BRAND */}
        <Link className="navbar-brand fw-bold text-success" to="/">
          FreshMart 🛒
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#freshmartNavbar"
          aria-controls="freshmartNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}
        <div className="collapse navbar-collapse" id="freshmartNavbar">
          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* PRODUCTS DROPDOWN */}
            <li className="nav-item dropdown">
              <button
                className="nav-link btn btn-link dropdown-toggle"
                type="button"
                onClick={() => setOpen(!open)}
                style={{ textDecoration: "none" }}
              >
                Products
              </button>
              {open && (
                <ul className="dropdown-menu show">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/products"
                      onClick={() => setOpen(false)}
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/products?category=Vegetables"
                      onClick={() => setOpen(false)}
                    >
                      Vegetables
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/products?category=Fruits"
                      onClick={() => setOpen(false)}
                    >
                      Fruits
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">My Orders</Link>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-danger" to="/admin/dashboard">
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* SEARCH FORM */}
          <form className="d-flex me-2 my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control me-2 w-auto"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* AUTH BUTTONS */}
          {!token ? (
            <Link to="/login" className="btn btn-success">Login</Link>
          ) : (
            <button onClick={logout} className="btn btn-outline-danger">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
