import "../styles/catalogStyles.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Заглушка для картинки. Пока используем эмодзи из данных */}
      <div className="product-image-placeholder">
        {product.image}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-bottom">
          <span className="product-price">{product.price}</span>
          <button className="track-btn">Отслеживать</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;