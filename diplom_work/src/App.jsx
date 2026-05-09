// React imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Scroll from "./components/Scroll.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import About from "./pages/About.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";

// Styles
import "modern-normalize/modern-normalize.css";
import "./styles.css";

// Firebase
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

// Component
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          fontSize: "30px",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "150px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Scroll />
        <Navbar user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
