import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react'; // Agregué ShieldCheck por si quieres un icono pro para el admin
import './Navbar.css';
import logo from '../../assets/Aura.svg';

const Navbar = ({ user, onLogout}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        
        <Link to="/" className="nav-logo">
           <img src={logo} alt="Aura Logo" className="logo" />
        </Link>

        <div className="nav-links">
          {user && <Link to="/dashboard" className="nav-item">Dashboard</Link>}
          
          {/* BOTÓN ADMIN: Usamos user?.rol para que no truene si user es null */}
          {user?.rol === 'Admin' && (
            <Link to="/usuarios" className="nav-link-admin">
              <ShieldCheck size={16} />
              <span>Panel de Control</span>
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          ) : (
            <Link to="/login" className="nav-item">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;