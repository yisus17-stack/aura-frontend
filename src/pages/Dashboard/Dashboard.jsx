import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import './Dashboard.css';
import Swal from 'sweetalert2';
import API from '../../api/axios'; // 🔥 IMPORTANTE

const Dashboard = ({ user }) => {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        const respuesta = await API.get('/personajes'); // 🔥 YA USA TOKEN
        setPersonajes(respuesta.data);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
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
      confirmButtonColor: '#8b79a5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/personajes/${id}`); // 🔥 YA USA TOKEN

          // 🔥 actualización correcta del estado
          setPersonajes(prev => prev.filter((p) => p._id !== id));

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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Personajes</h1>
        <p>
          Bienvenido, <b>Yisus</b>. Tienes permisos de <b>{user?.rol}</b>.
        </p>
      </header>

      <div className="search-bar">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre en la bóveda..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="card-grid">
        {personajesFiltrados.map((p) => (
          <Link 
            to={`/personaje/${p._id}`}
            key={p._id} 
            state={{ nombrePersonaje: p.nombre, personaje: p }}
            className="character-card-link"
          >
            <div className="character-card">
              <div className="image-container">
                <img src={p.imagen} alt={p.nombre} />
              </div>

              <div className="card-info">
                <div className="card-text">
                  <h3>{p.nombre}</h3>
                  <p>{p.pelicula} ({p.anio})</p>
                  <span className="badge-category">{p.categoria}</span>
                </div>
                
                {user?.rol === 'Admin' && (
                  <button 
                    onClick={(e) => eliminarPersonaje(e, p._id)}
                    className="btn-delete"
                    title="Eliminar personaje"
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
          <p>No se encontraron personajes en la bóveda.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
