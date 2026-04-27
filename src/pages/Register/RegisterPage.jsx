import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auraSwal as Swal } from '../../utils/swalConfig';
import {
  getEmailValidationError,
  getPasswordError,
  validateName
} from '../../utils/validations';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import './RegisterPage.css';

const RegisterPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  // --- Validación completa usando validations.js ---
  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!validateName(formData.nombre)) {
      newErrors.nombre = 'El nombre solo puede contener letras y espacios.';
    }

    const emailError = getEmailValidationError(formData.email);
    if (emailError) newErrors.email = emailError;

    const pwdErr = getPasswordError(formData.password);
    if (pwdErr) newErrors.password = pwdErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    Swal.fire({
      title: 'Creando cuenta',
      text: 'Cifrando tus datos en la base de datos de Aura...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar en el servidor');
      }

      setLoading(false);

      // Auto-login tras registro exitoso
      localStorage.setItem('user', JSON.stringify(data));
      if (setUser) setUser(data);

      Swal.fire({
        title: '¡Cuenta creada!',
        text: `Bienvenido a Aura, ${formData.nombre.split(' ')[0]}. Hemos iniciado tu sesión automáticamente.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => navigate('/dashboard'));

    } catch (error) {
      setLoading(false);
      Swal.fire({ title: 'Aviso', text: error.message, icon: 'warning' });
    }
  };

  return (
    <div className="register-page">
      <Form
        title="Aura"
        subtitle="Únete y gestiona tus activos con estilo."
        buttonText={loading ? 'Creando...' : 'Registrarse'}
        onSubmit={handleRegister}
        disabled={loading}
        footer={<p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>}
      >
        <Input
          label="Nombre completo"
          type="text"
          placeholder="Ej. Ana López"
          value={formData.nombre}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, nombre: val });
            let err = '';
            if (!val.trim()) err = 'El nombre es obligatorio.';
            else if (val.trim().length < 3) err = 'Mínimo 3 caracteres.';
            else if (!validateName(val)) err = 'Solo letras y espacios.';
            setErrors(prev => ({ ...prev, nombre: err }));
          }}
          disabled={loading}
          error={errors.nombre}
        />
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="ana.lopez@gmail.com"
          value={formData.email}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, email: val });
            // Usar validaciones completas del utils
            const emailErr = val ? getEmailValidationError(val) : 'El email es obligatorio.';
            setErrors(prev => ({ ...prev, email: emailErr }));
          }}
          disabled={loading}
          error={errors.email}
        />
        <Input
          label="Contraseña segura"
          type="password"
          placeholder="Ej. hola123"
          value={formData.password}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, password: val });
            const pwdErr = getPasswordError(val);
            setErrors(prev => ({ ...prev, password: pwdErr || '' }));
          }}
          disabled={loading}
          error={errors.password}
        />
      </Form>
    </div>
  );
};

export default RegisterPage;
