import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Film,
  Activity,
  Info
} from 'lucide-react';

import API from '../../api/axios';
import { normalizeImageUrl } from '../../utils/imageHelpers';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import Spinner from '../../components/ui/Spinner';

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
        console.error(err);
        setError('No se pudo cargar el personaje.');
      } finally {
        setLoading(false);
      }
    };

    // ⚡ Si ya viene desde state no vuelve a pedir
    if (
      personajeDesdeState &&
      (personajeDesdeState.id === id ||
        personajeDesdeState.id === Number(id))
    ) {
      setPersonaje(personajeDesdeState);
      setLoading(false);
      return;
    }

    fetchPersonaje();
  }, [id, personajeDesdeState]);

  // 🔄 LOADING BONITO
  if (loading) {
    return <Spinner size="large" />;
  }

  // ❌ ERROR / VACÍO
  if (!personaje) {
    return (
      <div className="container detail-page-container">
        <p>{error || 'No se encontró el personaje'}</p>
      </div>
    );
  }

  return (
    <div className="container detail-page-container">

      {/* ✅ Breadcrumb dinámico con nombre */}
      <Breadcrumbs nombre={personaje.nombre} />

      {/* 🔙 BOTÓN */}
      <button onClick={() => navigate(-1)} className="btn-back-subtle">
        <ChevronLeft size={20} strokeWidth={2.5} />
        <span>Volver</span>
      </button>

      <div className="master-detail-layout">

        {/* 🖼 IZQUIERDA */}
        <div className="visual-panel">
          <div className="main-image-card">
            <img
              src={normalizeImageUrl(personaje.imagen_url)}
              alt={personaje.nombre}
              className="character-hero-img"
            />
            <div className="category-overlay">
              {personaje.categoria}
            </div>
          </div>
        </div>

        {/* 📊 DERECHA */}
        <aside className="data-panel">

          <div className="character-title-section">
            <label>FICHA TÉCNICA</label>
            <h1>{personaje.nombre}</h1>
          </div>

          <div className="widgets-group">

            <div className="expo-widget">
              <div className="widget-icon">
                <Film size={18} />
              </div>
              <div className="widget-info">
                <label>Película</label>
                <p>{personaje.pelicula}</p>
              </div>
            </div>

            <div className="expo-widget">
              <div className="widget-icon">
                <Calendar size={18} />
              </div>
              <div className="widget-info">
                <label>Año</label>
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
              <span>Descripción</span>
            </div>
            <p>{personaje.descripcion}</p>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default CharacterDetail;