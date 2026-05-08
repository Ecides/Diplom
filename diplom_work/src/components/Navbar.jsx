import { useState } from "react";
import { Link } from "react-router-dom";

import AuthModule from "./AuthModule";
import "../styles/navStyles.css";

import favIcon from "../assets/fav.svg";

function Navbar({ user }) {
  const items = ["Home", "Catalog", "About"];

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFavoritesClick = () => {
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы просматривать Избранное!");
    } else {
      console.log("Пользователь авторизован, тут будет переход в избранное");
    }
  };

  return (
    <nav>
      <div className="flex-container">
        <div className="logo">TrackingCatalog</div>

        <div className="mobile-controls">
          <img 
            src={favIcon}
            alt="Избранное" 
            className="block-fav"
            onClick={handleFavoritesClick} 
          />
          
          <div 
            className="burger-icon" 
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

            <li className="list-fav" style={{backgroundColor: "transparent"}}
              onClick={handleFavoritesClick}
            >
              <img
                src={favIcon}
                alt="Favorites"
                style={{ width: "40px", height: "40px" }}
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
