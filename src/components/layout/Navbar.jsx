import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, Menu, X, LayoutDashboard, UserCircle } from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/Aura.svg';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate('/login');
  };

  return (
    <>
      {/* NAVBAR SUPERIOR (Desktop y Gatillo Móvil) */}
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Aura Logo" />
          </Link>

          {/* BOTÓN MÓVIL (Gatillo) */}
          <button className="nav-toggle" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>

          {/* MENÚ DESKTOP (Se oculta en móvil vía CSS) */}
          <div className="desktop-menu-wrapper">
             <div className="nav-menu">
                <Link to="/mapa-del-sitio" className="nav-item">Mapa del Sitio</Link>
                {user && (
                  <Link to="/dashboard" className="nav-item">
                    Dashboard
                  </Link>
                )}
                {user?.rol === 'Admin' && (
                  <Link to="/usuarios" className="nav-link-admin">
                    <ShieldCheck size={18} />
                    <span>Panel</span>
                  </Link>
                )}
             </div>
             {user ? (
               <button className="btn-logout-desktop" onClick={handleLogout}>
                 <LogOut size={18} />
               </button>
             ) : (
               <Link to="/login" className="nav-item">Iniciar Sesión</Link>
             )}
          </div>
        </div>
      </nav>

      {/* OVERLAY OSCURO */}
      <div 
        className={`sidebar-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={closeMenu} 
      />

      {/* SIDEBAR DRAWER (Móvil) */}
      <aside className={`aura-nav-drawer ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="drawer-header">
          <img src={logo} alt="Aura Logo" className="drawer-logo" />
          <button className="close-drawer-btn" onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>

        <nav className="drawer-menu">
          <p className="menu-label">Navegación</p>
          <Link to="/mapa-del-sitio" onClick={closeMenu} className="drawer-item">
             <span>Mapa del Sitio</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="drawer-item">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>

              {user.rol === 'Admin' && (
                <>
                  <p className="menu-label">Administración</p>
                  <Link to="/usuarios" onClick={closeMenu} className="drawer-item admin-highlight">
                    <ShieldCheck size={20} />
                    <span>Panel de Control</span>
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="drawer-item">
              <UserCircle size={20} />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </nav>

        {user && (
          <div className="drawer-footer">
            <div className="logout-card">
              <button className="full-logout-btn" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;