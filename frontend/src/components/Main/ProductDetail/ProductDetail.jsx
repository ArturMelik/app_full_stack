import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "../ProductDetail/StarRating/StarRating.jsx";
import FavoriteButton from "../../Favorites/FavoriteButton/FavoriteButton.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null); // puede ser un objeto o un array
  const [loading, setLoading] = useState(true);

  //para paginacion
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //estado para ordenamiento
  const [sortField, setSortField] = useState(""); // campo por el que se ordena
  const [sortOrder, setSortOrder] = useState(""); // ascendente o descendente

  //buscador
  const [query, setQuery] = useState(""); // Lo que el usuario escribe actualmente
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador

  const handleSearch = () => {
    setSearchTerm(query); // Pasamos el texto escrito al término de búsqueda real
    setPage(1); // Siempre volvemos a la página 1 al buscar
  };

  //  alternar ordenamiento (de mas menos o menos mas)
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // alterna
    } else {
      setSortField(field);
      setSortOrder("asc"); // nuevo campo, empieza ascendente
    }
    setPage(1); // reset a primera página cuando cambias la ordenación
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;

        if (id) {
          // Detalle de producto individual
          url = `http://localhost:5000/api/products/${id}`;
        } else if (searchTerm) {
          // Si el usuario está buscando algo
          url = `http://localhost:5000/api/products/search?q=${searchTerm}&sort=${sortField}&order=${sortOrder}`;
        } else {
          // Lista general con paginación y orden
          url = `http://localhost:5000/api/products?page=${page}&limit=10&sort=${sortField}&order=${sortOrder}`;
        }

        const response = await axios.get(url);

        if (!id) {
          // Si es búsqueda o lista, response.data debería ser un array o contener la lista
          const products = searchTerm ? response.data : response.data.products;
          setData(products);

          if (!searchTerm) {
            setTotalPages(Math.ceil(response.data.totalItems / 10));
          } else {
            setTotalPages(1); // En búsqueda desactivar paginación simple o dejar en 1
          }
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page, sortField, sortOrder, searchTerm]);

  if (loading) return <p>Cargando...</p>;

  // Si hay un ID, mostramos detalle
  if (id && data) {
    return (
      <section className="product-view">
        <h1>Detalle del Producto</h1>

        <article>
          {/* Columna 1: Imagen */}
          <div>
            <img src={data.img} alt={data.name} />
          </div>

          {/* Columna 2: Datos */}
          <div>
            <span>{data.provider_name}</span>
            <h2>{data.name}</h2>
            <p>{data.description}</p>

            <div className="price-box">
              Precio: <strong>${data.price}</strong>
            </div>

            <div className="rating">
              <StarRating rating={data.relevancia} />
            </div>

            <FavoriteButton productId={data.id_product} />
          </div>
        </article>
      </section>
    );
  }

  // Si no hay ID, mostro lista
  if (!id && Array.isArray(data)) {
    return (
      <>
        <h1>Todos los Productos</h1>

        {/* BUSCADOR */}
        <nav className="search-bar">
          <input
            type="text"
            placeholder="Buscar por producto o marca..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>Buscar</button>
        </nav>

        {/* Botones relevancia, precio, nombre */}
        <nav className="filter-controls">
          <span className="filter-label">Ordenar por:</span>

          <button
            onClick={() => handleSort("name")}
            className={sortField === "name" ? "active" : ""}
          >
            Nombre{" "}
            {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>

          <button
            onClick={() => handleSort("relevancia")}
            className={sortField === "relevancia" ? "active" : ""}
          >
            Relevancia{" "}
            {sortField === "relevancia"
              ? sortOrder === "asc"
                ? "▲"
                : "▼"
              : ""}
          </button>

          <button
            onClick={() => handleSort("price")}
            className={sortField === "price" ? "active" : ""}
          >
            Precio{" "}
            {sortField === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
        </nav>

        {/* Tarjeta Productos*/}
        <section className="product-list">
          {data.map((item, idx) => (
            <article className="card" key={idx}>
              <img src={item.img} alt={item.name} />

              <p>
                Marca: <strong>{item.provider_name}</strong>
              </p>
              <p>{item.name}</p>

              <div>
                <StarRating rating={item.relevancia} />
              </div>

              <p className="price">${item.price}</p>

              <div className="actions">
                <button onClick={() => navigate(`/product/${item.id_product}`)}>
                  Ver Detalles
                </button>
                <FavoriteButton productId={item.id_product} />
              </div>
            </article>
          ))}
        </section>

        {/*CONTROLES DE PAGINACIÓN*/}
        <nav className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ◀ Anterior
          </button>

          <span>
            Página <strong>{page}</strong> de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente ▶
          </button>
        </nav>
      </>
    );
  }

  return <p>No se encontraron productos.</p>;
};

export default ProductDetail;
