import React from 'react';
import '../App.css'; 
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';
import { useUserState } from '../context/UserContext';


const Header = () => {
  const { userId, userType } = useUserState();

  return (
    <header className="header">
     <Link to="/"><img className="logo" src={logo}></img></Link>
      <nav className="nav">
        {userId == null ? <Link to="/login">Login</Link> : userId}
        <Link to="/noticias">Noticias</Link>
        <Link to="/sugerencias">Sugerencias</Link>
        <Link to="/perfilpadre">prueba padre</Link>
        <Link to="/perfilprofe">prueba profe</Link>
      </nav>
    </header>
  );
};

export default Header;
