// App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import { sampleProducts } from "./data/sampleProducts";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to fetch from the API, fallback to sample data
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        return res.json();
      })
      .then((data) => {
        // Normalize the data to match our expected structure
        const normalizedData = data.map(item => ({
          id: item.id,
          name: item.title, // API uses title, we use name
          title: item.title,
          brand: item.category, // Using category as brand
          category: item.category,
          price: item.price,
          image: item.image,
          description: item.description,
          ratings: item.rating?.rate || 4.5,
          reviews: []
        }));
        setProducts(normalizedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Falling back to sample data:", err);
        setProducts(sampleProducts);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      <Navbar openCart={() => setIsCartOpen(true)} />
      
      <main className="main-content">
        <h1>Featured Products</h1>
        
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <ProductList 
            products={products} 
            onProductClick={handleProductClick} 
          />
        )}
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={closeProductDetail}
        />
      )}
    </div>
  );
}

export default App;