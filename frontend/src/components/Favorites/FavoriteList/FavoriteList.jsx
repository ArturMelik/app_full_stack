import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "../../Main/ProductDetail/StarRating/StarRating.jsx";

const FavoriteList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        // detenemos el loading
        // el renderizado condicional se encargará de mostrar el aviso de login.
        setLoading(false);
        return;
      }

      try {
        const url = "http://localhost:5000/api/favorites";
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
        setError("Hubo un problema al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const deleteFavorite = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id_product: productId },
      });
      setFavorites((prev) => prev.filter((f) => f.id_product !== productId));
    } catch (err) {
      console.error("Error al borrar favorito:", err);
      alert("No se pudo eliminar el producto.");
    }
  };

  // 1. Caso: Usuario no logueado
  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Acceso Restringido</h2>
        <p>Para ver tu lista de favoritos, primero debes iniciar sesión.</p>
        <button onClick={() => navigate("/login")}>Ir al Login</button>
      </div>
    );
  }

  // Cargando datos
  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando favoritos...</p>;

  // Error de servidor
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  // Lista vacía
  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Mis Favoritos</h1>
        <p>No tienes productos marcados como favoritos.</p>
        <button onClick={() => navigate("/product")}>Ver Productos</button>
      </div>
    );
  }

  // Todo OK, renderizamos la lista
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Mis Favoritos</h1>
      <section className="favorites-list">
        {favorites.map((item) => (
          <article key={item.id_product}>
            <img src={item.img} alt={item.product_name} />

            <div>
              <span>{item.provider_name}</span>
              <h3>{item.product_name}</h3>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
              <div>
                <StarRating rating={item.relevancia} />
              </div>
            </div>

            <nav>
              <button onClick={() => navigate(`/product/${item.id_product}`)}>
                Ver Detalles
              </button>
              <button onClick={() => deleteFavorite(item.id_product)}>
                Eliminar
              </button>
            </nav>
          </article>
        ))}
      </section>
    </>
  );
};

export default FavoriteList;
