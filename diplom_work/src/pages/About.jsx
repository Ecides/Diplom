import "../styles/aboutStyles.css";

function About() {
  return (
    <div className="about-container">
      {/* Заголовок страницы */}
      <section className="about-hero">
        <h1 className="about-title">О проекте</h1>
        <p className="about-subtitle">
          TrackingCatalog — это современное веб-приложение для управления коллекцией ваших любимых товаров и удобного трекинга.
        </p>
      </section>

      {/* Основной контент */}
      <div className="about-content">
        
        <div className="about-card">
          <h2>🎯 Наша цель</h2>
          <p>
            Мы стремимся сделать процесс выбора, сохранения и отслеживания товаров максимально простым и удобным. 
            Больше не нужно держать десятки открытых вкладок в браузере или использовать неудобные заметки — сохраняйте и организуйте всё в одном месте!
          </p>
        </div>

        <div className="about-card">
          <h2>💻 Технологии под капотом</h2>
          <p>Проект построен на базе современного стека клиент-серверных веб-технологий:</p>
          <ul className="tech-list">
            <li>
              <span className="tech-icon">⚛️</span> 
              <span><b>React (Vite)</b> — Обеспечивает быстрый рендеринг и мгновенный отклик интерфейса.</span>
            </li>
            <li>
              <span className="tech-icon">🔥</span> 
              <span><b>Google Firebase</b> — Надежная облачная архитектура для базы данных и системы авторизации.</span>
            </li>
            <li>
              <span className="tech-icon">🎨</span> 
              <span><b>Modern CSS</b> — Адаптивный дизайн, Flexbox и плавные анимации без тяжелых библиотек.</span>
            </li>
          </ul>
        </div>

        <div className="about-card">
          <h2>🎓 О разработке</h2>
          <p>
            Данное приложение разрабатывается в рамках проекта по направлению «Веб-разработка и облачные технологии». 
            Оно демонстрирует практическое применение современных подходов к созданию масштабируемых и безопасных веб-сервисов.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;