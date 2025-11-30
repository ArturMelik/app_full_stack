const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controller');


// http://localhost:5000/api/providers

router.get('/', providerController.getProviders); 
router.post('/', providerController.createProvider); 

module.exports = router;