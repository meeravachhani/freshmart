import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="nav">
      <h2>FreshMart 🛒</h2>
  {/* SEARCH */}
   {/* <form onSubmit={handleSearch} className="search-box">
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <span className="search-icon" onClick={handleSearch}>
    🔍
  </span>
</form> */}

<form onSubmit={handleSearch} className="search-box">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <span className="search-icon" onClick={handleSearch}>🔍</span>
</form>



      <div className="navright">
        <Link to="/">Home</Link>

        {/* Products Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Products ▾</button>
          <div className="dropdown-content">
            <Link to="/products">All Products</Link>
            <Link to="/products?category=Vegetables">Vegetables</Link>
            <Link to="/products?category=Fruits">Fruits</Link>
          </div>
        </div>

      

        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
