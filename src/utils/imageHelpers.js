export const normalizeImageUrl = (imagen) => {
  if (!imagen) return '';

  // Si la imagen ya es una URL de Supabase (empieza con http), 
  // devuélvela tal cual, sin pegarle el apiBase.
  if (imagen.startsWith('http')) {
    return imagen;
  }

  // Esto solo se ejecutará si por alguna razón regresas a imágenes locales
  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
  return `${apiBase}${imagen.startsWith('/') ? imagen : '/' + imagen}`;
};