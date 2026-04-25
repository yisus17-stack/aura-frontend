import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', message = 'Cargando...' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner ${size}`}>
        <div className="spinner-inner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
      </div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;