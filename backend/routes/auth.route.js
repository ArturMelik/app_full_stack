const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


// Rutas de Autenticación
// http://localhost:5000/api/auth/login
router.post('/login', authController.login); // POST /api/auth/login
router.post('/logout', authController.logout); // POST /api/auth/logout

module.exports = router;
