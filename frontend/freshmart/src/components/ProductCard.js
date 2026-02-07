export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}







// export default function ProductCard({ product, addToCart, onClick }) {

//   // 🔥 NEW: discount calculation
//   const discountedPrice = product.isOffer
//     ? Math.round(product.price - (product.price * product.discount) / 100)
//     : product.price;

//   return (
//     <div className="product-card position-relative">

//       {/* 🔥 OFFER BADGE */}
//       {product.isOffer && (
//         <span className="offer-badge">
//           {product.discount}% OFF
//         </span>
//       )}

//       <img
//         src={`http://localhost:5000${product.image}`}
//         alt={product.name}
//         className="product-image"
//         onClick={onClick}
//       />

//       <h6 className="mt-2">{product.name}</h6>

//       {/* 💰 PRICE DISPLAY */}
//       {product.isOffer ? (
//         <div className="price-box">
//           <span className="old-price">₹{product.price}</span>
//           <span className="new-price">₹{discountedPrice}</span>
//         </div>
//       ) : (
//         <span className="new-price">₹{product.price}</span>
//       )}

//       <button
//         className="btn btn-success w-100 mt-2"
//         onClick={() => addToCart(product)}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
