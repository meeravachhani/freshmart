// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import Wishlist from "./pages/Wishlist";
// import ProductDetails from "./pages/ProductDetails";

// import AdminLogin from "./admin/AdminLogin";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminRegister from "./admin/AdminRegister";
// import AdminProducts from "./admin/AdminProducts";
// import AdminOrders from "./admin/AdminOrders";
// import AdminUsers from "./admin/AdminUsers";
// import AddProduct from "./admin/AddProduct";
// import EditProduct from "./admin/EditProduct";
// import Address from "./pages/Address";
// import Profile from "./pages/Profile";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./index.css";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/address" element={<Address />} />
//         <Route path="/profile" element={<Profile />} />
        

//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/product/:id" element={<ProductDetails />} />

//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/register" element={<AdminRegister />} />
//         <Route path="/admin/products" element={<AdminProducts />} />
//         <Route path="/admin/products/add" element={<AddProduct />} />
//         <Route path="/admin/products/edit/:id" element={<EditProduct />} />
//         <Route path="/admin/orders" element={<AdminOrders />} />
//         <Route path="/admin/users" element={<AdminUsers />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



import React from "react";
import { Routes, Route } from "react-router-dom";

// --- LAYOUT COMPONENTS ---
import Navbar from "./components/Navbar";

// --- USER PAGES ---
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword"; // 🔥 New
import ResetPassword from "./pages/ResetPassword";   // 🔥 New
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
// --- ADMIN PAGES ---
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRegister from "./admin/AdminRegister";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";

// --- STYLES ---
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/address" element={<Address />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </>
  );
}

export default App;