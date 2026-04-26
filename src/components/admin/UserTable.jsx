import React from 'react';
import { Trash2 } from 'lucide-react';

// 👇 Componentes UI de tu tabla
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import './UserTable.css';

const UserTable = ({ data = [], onDelete }) => {
  return (
    <div className="user-table-container">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((u, i) => (
              <TableRow key={u.id || u._id || i}>
                <TableCell style={{ fontWeight: '600', color: '#1e293b' }}>
                  {u.nombre}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <span className={`badge ${u.rol?.toLowerCase() === 'admin' ? 'Admin' : 'user'}`}>
                    {u.rol}
                  </span>
                </TableCell>
                <TableCell>
                 
                    <button 
                      className="btn-delete" 
                      onClick={() => onDelete(u._id)}
                      title="Eliminar usuario"
                    >
                      <Trash2 size={18} />
                    </button>
                  
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="empty">
                No hay usuarios registrados aún.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer minimalista opcional: solo cuenta el total */}
      {data.length > 0 && (
        <div className="table-footer-simple">
          Total: <strong>{data.length}</strong> usuarios
        </div>
      )}
    </div>
  );
};

export default UserTable;