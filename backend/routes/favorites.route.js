const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorites.controller');
const { protect } = require('../middleware/auth.middleware'); // seguridad

// http://localhost:5000/api/favorites
// Todas las rutas de favoritos requieren que el usuario esté logueado
router.post('/', protect, favoriteController.addFavorite);
router.get('/', protect, favoriteController.getFavorites);
router.delete('/', protect, favoriteController.removeFavorite); 

module.exports = router;