// Imports
import { Link } from "react-router-dom";
import box from "../assets/box.svg";
import energy from "../assets/energy.svg";
import cloud from "../assets/cloud.svg";
import DBSeeder from "../components/DBSeeder.jsx";
import "../styles/homeStyles.css";

// Component
function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to TrackingCatalog</h1>
        <p className="hero-subtitle">
          Your personal assistant for tracking products, managing shopping lists
          and monitoring prices. Everything in one convenient place.
        </p>
        <Link to="/catalog" className="hero-btn">
          Go to Catalog
        </Link>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon"> <img src={box} alt="Single database" /> </div>
          <h3>Single database</h3>
          <p>
            Save laptops, phones and other products in your personal collection.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"> <img src={energy} alt="Fast access" /> </div>
          <h3>Fast access</h3>
          <p>
            Instant search and filtering thanks to modern cloud technologies.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"> <img src={cloud} alt="Cloud synchronization" /> </div>
          <h3>Cloud synchronization</h3>
          <p>
            Your data is securely stored in Google Firebase and accessible from
            any device.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
