const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { protect } = require('../middleware/auth.middleware');


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener la lista de todos los usuarios (Requiere Token)
 *     tags: [Usuarios]
 *     description: Lista todos los usuarios registrados en el sistema. Esta ruta solo requiere autenticación mediante JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: integer
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: admin@tienda.com
 *                   name:
 *                     type: string
 *                     example: Rebeca López
 *                   role:
 *                     type: string
 *                     example: admin
 *       '401':
 *         description: No autorizado (Token inválido o faltante).
 */
//http://localhost:5000/api/users
// Ruta GET: /api/users
router.get('/', protect, userController.getUsers);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario (Registro - Ruta Pública)
 *     tags: [Usuarios]
 *     description: Permite registrar un nuevo usuario en el sistema. El rol por defecto será 'user'.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nuevo_cliente@correo.com
 *               password:
 *                 type: string
 *                 example: clave_secreta123
 *               name:
 *                 type: string
 *                 example: Arturo Fernández
 *               address:
 *                 type: string
 *                 example: C/ Inventada, 45
 *     responses:
 *       '201':
 *         description: Usuario creado con éxito. Devuelve el nuevo usuario y el Token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                   example: 10
 *                 email:
 *                   type: string
 *                   example: nuevo_cliente@correo.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Campos obligatorios faltantes.
 *       '409':
 *         description: Conflicto (El email ya está registrado).
 */
// Ruta POST: /api/users (Registro)
router.post('/', userController.createUser); 

module.exports = router;