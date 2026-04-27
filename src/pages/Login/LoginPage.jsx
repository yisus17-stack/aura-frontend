import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auraSwal as Swal } from '../../utils/swalConfig';
import { getLoginError } from '../../utils/validations';
import './LoginPage.css';
import Input from '../../components/ui/Input';
import Form from '../../components/ui/Form';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // 👈 Nuevo estado para errores
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'El email es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    Swal.fire({
      title: 'Verificando credenciales',
      text: 'Conectando con el servidor...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
// ... rest of try block ...

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
        title: 'Ingreso exitoso',
        text: `Bienvenido, ${usuario.nombre}`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setUser(usuario);
        if (usuario.rol?.toLowerCase() === 'admin') {
          navigate('/usuarios');
        } else {
          navigate('/dashboard');
        }
      });
    } catch (error) {
      setLoading(false);

      Swal.fire({
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
          onChange={(e) => {
            const val = e.target.value;
            setEmail(val);
            let err = '';
            if (!val.trim()) err = 'El email es obligatorio';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) err = 'Email inválido';
            setErrors(prev => ({ ...prev, email: err }));
          }}
          disabled={loading}
          placeholder="ana.lopez@gmail.com"
          error={errors.email}
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            setPassword(val);
            let err = '';
            if (!val) err = 'La contraseña es obligatoria';
            setErrors(prev => ({ ...prev, password: err }));
          }}
          disabled={loading}
          placeholder="Tu contraseña"
          error={errors.password}
        />
      </Form>
    </div>
  );
};

export default LoginPage;
