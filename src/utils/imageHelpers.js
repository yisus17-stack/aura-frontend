export const normalizeImageUrl = (imagen) => {
  if (!imagen) return '';
  if (/^https?:\/\//i.test(imagen)) return imagen;

  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  let imagePath = imagen;
  if (imagen.startsWith('/images/')) {
    // Already correct format
    imagePath = imagen;
  } else if (imagen.startsWith('/public/images/')) {
    // Convert old format to new format
    imagePath = imagen.replace('/public/images/', '/images/');
  } else if (!imagen.startsWith('/')) {
    // If it's just a filename, add the full path
    imagePath = `/images/${imagen}`;
  }

  return `${apiBase}${imagePath}`;
};
