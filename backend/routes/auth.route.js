const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar Sesión y obtener Token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@tienda.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso. Retorna el token y el rol del usuario.
 *       '401':
 *         description: Credenciales inválidas.
 */
// Rutas de Autenticación
// http://localhost:5000/api/auth/login
router.post('/login', authController.login); // POST /api/auth/login
router.post('/logout', authController.logout); // POST /api/auth/logout

module.exports = router;
