import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar({ openCart }) {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">StyleStore</div>
      <div className="navbar-links">
        <a href="#" className="navbar-link">Home</a>
        <a href="#" className="navbar-link">New Arrivals</a>
        <a href="#" className="navbar-link">Sale</a>
      </div>
      <button className="cart-button" onClick={openCart}>
        My Bag {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>
    </nav>
  );
}

export default Navbar;
