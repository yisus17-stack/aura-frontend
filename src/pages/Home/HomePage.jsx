import { Link } from 'react-router-dom';
import logo from '../../assets/aura-logo-n.svg';
import './HomePage.css';

const HomePage = () => {
  return (
    <main className="expo-home">
      {/* SECCIÓN HERO */}
      <section className="hero-flat">
        <div className="hero-brand">
          <img src={logo} alt="Aura Logo" className="logo-static" />
        </div>
        
        <h1 className="hero-title-bold">
          Descubre la magia <br />
          en <span className="text-primary">Aura</span>
        </h1>
        
        <p className="hero-subtitle-flat">
          El rincón predilecto para los personajes del universo Disney. 
          Explora, colecciona y vive la fantasía.
        </p>
        
        <div className="hero-button-group">
          <Link to="/login" className="btn-black">Comenzar ahora</Link>
          <Link to="/login" className="btn-outline-minimal">Documentación</Link>
        </div>
      </section>

      {/* GRID DE PROMOCIONES */}
      <section className="grid-expo-container">
        <div className="grid-expo">
          
          {/* Tarjeta Principal (Izquierda) */}
          <div className="expo-card-flat card-purple-flat">
            <div className="card-inner">
              <span className="label-minimal">Especial</span>
              <h2>Colección Clásica</h2>
              <p>Explora el legado original que lo inició todo.</p>
            </div>
            <div className="card-footer-flat">
              <span className="badge-minimal">50% OFF</span>
              <button className="btn-action-flat">Ver más</button>
            </div>
          </div>

          {/* Sub-grid (Derecha) */}
          <div className="sub-grid-expo">
            <div className="expo-card-flat card-pink-flat">
              <div className="card-inner">
                <span className="label-minimal">Novedad</span>
                <h2>Nuevos Personajes</h2>
              </div>
              <button className="btn-icon-flat">→</button>
            </div>

            <div className="expo-card-flat card-green-flat">
              <div className="card-inner">
                <span className="label-minimal">Oferta</span>
                <h2>35% Descuento</h2>
              </div>
              <button className="btn-icon-flat">Canjear</button>
            </div>
          </div>

        </div>
      </section>
      {/* SECCIÓN CTA FINAL FLAT */}
      <section className="cta-flat-section">
        <div className="cta-flat-content">
          <h2>Comienza con Aura Hoy Mismo</h2>
          <p>Mejora la gestión de tu colección con la plataforma más avanzada para el universo Disney.</p>
          <div className="cta-flat-buttons">
            <Link to="/login" className="btn-flat-solid">ENTRAR AHORA</Link>
            <Link to="/registro" className="btn-flat-outline">CREAR CUENTA</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;  