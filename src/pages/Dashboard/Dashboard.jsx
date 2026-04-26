import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import { auraSwal as Swal } from '../../utils/swalConfig';

import API from '../../api/axios'; 
import { normalizeImageUrl } from '../../utils/imageHelpers';

import Spinner from '../../components/ui/Spinner';
import Breadcrumbs from '../../components/layout/Breadcrumbs';

import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        const respuesta = await API.get('/personajes'); 
        setPersonajes(respuesta.data);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPersonajes();
  }, []);

  const personajesFiltrados = personajes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const eliminarPersonaje = async (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/personajes/${id}`); 

          setPersonajes(prev => prev.filter((p) => p.id !== id));

          Swal.fire({
            title: 'Eliminado',
            text: 'Personaje eliminado correctamente',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false
          });

        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: "No se pudo eliminar el personaje.",
            icon: 'error'
          });
        }
      }
    });
  };

  // 🔄 LOADING
  if (loading) {
    return <Spinner size="large" />;
  }

  return (
    <div className="dashboard-container">

      {/* 🔥 BREADCRUMB */}
      <Breadcrumbs nombre="Personajes" />

      {/* HERO */}
      <section className="dashboard-hero">
        <div className="hero-wrapper">

          {/* IZQUIERDA */}
          <div className="hero-content">
            <h1>Personajes</h1>
            <p>Explora la bóveda y encuentra tus favoritos.</p>
          </div>

          {/* DERECHA */}
          <div className="hero-search">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>

        </div>
      </section>

      {/* CONTENIDO */}
      <section className="dashboard-content">
        <div className="card-grid">
          {personajesFiltrados.map((p) => (
            <Link 
              to={`/personaje/${p.id}`}
              key={p.id}
              state={{ personaje: p }} // 🔥 importante
              className="character-card-link"
            >
              <div className="character-card">

                <div className="image-container">
                  <img
                    src={normalizeImageUrl(p.imagen_url)}
                    alt={p.nombre}
                  />
                </div>

                <div className="card-info">
                  <div className="card-text">
                    <h3>{p.nombre}</h3>
                    <p>{p.pelicula} ({p.anio})</p>
                    <span className="badge-category">{p.categoria}</span>
                  </div>

                  {user?.rol?.toLowerCase() === 'admin' && (
                    <button 
                      onClick={(e) => eliminarPersonaje(e, p.id)}
                      className="btn-delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

              </div>
            </Link>
          ))}
        </div>

        {personajesFiltrados.length === 0 && (
          <div className="empty-state">
            <p>No se encontraron personajes.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;