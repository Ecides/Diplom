// Imports
import { Link } from "react-router-dom";
import "../styles/footerStyles.css";

// Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section brand">
          <h2 className="footer-logo">TrackingCatalog</h2>
          <p>
            Your ultimate destination to find, track, and manage your favorite
            tech products. Built with React and Firebase.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: ivan.k7r@gmail.com</p>
          <p>Phone: +45 71 89 18 08</p>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} TrackingCatalog. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
