import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <section>
        <h4>Sobre Nosotros</h4>
        <p>Tu tienda de confianza para productos tecnológicos de alta calidad The Bridge.</p>
      </section>

      <section>
        <ul>
          <li><a href="#!">Términos y Condiciones</a></li>
          <li><a href="#!">Política de Privacidad</a></li>
          <li><a href="#!">Soporte</a></li>
        </ul>
      </section>

      <section>
        <h4>Contacto</h4>
        <p>Email: soporte@mitienda.com</p>
        <p>Tel: +34 900 000 000</p>
      </section>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mi Tienda Tech - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;