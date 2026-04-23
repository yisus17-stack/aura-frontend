export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// --- VALIDACIÓN DE NOMBRE (SOLO LETRAS) ---
export const validateName = (name) => {
  // Esta regex acepta letras minúsculas, mayúsculas, espacios, acentos y la Ñ
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(name) && name.trim().length >= 3;
};

export const getLoginError = (email, password) => {
  if (!email && !password) return "Por favor, ingresa tus credenciales.";
  if (!email) return "El correo electrónico es obligatorio.";
  if (!validateEmail(email)) return "El formato del correo no es válido.";
  if (!password) return "La contraseña es obligatoria.";
  if (!validatePassword(password)) return "La contraseña debe tener al menos 6 caracteres.";
  
  return null; 
};

export const getRegisterError = (nombre, email, password) => {
  if (!nombre && !email && !password) return "Por favor, completa todos los campos.";
  if (!nombre) return "El nombre es obligatorio.";
  
  // Primero checamos longitud
  if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
  
  // Luego checamos que sean solo letras
  if (!validateName(nombre)) return "El nombre solo puede contener letras y espacios.";
  
  if (!email) return "El correo es obligatorio.";
  if (!validateEmail(email)) return "El formato del correo no es válido.";
  if (!password) return "La contraseña es obligatoria.";
  if (!validatePassword(password)) return "La contraseña debe tener al menos 6 caracteres.";
  
  return null;
};