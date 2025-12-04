import React, { useState } from 'react';
import axios from 'axios';


const FavoriteButton = ({ productId }) => {
    // 1. Obtener el Token del localStorage
    // 💡 Asegúrate de que 'authToken' sea la clave exacta que usas para guardar tu Token JWT.
    const token = localStorage.getItem('token'); 
    
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); 
    // Nota: La lógica para chequear si ya es favorito puede requerir un useEffect
    // y una llamada GET a tu API de favoritos al montar el componente.

    const toggleFavorite = async () => {
        // 2. Verificar si el usuario está logueado (si hay Token)
        if (!token) {
            alert("Debes iniciar sesión para añadir productos a favoritos.");
            return;
        }
        console.log("Intentando añadir a favoritos. ID de Producto a enviar:", productId); // 👈 AÑADE ESTO

        setLoading(true);
        const url = 'http://localhost:5000/api/favorites'; // Endpoint para gestionar favoritos
        
        try {
            // 3. Realizar la solicitud POST adjuntando el Token
            const response = await axios.post(
                url, 
                { 
                    
                    // El servidor extraerá el ID del usuario del Token.
                    productId: productId 
                },
                {
                    headers: {
                        // 4. Configurar el encabezado Authorization: Bearer Token
                        'Authorization': `Bearer ${token}` 
                    }
                    
                }
            );

            if (response.status === 201 || response.status === 200) {
                // Asumimos que la operación fue exitosa
                setIsFavorite(true);
                alert("¡Producto añadido a favoritos!");
            }
            
        } catch (error) {
            console.error("Error al gestionar favoritos:", error.response || error);
            // Manejo de errores específicos del servidor, como token expirado o no autorizado
            if (error.response && error.response.status === 401) {
                 alert("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
            } else {
                 alert("Hubo un error en la operación de favoritos.");
            }
        } finally {
            setLoading(false);
        }
    };

    const buttonText = isFavorite ? '❤️ En Favoritos' : '🤍 Añadir a Favoritos';

    return (
        <button 
            onClick={toggleFavorite} 
            disabled={loading}
            
        >
            {loading ? 'Procesando...' : buttonText}
        </button>
    );
};

export default FavoriteButton;