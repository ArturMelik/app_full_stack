const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { protect } = require('../middleware/auth.middleware');

//http://localhost:5000/api/users
// Ruta GET: /api/users
router.get('/', protect, userController.getUsers);

// Ruta POST: /api/users (Registro)
router.post('/', userController.createUser); 

module.exports = router;