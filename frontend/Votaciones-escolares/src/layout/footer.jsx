import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">


        <div className="footer-logo">
          <img
            src="/img/logo-escuela.png"
            alt="Logo de la escuela"
          />
        </div>

        <div className="footer-event">
          <h2>VOTACIÓN DE AUTOS</h2>
          <p>Evento escolar</p>
          <p className="footer-description">
            Elegí tu auto favorito y participá de la votación.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 - Evento de Votación de Autos</p>
        <p>Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;