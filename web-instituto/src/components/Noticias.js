import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Noticias = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const noticiasPerPage = 6;
  // Datos de ejemplo para las noticias
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
      {
        id: 4,
        imagen: 'https://colegiokhalilgibran.es/wp-content/uploads/2015/06/fiesta-fin-de-curso-mu%C3%B1ecos.jpg',
        titular: 'Fiesta fin de curso',
        enlace: '/noticia',
      },
      {
        id: 5,
        imagen: 'https://www.clara.es/medio/2022/06/03/frases-libros-pensar_76779bbf_1280x720.jpg',
        titular: 'Recogida de Libros ',
        enlace: '/noticia',
      },
      {
        id: 6,
        imagen: 'https://img.freepik.com/vector-premium/profesor-masculino-escritorio-profesor_679557-1380.jpg',
        titular: 'Palabras de dirección',
        enlace: '/noticia',
      },
      {
        id: 7,
        imagen: 'https://pbs.twimg.com/media/FyTh1fsWAAEWEbL?format=jpg&name=large',
        titular: 'Graduación',
        enlace: '/noticia',
      },
      {
        id: 8,
        imagen: 'https://www.multiocio.es/wp-content/uploads/2020/06/viajes-multiocio-min.png',
        titular: 'Viaje fin de curso',
        enlace: '/noticia',
      },
      {
          id: 9,
          imagen: 'https://sanjuanboscosalamanca.salesianas.org/wp-content/uploads/2019/06/Entrega-de-notas.jpg',
          titular: 'Recogida de notas',
          enlace: '/noticia',
        },
        {
          id: 10,
          imagen: 'https://colegiokhalilgibran.es/wp-content/uploads/2015/06/fiesta-fin-de-curso-mu%C3%B1ecos.jpg',
          titular: 'Fiesta fin de curso',
          enlace: '/noticia',
        },
        {
          id: 11,
          imagen: 'https://www.clara.es/medio/2022/06/03/frases-libros-pensar_76779bbf_1280x720.jpg',
          titular: 'Recogida de Libros ',
          enlace: '/noticia',
        },
        {
          id: 12,
          imagen: 'https://img.freepik.com/vector-premium/profesor-masculino-escritorio-profesor_679557-1380.jpg',
          titular: 'Palabras de dirección 2',
          enlace: '/noticia',
        },
        {
          id: 13,
          imagen: 'https://pbs.twimg.com/media/FyTh1fsWAAEWEbL?format=jpg&name=large',
          titular: 'Graduación',
          enlace: '/noticia',
        },
        {
          id: 14,
          imagen: 'https://www.multiocio.es/wp-content/uploads/2020/06/viajes-multiocio-min.png',
          titular: 'Viaje fin de curso',
          enlace: '/noticia',
        },
        {
            id: 15,
            imagen: 'https://sanjuanboscosalamanca.salesianas.org/wp-content/uploads/2019/06/Entrega-de-notas.jpg',
            titular: 'Recogida de notas',
            enlace: '/noticia',
          },
          {
            id: 16,
            imagen: 'https://colegiokhalilgibran.es/wp-content/uploads/2015/06/fiesta-fin-de-curso-mu%C3%B1ecos.jpg',
            titular: 'Fiesta fin de curso',
            enlace: '/noticia',
          },
          {
            id: 17,
            imagen: 'https://www.clara.es/medio/2022/06/03/frases-libros-pensar_76779bbf_1280x720.jpg',
            titular: 'Recogida de Libros ',
            enlace: '/noticia',
          },
          {
            id: 18,
            imagen: 'https://img.freepik.com/vector-premium/profesor-masculino-escritorio-profesor_679557-1380.jpg',
            titular: 'Palabras de dirección 3',
            enlace: '/noticia',
          },
    // Agrega más noticias aquí
  ];


  // Calcular el índice inicial y final de las noticias a mostrar en la página actual
  const indexOfLastNoticia = currentPage * noticiasPerPage;
  const indexOfFirstNoticia = indexOfLastNoticia - noticiasPerPage;
  const currentNoticias = noticias.slice(indexOfFirstNoticia, indexOfLastNoticia);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    <div className="noticias-container">
      {currentNoticias.map((noticia) => (
        <div className="tarjeta" key={noticia.id}>
          <img className="imagen" src={noticia.imagen} alt="Noticia" />
          <h2 className="titular">{noticia.titular}</h2>
          <Link className="enlace" to={noticia.enlace}>Leer más</Link>
        </div>
      ))}

      {/* Paginación */}

    </div>      
    <div className="pagination">
        {Array.from({ length: Math.ceil(noticias.length / noticiasPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div></div>
  );
};

export default Noticias;
