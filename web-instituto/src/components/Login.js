import React, { useState,useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserDispatch, setUser, setUserType } from '../context/UserContext';
import { useUserState } from '../context/UserContext';


const Login = () => {
  const { userId, userType } = useUserState();
  const [dni, setDni] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('0'); // Valor predeterminado de Usuario Padre
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  
  const dispatch = useUserDispatch();

  useEffect(() => {
    if(userId!=null)navigate("/")
  },[])

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.0.23:8080/escuela/Login.jsp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni: dni,
          contraseña: contraseña,
          tipo_usuario: tipoUsuario
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data["resultado"] === 1)
        {
              if (tipoUsuario == 0) {
                setMessage('Inicio de sesión exitoso como Usuario Padre');
                setUser(dispatch,data["dni"]);
                setUserType(dispatch, tipoUsuario);
                navigate('/perfilpadre');
              } else if (tipoUsuario == 1) {
                setUser(dispatch, data["dni"]);
                setUserType(dispatch, tipoUsuario);
                setMessage('Inicio de sesión exitoso como Usuario Profesor');
                navigate('/perfilprofe');
              } else if (tipoUsuario == 2) {
                setUser(dispatch, data["dni"]);
                setUserType(dispatch, tipoUsuario);
                alert('Inicio de sesión exitoso como Administrador');
                setMessage('Inicio de sesión exitoso como Administrador');
                navigate('/perfiladmin');
              } else {
                setMessage('Error en el inicio de sesión');
              }
        }
       
      } else {
        setMessage('Error en el inicio de sesión');
      }
    } catch (error) {
      setMessage('Error al realizar la solicitud');
      console.error('Error:', error);
    }
  };

  return (
    <div className="loginpage">
      <div className="infoclave">
        <h2>Cómo obtener la contraseña de usuario</h2>
        <p>
          Si aún no tienes la contraseña de usuario para padres, solo debes enviar un correo a la dirección 
          del centro con una imagen de tu DNI y el de tu hijo/a, y en un plazo de 3 días laborables te enviaremos la contraseña correspondiente.
          Si no te fuese posible enviar el correo, podrás solicitarlo a través del alumnado o, 
          en su defecto, acudir tú al centro para entregar la documentación y recibir la contraseña.<br />
          Estaremos encantados de atenderte dentro del horario de atención al público, el cual es de 10:00
          a 13:00 de lunes a viernes. <br />
          Te esperamos
        </p>
      </div>

      <div className="login">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dni">Dni:</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={handleDniChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={handleContraseñaChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo_usuario">Tipo usuario:</label>
            <select
              id="tipo_usuario"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
            >
              <option value="0">Usuario Padre</option>
              <option value="1">Usuario Profesor</option>
              <option value="2">Administrador</option>
            </select>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
