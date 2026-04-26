export const logoutUser = (setUser, navigate) => {
  // 1. Limpieza de datos
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.clear();

  // 2. Reset del estado global
  setUser(null);

  // 3. Salto inmediato al Home
  if (navigate) {
    navigate('/', { replace: true });
  } else {
    window.location.href = '/';
  }
};