import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

import "modern-normalize/modern-normalize.css";
import './styles.css';

// Firebase
import { auth } from './firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth';


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
    return <div style={{fontSize: "30px", color: "black", fontWeight: "bold"}}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;