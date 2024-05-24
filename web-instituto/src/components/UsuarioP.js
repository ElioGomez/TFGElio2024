import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const UsuarioP = () => {
  const { usuarioId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [hijos, setHijos] = useState([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/usuario/${usuarioId}`);
        if (response.ok) {
          const usuarioData = await response.json();
          setUsuario(usuarioData);
          setHijos(usuarioData.hijos);
          console.log('Datos del Usuario:', usuarioData);
        } else {
          console.log('Error al obtener los datos del Usuario');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  return (
    <div className="usuario-page">
      {usuario && (
        <header>
          <h1>{usuario.nombre}</h1>
          <h2>Tutor de</h2>
          <ul className="usuario-info">
            {hijos.map((hijo, index) => (
              <li key={index} className="hijo">
                {hijo.nombre}
              </li>
            ))}
          </ul>
        </header>
      )}
      <main>
        {/* Contenido adicional de la página */}
      </main>
      <footer>
        {/* Contenido del pie de página si es necesario */}
      </footer>
    </div>
  );
};

export default UsuarioP;