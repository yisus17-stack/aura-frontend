import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', message = '', className = '' }) => {
  return (
    <div className={`spinner-container ${className}`}>
      <div className={`spinner-dots ${size}`}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      {message ? <p className="spinner-message">{message}</p> : null}
    </div>
  );
};

export default Spinner;