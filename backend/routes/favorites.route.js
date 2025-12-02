const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorites.controller");
const { protect } = require("../middleware/auth.middleware"); // 

// http://localhost:5000/api/favorites
// Todas las rutas de favoritos requieren que el usuario esté logueado

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Listar todos los favoritos del usuario logueado
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de favoritos obtenida.
 *       '401':
 *         description: No autorizado (falta token).
 *
 *   post:
 *     summary: Añadir un producto a favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '201':
 *         description: Producto añadido a favoritos con éxito.
 *       '401':
 *         description: No autorizado (falta token).
 *
 *   delete:
 *     summary: Eliminar un producto de favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Producto eliminado de favoritos.
 *       '404':
 *         description: El producto no estaba en favoritos.
 */

router.post("/", protect, favoriteController.addFavorite);
router.get("/", protect, favoriteController.getFavorites);
router.delete("/", protect, favoriteController.removeFavorite);

module.exports = router;
