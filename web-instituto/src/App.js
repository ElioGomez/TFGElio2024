import React from 'react';
import ReactDOM from 'react-dom/client';
import foto1 from './img/fondo.jpg'
import './index.css';
import Login from './components/Login';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Principal from './components/Principal';
import Noticias from './components/Noticias';
import CyS from './components/CyS';
import UsuarioP from './components/UsuarioP';
import Noticia from './components/Noticia';
import PerfilProfesor from './components/PerfilProfe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';





const App = () => {
  const images = [
    'https://pbs.twimg.com/media/FxdBDeBWIAMLJWX?format=jpg&name=medium',
    'https://pbs.twimg.com/media/Fwzts_nXsAQOkAt?format=jpg&name=4096x4096',
    'https://www.castillosnet.org/datos/espana/cadiz/CA-CAS-031/TN_CA-CAS-031-1185001.JPG',
  ];


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

     <React.StrictMode>
    <Header />     
    
    <Routes>  
    <Route path="/" element={<Principal images={images}/>}/> 
    <Route path='/usuariop' element={<UsuarioP/>}/>
    <Route path='/noticia' element={<Noticia/>}/>
    <Route path='/noticias' element={<Noticias/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path='/sugerencias' element={<CyS/>}/>
    <Route path='/perfilprofe' element={<PerfilProfesor/>}/>
    </Routes>
    <Footer />
     
  </React.StrictMode>

    </div>
  );
};


export default App;

