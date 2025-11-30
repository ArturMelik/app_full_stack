const providerModel = require('../models/providers.model');

const getProviders = async (req, res) => {
    try {
        const providers = await providerModel.getAllProvidersModel();
        res.status(200).json(providers);
    } catch (error) {
        console.error('Error al obtener proveedores:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const createProvider = async (req, res) => {
    const { companyname, website, img } = req.body;

    if (!companyname) {
        return res.status(400).json({ error: 'El nombre de la compañía es obligatorio.' });
    }

    try {
        const newProvider = await providerModel.createProviderModel(companyname, website, img);
        res.status(201).json({ 
            message: 'Proveedor creado con éxito.',
            provider: newProvider
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = {
    getProviders,
    createProvider
};