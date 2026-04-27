const COMMON_DOMAIN_TYPOS = {
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.cmo': 'gmail.com',
  'hotnail.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com'
};

const normalizeEmail = (email) => email.trim().toLowerCase();

export const getEmailValidationError = (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return 'El correo es obligatorio.';
  }

  if (normalizedEmail.includes(' ')) {
    return 'El correo no debe contener espacios.';
  }

  const parts = normalizedEmail.split('@');

  if (parts.length !== 2) {
    return 'El correo debe contener un solo símbolo @.';
  }

  const [localPart, domain] = parts;

  if (!localPart || !domain) {
    return 'El formato del correo no es válido.';
  }

  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return 'El correo no puede tener puntos seguidos o al inicio/final.';
  }

  if (domain.startsWith('-') || domain.endsWith('-')) {
    return 'El dominio del correo no es válido.';
  }

  if (domain.includes('..')) {
    return 'El dominio del correo no es válido.';
  }

  if (!domain.includes('.')) {
    return 'El dominio del correo debe incluir una extensión válida.';
  }

  if (COMMON_DOMAIN_TYPOS[domain]) {
    return `Parece que quisiste escribir ${COMMON_DOMAIN_TYPOS[domain]}.`;
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];

  if (domainParts.some((part) => !part || part.startsWith('-') || part.endsWith('-'))) {
    return 'El dominio del correo no es válido.';
  }

  if (!/^[a-z0-9._%+-]+$/i.test(localPart)) {
    return 'El correo contiene caracteres no válidos.';
  }

  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain)) {
    return 'El dominio del correo no es válido.';
  }

  if (!/^[a-z]{2,}$/i.test(tld)) {
    return 'La extensión del correo no es válida.';
  }

  return null;
};

export const validateEmail = (email) => !getEmailValidationError(email);

export const getPasswordError = (password) => {
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < 6) return 'Mínimo 6 caracteres.';
  if (!/[a-zA-Z]/.test(password)) return 'Debe contener al menos una letra.';
  if (!/[0-9]/.test(password)) return 'Debe contener al menos un número.';
  return null; // todo OK
};

export const validatePassword = (password) => !getPasswordError(password);

export const validateName = (name) => {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(name) && name.trim().length >= 3;
};

export const getLoginError = (email, password) => {
  if (!email && !password) return 'Por favor, ingresa tus credenciales.';

  const emailError = getEmailValidationError(email);
  if (emailError) return emailError;

  if (!password) return 'La contraseña es obligatoria.';
  if (!validatePassword(password)) return 'La contraseña debe tener al menos 6 caracteres.';

  return null;
};

export const getRegisterError = (nombre, email, password) => {
  if (!nombre && !email && !password) return 'Por favor, completa todos los campos.';
  if (!nombre) return 'El nombre es obligatorio.';
  if (nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!validateName(nombre)) return 'El nombre solo puede contener letras y espacios.';

  const emailError = getEmailValidationError(email);
  if (emailError) return emailError;

  if (!password) return 'La contraseña es obligatoria.';
  if (!validatePassword(password)) return 'La contraseña debe tener al menos 6 caracteres.';

  return null;
};
