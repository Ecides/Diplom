import "../styles/aboutStyles.css";

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 className="about-title">About TrackingCatalog</h1>
        <p className="about-subtitle">
          TrackingCatalog — this is a modern web application for managing your collection of favorite products and convenient tracking.
        </p>
      </section>

      {/* Основной контент */}
      <div className="about-content">
        
        <div className="about-card">
          <h2>Our goal</h2>
          <p>
            We strive to make the process of selecting, saving, and tracking products as simple and convenient as possible. 
            No more keeping dozens of tabs open in your browser or using inconvenient notes - save and organize everything in one place!
          </p>
        </div>

        <div className="about-card">
          <h2>💻 Technologies that was used</h2>
          <p>The project is built on the foundation of modern client-server web technologies:</p>
          <ul className="tech-list">
            <li>
              <span className="tech-icon"></span> 
              <span><b>React (Vite)</b> - Provides fast rendering and instant UI responsiveness.</span>
            </li>
            <li>
              <span className="tech-icon"></span> 
              <span><b>Google Firebase</b> - Reliable cloud architecture for database and authentication system.</span>
            </li>
            <li>
              <span className="tech-icon"></span> 
              <span><b>Modern CSS</b> - Adaptive design, Flexbox, and smooth animations without heavy libraries.</span>
            </li>
          </ul>
        </div>

        <div className="about-card">
          <h2>On Development</h2>
          <p>
            This application is being developed as part of a project in the field of "Web Development and Cloud Technologies". 
            It demonstrates the practical application of modern approaches to creating scalable and secure web services.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;