import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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

const AppContent = ({ user, setUser }) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/registro';

  const isAdminPage = location.pathname === '/usuarios';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="app-container">

      {/* NAVBAR */}
      {!isAuthPage && !isAdminPage && (
        <>
          <Navbar user={user} onLogout={handleLogout} logo={logo} />
          <Breadcrumbs />
        </>
      )}

      {/* CONTENIDO */}
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

          <Route path="/" element={<HomePage user={user} />} />

          <Route
            path="/login"
            element={<LoginPage setUser={setUser} />}
          />

          <Route path="/registro" element={<RegisterPage />} />

          {/* 🔐 DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              user
                ? <Dashboard user={user} />
                : <Navigate to="/login" replace />
            }
          />

          {/* 🔐 DETALLE */}
          <Route
            path="/personaje/:id"
            element={
              user
                ? <CharacterDetail />
                : <Navigate to="/login" replace />
            }
          />

          {/* 🔥 ADMIN */}
          <Route
            path="/usuarios"
            element={
              user?.rol === 'Admin'
                ? <Usuarios onLogout={handleLogout} />
                : <Navigate to="/dashboard" replace />
            }
          />

          {/* 404 y Mapa del Sitio */}
          <Route path="/mapa-del-sitio" element={<SitemapPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />

        </Routes>
      </div>
    </div>
  );
};

function App() {

  // 🔥 ESTADO PERSISTENTE DESDE LOCALSTORAGE
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔄 SINCRONIZAR (opcional pero pro)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppContent user={user} setUser={setUser} />
    </BrowserRouter>
  );
}

export default App;