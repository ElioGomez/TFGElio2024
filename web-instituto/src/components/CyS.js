import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../App.css';

const CyS = () => {
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [asunto, setAsunto] = useState('');
  const [texto, setTexto] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAsuntoChange = (e) => {
    setAsunto(e.target.value);
  };

  const handleTextoChange = (e) => {
    setTexto(e.target.value);
  };

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configuración de EmailJS
    const serviceID = 'service_5m7jtl9'; // Reemplaza con tu Service ID de EmailJS
    const templateID = 'template_yyxc68k'; // Reemplaza con tu Template ID de EmailJS
    const userID = 'xPFcGdAu8W5QQzo7j'; // Reemplaza con tu User ID de EmailJS

    // Configuración del correo electrónico
    const templateParams = {
      from_name: email,
      to_name: 'DESTINATARIO',
      subject: asunto,
      message: ` ${texto}`,
    };

    // Envío del correo electrónico utilizando EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        alert('Correo electrónico enviado con éxito:', response.status, response.text);
      })
      .catch((error) => {
        alert('Error al enviar el correo electrónico:', error);
      });

    // Restablecimiento de los campos del formulario
    setEmail('');
    setDni('');
    setAsunto('');
    setTexto('');
  };

  return (
    <div className="consulta">
      <div>
        <h2>CONSULTA Y COMENTARIO</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dni">DNI:</label>
            <input
              type="dni"
              id="dni"
              value={dni}
              onChange={handleDniChange}
            />
          </div>
          <button type="submit" id="enviar">Enviar</button>
        </form>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="asunto">Asunto:</label>
          <input
            type="asunto"
            id="asunto"
            value={asunto}
            onChange={handleAsuntoChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="texto">Texto:</label>
          <textarea
            id="texto"
            value={texto}
            onChange={handleTextoChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CyS;