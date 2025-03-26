// Cart.jsx
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <div className={`cart-modal ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Bag</h2>
        <button className="close-cart" onClick={onClose}>×</button>
      </div>
      
      <div className="cart-items">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name || item.title} />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name || item.title}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="cart-total">
              <h3>Total:</h3>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            
            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </>
        ) : (
          <div className="empty-cart">
            <p>Your bag is empty</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;