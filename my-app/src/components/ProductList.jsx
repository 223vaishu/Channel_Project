import ProductItem from "./ProductItem";
import "./ProductList.css";

function ProductList({ products, onProductClick }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  );
}

export default ProductList;
