import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "../../Main/ProductDetail/StarRating/StarRating.jsx";

const FavoriteList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Obtener el Token JWT
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setError("Debes iniciar sesión para ver tus favoritos.");
        setLoading(false);
        return;
      }

      try {
        // Endpoint de API para obtener todos los favoritos
        const url = "http://localhost:5000/api/favorites";

        const response = await axios.get(url, {
          headers: {
            // el Token en el encabezado para autenticar
            Authorization: `Bearer ${token}`,
          },
        });

        //  Guardamos el array de productos devueltos
        setFavorites(response.data);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
        setError("Error al cargar la lista de favoritos.");
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
        data: { id_product: productId }
      });

      // eliminarlo del estado para actualizar la UI
      setFavorites((prev) => prev.filter((f) => f.id_product !== productId));
    } catch (err) {
      console.error("Error al borrar favorito:", err);
      alert("No se pudo eliminar este favorito.");
    }
  };

  if (loading) return <p>Cargando favoritos...</p>;

  if (error) return <p>{error}</p>;

  if (favorites.length === 0) {
    return (
      <div>
        <h1>Mis Favoritos</h1>
        <p>No tienes productos marcados como favoritos.</p>
      </div>
    );
  }

  // Renderizado de la lista
  return (
    <>
      <h1>Mis Favoritos</h1>
      <section>
        {favorites.map((item) => (
          // Usamos 'item.id_product' como key y para la navegación
          <article key={item.id_product}>
            <img src={item.img} alt={item.name} style={{ width: "150px" }} />
            <p>Nombre: {item.product_name}</p>
            <p>Precio: ${item.price}</p>
            <p>Valoraciones: <StarRating rating={item.relevancia} /></p>
            <p>Proveedor: {item.provider_name}</p>

            <button onClick={() => navigate(`/product/${item.id_product}`)}>
              Ver Detalles
            </button>
            <button onClick={() => deleteFavorite(item.id_product)}>
              Eliminar Favorito
            </button>
            <br />
            <br />
          </article>
        ))}
      </section>
    </>
  );
};

export default FavoriteList;
