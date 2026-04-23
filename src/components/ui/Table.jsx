import React from 'react';
import './Table.css';

export const Table = ({ children }) => (
  <div className="table-scroll-container">
    <table className="aura-table">{children}</table>
  </div>
);

export const TableHeader = ({ children }) => <thead className="aura-thead">{children}</thead>;
export const TableBody = ({ children }) => <tbody className="aura-tbody">{children}</tbody>;
export const TableRow = ({ children }) => <tr className="aura-tr">{children}</tr>;
export const TableHead = ({ children }) => <th className="aura-th">{children}</th>;
export const TableCell = ({ children }) => <td className="aura-td">{children}</td>;