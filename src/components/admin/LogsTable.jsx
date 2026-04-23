import React from 'react';

// 👇 MISMA UI TABLE
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../ui/Table';

import './LogsTable.css';

const LogsTable = ({ data = [] }) => {

  const getStatusClass = (status) => {
    if (!status) return '';

    const s = status.toLowerCase();

    if (s.includes('success')) return 'success';
    if (s.includes('error')) return 'error';
    if (s.includes('warning')) return 'warning';

    return '';
  };

  const getStatusText = (status) => {
    if (!status) return '-';

    const s = status.toLowerCase();

    if (s.includes('success')) return 'Éxito';
    if (s.includes('error')) return 'Error';
    if (s.includes('warning')) return 'Advertencia';

    return status;
  };

  return (
    <div className="logs-table-container">

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Acción</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((log, i) => (
              <TableRow key={log._id || i}>

                <TableCell style={{ fontWeight: '600', color: '#1e293b' }}>
                  {log.accion}
                </TableCell>

                <TableCell>
                  {log.usuario}
                </TableCell>

                <TableCell style={{ color: '#94a3b8' }}>
                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleString()
                    : '-'}
                </TableCell>

                <TableCell>
                  <span className={`status-badge ${getStatusClass(log.status)}`}>
                    {getStatusText(log.status)}
                  </span>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="empty">
                No hay logs registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 👇 CONTADOR SIMPLE (igual que UserTable) */}
      {data.length > 0 && (
        <div className="table-footer-simple">
          Total: <strong>{data.length}</strong> registros
        </div>
      )}

    </div>
  );
};

export default LogsTable;