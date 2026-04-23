import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, Calendar, Film, Tag, Activity, Info, Globe } from 'lucide-react';
import './CharacterDetail.css'; // Importamos los estilos específicos para esta página

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPersonaje] = useState(null);

  useEffect(() => {
    const fetchDato = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/personajes/${id}`);
        setPersonaje(res.data);
      } catch (e) {
        console.error("Error al cargar detalle");
      }
    };
    fetchDato();
  }, [id]);

  if (!p) return <div className="loader">Cargando magia...</div>;

  return (
    <div className="container detail-page-container">
      <button onClick={() => navigate(-1)} className="btn-back-subtle">
        <ChevronLeft size={20} strokeWidth={2.5} />
        <span>Volver al Dashboard</span>
      </button>

      <div className="master-detail-layout">
        
        {/* COLUMNA IZQUIERDA: Enfoque en el Arte */}
        <div className="visual-panel">
          <div className="main-image-card">
            <img src={p.imagen} alt={p.nombre} className="character-hero-img" />
            <div className="category-overlay">{p.categoria}</div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Información Densa (Llenado total) */}
        <aside className="data-panel">
          <div className="character-title-section">
            <label>Character Profile</label>
            <h1>{p.nombre}</h1>
          </div>

          <div className="widgets-group">
            <h3 className="section-title">Ficha Técnica</h3>
            
            <div className="expo-widget">
              <div className="widget-icon"><Film size={18} /></div>
              <div className="widget-info">
                <label>Origen</label>
                <p>{p.pelicula}</p>
              </div>
            </div>

            <div className="expo-widget">
              <div className="widget-icon"><Calendar size={18} /></div>
              <div className="widget-info">
                <label>Lanzamiento</label>
                <p>Año {p.anio}</p>
              </div>
            </div>

            <div className="expo-widget highlight">
              <div className="widget-icon"><Activity size={18} /></div>
              <div className="widget-info">
                <label>Estado del Asset</label>
                <p>Verificado / 4K</p>
              </div>
            </div>
          </div>

          {/* LA HISTORIA: Ahora aquí para llenar el espacio */}
          <div className="history-widget-card">
            <div className="history-header">
              <Info size={16} />
              <span>Historia y Perfil</span>
            </div>
            <p>{p.descripcion}</p>
          </div>

          <div className="api-preview-card">
            <div className="api-header">
              <Globe size={12} />
              <label>API Endpoint</label>
            </div>
            <code>GET /personajes/{id}</code>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default CharacterDetail;