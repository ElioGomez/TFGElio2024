import React from 'react';
import '../App.css'; // Archivo CSS para el estilo
import biblio from '../img/biblio.jpg'

const Noticia = () => {
  // Datos de ejemplo para la noticia
  const noticia = {
    titular: 'Titular de la Noticia',
    imagen: 'https://www.multiocio.es/wp-content/uploads/2020/06/viajes-multiocio-min.png',
    cuerpo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aliquam vestibulum sem eu turpis dictum, sed volutpat magna scelerisque. 
    Mauris auctor, dolor id porttitor placerat, nisl neque mattis mauris, 
    eu egestas velit enim sed lectus. Phasellus ut neque ac metus auctor 
    condimentum. Sed vel elit eu tortor tristique feugiat vel in tellus. 
    Suspendisse non eleifend est. Proin vestibulum dolor id purus eleifend, 
    in consequat est dapibus. Quisque laoreet nibh in massa tincidunt lacinia. 
    Quisque eget dui sed nulla feugiat malesuada sed vel tellus.`,
  };

  return (
    <div className="noticia-container">
      <h1 className="titular">{noticia.titular}</h1>
      <img className="imagen" src={noticia.imagen} alt="Noticia" />
      <p className="cuerpo">{noticia.cuerpo}</p>
    </div>
  );
};

export default Noticia;