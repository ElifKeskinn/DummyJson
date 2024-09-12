import { useEffect, useState } from "react";
import Products from "./Products";
import './styles/ProductDetail.css'; 

export default function ProductDetail({ productId, setPage }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <a href="#" className="back-link" onClick={() => setPage(<Products setPage={setPage} />)}>◀ Back to Products</a>
      <div className="product-detail">
        <img src={product.thumbnail} alt={product.title} className="product-detail-image" />
        <div className="product-detail-info">
          <h3 className="product-detail-title">{product.title}</h3>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-details">
            <div className="product-detail-box">
              <p><span>Price:</span> ${product.price}</p>
            </div>
            <div className="product-detail-box">
              <p><span>Discount:</span> {product.discountPercentage}%</p>
            </div>
            <div className="product-detail-box">
              <p><span>Rating:</span> {product.rating}/5</p>
            </div>
            <div className="product-detail-box">
              <p><span>Stock:</span> {product.stock}</p>
            </div>
            <div className="product-detail-box">
              <p><span>Category:</span> {product.category}</p>
            </div>
            <div className="product-detail-box">
              <p><span></span> {product.tags.map(tag => `#${tag}`).join("  ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}