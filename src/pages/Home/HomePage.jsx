import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Film, Star, Heart, Library } from 'lucide-react';
import logo from '../../assets/aura-logo-n.svg';
import './HomePage.css';

const HomePage = ({ user }) => {
  const linkTo = user ? "/dashboard" : "/login";

  return (
    <main className="expo-home">
      {/* --- SECCIÓN HERO (TEXTOS ORIGINALES) --- */}
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
          <Link to={linkTo} className="btn-black">Comenzar ahora</Link>
          <Link to="/login" className="btn-outline-minimal">Documentación</Link>
        </div>
      </section>

      {/* --- SECCIÓN 1: UNIVERSOS (BLANCO) --- */}
      <section className="info-section">
        <div className="container-aura">
          <div className="info-header">
            <span className="aura-badge">Descubre</span>
            <h2>Explora los Universos</h2>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <Film className="icon-purp" size={32} />
              <h3>Clásicos Animados</h3>
              <p>Revive las historias de Walt Disney Animation Studios, desde Blanca Nieves hasta los últimos estrenos.</p>
            </div>
            <div className="info-card">
              <Sparkles className="icon-purp" size={32} />
              <h3>El Mundo de Pixar</h3>
              <p>Adéntrate en la tecnología y el corazón de Pixar. Descubre los secretos detrás de tus películas favoritas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: GRIS SIMPLE (SIN BORDES, IMAGEN LIMPIA) --- */}
      <section className="bg-text-soft-clean">
        <div className="container-aura split">
          <div className="info-text">
            <span className="badge-simple">Especial del Mes</span>
            <h2 className="text-white-pure">Stitch: Experimento 626</h2>
            <p className="text-white-soft">
              ¿Sabías que Stitch fue diseñado originalmente para ser un monstruo destructivo? 
              En Aura tenemos los detalles de su evolución.
            </p>
            <ul className="list-simple">
              <li><Star size={16} /> Origen: Turo</li>
              <li><Heart size={16} /> Familia: Ohana</li>
            </ul>
          </div>
          
          <div className="visual-clean">
            {/* Imagen sin bordes ni contenedores pesados */}
            <img 
              src="https://img.icons8.com/color/512/stitch.png" 
              alt="Stitch" 
              className="img-minimal"
            />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: BIBLIOTECA (BLANCO) --- */}
      <section className="info-section">
        <div className="container-aura text-center">
          <div className="info-header">
            <span className="aura-badge">Comunidad</span>
            <h2>Tu propia Biblioteca</h2>
          </div>
          <div className="roles-grid">
            <div className="role-item">
              <div className="role-icon-box"><Library size={30} /></div>
              <h3>Mis Favoritos</h3>
              <p>Organiza tu colección personalizada.</p>
            </div>
            <div className="role-item">
              <div className="role-icon-box admin"><Star size={30} /></div>
              <h3>Trivia</h3>
              <p>Datos curiosos exclusivos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINI FOOTER SIMPLE --- */}
      <footer className="mini-footer-aura">
        <div className="footer-top">
          <div className="breadcrumbs">Aura / Inicio</div>
          <nav className="footer-map">
            <Link to="/">Inicio</Link>
            <Link to="/login">Entrar</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <img src={logo} alt="Aura Logo" className="mini-logo" />
            <span>Aura Project &copy; 2026</span>
          </div>
          <div className="api-status">
            <span className="status-dot"></span> Online
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;