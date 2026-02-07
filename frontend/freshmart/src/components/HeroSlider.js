import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const slides = [
  {
    image: "/images/vegetables.jpg",
    title: "Fresh Vegetables",
    subtitle: "Farm fresh • Handpicked daily • 100% natural",
  },
  {
    image: "/images/fruits.jpg",
    title: "Seasonal Fruits",
    subtitle: "Naturally sweet • Juicy • Full of vitamins",
  },
  {
    image: "/images/dairy.jpg",
    title: "Dairy & Eggs",
    subtitle: "Pure milk • Fresh eggs • Daily essentials",
  },
  {
    image: "/images/staples.jpg",
    title: "Grains & Staples",
    subtitle: "Rice • Wheat • Pulses • Quality assured",
  },
];

export default function HeroSlider() {
  const navigate = useNavigate();

  return (
    <div
      id="heroCarousel"
      className="carousel slide carousel-fade"
     
    >
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            key={idx}
          >
            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.title}
              style={{
                height: "70vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                borderRadius: "12px",
                padding: "24px",
                bottom: "22%",
                left: "10%",
                right: "10%",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                  marginBottom: "10px",
                }}
              >
                {slide.title}
              </h3>

              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#f1f1f1",
                  textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                  marginBottom: "20px",
                }}
              >
                {slide.subtitle}
              </p>

              <button
                className="btn btn-success btn-lg"
                onClick={() => navigate("/products")}
                style={{
                  fontSize: "1.2rem",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔁 Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}







