import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner-dots ${size}`}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
};

export default Spinner;