import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';
import API from '../../api/axios';
import { auraSwal as Swal } from '../../utils/swalConfig';

// 🚀 Importamos el servicio centralizado
import { logoutUser } from '../../services/authService';

import AdminSidebar from '../../components/admin/AdminSidebar';
import UserTable from '../../components/admin/UserTable';
import LogsTable from '../../components/admin/LogsTable';
import PersonajesTable from '../../components/admin/PersonajesTable';
import Spinner from '../../components/ui/Spinner';

const Usuarios = ({ setUser }) => { // 👈 Recibimos setUser como prop
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('adminActiveTab');
    return ['usuarios', 'logs', 'personajes'].includes(saved) ? saved : 'usuarios';
  });
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
    fetchDataForTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- MÉTODOS DE ELIMINACIÓN ---
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
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
    localStorage.setItem('adminActiveTab', tab);
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
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {activeTab === 'logs' && data.logs.length > 0 && (
              <button 
                className="btn-reload"
                style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                onClick={() => {
                  Swal.fire({
                    title: '¿Limpiar todos los logs?',
                    text: "Se borrará todo el historial y no podrás recuperarlo.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, limpiar'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      setLoading(true);
                      try {
                        await API.delete('/logs');
                        fetchDataForTab('logs');
                        Swal.fire('¡Limpios!', 'El historial de logs está vacío.', 'success');
                      } catch (error) {
                        Swal.fire('Error', 'No se pudieron limpiar los logs', 'error');
                        setLoading(false);
                      }
                    }
                  });
                }}
                disabled={loading}
                title="Limpiar todos los logs"
              >
                Limpiar Logs
              </button>
            )}

            <button 
              className={`btn-reload ${loading ? 'spinning' : ''}`}
              onClick={() => fetchDataForTab(activeTab)}
              disabled={loading}
              title="Recargar datos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Recargando...' : 'Recargar'}
            </button>
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