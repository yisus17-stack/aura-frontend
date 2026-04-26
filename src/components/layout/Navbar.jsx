import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut, ShieldCheck, PanelRight, X, LayoutDashboard, UserCircle } from 'lucide-react';
import { logoutUser } from '../../services/authService';
import './Navbar.css';
import logo from '../../assets/Aura.svg';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logoutUser(setUser, navigate);
  };

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Aura Logo" />
          </Link>


          <button className="nav-toggle" onClick={() => setIsMenuOpen(true)}>
            <PanelRight size={24} />
          </button>

          <div className="desktop-menu-wrapper">
            <div className="nav-menu">
              <Link to="/" className="nav-item">Inicio</Link>
              {user && (
                <>
                  <Link to="/dashboard" className="nav-item">Dashboard</Link>
                  {user.rol?.toLowerCase() === 'admin' && (
                    <Link to="/usuarios" className="nav-link-admin">
                      <ShieldCheck size={18} />
                      <span>Panel</span>
                    </Link>
                  )}
                </>
              )}
            </div>

            {user ? (
              <div className="nav-menu">
                <span className="user-badge-nav">{user.nombre?.split(' ')[0]}</span>
                <button className="btn-logout-desktop" onClick={handleLogout}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-item">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>

      <div className={`sidebar-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)} />

      <aside className={`aura-nav-drawer ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="drawer-header">
          <img src={logo} alt="Aura Logo" className="drawer-logo" />
          <button className="close-drawer-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="drawer-menu">
          <p className="menu-label">Navegación</p>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="drawer-item"><Home size={20} /><span>Inicio</span></Link>
          {user ? (
            <>
              <Link to="/dashboard" className="drawer-item"><LayoutDashboard size={20} /><span>Dashboard</span></Link>
              {user.rol?.toLowerCase() === 'admin' && (
                <Link to="/usuarios" className="drawer-item admin-highlight"><ShieldCheck size={20} /><span>Panel Admin</span></Link>
              )}
            </>
          ) : (
            <Link to="/login" className="drawer-item"><UserCircle size={20} /><span>Iniciar Sesión</span></Link>
          )}
        </nav>
        {user && (
          <div className="drawer-footer">
            <div className="logout-card">
              <button className="full-logout-btn" onClick={handleLogout}>
                <LogOut size={20} /><span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;