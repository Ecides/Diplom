import { Link } from "react-router-dom";
import "../styles/homeStyles.css";

function Home() {
  return (
    <div className="home-container">
      {/* Главный блок (Hero Section) */}
      <section className="hero-section">
        <h1 className="hero-title">Добро пожаловать в TrackingCatalog</h1>
        <p className="hero-subtitle">
          Ваш личный помощник для отслеживания товаров, управления списками покупок и мониторинга цен. 
          Всё в одном удобном месте.
        </p>
        {/* Кнопка-ссылка, которая перекинет пользователя в каталог */}
        <Link to="/catalog" className="hero-btn">
          Перейти к каталогу
        </Link>
      </section>

      {/* Блок с описанием преимуществ (Features) */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Единая база</h3>
          <p>Сохраняйте ноутбуки, телефоны и другие товары в свою личную коллекцию.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Быстрый доступ</h3>
          <p>Мгновенный поиск и фильтрация благодаря современным облачным технологиям.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">☁️</div>
          <h3>Облачная синхронизация</h3>
          <p>Ваши данные надежно хранятся в Google Firebase и доступны с любого устройства.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;