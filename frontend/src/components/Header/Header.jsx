import React from "react";
import Nav from './Nav';

const Header = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // refresca y oculta el botón
  };

  return (
    <header className='header-day'>
  <Nav />
  
  {/* Usamos un contenedor simple para los elementos de acción */}
  <div className="user-actions">
    {token && (
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    )}
  </div>
</header>
  );
};

export default Header;
