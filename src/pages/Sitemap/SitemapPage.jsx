import React from 'react';
import { Link } from 'react-router-dom';
import './SitemapPage.css';

const SitemapPage = () => {
  return (
    <div className="sitemap-container">
      <div className="sitemap-header">
        <h1>Mapa del Sitio</h1>
        <p>Explora todas las secciones disponibles en Aura.</p>
      </div>

      <div className="sitemap-content">
        <section className="sitemap-section">
          <h2>Públicas</h2>
          <ul>
            <li><Link to="/">Inicio</Link> - Descubre el mundo de Aura</li>
            <li><Link to="/login">Iniciar Sesión</Link> - Accede a tu cuenta</li>
            <li><Link to="/registro">Registro</Link> - Crea una nueva cuenta</li>
          </ul>
        </section>

        <section className="sitemap-section">
          <h2>Privadas (Requieren Autenticación)</h2>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link> - Panel de control principal</li>
            <li><Link to="/personaje/1">Detalle de Personaje</Link> - Ejemplo de vista protegida</li>
          </ul>
        </section>

        <section className="sitemap-section">
          <h2>Administración</h2>
          <ul>
            <li><Link to="/usuarios">Gestión de Usuarios</Link> - Solo administradores</li>
          </ul>
        </section>
        
        <section className="sitemap-section">
          <h2>Información Legal</h2>
          <ul>
            <li><Link to="/404">Página 404</Link> - Ejemplo de ruta no encontrada</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SitemapPage;
