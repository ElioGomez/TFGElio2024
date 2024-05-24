import React from 'react';
import '../App.css'; 
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
     <Link to="/"><img className="logo" src={logo}></img></Link>
      <nav className="nav">
        <Link to="/login">Login</Link>
        <Link to="/noticias">Noticias</Link>
        <Link to="/sugerencias">Sugerencias</Link>
        <Link to="/perfilprofe">pruebaprofe</Link>
      </nav>
    </header>
  );
};

export default Header;
