export const normalizeImageUrl = (imagen) => {
  if (!imagen) return '';
  if (/^https?:\/\//i.test(imagen)) return imagen;

  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
  if (imagen.startsWith('/')) {
    return `${apiBase}${imagen}`;
  }

  return `${apiBase}/${imagen}`;
};
