import ProductCard from "../components/ProductCard";
import "../styles/catalogStyles.css";

// Временные тестовые данные. Потом они будут прилетать из Firebase
const dummyProducts = [
  { id: 1, name: "Apple MacBook Pro 16", price: "2 500 $", image: "💻", category: "Ноутбуки" },
  { id: 2, name: "Samsung Galaxy S23", price: "900 $", image: "📱", category: "Смартфоны" },
  { id: 3, name: "Sony WH-1000XM5", price: "350 $", image: "🎧", category: "Аудио" },
  { id: 4, name: "Apple Watch Series 9", price: "400 $", image: "⌚", category: "Гаджеты" },
  { id: 5, name: "PlayStation 5", price: "500 $", image: "🎮", category: "Игры" },
  { id: 6, name: "GoPro Hero 12", price: "450 $", image: "📷", category: "Камеры" },
];

function Catalog() {
  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Каталог товаров</h1>
        <p>Найдите и добавьте нужные товары для отслеживания цен.</p>
      </div>

      {/* Сетка товаров */}
      <div className="products-grid">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;