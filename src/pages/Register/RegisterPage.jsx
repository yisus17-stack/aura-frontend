import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auraSwal as Swal } from '../../utils/swalConfig';
import { getRegisterError } from '../../utils/validations';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import './RegisterPage.css';

const RegisterPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({}); // 👈 Nuevo estado para errores locales
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return; // 👈 Validación antes de enviar

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
      
      // --- 🚀 AUTO-LOGIN TRAS REGISTRO ---
      localStorage.setItem('user', JSON.stringify(data));
      if (setUser) setUser(data);

      Swal.fire({
        title: '¡Cuenta creada!',
        text: `Bienvenido a Aura, ${nombre.split(' ')[0]}. Hemos iniciado tu sesión automáticamente.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Aviso',
        text: error.message,
        icon: 'warning'
      });
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
            setFormData({ ...formData, nombre: e.target.value });
            if (errors.nombre) setErrors({ ...errors, nombre: '' });
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
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          disabled={loading}
          error={errors.email}
        />
        <Input
          label="Contraseña segura"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          disabled={loading}
          error={errors.password}
        />
      </Form>
    </div>
  );
};

export default RegisterPage;
