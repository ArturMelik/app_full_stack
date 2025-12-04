import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteButton  from "../../Favorites/FavoriteButton/FavoriteButton.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null); // puede ser un objeto o un array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = id
          ? `http://localhost:5000/api/products/${id}`
          : "http://localhost:5000/api/products";
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  // Si hay un ID, mostramos detalle
  if (id && data) {
    return (
      <div>
        <h1>Detalle del Producto</h1>
        <article className="product-detail">
          <img src={data.img} alt={data.name} style={{ width: "200px" }} />
          <p>Marca: {data.provider_name}</p>
          <p>Nombre: {data.name}</p>
          <p>Descripción: {data.description}</p>
          <p>Precio: ${data.price}</p>
        </article>
      </div>
    );
  }

  // Si no hay ID, mostramos lista
  if (!id && Array.isArray(data)) {
    return (
      <>
        <h1>Todos los Productos</h1>
        <ul>
          {data.map((item, idx) => (
            <article key={idx}>
              <img src={item.img} alt={item.name} style={{ width: "200px" }} />
              <br />
              Marca: {item.provider_name}
              <br />
              Nombre:
              {item.name}
              <br />
              Precio: ${item.price}
              <br />
              {/* Botón ver detalles */}
              <button onClick={() => navigate(`/product/${item.id_product}`)}>
                Ver Detalles
              </button>
                <FavoriteButton productId={item.id_product} />
              <br />
              <br />
            </article>
          ))}
        </ul>
      </>
    );
  }

  return <p>No se encontraron productos.</p>;
};

export default ProductDetail;
