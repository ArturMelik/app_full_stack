const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const { protect } = require('../middleware/auth.middleware'); // Opcional, si queremos proteger la creación
const { admin } = require('../middleware/admin.middleware'); // Opcional, si queremos que solo admins creen productos

// RUTAS PROTEGIDAS: POST /api/products
// 1. protect: Verifica token y carga req.user
// 2. admin: Verifica req.user.role === 'admin'
router.post('/', protect, admin, productController.createProduct);


// http://localhost:5000/api-docs
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos (Público)
 *     tags: [Productos]
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida exitosamente.
 *
 *   post:
 *     summary: Crear un nuevo producto (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: SSD NVMe 2TB
 *               price:
 *                 type: number
 *                 example: 149.99
 *               description:
 *                 type: string
 *                 example: Unidad de estado sólido de alto rendimiento.
 *               img:
 *                 type: string
 *                 example: url_imagen_producto.jpg
 *               id_provider:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Producto creado con éxito.
 *       '403':
 *         description: Prohibido (rol no es 'admin').
 *
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto específico por ID (Público)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Producto encontrado (incluye nombre del proveedor).
 *       '404':
 *         description: Producto no encontrado.
 */
// http://localhost:5000/api/products/:id
router.get('/:id', productController.getProductById);


// http://localhost:5000/api/products
router.get('/', productController.getProducts); 
router.post('/', productController.createProduct);

module.exports = router;