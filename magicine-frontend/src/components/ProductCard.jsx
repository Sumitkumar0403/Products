export default function ProductCard({ product, onGiveFeedback }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <button
          className="primary-btn"
          onClick={() => onGiveFeedback(product)}
        >
          Give Feedback
        </button>
      </div>
    </div>
  );
}