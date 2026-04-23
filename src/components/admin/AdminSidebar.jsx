import React, { useState } from 'react';
import { Users, Activity, Swords, LogOut, X, PanelRight } from 'lucide-react';
import './AdminSidebar.css';
import logo from '../../assets/aura-logo.svg';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Función para navegar y cerrar el drawer en móvil
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* HEADER MÓVIL (Solo visible en celulares) */}
      <div className="mobile-top-bar">
        <img src={logo} alt="Aura Logo" className="mobile-logo-img" />
        <button className="mobile-toggle-btn" onClick={() => setMobileOpen(true)}>
          <PanelRight size={24} />
        </button>
      </div>

      {/* OVERLAY: Capa oscura para cerrar al tocar fuera */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}></div>}

      {/* SIDEBAR PRINCIPAL */}
      <aside className={`aura-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        
        {/* HEADER SIDEBAR */}
        <div className="sidebar-header">
          <div className="side-logo">
            {/* En móvil siempre mostramos el logo dentro del drawer */}
            <img src={logo} alt="Aura Logo" className={(collapsed && !mobileOpen) ? 'hide-logo' : ''} />
          </div>

          <button
            className="collapse-btn"
            onClick={() => mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)}
          >
            {mobileOpen ? <X size={20} /> : <PanelRight size={20} />}
          </button>
        </div>

        {/* CONTENIDO DEL MENÚ */}
        <nav className="aura-menu">
          <p className="menu-label">ADMINISTRACIÓN</p>

          <button
            className={`aura-menu-item ${activeTab === 'usuarios' ? 'active' : ''}`}
            onClick={() => handleNavigation('usuarios')}
          >
            <Users size={20} className="menu-icon" />
            <span className="menu-text">Gestión de Usuarios</span>
          </button>

          <button
            className={`aura-menu-item ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => handleNavigation('logs')}
          >
            <Activity size={20} className="menu-icon" />
            <span className="menu-text">Registros</span>
          </button>

          <p className="menu-label">CONTENIDO</p>

          <button
            className={`aura-menu-item ${activeTab === 'personajes' ? 'active' : ''}`}
            onClick={() => handleNavigation('personajes')}
          >
            <Swords size={20} className="menu-icon" />
            <span className="menu-text">Personajes</span>
          </button>
        </nav>

        {/* FOOTER */}
        <div className="aura-sidebar-footer">
          <div className="logout-card">
            <button className="full-logout-btn" onClick={onLogout}>
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