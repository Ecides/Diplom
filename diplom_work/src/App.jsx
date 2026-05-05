import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Catalog from './pages/Catalog.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar отображается на всех страницах */}
        <Navbar /> 
        
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