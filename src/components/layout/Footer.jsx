import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/aura-logo-n.svg';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  
  // Generar el breadcrumb simple para el footer
  const path = location.pathname === '/' ? 'Inicio' : 
               location.pathname.includes('dashboard') ? 'Dashboard' :
               location.pathname.includes('personaje') ? 'Detalle de Personaje' :
               location.pathname.includes('usuarios') ? 'Gestión' : 'Aura';

  return (
    <footer className="mini-footer-aura">
      <div className="footer-top">
        <div className="footer-breadcrumbs">Aura / {path}</div>
        <nav className="footer-map">
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/mapa-del-sitio">Mapa del Sitio</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand">
          <img src={logo} alt="Aura Logo" className="mini-logo" />
          <span>Aura Project &copy; 2026</span>
        </div>
        <div className="api-status">
          <span className="status-dot"></span> En línea
        </div>
      </div>
    </footer>
  );
};

export default Footer;
