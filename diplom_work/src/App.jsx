import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar.jsx';
import Catalog from './pages/Catalog.jsx';

import './styles.css';

import { auth } from './firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Этот код запускается один раз при загрузке приложения
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // currentUser будет объектом (если вошел) или null (если вышел)
      setUser(currentUser); 
      setLoading(false); // Проверка закончена, можно рендерить сайт
    });

    // Очистка слушателя, если компонент будет удален
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Catalog />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;