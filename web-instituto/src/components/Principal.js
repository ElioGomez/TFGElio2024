import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import imagen1 from '../img/logose.png';
import imagen2 from '../img/erasmus.gif';
import imagen3 from '../img/modle.png';




const Principal = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    if (images && images.length > 0) {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }
  };

  const nextImage = () => {
    if (images && images.length > 0) {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
    }
  };

  const noticias = [
    {
      id: 1,
      imagen: 'https://pbs.twimg.com/media/FyTh1fsWAAEWEbL?format=jpg&name=large',
      titular: 'Graduación',
      enlace: '/noticia',
    },
    {
      id: 2,
      imagen: 'https://www.multiocio.es/wp-content/uploads/2020/06/viajes-multiocio-min.png',
      titular: 'Viaje fin de curso',
      enlace: '/noticia',
    },
    {
        id: 3,
        imagen: 'https://sanjuanboscosalamanca.salesianas.org/wp-content/uploads/2019/06/Entrega-de-notas.jpg',
        titular: 'Recogida de notas',
        enlace: '/noticia',
      },
    ]
  return (
    
    <div>
    <div className="carousel">
      <button onClick={previousImage} className="carousel-button">
        {'<'}
      </button>
      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className="carousel-image" />
      <button onClick={nextImage} className="carousel-button">
        {'>'}
      </button>
    </div>

    <div className='enlaces_interes'>
    <img src={imagen1} alt="Seneca" />
    <img src={imagen2} alt="Erasmus" />
    <img src={imagen3} alt="Pasen" />
    </div>

<div className='ultimas_noticias'>
<h1>ULTIMAS NOTICIAS</h1>
    <div className="noticias-container">
      {noticias.map((noticia) => (
        <div className="tarjeta" key={noticia.id}>
          <img className="imagen" src={noticia.imagen} alt="Noticia" />
          <h2 className="titular">{noticia.titular}</h2>
          <Link className="enlace" to={noticia.enlace}>Leer más</Link>
        </div>
      ))}
    </div>
    <Link to={"/noticias"}><button>Mas noticias</button></Link>
    </div>
    </div>
  );
};

export default Principal;