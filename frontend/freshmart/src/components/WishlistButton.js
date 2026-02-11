// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useEffect, useState } from "react";

// export default function WishlistButton({ product }) {
//   const userId = localStorage.getItem("userId");
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     if (!userId) return;

//     const list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

//     setLiked(list.some((item) => item._id === product._id));
//   }, [product, userId]);

//   const toggleWishlist = () => {
//     if (!userId) {
//       alert("Please login first");
//       return;
//     }

//     let list =
//       JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

//     if (liked) {
//       list = list.filter((item) => item._id !== product._id);
//     } else {
//       list.unshift(product); // Meesho style: newest on top
//     }

//     localStorage.setItem(
//       `wishlist_${userId}`,
//       JSON.stringify(list)
//     );

//     setLiked(!liked);
//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   return (
//     <span
//       onClick={toggleWishlist}
//       style={{ cursor: "pointer", fontSize: "20px" }}
//     >
//       {liked ? (
//         <FaHeart color="#e63946" />
//       ) : (
//         <FaRegHeart />
//       )}
//     </span>
//   );
// }






import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function WishlistButton({ product }) {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const list =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

    setLiked(list.some((item) => item._id === product._id));
  }, [product, userId]);

  const toggleWishlist = () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    let list =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

    if (liked) {
      list = list.filter((item) => item._id !== product._id);
    } else {
      list.unshift(product); // Meesho style: newest on top
    }

    localStorage.setItem(
      `wishlist_${userId}`,
      JSON.stringify(list)
    );

    setLiked(!liked);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <span
      onClick={toggleWishlist}
      style={{ cursor: "pointer", fontSize: "20px" }}
    >
      {liked ? (
        <FaHeart color="#e63946" />
      ) : (
        <FaRegHeart />
      )}
    </span>
  );
}
