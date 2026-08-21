import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">


        <div className="footer-logo">
          <img
            src="../public/enet_n1_republica_de_mxico_logo.jpg" 
            alt="Escudo E.E.S.T. Nº 1"
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