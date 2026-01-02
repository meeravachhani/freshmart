import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/vegetables.jpg",
    title: "Fresh Vegetables",
    subtitle: "Farm fresh • Handpicked daily • 100% natural",
    align: "left",
  },
  {
    image: "/images/fruits.jpg",
    title: "Seasonal Fruits",
    subtitle: "Naturally sweet • Juicy • Full of vitamins",
    align: "right",
  },
  {
    image: "/images/dairy.jpg",
    title: "Dairy & Eggs",
    subtitle: "Pure milk • Fresh eggs • Daily essentials",
    align: "left",
  },
  {
    image: "/images/staples.jpg",
    title: "Grains & Staples",
    subtitle: "Rice • Wheat • Pulses • Quality assured",
    align: "right",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${slides[index].image})` }}
    >
      <div className="overlay"></div>

      <div className={`content ${slides[index].align}`}>
        <h1>{slides[index].title}</h1>
        <p>{slides[index].subtitle}</p>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>

      {/* Arrow Navigation */}
      <div className="arrows">
        <span className="arrow left" onClick={prevSlide}>
          &#10094;
        </span>
        <span className="arrow right" onClick={nextSlide}>
          &#10095;
        </span>
      </div>
    </div>
  );
}

export default HeroSlider;
