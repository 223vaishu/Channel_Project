// ProductItem.jsx
import { useCart } from "../context/CartContext";
import "./ProductItem.css";

function ProductItem({ product, onClick }) {
  const { addToCart } = useCart();

  // Handle name/title issue by using either one
  const displayName = product.name || product.title;
  
  return (
    <div className="product-item">
      <div className="product-image" onClick={onClick}>
        <img src={product.image} alt={displayName} />
      </div>
      <div className="product-info" onClick={onClick}>
        <h3 className="product-title">{displayName}</h3>
        <p className="product-brand">{product.brand || product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <button 
        className="add-to-cart-button" 
        onClick={(e) => { 
          e.stopPropagation(); 
          addToCart(product);
        }}
      >
        Add to Bag
      </button>
    </div>
  );
}

export default ProductItem;