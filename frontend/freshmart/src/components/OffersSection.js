// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./OffersSection.css";

// export default function OffersSection() {
//   const navigate = useNavigate();

//   const offers = [
//     {
//       title: "Fresh Vegetables",
//       desc: "Flat 20% OFF Today",
//       img: "/images/vegetabless.jpg",
//       color: "offer-green",
//     },
//     {
//       title: "Fruits Bonanza",
//       desc: "Buy 1 Get 1 Free",
//       img: "/images/fruitss.jpg",
//       color: "offer-orange",
//     },
//     {
//       title: "Daily Essentials",
//       desc: "Up to ₹150 OFF",
//       img: "/images/atta.jpg",
//       color: "offer-blue",
//     },
//   ];

//   return (
//     <div className="container my-5">
//       <h3 className="section-title mb-4">Today’s Best Deals 🔥</h3>

//       <div className="row g-4">
//         {offers.map((offer, i) => (
//           <div className="col-md-4" key={i}>
//             <div
//               className={`offer-card ${offer.color}`}
//               onClick={() => navigate("/products")}
//             >
//               <div>
//                 <h4>{offer.title}</h4>
//                 <p>{offer.desc}</p>
//                 <button className="btn btn-light btn-sm">
//                   Shop Now →
//                 </button>
//               </div>
//               <img src={offer.img} alt={offer.title} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OffersSection.css";

export default function OffersSection() {
  const navigate = useNavigate();

  const offers = [
    {
      title: "Fresh Vegetables & Fruits",
      desc: "up to 20% OFF ",
      img: "/images/vegetabless.jpg",
      color: "offer-green",
      offerTag: "fresh-vegetables",
    },
    {
      title: "Fruits Bonanza",
      desc: "up to 30% OFF",
      img: "/images/atta.jpg",
      color: "offer-orange",
      offerTag: "fruits-offer",
    },
    {
      title: "Daily Essentials",
      desc: "Up to ₹150 OFF",
      img: "/images/atta.jpg",
      color: "offer-blue",
      offerTag: "daily-essentials",
    },
  ];

  return (
    <div className="container my-5">
      <h3 className="section-title mb-4">Today’s Best Deals 🔥</h3>

      <div className="row g-4">
        {offers.map((offer, i) => (
          <div className="col-md-4" key={i}>
            <div
              className={`offer-card ${offer.color}`}
              onClick={() =>
                navigate(`/products?offer=${offer.offerTag}`)
              }
              style={{ cursor: "pointer" }}
            >
              <div>
                <h4>{offer.title}</h4>
                <p>{offer.desc}</p>
                <button className="btn btn-light btn-sm">
                  Shop Now →
                </button>
              </div>
              <img src={offer.img} alt={offer.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
