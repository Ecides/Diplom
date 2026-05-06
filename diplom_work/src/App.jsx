import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Catalog from './pages/Catalog.jsx';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (decodedUser) => {
    setUser(decodedUser);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Catalog />} />
            {/* В будущем здесь можно добавить страницу отдельного товара: */}
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;