// Imports
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { db } from "../firebase";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import Map from "./Map.jsx";
import fav from "../assets/fav.svg";
import notFav from "../assets/notFav.svg";
import "../styles/catalogStyles.css";

// Component
function ProductCard({ product, user, userFavorites = [], onRemove }) {
  const [isFavorite, setIsFavorite] = useState(
    userFavorites.includes(product.id),
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    setIsFavorite(userFavorites.includes(product.id));
  }, [userFavorites, product.id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Sign in to manage favorites!");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const userRef = doc(db, "users", user.uid);
    const previousState = isFavorite;

    try {
      setIsFavorite(!previousState);

      if (previousState) {
        await setDoc(
          userRef,
          {
            favorites: arrayRemove(product.id),
          },
          { merge: true },
        );

        if (onRemove) {
          onRemove(product.id);
        }
      } else {
        await setDoc(
          userRef,
          {
            favorites: arrayUnion(product.id),
          },
          { merge: true },
        );
      }
    } catch (error) {
      console.error("Error while updating favorites:", error);
      setIsFavorite(previousState);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-img" />
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        <div className="product-bottom">
          <span className="product-price">{product.price} $</span>

          <div className="action-buttons">
            <button
              className={`fav-btn ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
              title="Add to favorites"
            >
              {isFavorite ? (
                <img src={fav} alt="Unfavorite" />
              ) : (
                <img src={notFav} alt="Favorite" />
              )}
            </button>
            <button className="track-btn" onClick={() => setIsTracking(true)}>
              Track
            </button>
          </div>
        </div>
      </div>

      {isTracking &&
        createPortal(
          <div className="modal-overlay" onClick={() => setIsTracking(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Tracking: {product.name}</h3>
                <button
                  className="close-modal-btn"
                  onClick={() => setIsTracking(false)}
                >
                  &times;
                </button>
              </div>

              <p className="modal-warehouse">
                Available at:{" "}
                <strong>
                  {product.location?.warehouseName || "Main Central Hub"}
                </strong>
              </p>

              <div className="modal-map-wrapper">
                <Map location={product.location} productName={product.name} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default ProductCard;
