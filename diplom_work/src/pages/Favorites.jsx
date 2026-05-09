// Import react and firebase
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Import components and styles
import ProductCard from "../components/ProductCard";
import "../styles/catalogStyles.css";

// Component
function Favorites({ user }) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favIds, setFavIds] = useState([]);

  const handleRemoveFavorite = (productId) => {
    setFavoriteProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    setFavIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const favoriteIds = userData.favorites || [];
          
          setFavIds(favoriteIds);

          if (favoriteIds.length === 0) {
            setFavoriteProducts([]);
            setLoading(false);
            return;
          }

          const productPromises = favoriteIds.map((id) => 
            getDoc(doc(db, "products", id))
          );
          
          const productDocs = await Promise.all(productPromises);

          const loadedProducts = productDocs
            .filter((docSnap) => docSnap.exists())
            .map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            }));

          setFavoriteProducts(loadedProducts);
        }
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="catalog-container" style={{ justifyContent: "center", minHeight: "60vh" }}>
        <h2>Loading favorites...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="catalog-container" style={{ justifyContent: "center", minHeight: "60vh" }}>
        <h2>Please sign in to see your favorites.</h2>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Your Favorites</h1>
        <p>Products you saved for later.</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", fontSize: "1.2rem", marginTop: "40px" }}>
          You haven't added any products to favorites yet
        </p>
      ) : (
        <div className="products-grid">
          {favoriteProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              user={user} 
              userFavorites={favIds}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;