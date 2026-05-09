import "../styles/searchStyles.css";
import x from "../assets/x.svg"

function SearchBar({ searchQuery, onSearchChange, onClear }) {
  return (
    <div className="search-bar-container">
      {/* Иконка лупы (SVG) */}
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        id="searchID"
        type="text"
        className="search-input"
        placeholder="Search for products, categories..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Кнопка очистки появляется только если в поле есть текст */}
      {searchQuery.length > 0 && (
        <button
          className="clear-search-btn"
          onClick={onClear}
          title="Clear search"
        >
        <img src={x} alt="X" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
