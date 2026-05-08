import "../styles/catalogStyles.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <p className="product-description">{product.description}</p>
        <img 
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        <div className="product-bottom">
          <span className="product-price">{product.price} $</span>
          <button className="track-btn">Track</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;