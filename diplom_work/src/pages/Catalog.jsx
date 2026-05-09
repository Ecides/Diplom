// Import react and firebase
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

// Import components and styles
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import "../styles/catalogStyles.css";

// Component
function Catalog({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    sortBy: "default",
    category: "All",
    warehouse: "All",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));

        const productSnapshot = await getDocs(q);

        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserFavorites(userSnap.data().favorites || []);
          }
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      } else {
        setUserFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const warehouses = useMemo(() => {
    // Берем warehouseName, убираем пустые/undefined, и оставляем только уникальные
    return [
      ...new Set(
        products.map((p) => p.location?.warehouseName).filter(Boolean),
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }

    // Фильтр по категории
    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Фильтр по складу
    if (filters.warehouse !== "All") {
      result = result.filter(
        (p) => p.location?.warehouseName === filters.warehouse,
      );
    }

    // Фильтр по цене
    if (filters.minPrice !== "") {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Сортировка
    if (filters.sortBy === "nameAsc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === "nameDesc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filters.sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters]);

  if (loading) {
    return (
      <div
        className="catalog-container"
        style={{ justifyContent: "center", minHeight: "60vh" }}
      >
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>ProductsCatalog</h1>
        <p>Find and track your favorite products.</p>
        <SearchBar 
            searchQuery={filters.searchQuery}
            onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
            onClear={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
          />
      </div>

      <div
        className="catalog-content"
        style={{
          display: "flex",
          gap: "30px",
          width: "100%"
        }}
      >
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          warehouses={warehouses}
        />

        <div className="products-grid" style={{ flexGrow: 1 }}>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%", color: "#aaa" }}>
              No products match your filters.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                userFavorites={userFavorites}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
