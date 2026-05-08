import { useState, useEffect } from "react";

import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import ProductCard from "../components/ProductCard";
import "../styles/catalogStyles.css";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
