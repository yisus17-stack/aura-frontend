import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, Swords, LogOut, X, PanelRight, Grid2X2} from 'lucide-react';
import { logoutUser } from '../../services/authService';
import './AdminSidebar.css';
import logo from '../../assets/aura-logo.svg';

const AdminSidebar = ({ activeTab, setActiveTab, setUser }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser(setUser, navigate);
  };

  return (
    <>
      <div className="mobile-top-bar">
        <img src={logo} alt="Aura Logo" className="mobile-logo-img" />
        <button className="mobile-toggle-btn" onClick={() => setMobileOpen(true)}>
          <PanelRight size={24} />
        </button>
      </div>

      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>}

      <aside className={`aura-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="side-logo">
            <img src={logo} alt="Aura Logo" className={(collapsed && !mobileOpen) ? 'hide-logo' : ''} />
          </div>
          <button className="collapse-btn" onClick={() => mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)}>
            {mobileOpen ? <X size={20} /> : <PanelRight size={20} />}
          </button>
        </div>

        <nav className="aura-menu">
          <p className="menu-label">ADMINISTRACIÓN</p>
          <button className={`aura-menu-item ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
            <Users size={20} className="menu-icon" /><span className="menu-text">Usuarios</span>
          </button>
          <button className={`aura-menu-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
            <Activity size={20} className="menu-icon" /><span className="menu-text">Registros</span>
          </button>
          <p className="menu-label">CONTENIDO</p>
          <button className={`aura-menu-item ${activeTab === 'personajes' ? 'active' : ''}`} onClick={() => setActiveTab('personajes')}>
            <Swords size={20} className="menu-icon" /><span className="menu-text">Personajes</span>
          </button>
          <p className="menu-label">DASHBOARD</p>
            <button 
              className="aura-menu-item" 
              onClick={() => {
                setActiveTab('dashboard');
                navigate('/dashboard');
              }}
            >
              <Grid2X2 size={20} className="menu-icon" />
              <span className="menu-text">Dashboard</span>
            </button>
        </nav>



        <div className="aura-sidebar-footer">
          <div className="logout-card">
          

            <button className="full-logout-btn" onClick={handleLogout}>
              <LogOut size={18} className="menu-icon" />
              <span className="menu-text">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;