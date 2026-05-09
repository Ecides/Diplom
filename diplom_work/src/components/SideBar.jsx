import "../styles/sidebarStyles.css";

function Sidebar({ filters, setFilters, categories, warehouses }) {
  // Обработчик для изменения любого поля
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      {/* 1. Сортировка */}
      <div className="filter-group">
        {/* Связываем label и select через htmlFor и id */}
        <label htmlFor="sortBy">Sort By</label>
        <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="default">Newest First</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>

      {/* 2. Категория */}
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={filters.category} onChange={handleChange}>
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Склад */}
      <div className="filter-group">
        <label htmlFor="warehouse">Warehouse</label>
        <select id="warehouse" name="warehouse" value={filters.warehouse} onChange={handleChange}>
          <option value="All">All Warehouses</option>
          {warehouses.map((wh) => (
            <option key={wh} value={wh}>
              {wh}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Цена */}
      <div className="filter-group price-filter">
        {/* Привязываем главный label к минимальной цене */}
        <label htmlFor="minPrice">Price Range ($)</label>
        <div className="price-inputs">
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            min="0"
          />
          <span>-</span>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            min="0"
            /* Добавляем aria-label для второго инпута, 
               чтобы линтер не ругался на отсутствие label для него */
            aria-label="Maximum Price"
          />
        </div>
      </div>
      
      {/* Кнопка сброса */}
      <button 
        className="reset-btn"
        onClick={() => setFilters({
          sortBy: "default",
          category: "All",
          warehouse: "All",
          minPrice: "",
          maxPrice: ""
        })}
      >
        Reset Filters
      </button>
    </aside>
  );
}

export default Sidebar;
