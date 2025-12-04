import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoriteList = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Obtener el Token JWT
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!token) {
                setError("Debes iniciar sesión para ver tus favoritos.");
                setLoading(false);
                return;
            }

            try {
                // 💡 Endpoint de tu API para obtener todos los favoritos
                const url = 'http://localhost:5000/api/favorites';
                
                const response = await axios.get(url, {
                    headers: {
                        // 2. Adjuntamos el Token en el encabezado para autenticar
                        'Authorization': `Bearer ${token}` 
                    }
                });

                // 3. Guardamos el array de productos devueltos
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

    // 4. Renderizado de la lista
    return (
        <>
            <h1>Mis Favoritos</h1>
            <ul>
                {favorites.map((item) => (
                    // Usamos 'item.id_product' como key y para la navegación
                    <li key={item.id_product}>
                        <img src={item.img} alt={item.name} style={{ width: "150px" }} />
                        <p>Nombre: {item.name}</p>
                        <p>Precio: ${item.price}</p>
                        
                        <button 
                            onClick={() => navigate(`/products/${item.id_product}`)}
                        >
                            Ver Detalles
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FavoriteList;