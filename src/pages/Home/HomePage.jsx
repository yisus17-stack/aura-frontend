import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Film, Star, Heart, Library } from 'lucide-react';
import logo from '../../assets/aura-logo-n.svg';
import disneyLogo from '../../assets/disney-logo.png';
import pixarLogo from '../../assets/logo-pixar.png';
import dreamworksLogo from '../../assets/dreamkorks-logo.png';
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
          Descubre la magia
          en Aura
        </h1>
        
        <p style={{marginBottom: 10}} className="hero-subtitle-flat">
          Cada película es una aventura, cada personaje un amigo, y cada
          </p>
          <p  className="hero-subtitle-flat">
             historia un tesoro por descubrir.
          </p>
            
        
        
        <div className="hero-button-group">
          <Link to={linkTo} className="btn-black">Comenzar ahora</Link>
          <Link to="/login" className="btn-outline-minimal">Explorar</Link>
        </div>
      </section>

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
            <div className="info-card">
              <Film className="icon-purp" size={32} />
              <h3>DreamWorks</h3>
              <p>Explora el humor y la creatividad de DreamWorks Animation, desde Shrek hasta Cómo entrenar a tu dragón.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: MARCAS --- */}
      <section className="brands-section brands-section-simple">
        <div className="container-aura">
          <div className="info-header brands-header">
            <span className="aura-badge">Marcas</span>
            <h2>Aliados del universo Aura</h2>
          </div>
          <div className="brands-grid brands-grid-simple">
            <div className="brand-logo">
              <img src={disneyLogo} alt="Disney logo" />
            </div>
            <div className="brand-logo">
              <img src={pixarLogo} alt="Pixar logo" />
            </div>
            <div className="brand-logo">
              <img src={dreamworksLogo} alt="Dreamworks logo" />
            </div>
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

    </main>
  );
};

export default HomePage;