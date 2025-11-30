const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware'); 

// RUTAS PROTEGIDAS: POST /api/providers
// 1. protect: Verifica token y carga req.user
// 2. admin: Verifica req.user.role === 'admin'

// http://localhost:5000/api-docs
/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Obtener lista de todos los proveedores (Público)
 *     tags: [Proveedores]
 *     responses:
 *       '200':
 *         description: Lista de proveedores obtenida.
 *
 *   post:
 *     summary: Crear un nuevo proveedor (Solo Admin)
 *     tags: [Proveedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyname:
 *                 type: string
 *                 example: Intel Corp
 *               website:
 *                 type: string
 *                 example: http://intel.com
 *               img:
 *                 type: string
 *                 example: url_logo_proveedor.png
 *     responses:
 *       '201':
 *         description: Proveedor creado con éxito.
 *       '403':
 *         description: Prohibido (rol no es 'admin').
 */
router.post('/', protect, admin, providerController.createProvider);


// http://localhost:5000/api/providers

router.get('/', providerController.getProviders); 
router.post('/', providerController.createProvider); 

module.exports = router;