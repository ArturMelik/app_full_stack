const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const { protect } = require('../middleware/auth.middleware'); // Opcional, si queremos proteger la creación
const { admin } = require('../middleware/admin.middleware'); // Opcional, si queremos que solo admins creen productos


router.get('/search', productController.searchProducts);

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


// http://localhost:5000/api/products
// RUTAS PROTEGIDAS: POST /api/products
// 1. protect: Verifica token y carga req.user
// 2. admin: Verifica req.user.role === 'admin'
router.post('/', protect, admin, productController.createProduct);



/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto existente (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor 4K Ultra Wide
 *               price:
 *                 type: number
 *                 example: 899.99
 *               description:
 *                 type: string
 *                 example: La última generación de monitores de alta fidelidad.
 *               img:
 *                 type: string
 *                 example: url_imagen_actualizada.jpg
 *               id_provider:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       '200':
 *         description: Producto actualizado con éxito.
 *       '403':
 *         description: Prohibido (rol no es 'admin').
 *       '404':
 *         description: Producto no encontrado.
 */
 // http://localhost:5000/api/products/:id
// RUTA PUT: Edición de producto (Solo Admin)
router.put('/:id', protect, admin, productController.editProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID (Solo Admin)
 *     tags: [Productos]
 *     description: Elimina permanentemente un producto del catálogo de la base de datos. Requiere autenticación y el rol de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar.
 *     responses:
 *       '200':
 *         description: Producto eliminado con éxito. Devuelve un mensaje de confirmación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El producto con ID 10 ha sido eliminado.
 *       '401':
 *         description: No autorizado (Token faltante o inválido).
 *       '403':
 *         description: Prohibido (El usuario autenticado no tiene rol 'admin').
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error interno del servidor.
 */
//http://localhost:5000/api/products/:id
// RUTA DELETE: Eliminación de producto (Solo Admin)
router.delete('/:id', protect, admin, productController.deleteProduct);





module.exports = router;