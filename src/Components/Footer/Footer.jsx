import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterset_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="AnnieShop Logo" />
        <p>Annieshop</p>
      </div>

      <ul className="footer-links">
        <li><Link to="/privacy-policy">Privacy policy</Link></li>
        <li><Link to="/contact-information">Contact information</Link></li>
        <li><Link to="/shipping-policy">Shipping policy</Link></li>
        <li><Link to="/terms-of-service">Terms of service</Link></li>
        <li><Link to="/refund-policy">Refund policy</Link></li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={instagram_icon} alt="Instagram" />
        </div>
        <div className="footer-icon-container">
          <img src={pinterset_icon} alt="Pinterest" />
        </div>
        <div className="footer-icon-container">
          <img src={whatsapp_icon} alt="WhatsApp" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© 2025 AnnieShop — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
