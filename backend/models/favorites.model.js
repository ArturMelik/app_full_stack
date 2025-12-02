const pool = require('../config/db'); 
const queries = require('../queries/favorites.queries');


// Función para crear un nuevo favorito
const createFavoriteModel = async (id_user, id_product) => {
    let client, result;
    try {
        client = await pool.connect();

        const check = await client.query(queries.checkIfFavoriteExists, [id_user, id_product]);
        if (check.rows.length > 0) {
            // Si check.rows tiene resultados, significa que ya existe.
            // Lanzamo un error CLARO para que el controlador lo capture.
            throw new Error("Ya tienes este producto añadido a favoritos.");
        }

        const data = await client.query(queries.createFavorite, [id_user, id_product]);
        result = data.rows[0];
        
    } catch (err) {
        // Error de clave foránea (el producto no existe) o clave única (ya es favorito)
        if (err.code === '23503') {
             throw new Error("El producto no existe o el ID de usuario es inválido.");
        }
        console.error('Error en favoriteModel.createFavoriteModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};



// Función para listar todos los favoritos de un usuario
const getAllFavoritesModel = async (id_user) => {
    let client, rows;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllFavorites, [id_user]);
        rows = data.rows; 

    } catch (err) {
        console.error('Error en favoriteModel.getAllFavoritesModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return rows; 
};


// Función para eliminar un favorito
const deleteFavoriteModel = async (id_user, id_product) => {
    let client, rows;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteFavorite, [id_user, id_product]);
        rows = data.rows; 

        if (rows.length === 0) {
            throw new Error("El producto no esta en tus favoritos.");
        }
        
    } catch (err) {
        console.error('Error en favoriteModel.deleteFavoriteModel:', err.message);
        throw err;
    } finally {
        if (client) client.release();
    }
    return rows[0];
};

module.exports = {
    createFavoriteModel,
    getAllFavoritesModel,
    deleteFavoriteModel,
};