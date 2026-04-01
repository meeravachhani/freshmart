import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section mt-5">
      <div className="container">
        <div className="row gy-4">

          {/* ===== BRAND ===== */}
          <div className="col-md-4">
            <h4 className="footer-logo">FreshMart 🛒</h4>
            <p className="footer-text">
              FreshMart is your trusted online grocery store delivering
              fresh vegetables, fruits, and daily essentials at your doorstep.
            </p>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div className="col-md-2">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li>Home</li>
              <li>Products</li>
              <li>Offers</li>
              <li>Cart</li>
            </ul>
          </div>

          {/* ===== CATEGORIES ===== */}
          <div className="col-md-3">
            <h6 className="footer-title">Categories</h6>
            <ul className="footer-links">
              <li>Vegetables</li>
              <li>Fruits</li>
              <li>Masala</li>
              <li>Dairy & Bakery</li>
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="col-md-3">
            <h6 className="footer-title">Contact Us</h6>
            <p className="footer-text mb-1">📍 India</p>
            <p className="footer-text mb-1">📞 +91 98765 43210</p>
            <p className="footer-text">✉️ support@freshmart.com</p>
          </div>
        </div>

        {/* ===== BOTTOM ===== */}
        <hr className="footer-line" />
        <p className="text-center footer-copy">
          © {new Date().getFullYear()} FreshMart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
