import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [dni, setDni] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('1'); // Por defecto, el valor del tipo de usuario es 1 (usuario padre)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleTipoUsuarioChange = (value) => {
    setTipoUsuario(value);
    setDropdownOpen(false);
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
          tipo_usuario: tipoUsuario // Aquí usamos el estado actual de tipoUsuario
        })
      });

      if (response.ok) {
        // La solicitud de inicio de sesión fue exitosa
        // Redirecciona al usuario a la página deseada o haz lo que necesites
        console.log('Inicio de sesión exitoso');
      } else {
        // La solicitud de inicio de sesión falló
        console.log('Error en el inicio de sesión');
      }
    } catch (error) {
      // Ocurrió un error al realizar la solicitud
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
          en su defecto, acudir tú al centro para entregar la documentación y recibir la contraseña.<br></br>
          Estaremos encantados de atenderte dentro del horario de atención al público, el cual es de 10:00
          a 13:00 de lunes a viernes. <br></br>
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
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Seleccionar Tipo de Usuario
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleTipoUsuarioChange('1')}>Usuario Padre</li>
                  <li onClick={() => handleTipoUsuarioChange('2')}>Usuario Profesor</li>
                  <li onClick={() => handleTipoUsuarioChange('3')}>Administrador</li>
                </ul>
              )}
            </div>
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>
        <Link to="/usuarioP">Ir a la página de UsuarioP</Link>
      </div>
    </div>
  );
};

export default Login;