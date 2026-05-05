import { useState } from 'react';
import { products } from '../data/mockData';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

function Catalog() {
  // Состояние: какая категория сейчас выбрана
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Логика фильтрации
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="catalog-layout" style={{ display: 'flex' }}>
      
      {/* Боковая панель: передаем ей текущий фильтр и функцию для его изменения */}
      <Sidebar 
        selectedCategory={selectedCategory} 
        setCategory={setSelectedCategory} 
      />

      {/* Список товаров */}
      <div className="product-grid" style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Товары не найдены.</p>
        )}
      </div>

    </div>
  );
}

export default Catalog;