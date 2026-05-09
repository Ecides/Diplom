// Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AuthModule from "./AuthModule";
import Favorites from "../pages/Favorites";
import "../styles/navStyles.css";
import favIcon from "../assets/fav.svg";
import logo from "../assets/logo.svg";

// Component
function Navbar({ user }) {
  const items = ["Home", "Catalog", "About"];
  let navigate = useNavigate();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFavoritesClick = () => {
    if (!user) {
      alert("Sign in to manage favorites!");
    } else {
      navigate("/favorites");
    }
  };

  return (
    <nav>
      <div className="flex-container">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          <img src={logo} alt="Logo" /> <p>TrackingCatalog</p>{" "}
        </div>

        <div className="mobile-controls">
          <img
            src={favIcon}
            alt="Favorites"
            className="block-fav"
            onClick={handleFavoritesClick}
          />

          <div
            className={`burger-icon ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="container">
          <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            {items.map((item) => (
              <li key={item} onClick={() => setIsMobileMenuOpen(false)}>
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                  {item}
                </Link>
              </li>
            ))}

            <li
              className="list-fav"
              style={{
                backgroundColor: "transparent",
                width: "50px",
                height: "50px",
                padding: "5px",
                flexShrink: 0,
              }}
              onClick={handleFavoritesClick}
            >
              <img
                src={favIcon}
                alt="Favorites"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </li>

            <li onClick={() => setIsAuthOpen(!isAuthOpen)}>
              {" "}
              {user ? user.displayName : "Login"}
            </li>
          </ul>
          {isAuthOpen && (
            <AuthModule user={user} closeMenu={() => setIsAuthOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
