import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRegister from "./admin/AdminRegister";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/orders" element={<AdminOrders />} />
<Route path="/admin/users" element={<AdminUsers />} />
{/* <Route path="/admin/products" element={<AddProduct />} /> */}
  <Route path="/admin/users" element={<AdminUsers />} />
  <Route path="/admin/products/add" element={<AddProduct />} />
<Route path="/admin/products/edit/:id" element={<EditProduct />} />
<Route path="/wishlist" element={<Wishlist />} />
<Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;


// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import Checkout from './pages/Checkout';
// import Login from './components/Login';
// import Register from './components/Register';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // For interactive components like modals

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;