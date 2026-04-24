import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LogIn, UserPlus, ChevronLeft, KeyRound, UserPen } from 'lucide-react'; 
import './Form.css';

const Form = ({ children, onSubmit, buttonText }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="form-container">
      {/* LADO IZQUIERDO: Panel para el logo Aura */}
      <div className="form-left-panel"></div>

      {/* LADO DERECHO: El formulario */}
      <div className={`custom-form-card ${isLogin ? 'is-login' : 'is-register'}`}>
        <Link to="/" className="back-home-btn">
          <ChevronLeft size={16} />
          <span>Inicio</span>
        </Link>

        <div className="segmented-control">
          <Link 
            to="/login" 
            className={`nav-btn ${isLogin ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            <span>Entrar</span>
          </Link>
          <Link 
            to="/registro" 
            className={`nav-btn ${!isLogin ? 'active' : ''}`}
          >
            <UserPen size={18} />
            <span>Registro</span>
          </Link>
        </div>

        <div className={`form-fixed-height ${isLogin ? 'is-login' : 'is-register'}`}>
          <form onSubmit={onSubmit} className="main-form-content">
            {children}
            <button type="submit" className="btn-aura">
              {buttonText}
            </button>
          </form>

          <div className="form-alt-footer">
            <span>{isLogin ? "¿Nuevo en Aura?" : "¿Ya tienes cuenta?"}</span>
            {" "}
            <Link to={isLogin ? "/registro" : "/login"}>
              {isLogin ? "Crea una cuenta" : "Inicia sesión"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
