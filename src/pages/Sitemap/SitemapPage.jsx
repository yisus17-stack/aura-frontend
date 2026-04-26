import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Globe, Lock, ShieldAlert, FileWarning, LogIn, UserPlus, LayoutDashboard, User, Users, AlertTriangle, Map } from 'lucide-react';
import './SitemapPage.css';

const SitemapPage = () => {
  return (
    <div className="sitemap-wrapper">
      <div className="sitemap-container">
        <div className="sitemap-header">
          <h1>Mapa del Sitio</h1>
          <p>Estructura jerárquica de la plataforma Aura</p>
        </div>

        <div className="sitemap-tree-container">
          <ul className="tree">
            <li>
              <div className="tree-node root-node">
                <Link to="/">
                  <Home size={18} className="node-icon" /> Inicio
                </Link>
              </div>
              <ul>
                <li>
                  <div className="tree-node branch-node public">
                    <Globe size={18} className="node-icon" /> <span>Públicas</span>
                  </div>
                  <ul>
                    <li><div className="tree-node leaf-node"><Link to="/login"><LogIn size={15} className="leaf-icon" /> Iniciar Sesión</Link></div></li>
                    <li><div className="tree-node leaf-node"><Link to="/registro"><UserPlus size={15} className="leaf-icon" /> Registro</Link></div></li>
                  </ul>
                </li>
                <li>
                  <div className="tree-node branch-node private">
                    <Lock size={18} className="node-icon" /> <span>Privadas</span>
                  </div>
                  <ul>
                    <li><div className="tree-node leaf-node"><Link to="/dashboard"><LayoutDashboard size={15} className="leaf-icon" /> Dashboard</Link></div></li>
                    <li><div className="tree-node leaf-node"><Link to="/personaje/1"><User size={15} className="leaf-icon" /> Detalle Personaje</Link></div></li>
                  </ul>
                </li>
                <li>
                  <div className="tree-node branch-node admin">
                    <ShieldAlert size={18} className="node-icon" /> <span>Administración</span>
                  </div>
                  <ul>
                    <li><div className="tree-node leaf-node"><Link to="/admin"><Users size={15} className="leaf-icon" /> Panel de Administración</Link></div></li>
                  </ul>
                </li>
                <li>
                  <div className="tree-node branch-node info">
                    <FileWarning size={18} className="node-icon" /> <span>Información</span>
                  </div>
                  <ul>
                    <li><div className="tree-node leaf-node"><Link to="/404"><AlertTriangle size={15} className="leaf-icon" /> Página 404</Link></div></li>
                    <li><div className="tree-node leaf-node"><Link to="/mapa-del-sitio"><Map size={15} className="leaf-icon" /> Mapa del Sitio</Link></div></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
