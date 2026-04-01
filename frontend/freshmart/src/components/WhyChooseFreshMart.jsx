import React from "react";
import "./WhyChooseFreshMart.css";

export default function WhyChooseFreshMart() {
  const features = [
    {
      icon: "🥬",
      title: "Fresh & Quality Products",
      desc: "Farm-fresh vegetables, fruits, and groceries delivered daily.",
    },
    {
      icon: "🚚",
      title: "Fast Home Delivery",
      desc: "Quick and reliable delivery at your doorstep.",
    },
    {
      icon: "💰",
      title: "Best Prices & Offers",
      desc: "Affordable prices with exciting daily deals.",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      desc: "Safe and secure payment methods you can trust.",
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      desc: "Hassle-free returns for damaged or wrong products.",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      desc: "We’re always here to help you with your orders.",
    },
  ];

  return (
    <div className="why-section container my-5">
      <h3 className="section-title text-center mb-4">
        Why Choose FreshMart?
      </h3>

      <div className="row g-4">
        {features.map((item, index) => (
          <div className="col-6 col-md-4" key={index}>
            <div className="why-card text-center h-100">
              <div className="why-icon">{item.icon}</div>
              <h6 className="fw-bold mt-3">{item.title}</h6>
              <p className="text-muted small">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
