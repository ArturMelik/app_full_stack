const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
// const { protect } = require('../middleware/authMiddleware'); // Opcional, si queremos proteger la creación


// http://localhost:5000/api/products
router.get('/', productController.getProducts); 
router.post('/', productController.createProduct); // Por ahora, público (aunque debería ser admin)

module.exports = router;