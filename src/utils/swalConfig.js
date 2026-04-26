import Swal from 'sweetalert2';

export const auraSwal = Swal.mixin({
  background: '#fcfcfd',
  color: '#4a4a4a',
  confirmButtonColor: '#8b79a5',
  cancelButtonColor: '#d1d5db',
  iconColor: '#8b79a5',
  backdrop: 'rgba(139, 121, 165, 0.25) blur(10px)',
  width: '450px',
  padding: '3rem'
});
