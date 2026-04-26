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
            <TableHead style={{ width: '80px' }}>Avatar</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead style={{ width: '120px' }}>Rol</TableHead>
            <TableHead style={{ width: '100px' }} className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((u, i) => (
              <TableRow key={u.id || u._id || i}>
                <TableCell>
                  <div className="user-avatar-circle" style={{ 
                    background: u.rol?.toLowerCase() === 'admin' ? '#f0ebf8' : '#f8f9fb',
                    color: u.rol?.toLowerCase() === 'admin' ? '#9b89b5' : '#64748b'
                  }}>
                    {u.nombre?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </TableCell>
                <TableCell style={{ color: '#1e293b' }}>
                  {u.nombre}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <span className={`badge-aura-role ${u.rol?.toLowerCase() === 'admin' ? 'admin' : 'user'}`}>
                    {u.rol}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                    <button 
                      className="btn-delete" 
                      onClick={() => onDelete(u.id || u._id)}
                      title="Eliminar usuario"
                    >
                      <Trash2 size={18} />
                    </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="empty">
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