import React from 'react';
import './Table.css';

export const Table = ({ children, className = '', ...props }) => (
  <div className={`table-scroll-container ${className}`}>
    <table className="aura-table" {...props}>{children}</table>
  </div>
);

export const TableHeader = ({ children, className = '', ...props }) => (
  <thead className={`aura-thead ${className}`} {...props}>{children}</thead>
);

export const TableBody = ({ children, className = '', ...props }) => (
  <tbody className={`aura-tbody ${className}`} {...props}>{children}</tbody>
);

export const TableRow = ({ children, className = '', ...props }) => (
  <tr className={`aura-tr ${className}`} {...props}>{children}</tr>
);

export const TableHead = ({ children, className = '', ...props }) => (
  <th className={`aura-th ${className}`} {...props}>{children}</th>
);

export const TableCell = ({ children, className = '', ...props }) => (
  <td className={`aura-td ${className}`} {...props}>{children}</td>
);