import { Trash2 } from 'lucide-react';

// 👇 Componentes UI de tu tabla
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../ui/Table';

import './PersonajesTable.css';
import { normalizeImageUrl } from '../../utils/imageHelpers';

const PersonajeTable = ({ data = [], onDelete }) => {
  return (
    <div className="personaje-table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Película</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((p) => (
              // 1. Cambiamos p._id por p.id (Estilo SQL)
              <TableRow key={p.id}>
                <TableCell style={{ fontWeight: '600', color: '#1e293b' }}>
                  {p.nombre}
                </TableCell>

                <TableCell>
                  <img
                    // 2. Cambiamos p.imagen por p.imagen_url (Nombre de tu columna en Supabase)
                    src={normalizeImageUrl(p.imagen_url)}
                    alt={p.nombre}
                    className="character-img"
                    // Agregamos un estilo preventivo por si la clase CSS falla
            
                  />
                </TableCell>

                <TableCell>{p.descripcion}</TableCell>

                <TableCell>{p.pelicula}</TableCell>

                <TableCell className="text-center">
                  <button
                    className="btn-delete"
                    // 3. Cambiamos p._id por p.id para la función de eliminar
                    onClick={() => onDelete(p.id)}
                    title="Eliminar personaje"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="empty">
                No hay personajes registrados aún.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data.length > 0 && (
        <div className="table-footer-simple">
          Total: <strong>{data.length}</strong> personajes
        </div>
      )}
    </div>
  );
};

export default PersonajeTable;