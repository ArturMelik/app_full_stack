const favoriteModel = require('../models/favorites.model');

// POST: Añadir un favorito
const addFavorite = async (req, res) => {
    // 1. OBTENER ID DEL USUARIO del token (¡GRACIAS a req.user!)
    const id_user = req.user.id_user; 
    
    // 2. OBTENER ID DEL PRODUCTO del cuerpo
    const { id_product } = req.body;

    if (!id_product) {
        return res.status(400).json({ error: 'Falta el id_product.' });
    }

    try {
        const newFavorite = await favoriteModel.createFavoriteModel(id_user, id_product);
        
        res.status(201).json({ 
            message: 'Producto añadido a favoritos.',
            favorite: newFavorite
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET: Obtener todos los favoritos del usuario
const getFavorites = async (req, res) => {
    const id_user = req.user.id_user; // Viene del token JWT
    
    try {
        const favorites = await favoriteModel.getAllFavoritesModel(id_user);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// DELETE: Eliminar un favorito
const removeFavorite = async (req, res) => {
    const id_user = req.user.id_user;
    const { id_product } = req.body; 

    if (!id_product) {
        return res.status(400).json({ error: 'Falta el id_product.' });
    }
    
    try {
        const deletedFavorite = await favoriteModel.deleteFavoriteModel(id_user, id_product);
        res.status(200).json({ 
            message: 'Producto eliminado de favoritos.',
            favorite: deletedFavorite 
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};