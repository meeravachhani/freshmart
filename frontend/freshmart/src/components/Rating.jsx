import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ value = 0, onRate }) {
  const [hover, setHover] = useState(0);

  const handleClick = (starValue) => {
    // ✅ Meesho-style behavior
    if (starValue === value) {
      onRate(0); // remove rating only if same star clicked
    } else {
      onRate(starValue); // set / reduce / increase rating
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={22}
          style={{ marginRight: 6, cursor: "pointer" }}
          color={
            star <= (hover || value) ? "#ffc107" : "#e4e5e9"
          }
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
