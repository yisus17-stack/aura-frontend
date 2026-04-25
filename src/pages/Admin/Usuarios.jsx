import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';
import API from '../../api/axios';
import Swal from 'sweetalert2';

import AdminSidebar from '../../components/admin/AdminSidebar';
import UserTable from '../../components/admin/UserTable';
import LogsTable from '../../components/admin/LogsTable';
import PersonajesTable from '../../components/admin/PersonajesTable';
import Spinner from '../../components/ui/Spinner';

const Usuarios = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [data, setData] = useState({
    usuarios: [],
    logs: [],
    personajes: []
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  // Usamos useCallback para poder re-utilizar la carga si es necesario
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Usamos peticiones individuales o Promise.all
      // Tip: Revisa si los endpoints terminan en / o no en tu backend
      const [usuariosRes, logsRes, personajesRes] = await Promise.all([
        API.get('/usuarios'),
        API.get('/logs'),
        API.get('/personajes')
      ]);

      setData({
        usuarios: usuariosRes.data || [],
        logs: logsRes.data || [],
        personajes: personajesRes.data || []
      });

    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      // Si el error es 401 o 403, es probable que el token expiró
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return (
    <div className="aura-layout">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
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
              <Spinner size="large" message="Cargando datos..." />
            </div>
          ) : (
            <>
              {activeTab === 'usuarios' && (
                <UserTable data={data.usuarios} onDelete={eliminarUsuario} />
              )}
              {activeTab === 'logs' && <LogsTable data={data.logs} />}
              {activeTab === 'personajes' && (
               <PersonajesTable data={data.personajes} onDelete={eliminarPersonaje} />)
              }
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Usuarios;