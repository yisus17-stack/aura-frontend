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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.nav-user-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
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
              <Link to="/" className="nav-item">
                <Home size={18} />
                <span>Inicio</span>
              </Link>
              {user && (
                <>
                   <Link to="/dashboard" className="nav-item">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  {user.rol?.toLowerCase() === 'admin' && (
                    <Link to="/admin" className="nav-link-admin">
                      <ShieldCheck size={18} />
                      <span>Panel Admin</span>
                    </Link>
                  )}
                </>
              )}
            </div>

            {user ? (
              <div className="nav-user-container">
                <div 
                  className={`nav-avatar-circle ${user.rol?.toLowerCase() === 'admin' ? 'admin' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title="Cuenta"
                >
                  {user.nombre?.charAt(0).toUpperCase()}
                </div>

                {isDropdownOpen && (
                  <div className="nav-dropdown-mini">
                    <div className="dropdown-info">
                      <p className="d-name">{user.nombre}</p>
                      <p className="d-role">{user.rol}</p>
                    </div>
                    <div className="d-divider"></div>
                    <button className="d-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
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
                <Link to="/admin" className="drawer-item admin-highlight"><ShieldCheck size={20} /><span>Panel Admin</span></Link>
              )}
            </>
          ) : (
            <Link to="/login" className="drawer-item"><UserCircle size={20} /><span>Iniciar Sesión</span></Link>
          )}
        </nav>
        {user && (
          <div className="drawer-footer">
            <div className="user-info-drawer">
              <div className={`nav-avatar-circle ${user.rol?.toLowerCase() === 'admin' ? 'admin' : ''}`}>
                {user.nombre?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <p className="user-name">{user.nombre}</p>
                <p className="user-role">{user.rol}</p>
              </div>
            </div>
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