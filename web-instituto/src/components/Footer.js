import React from 'react';
import '../App.css';
import facebookLogo from '../img/facebook-logo.png';
import twitterLogo from '../img/twitter-logo.png';
import instagramLogo from '../img/instagram-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Ubicación</h2>
        <p>Dirección: Calle Principal, Ciudad, País</p>
      </div>

      <div className="footer-section">
        <h2>Contacto</h2>
        <p>Teléfono: 123-456-7890</p>
        <p>Email: info@example.com</p>
      </div>

      <div className="footer-section">
        <h2>Redes Sociales</h2>
        <ul className="social-media-list">
          <li>
            <a href="#">
              <img src={facebookLogo} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={twitterLogo} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={instagramLogo} alt="Instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;