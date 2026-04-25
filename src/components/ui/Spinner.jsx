import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', message = 'Cargando...' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner-dots ${size}`}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;