import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Página no encontrada</h2>
        <p className="error-description">
          La sección a la que intentas acceder no existe en la bóveda.
        </p>
        <Link to="/" className="aura-btn-link">
          Regresar al Inicio
        </Link>
    </div>
  );
};

export default NotFound;