import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css';

// Páginas
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CharacterDetail from './pages/Character/CharacterDetail';
import AdminPanel from './pages/Admin/AdminPanel';
import NotFound from './pages/NotFound/NotFound';
import SitemapPage from './pages/Sitemap/SitemapPage';

// Importamos el servicio centralizado (asegúrate de que la ruta sea correcta)


const AppContent = ({ user, setUser }) => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';
  const isAdminPage = location.pathname === '/admin';



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
            path="/admin"
            element={
              user?.rol?.toLowerCase() === 'admin'
                ? <AdminPanel setUser={setUser} /> // Pasamos setUser para el Sidebar de Admin
                : <Navigate to="/" replace />
            }
          />

          {/* 📄 OTROS */}
          <Route path="/mapa-del-sitio" element={<SitemapPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>

      {/* FOOTER GLOBAL: Se muestra en todas las páginas excepto login/registro y panel admin */}
      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
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