// ProductDetail.jsx
import { useCart } from "../context/CartContext";
import './ProductDetail.css';

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart();
  
  // Use product reviews if available, otherwise use mock reviews
  const reviews = product.reviews?.length > 0 ? product.reviews : [
    { id: 1, author: "Alex Johnson", rating: 4.5, text: "Great product, fits perfectly and looks good!" },
    { id: 2, author: "Jamie Smith", rating: 5, text: "Excellent quality and fast shipping. Highly recommended!" },
    { id: 3, author: "Taylor Wilson", rating: 4, text: "Very comfortable and stylish. Would buy again." }
  ];

  // Handle name/title issue
  const displayName = product.name || product.title;

  return (
    <div className="product-detail-overlay">
      <div className="product-detail">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={displayName} />
          </div>
          
          <div className="product-detail-info">
            <h2>{displayName}</h2>
            <p className="product-brand">{product.brand || product.category}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            
            <button 
              className="add-to-cart-button detail-add-button" 
              onClick={() => {
                addToCart(product);
                // Optional: Can close the detail view or show a confirmation
              }}
            >
              Add to Bag
            </button>
          </div>
        </div>

        <div className="product-reviews">
          <h3>Customer Reviews</h3>
          {reviews.map((review, index) => (
            <div key={review.id || index} className="review">
              <div className="review-header">
                <span className="review-author">{review.author || review.user}</span>
                <span className="review-rating">
                  {"★".repeat(Math.floor(review.rating))}
                  {"☆".repeat(5 - Math.floor(review.rating))}
                </span>
              </div>
              <p className="review-text">{review.text || review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;