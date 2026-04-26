import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';
import API from '../../api/axios';
import Swal from 'sweetalert2';

// 🚀 Importamos el servicio centralizado
import { logoutUser } from '../../services/authService';

import AdminSidebar from '../../components/admin/AdminSidebar';
import UserTable from '../../components/admin/UserTable';
import LogsTable from '../../components/admin/LogsTable';
import PersonajesTable from '../../components/admin/PersonajesTable';
import Spinner from '../../components/ui/Spinner';

const Usuarios = ({ setUser }) => { // 👈 Recibimos setUser como prop
  const [activeTab, setActiveTab] = useState('usuarios');
  const [data, setData] = useState({
    usuarios: [],
    logs: [],
    personajes: []
  });
  const [loading, setLoading] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState({
    usuarios: false,
    logs: false,
    personajes: false
  });

  const navigate = useNavigate();

  // --- 🔄 CAMBIO AQUÍ: Usamos el servicio centralizado ---
  const handleLogout = useCallback(() => {
    logoutUser(setUser, navigate);
  }, [setUser, navigate]);

  const getEndpointByTab = (tab) => {
    if (tab === 'logs') return '/logs';
    if (tab === 'personajes') return '/personajes';
    return '/usuarios';
  };

  const fetchDataForTab = useCallback(async (tab) => {
    setLoading(true);
    try {
      const response = await API.get(getEndpointByTab(tab));
      setData((prev) => ({
        ...prev,
        [tab]: response.data || []
      }));
      setLoadedTabs((prev) => ({
        ...prev,
        [tab]: true
      }));
    } catch (error) {
      console.error(`Error cargando ${tab}:`, error);
      // Si el token expira (401), mandamos al Home mediante el logout centralizado
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    fetchDataForTab('usuarios');
  }, [fetchDataForTab]);

  // --- MÉTODOS DE ELIMINACIÓN ---
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#8b79a5',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) eliminarUsuarioConfirmado(id);
    });
  };

  const eliminarUsuarioConfirmado = async (id) => {
    try {
      await API.delete(`/usuarios/${id}`);
      setData(prev => ({
        ...prev,
        usuarios: prev.usuarios.filter(u => u._id !== id)
      }));
      Swal.fire('Eliminado', 'Usuario borrado correctamente', 'success');
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  };

  const eliminarPersonaje = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este personaje se eliminará permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPersonajeConfirmado(id);
      }
    });
  };

  const eliminarPersonajeConfirmado = async (id) => {
    try {
      await API.delete(`/personajes/${id}`);
      setData(prev => ({
        ...prev,
        personajes: prev.personajes.filter(p => p._id !== id)
      }));
      Swal.fire('Eliminado', 'Personaje borrado correctamente', 'success');
    } catch (error) {
      console.error("Error al eliminar personaje:", error);
      Swal.fire('Error', 'No se pudo eliminar el personaje', 'error');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (!loadedTabs[tab]) {
      fetchDataForTab(tab);
    }
  };

  return (
    <div className="aura-layout">
      {/* 🚀 Pasamos setUser al Sidebar para que también pueda cerrar sesión */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        setUser={setUser} 
      />

      <main className="aura-main">
        <header className="aura-content-header">
          <div className="header-info">
            <h1>
              {activeTab === 'usuarios' && 'Usuarios'}
              {activeTab === 'logs' && 'Logs'}
              {activeTab === 'personajes' && 'Personajes'}
            </h1>
            <p>Administra los datos de la plataforma Aura</p>
          </div>
        </header>

        <div className="table-container-wrapper">
          {loading ? (
            <div className="table-spinner-container">
              <Spinner size="large" />
            </div>
          ) : (
            <>
              {activeTab === 'usuarios' && (
                <UserTable data={data.usuarios} onDelete={eliminarUsuario} />
              )}
              {activeTab === 'logs' && <LogsTable data={data.logs} />}
              {activeTab === 'personajes' && (
                <PersonajesTable data={data.personajes} onDelete={eliminarPersonaje} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Usuarios;