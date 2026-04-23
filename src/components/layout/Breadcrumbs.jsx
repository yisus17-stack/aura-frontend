import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  
  // Dividimos la ruta y filtramos espacios vacíos
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Recuperamos el nombre enviado desde el Dashboard (si existe)
  const nombrePersonaje = location.state?.nombrePersonaje;

  // OCULTAR SI: estamos en la Landing (/), en Login o en Registro
  const pathsToHide = ['', 'login', 'registro'];
  if (pathnames.length === 0 || pathsToHide.some(path => pathnames.includes(path))) {
    return null;
  }

  return (
    <div className="breadcrumb-wrapper">
      <nav className="breadcrumb-capsule">
        {/* El primer segmento siempre es la Home Real (/) */}
        <div className="breadcrumb-segment">
          <Home size={14} className="breadcrumb-icon" />
          <Link to="/" className="breadcrumb-link">Inicio</Link>
        </div>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          // Formateamos el texto para que no sea solo "dashboard" en minúsculas
          const displayName = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <div key={to} className="breadcrumb-segment">
              <ChevronRight size={14} className="breadcrumb-separator" />
              
              {last ? (
                <span className="breadcrumb-current">
                  {/* Lógica para IDs de personajes: prioridad al nombre del state */}
                  {(!isNaN(value) || value.length > 10) 
                    ? (nombrePersonaje || 'Detalle') 
                    : displayName}
                </span>
              ) : (
                <Link to={to} className="breadcrumb-link">
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;