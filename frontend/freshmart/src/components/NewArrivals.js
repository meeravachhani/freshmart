// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function NewArrivals() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchLatest = async () => {
//       const res = await API.get("/products");
//       setProducts(res.data.slice(-4)); // last 4 added
//     };
//     fetchLatest();
//   }, []);

//   return (
//     <div className="container my-5">
//       <h3 className="section-title mb-4 text-center">
//         🆕 New Arrivals
//       </h3>

//       <div className="row g-4">
//         {products.map((p) => (
//           <div className="col-md-3" key={p._id}>
//             <div className="card h-100 shadow-sm text-center">
//               <img
//                 src={`http://localhost:5000${p.image}`}
//                 alt={p.name}
//                 className="card-img-top p-3"
//                 style={{ height: "160px", objectFit: "contain" }}
//               />
//               <div className="card-body">
//                 <h6>{p.name}</h6>
//                 <p className="fw-bold text-success">₹{p.price}</p>
//                 <span className="badge bg-warning text-dark">
//                   New
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      const res = await API.get("/products");
      setProducts(res.data.slice(-4)); // last 4 added
    };
    fetchLatest();
  }, []);

  return (
    <div className="container my-5">
      <h3 className="section-title mb-4">
         New Arrivals 🆕
      </h3>

      <div className="row g-4">
        {products.map((p) => (
          <div className="col-md-3" key={p._id}>
            <div className="card h-100 shadow-sm text-center">
              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.name}
                className="card-img-top p-3"
                style={{ height: "160px", objectFit: "contain" }}
              />

              <div className="card-body">
                <h6>{p.name}</h6>
                <p className="fw-bold text-success">₹{p.price}</p>

                {/* <span className="badge bg-warning text-dark mb-2">
                  New
                </span> */}

                <button
                  className="btn btn-success btn-sm w-100"
                  onClick={() =>
                    navigate(`/products?category=${p.category}`)
                  }
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
