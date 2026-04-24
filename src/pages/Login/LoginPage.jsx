import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getLoginError } from '../../utils/validations';
import './LoginPage.css';
import Input from '../../components/ui/Input';
import Form from '../../components/ui/Form';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auraStyle = {
    background: '#fcfcfd',
    color: '#4a4a4a',
    confirmButtonColor: '#8b79a5',
    iconColor: '#8b79a5',
    backdrop: 'rgba(139, 121, 165, 0.25) blur(10px)',
    width: '450px',
    padding: '3rem'
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errorMessage = getLoginError(email, password);
    if (errorMessage) {
      Swal.fire({
        ...auraStyle,
        title: 'Casi listo',
        text: errorMessage,
        icon: 'info',
        confirmButtonText: 'Corregir'
      });
      return;
    }

    setLoading(true);

    Swal.fire({
      title: 'Verificando credenciales',
      text: 'Conectando con el servidor...',
      allowOutsideClick: false,
      showConfirmButton: false,
      ...auraStyle,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error('Error al procesar la respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Acceso denegado');
      }

      const usuario = data.usuario || data;

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      localStorage.setItem('user', JSON.stringify(usuario));

      setLoading(false);

      Swal.fire({
        ...auraStyle,
        title: 'Ingreso exitoso',
        text: `Bienvenido, ${usuario.nombre}`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setUser(usuario);
        if (usuario.rol === 'Admin') {
          navigate('/usuarios');
        } else {
          navigate('/dashboard');
        }
      });
    } catch (error) {
      setLoading(false);

      Swal.fire({
        ...auraStyle,
        title: 'Error de acceso',
        text: error.message,
        icon: 'error'
      });
    }
  };

  return (
    <div className="login-page">
      <Form
        onSubmit={handleLogin}
        title="Aura"
        buttonText={loading ? 'Cargando...' : 'Entrar ahora'}
        disabled={loading}
      >
        <Input
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="ana.lopez@gmail.com"
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="Tu contraseña"
        />
      </Form>
    </div>
  );
};

export default LoginPage;
