import React from 'react';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header-bar">
      <div className="brand-container">
        <div className="logo-box">
          <img src="/logo-eest1.png" alt="Escudo E.E.S.T. Nº 1" />
        </div>
        <div className="school-info">
          <span className="school-title">E.E.S.T. Nº 1</span>
          <span className="school-subtitle">REPÚBLICA DE MÉXICO</span>
        </div>
      </div>
      <div className="page-title">
        Votación de Autos
      </div>
    </header>
  );
}