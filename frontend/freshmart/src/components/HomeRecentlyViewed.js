import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeRecentlyViewed.css";

export default function HomeRecentlyViewed() {
  const userId = localStorage.getItem("userId");
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const loadHistory = () => {
      const data =
        JSON.parse(localStorage.getItem(`recent_${userId}`)) || [];
      setRecent(data);
    };

    loadHistory();
    window.addEventListener("recentUpdated", loadHistory);

    return () =>
      window.removeEventListener("recentUpdated", loadHistory);
  }, [userId]);

  if (!userId || recent.length === 0) return null;

  return (
    <div className="container my-5">
      <h4 className="section-title">Recently Viewed</h4>

      <div className="recent-scroll">
        {recent.map((item) => (
          <div
            key={item._id}
            className="recent-card"
            onClick={() =>
              navigate(`/product/${item._id}`)
            }
          >
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.name}
            />
            {/* <p>{item.name}</p> */}
            <h6>{item.name}</h6>
            <span className="fw-bold text-success">₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
