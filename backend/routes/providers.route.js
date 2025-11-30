const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware'); 

// RUTAS PROTEGIDAS: POST /api/providers
// 1. protect: Verifica token y carga req.user
// 2. admin: Verifica req.user.role === 'admin'
router.post('/', protect, admin, providerController.createProvider);


// http://localhost:5000/api/providers

router.get('/', providerController.getProviders); 
router.post('/', providerController.createProvider); 

module.exports = router;