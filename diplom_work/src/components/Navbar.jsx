import { useState } from "react";
import AuthModule from "./AuthModule";
import "../styles/navBar.css";

function Navbar({ user }) {
  const items = ["Home", "Catalog", "About"];

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav>
      <div className="flex-container">
        <div className="logo">TrackingCatalog</div>
        <div className="container">
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}

            <li onClick={() => setIsAuthOpen(!isAuthOpen)}> {user ? user.displayName : "Login"}
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
