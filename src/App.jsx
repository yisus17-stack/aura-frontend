import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Breadcrumbs from './components/layout/Breadcrumbs';
import logo from './assets/aura-logo-n.svg';
import './App.css';

// Páginas
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CharacterDetail from './pages/Character/CharacterDetail';
import Usuarios from './pages/Admin/Usuarios';
import NotFound from './pages/NotFound/NotFound';
import SitemapPage from './pages/Sitemap/SitemapPage';

// Importamos el servicio centralizado (asegúrate de que la ruta sea correcta)
import { logoutUser } from './services/authService';

const AppContent = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';
  const isAdminPage = location.pathname === '/usuarios';

  // --- FUNCIÓN DE SALIDA RIFADA ---
  // Ahora usa el servicio centralizado para asegurar que mande a Home
  const handleLogout = () => {
    logoutUser(setUser, navigate);
  };

  return (
    <div className="app-container">

      {/* NAVBAR: Se oculta en login/registro y en el panel de usuarios admin */}
      {!isAuthPage && !isAdminPage && (
  <>
    <Navbar 
      key={user ? `auth-${user.id || 'ok'}` : 'guest'} 
      user={user} 
      setUser={setUser}
    />

    
  </>
)}

      <div
        className={
          isAdminPage
            ? "admin-layout-content"
            : isAuthPage
            ? "auth-content"
            : "page-content"
        }
      >
        <Routes>
          {/* 🏠 HOME */}
          <Route path="/" element={<HomePage user={user} />} />

          {/* 🔑 LOGIN */}
          <Route
            path="/login"
            element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/dashboard" replace />}
          />

          {/* 📝 REGISTRO */}
          <Route path="/registro" element={<RegisterPage />} />

          {/* 🔐 DASHBOARD: Redirige a HOME si no hay sesión */}
          <Route
            path="/dashboard"
            element={
              user
                ? <Dashboard user={user} />
                : <Navigate to="/" replace /> 
            }
          />

          {/* 🔐 DETALLE PERSONAJE: Redirige a HOME si no hay sesión */}
          <Route
            path="/personaje/:id"
            element={
              user
                ? <CharacterDetail />
                : <Navigate to="/" replace />
            }
          />

          {/* 🔥 PANEL ADMIN: Redirige a HOME si no es admin */}
          <Route
            path="/usuarios"
            element={
              user?.rol?.toLowerCase() === 'admin'
                ? <Usuarios setUser={setUser} /> // Pasamos setUser para el Sidebar de Admin
                : <Navigate to="/" replace />
            }
          />

          {/* 📄 OTROS */}
          <Route path="/mapa-del-sitio" element={<SitemapPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  // Efecto para mantener sincronizado el localStorage con el estado
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppContent user={user} setUser={setUser} />
    </BrowserRouter>
  );
}

export default App;