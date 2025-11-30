const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const { protect } = require('../middleware/auth.middleware'); // Opcional, si queremos proteger la creación
const { admin } = require('../middleware/admin.middleware'); // Opcional, si queremos que solo admins creen productos

// RUTAS PROTEGIDAS: POST /api/products
// 1. protect: Verifica token y carga req.user
// 2. admin: Verifica req.user.role === 'admin'
router.post('/', protect, admin, productController.createProduct);


// http://localhost:5000/api/products/:id
router.get('/:id', productController.getProductById);

// http://localhost:5000/api/products
router.get('/', productController.getProducts); 
router.post('/', productController.createProduct);

module.exports = router;