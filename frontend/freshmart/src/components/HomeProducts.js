import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeProducts.css";

export default function HomeProducts() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const categories = [
    { name: "Vegetables", img: "/images/vegetabless.jpg" },
    { name: "Fruits", img: "/images/fruitss.jpg" },
    { name: "Masala", img: "/images/masala.jpg" },
    { name: "Atta", img: "/images/atta.jpg" },
    { name: "Rice", img: "/images/rice.jpg" },
    { name: "Dry Fruits", img: "/images/dryfruits.jpg" },
    { name: "Oils Ghee", img: "/images/oil&ghee.jpg" },
    { name: "Dairy Bakery", img: "/images/dairy&bakery.jpg" },
    { name: "Beverages", img: "/images/beverages.jpg" },
    { name: "Snacks", img: "/images/snack.jpg" },
    { name: "household cleaning", img: "/images/house.jpg" },
    { name: "personal care", img: "/images/personal_care.jpg" },
  ];

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <div className="container my-5">

      {/* 🌈 CATEGORY SECTION */}
      <div className="category-section p-4 rounded-4 shadow-sm">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title">Shop by Category</h3>
          <div>
            <button className="scroll-btn me-2" onClick={() => scroll("left")}>
              ❮
            </button>
            <button className="scroll-btn" onClick={() => scroll("right")}>
              ❯
            </button>
          </div>
        </div>

        <div className="category-scroll" ref={scrollRef}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/products?category=${cat.name}`)}
            >
              <div className="category-img-wrapper">
                <img src={cat.img} alt={cat.name} />
              </div>
              <p className="category-name">{cat.name}</p>
              <span className="shop-now">Shop Now →</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
