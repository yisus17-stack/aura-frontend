import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Film,
  Activity,
  Info,
  Globe
} from 'lucide-react';

import API from '../../api/axios';
import { normalizeImageUrl } from '../../utils/imageHelpers';

import './CharacterDetail.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const personajeDesdeState = location.state?.personaje ?? null;

  const [personaje, setPersonaje] = useState(personajeDesdeState);
  const [loading, setLoading] = useState(!personajeDesdeState);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonaje = async () => {
      if (!id) {
        setPersonaje(null);
        setError('No se encontró el identificador del personaje.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await API.get(`/personajes/${id}`);
        const data = response?.data?.personaje ?? response?.data;

        setPersonaje(data ?? null);
      } catch (err) {
        console.error('Error al cargar detalle:', err);

        if (!personajeDesdeState) {
          setPersonaje(null);
        }

        setError(
          err.response?.data?.message || 'No se pudo cargar el detalle del personaje.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (personajeDesdeState?._id === id) {
      setPersonaje(personajeDesdeState);
      setLoading(false);
      setError('');
      return;
    }

    fetchPersonaje();
  }, [id, personajeDesdeState]);

  if (loading) {
    return <div className="loader">Cargando...</div>;
  }

  if (!personaje) {
    return <div className="loader">{error || 'No se encontro el personaje'}</div>;
  }

  return (
    <div className="container detail-page-container">
      <button onClick={() => navigate(-1)} className="btn-back-subtle">
        <ChevronLeft size={20} strokeWidth={2.5} />
        <span>Volver</span>
      </button>

      <div className="master-detail-layout">
        <div className="visual-panel">
          <div className="main-image-card">
            <img
              src={normalizeImageUrl(personaje.imagen)}
              alt={personaje.nombre}
              className="character-hero-img"
            />
            <div className="category-overlay">{personaje.categoria}</div>
          </div>
        </div>

        <aside className="data-panel">
          <div className="character-title-section">
            <label>Character Profile</label>
            <h1>{personaje.nombre}</h1>
          </div>

          <div className="widgets-group">
            <div className="expo-widget">
              <div className="widget-icon">
                <Film size={18} />
              </div>
              <div className="widget-info">
                <label>Pelicula</label>
                <p>{personaje.pelicula}</p>
              </div>
            </div>

            <div className="expo-widget">
              <div className="widget-icon">
                <Calendar size={18} />
              </div>
              <div className="widget-info">
                <label>Anio</label>
                <p>{personaje.anio}</p>
              </div>
            </div>

            <div className="expo-widget highlight">
              <div className="widget-icon">
                <Activity size={18} />
              </div>
              <div className="widget-info">
                <label>Estado</label>
                <p>Activo</p>
              </div>
            </div>
          </div>

          <div className="history-widget-card">
            <div className="history-header">
              <Info size={16} />
              <span>Descripcion</span>
            </div>
            <p>{personaje.descripcion}</p>
          </div>

          <div className="api-preview-card">
            <div className="api-header">
              <Globe size={12} />
              <label>Endpoint</label>
            </div>
            <code>/api/personajes/{id}</code>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CharacterDetail;
