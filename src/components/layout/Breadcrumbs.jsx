import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ nombre }) => {
  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb-capsule">

        <Link to="/" className="breadcrumb-link">
          Inicio
        </Link>

        <span className="breadcrumb-separator">›</span>

        {nombre === "Personajes" ? (
          <span className="breadcrumb-current-pill">
            Personajes
          </span>
        ) : (
          <>
            <Link to="/dashboard" className="breadcrumb-link">
              Personajes
            </Link>

            <span className="breadcrumb-separator">›</span>

            <span className="breadcrumb-current-pill">
              {nombre || "Cargando..."}
            </span>
          </>
        )}

      </div>
    </div>
  );
};

export default Breadcrumbs;