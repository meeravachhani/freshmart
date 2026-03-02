const addWishlist = async (id) => {
  await API.post(`/wishlist/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};



export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button onClick={() => addWishlist(product._id)} className="btn btn-outline-danger">
  ❤️ Wishlist
</button>
    </div>
  );
}

