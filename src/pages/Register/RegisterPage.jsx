import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRegisterError } from '../../utils/validations';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Estilo minimalista/pastel para los alerts de Aura
  const auraStyle = {
    background: '#fcfcfd',
    color: '#4a4a4a',
    confirmButtonColor: '#8b79a5',
    iconColor: '#8b79a5',
    backdrop: `rgba(139, 121, 165, 0.25) blur(10px)`,
    width: '450px',
    padding: '3rem',
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const { nombre, email, password } = formData;
    
    // 1. Validaciones locales (formatos, campos vacíos)
    const errorMessage = getRegisterError(nombre, email, password);
    if (errorMessage) {
      Swal.fire({ 
        ...auraStyle, 
        title: 'Casi listo...', 
        text: errorMessage, 
        icon: 'info',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    setLoading(true);
    Swal.fire({
      title: 'Creando cuenta',
      text: 'Cifrando tus datos en la base de datos de Aura...',
      allowOutsideClick: false,
      showConfirmButton: false,
      ...auraStyle,
      didOpen: () => { Swal.showLoading(); },
    });

    try {
      // 2. LLAMADA REAL AL BACKEND (MongoDB)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ÉXITO
        setLoading(false);
        Swal.fire({
          ...auraStyle,
          title: '¡Registro exitoso!',
          text: `Bienvenido, ${nombre.split(' ')[0]}. Tu cuenta ha sido creada de forma segura.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/login');
        });
      } else {
        // ERROR DEL SERVIDOR (Ej. Correo duplicado)
        throw new Error(data.error || "Error al registrar en el servidor");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        ...auraStyle,
        title: 'Aviso',
        text: error.message,
        icon: 'warning',
      });
    }
  };

  return (
    <div className="register-page">
      <Form
        title="Aura"
        subtitle="Únete y gestiona tus activos con estilo."
        buttonText={loading ? "Creando..." : "Registrarse"}
        onSubmit={handleRegister}
        disabled={loading}
        footer={
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        }
      >
        <Input
          label="Nombre completo"
          type="text"
          placeholder="Ej. Jesús Enrique"
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          disabled={loading}
        />
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          disabled={loading}
        />
        <Input
          label="Contraseña segura"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          disabled={loading}
        />
      </Form>
    </div>
  );
};

export default RegisterPage;